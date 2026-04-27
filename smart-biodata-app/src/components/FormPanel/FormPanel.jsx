import React, { useRef } from 'react';
import { DEFAULT_LABELS } from '../../constants/biodata';
import { useBiodataContext } from '../../context/BiodataContext';

const FormPanel = () => {
  const { 
    formData, 
    handleInputChange, 
    visibleSections, 
    toggleSection, 
    hiddenFields, 
    toggleField, 
    customFields, 
    addCustomField, 
    updateCustomField, 
    removeCustomField, 
    loadPhoto, 
    fillSampleData, 
    handleDownload,
    setLabel,
    customLabels,
    sectionLabels,
    updateSectionLabel
  } = useBiodataContext();

  const handleEditLabel = (field) => {
    const currentLabel = customLabels[field] || DEFAULT_LABELS[field] || field;
    const newLabel = prompt("Enter new label for this field:", currentLabel);
    if (newLabel !== null) {
      setLabel(field, newLabel);
    }
  };

  return (
    <div className="lg:w-[38%] relative">
      <div className="lg:sticky lg:top-24 space-y-6">
        <div className="bg-white rounded-2xl shadow-sm border border-amber-100 overflow-hidden">
          <div className="p-5 border-b flex justify-between items-center bg-white">
            <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">✍️ Fill Details</h2>
            <button onClick={fillSampleData} className="text-xs font-bold text-amber-600 hover:text-amber-700 bg-amber-50 px-3 py-1.5 rounded-full transition-all border border-amber-100">Sample Data</button>
          </div>

          <div className="p-6 space-y-8 max-h-[80vh] overflow-y-auto">
            {/* Photo Section - Still has visibility toggle */}
            <Section title="Photo Upload" icon="📷" section="photo" visible={visibleSections.photo} onToggle={toggleSection} showVisibilityToggle={true}>
              <div className="flex items-center justify-center w-full">
                <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-amber-200 rounded-2xl cursor-pointer bg-amber-50/30 hover:bg-amber-50 transition-all">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <p className="mb-1 text-sm text-amber-800 font-semibold">Click to upload photo</p>
                    <p className="text-[10px] text-amber-600/60 uppercase font-bold tracking-wider">JPG, PNG or HEIC</p>
                  </div>
                  <input type="file" className="hidden" accept="image/*,.heic" onChange={loadPhoto} />
                </label>
              </div>
            </Section>

            {/* Other Sections - Use collapse/expand arrows */}
            <Section 
              title={sectionLabels.personal} 
              icon="👤" 
              section="personal" 
              visible={visibleSections.personal} 
              onToggle={toggleSection}
              onLabelChange={(val) => updateSectionLabel('personal', val)}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {['name', 'dob', 'religion', 'caste', 'edu', 'job', 'salary'].map(f => (
                  <InputField 
                    key={f} 
                    id={f} 
                    type={f === 'dob' ? 'date' : 'text'}
                    label={customLabels[f] || DEFAULT_LABELS[f]} 
                    value={formData[f]} 
                    onChange={handleInputChange} 
                    isHidden={hiddenFields.has(f)} 
                    onToggle={() => toggleField(f)} 
                    onLabelChange={(val) => setLabel(f, val)}
                  />
                ))}
              </div>
            </Section>

            <Section 
              title={sectionLabels.horoscope} 
              icon="🌙" 
              section="horoscope" 
              visible={visibleSections.horoscope} 
              onToggle={toggleSection}
              onLabelChange={(val) => updateSectionLabel('horoscope', val)}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {['gothra', 'rashi', 'nakshatra', 'gan'].map(f => (
                  <InputField 
                    key={f} 
                    id={f} 
                    label={customLabels[f] || DEFAULT_LABELS[f]} 
                    value={formData[f]} 
                    onChange={handleInputChange} 
                    isHidden={hiddenFields.has(f)} 
                    onToggle={() => toggleField(f)} 
                    onLabelChange={(val) => setLabel(f, val)}
                  />
                ))}
              </div>
            </Section>

            <Section 
              title={sectionLabels.family} 
              icon="👨‍👩‍👧‍👦" 
              section="family" 
              visible={visibleSections.family} 
              onToggle={toggleSection}
              onLabelChange={(val) => updateSectionLabel('family', val)}
            >
              <div className="grid grid-cols-1 gap-4">
                {['father', 'mother'].map(f => (
                  <InputField 
                    key={f} 
                    id={f} 
                    label={customLabels[f] || DEFAULT_LABELS[f]} 
                    value={formData[f]} 
                    onChange={handleInputChange} 
                    isHidden={hiddenFields.has(f)} 
                    onToggle={() => toggleField(f)} 
                    onLabelChange={(val) => setLabel(f, val)}
                  />
                ))}
              </div>
            </Section>

            <Section 
              title={sectionLabels.contact} 
              icon="📞" 
              section="contact" 
              visible={visibleSections.contact} 
              onToggle={toggleSection}
              onLabelChange={(val) => updateSectionLabel('contact', val)}
            >
              <div className="grid grid-cols-1 gap-4">
                {['mobile', 'address'].map(f => (
                  <InputField 
                    key={f} 
                    id={f} 
                    label={customLabels[f] || DEFAULT_LABELS[f]} 
                    value={formData[f]} 
                    onChange={handleInputChange} 
                    isHidden={hiddenFields.has(f)} 
                    onToggle={() => toggleField(f)} 
                    onLabelChange={(val) => setLabel(f, val)}
                  />
                ))}
              </div>
            </Section>

            {/* Custom Fields */}
            <div className={`rounded-xl border border-dashed p-5 transition-all ${customFields.length >= 2 ? 'border-gray-200 bg-gray-50/30' : 'border-amber-300 bg-amber-50/30'}`}>
              <div className="flex justify-between items-center mb-3">
                <div className="flex flex-col">
                  <h3 className="font-bold text-amber-800 text-sm">✨ Custom fields</h3>
                  <span className="text-[9px] text-amber-600 font-medium">Max 2 fields allowed</span>
                </div>
                <button 
                  onClick={addCustomField} 
                  disabled={customFields.length >= 2}
                  className={`text-[10px] px-3 py-1 rounded-full transition-all ${customFields.length >= 2 ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : 'bg-amber-600 text-white hover:bg-amber-700'}`}
                >
                  {customFields.length >= 2 ? 'Limit Reached' : '+ Add'}
                </button>
              </div>
              <div className="space-y-3">
                {customFields.map(f => (
                  <div key={f.id} className="flex flex-wrap gap-2 items-end bg-white p-2 rounded-xl border border-amber-100">
                    <div className="flex-1 min-w-[120px]">
                      <label className="text-[10px] font-bold text-gray-400">Field name</label>
                      <input type="text" value={f.name} onChange={(e) => updateCustomField(f.id, 'name', e.target.value)} placeholder="e.g. Hobbies" className="w-full p-2 border border-gray-100 rounded-lg text-sm outline-none" />
                    </div>
                    <div className="flex-1 min-w-[140px]">
                      <label className="text-[10px] font-bold text-gray-400">Value</label>
                      <input type="text" value={f.value} onChange={(e) => updateCustomField(f.id, 'value', e.target.value)} placeholder="e.g. Reading" className="w-full p-2 border border-gray-100 rounded-lg text-sm outline-none" />
                    </div>
                    <button onClick={() => removeCustomField(f.id)} className="p-2 text-red-400 hover:text-red-600 transition-colors">✕</button>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 sticky bottom-0 bg-white/95 backdrop-blur-sm rounded-2xl p-4 -mx-1">
              <button onClick={handleDownload} className="w-full bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 text-white font-bold py-4 rounded-xl shadow-lg transition-all flex items-center justify-center gap-3 text-lg uppercase tracking-wider">
                Download PDF
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Section = ({ title, icon, section, visible, onToggle, showVisibilityToggle = false, children }) => {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center bg-gray-50 p-3 rounded-xl border border-gray-100 cursor-pointer hover:bg-gray-100/80 transition-colors" onClick={() => onToggle(section)}>
        <div className="flex items-center gap-2">
          <span>{icon}</span>
          <h3 className="font-bold text-gray-700">{title}</h3>
        </div>
        <div className="flex items-center gap-3">
          {showVisibilityToggle && (
            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${visible ? 'text-green-600 bg-green-50 border border-green-200' : 'text-red-600 bg-red-50 border border-red-200'}`}>
              {visible ? 'Visible' : 'Hidden'}
            </span>
          )}
          <span className="text-gray-400 font-bold transition-transform duration-300" style={{ transform: visible ? 'rotate(0deg)' : 'rotate(180deg)' }}>
            ▼
          </span>
        </div>
      </div>
      {visible && <div className="transition-all duration-300 animate-fadeIn">{children}</div>}
    </div>
  );
};

const InputField = ({ id, type = 'text', label, value, onChange, isHidden, onToggle, onLabelChange }) => {
  const labelRef = useRef(null);

  const startEdit = (e) => {
    e.stopPropagation();
    if (labelRef.current) {
      labelRef.current.contentEditable = "true";
      labelRef.current.focus();
      
      const range = document.createRange();
      range.selectNodeContents(labelRef.current);
      const selection = window.getSelection();
      selection.removeAllRanges();
      selection.addRange(range);
    }
  };

  const handleBlur = () => {
    if (labelRef.current) {
      labelRef.current.contentEditable = "false";
      onLabelChange(labelRef.current.innerText.trim());
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      labelRef.current.blur();
    }
  };

  return (
    <div className={`space-y-1 transition-opacity ${isHidden ? 'opacity-40' : 'opacity-100'}`}>
      <div className="flex justify-between items-center mb-1">
        <div className="flex items-center gap-1.5">
          <label 
            ref={labelRef}
            className="text-xs font-semibold text-gray-500 outline-none focus:bg-amber-50 focus:px-1 rounded"
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
            suppressContentEditableWarning={true}
          >
            {label}
          </label>
          <button onClick={startEdit} className="text-gray-400 hover:text-amber-600 transition-colors" title="Edit label">
            <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
          </button>
        </div>
        <button onClick={(e) => { e.stopPropagation(); onToggle(); }} className={`text-xs transition-colors font-bold ${isHidden ? 'text-green-500 hover:text-green-600' : 'text-red-400 hover:text-red-600'}`} title={isHidden ? 'Restore field' : 'Hide field'}>
          {isHidden ? '➕' : '✕'}
        </button>
      </div>
      <input 
        id={`in-${id}`} 
        type={type} 
        value={value} 
        onChange={onChange} 
        className="w-full p-3 bg-gray-50/50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-400 outline-none text-sm" 
        placeholder={`Enter ${label}...`}
      />
    </div>
  );
};

export default FormPanel;

import React from 'react';
import PreviewField from '../../common/PreviewField';
import { useBiodataContext } from '../../../context/BiodataContext';

const CustomImgTemplate = () => {
  const { 
    activeTemplate, customFields, visibleSections, photo,
    sectionLabels, shouldShowSection
  } = useBiodataContext();
  
  if (activeTemplate !== 'customimg') return null;

  const personalFields = ['name', 'dob', 'religion', 'caste', 'edu', 'job', 'salary'];
  const horoscopeFields = ['gothra', 'rashi', 'nakshatra', 'gan'];
  const familyFields = ['father', 'mother'];
  const contactFields = ['mobile', 'address'];

  return (
    <div id="template-customimg" className="template-container custom-img-bg template-active flex flex-col h-full">
      <div className="watermark">PREVIEW</div>
      
      <div className="custom-img-content flex-1 flex flex-col">
        <div className="text-center mb-10 border-b border-[#ad3333]/20 pb-6">
          <p className="text-[#ad3333] text-sm font-serif italic mb-2 tracking-widest">॥ श्री गणेशाय नमः ॥</p>
          <h1 className="text-5xl font-bold tracking-[0.25em] text-[#ad3333] uppercase" style={{ fontFamily: "'Cormorant Garamond', serif" }}>BIODATA</h1>
          <div className="flex items-center justify-center gap-4 mt-2">
            <div className="w-12 h-[1px] bg-[#ad3333]/40"></div>
            <div className="w-2 h-2 rounded-full bg-[#ad3333]/60"></div>
            <div className="w-12 h-[1px] bg-[#ad3333]/40"></div>
          </div>
        </div>

        <div className="flex flex-wrap gap-8 justify-between items-start mb-6">
          <div className="flex-1">
            {shouldShowSection('personal', personalFields) && (
              <div className="section-personal">
                <div className="section-title-standard" style={{ color: '#ad3333', marginTop: 0, borderBottom: '1.5px solid #ad333333', paddingBottom: '4px' }}>{sectionLabels.personal}</div>
                {personalFields.map(f => <PreviewField key={f} field={f} />)}
              </div>
            )}
          </div>

          {shouldShowSection('photo') && (
            <div className="photo-box-standard" style={{ top: '210px', right: '70px' }}>
              {photo ? (
                <img src={photo} className="w-full h-full object-cover" alt="Profile" />
              ) : (
                <div className="w-full h-full bg-stone-50 flex items-center justify-center text-stone-300 text-xs italic">
                  Photo
                </div>
              )}
            </div>
          )}
        </div>

        {shouldShowSection('horoscope', horoscopeFields) && (
          <div className="mt-6">
            <div className="section-title-standard" style={{ color: '#ad3333', borderBottom: '1.5px solid #ad333333', paddingBottom: '4px' }}>{sectionLabels.horoscope}</div>
            <div className="w-[65%]">
              {horoscopeFields.map(f => <PreviewField key={f} field={f} />)}
            </div>
          </div>
        )}

        {shouldShowSection('family', familyFields) && (
          <div className="mt-8">
            <div className="section-title-standard" style={{ color: '#ad3333', borderBottom: '1.5px solid #ad333333', paddingBottom: '4px' }}>{sectionLabels.family}</div>
            {familyFields.map(f => <PreviewField key={f} field={f} />)}
          </div>
        )}

        {shouldShowSection('contact', contactFields) && (
          <div className="mt-8">
            <div className="section-title-standard" style={{ color: '#ad3333', borderBottom: '1.5px solid #ad333333', paddingBottom: '4px' }}>{sectionLabels.contact}</div>
            {contactFields.map(f => <PreviewField key={f} field={f} />)}
          </div>
        )}

        {shouldShowSection('other') && (
          <div className="mt-8">
            <div className="section-title-standard" style={{ color: '#ad3333', borderBottom: '1.5px solid #ad333333', paddingBottom: '4px' }}>{sectionLabels.other}</div>
            {customFields.map(f => (
              <div key={f.id} className="field-row">
                <div className="label-col">{f.name || 'Field'}</div>
                <div className="colon-col">:</div>
                <div className="value-col">{f.value || '—'}</div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Footer section inspired by Template 4 */}
      <div className="text-center text-[10px] text-stone-400 pb-8 uppercase tracking-widest">
        Handcrafted for your special journey
      </div>
    </div>
  );
};

export default CustomImgTemplate;

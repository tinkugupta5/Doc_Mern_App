import React from 'react';
import { TEMPLATES_CONFIG } from '../../constants/biodata';
import { useBiodataContext } from '../../context/BiodataContext';
import ClassicTemplate from './templates/ClassicTemplate';
import Template1 from './templates/Template1';
import Template2 from './templates/Template2';
import Template3 from './templates/Template3';
import MuslimTemplate from './templates/MuslimTemplate';
import CustomImgTemplate from './templates/CustomImgTemplate';

const PreviewPanel = () => {
  const { activeTemplate, setActiveTemplate, handleDownload, previewWrapperRef } = useBiodataContext();

  return (
    <div className="xl:w-[62%]">
      <div className="sticky top-24 bg-white rounded-2xl shadow-sm overflow-hidden border border-amber-100">
        <div className="bg-white px-5 py-3 flex justify-between items-center border-b border-amber-100">
          <span className="font-bold text-gray-700 flex gap-2">🔍 Live Preview</span>
          <button onClick={handleDownload} className="text-xs bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded-lg shadow-sm font-bold flex items-center gap-2 transition-all uppercase tracking-wider">
            Download PDF
          </button>
        </div>

        {/* Template Switcher */}
        <div className="px-5 py-4 bg-gray-50/50 flex gap-3 overflow-x-auto border-b border-gray-100" style={{ scrollbarWidth: 'thin', WebkitOverflowScrolling: 'touch' }}>
          {TEMPLATES_CONFIG.map(t => (
            <div 
              key={t.id} 
              onClick={() => setActiveTemplate(t.id)}
              className={`template-card min-w-[145px] bg-white p-3 rounded-xl flex items-center gap-2 shadow-sm border transition-all cursor-pointer relative ${activeTemplate === t.id ? 'active border-amber-500 bg-amber-50' : 'border-gray-100 hover:border-amber-200'}`}
            >
              {t.badge && <div className="absolute -top-1 -right-1 bg-orange-500 text-white text-[8px] px-2 py-0.5 rounded-full font-bold uppercase shadow-sm">{t.badge}</div>}
              <span className="text-2xl">{t.icon}</span>
              <div className="text-left">
                <div className="font-bold text-sm text-gray-800 leading-tight">{t.name}</div>
                <div className="text-[10px] text-gray-500 leading-tight mt-0.5">{t.desc}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Preview Area */}
        <div className="overflow-x-auto p-4 bg-[#faf7f2] flex justify-center">
          <div id="capture-area" className="scale-[0.8] md:scale-90 lg:scale-100 origin-top transition-all">
            <div id="preview-wrapper" ref={previewWrapperRef}>
              <Template1 />
              <Template2 />
              <Template3 />
              <ClassicTemplate />
              <CustomImgTemplate />
              <MuslimTemplate />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreviewPanel;

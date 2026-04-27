import React from 'react';
import PreviewField from '../../common/PreviewField';
import { useBiodataContext } from '../../../context/BiodataContext';

const ClassicTemplate = () => {
  const { 
    activeTemplate, customFields, visibleSections, photo,
    sectionLabels, shouldShowSection
  } = useBiodataContext();
  
  if (activeTemplate !== 'classic') return null;

  const personalFields = ['name', 'dob', 'religion', 'caste', 'edu', 'job', 'salary'];
  const horoscopeFields = ['gothra', 'rashi', 'nakshatra', 'gan'];
  const familyFields = ['father', 'mother'];
  const contactFields = ['mobile', 'address'];

  return (
    <div id="template-classic" className="template-container mandala-bg template-active flex flex-col h-full">
      <div className="watermark">PREVIEW</div>
      <div className="classic-padding flex-1">
        <div className="text-center border-b-2 border-amber-200 pb-4 mb-8">
          <p className="text-amber-700 text-sm font-serif italic mb-1">श्री गणेशाय नमः</p>
          <h1 className="text-5xl font-bold text-stone-800 tracking-[0.1em] uppercase">BIODATA</h1>
        </div>
        
        <div className="flex flex-wrap gap-8 justify-between items-start">
          <div className="flex-1">
            {shouldShowSection('personal', personalFields) && (
              <div className="section-personal mb-6">
                <div className="section-title-biodata mb-4">{sectionLabels.personal}</div>
                {personalFields.map(f => <PreviewField key={f} field={f} />)}
              </div>
            )}

            {shouldShowSection('horoscope', horoscopeFields) && (
              <div className="section-horoscope mb-6">
                <div className="section-title-biodata mb-4">{sectionLabels.horoscope}</div>
                {horoscopeFields.map(f => <PreviewField key={f} field={f} />)}
              </div>
            )}
          </div>

          {shouldShowSection('photo') && (
            <div className="w-36 h-44 bg-white border-2 border-amber-200 p-1 rounded shadow-sm shrink-0">
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

        {shouldShowSection('family', familyFields) && (
          <div className="section-family mb-6">
            <div className="section-title-biodata mb-4">{sectionLabels.family}</div>
            {familyFields.map(f => <PreviewField key={f} field={f} />)}
          </div>
        )}

        {shouldShowSection('contact', contactFields) && (
          <div className="section-contact mb-6">
            <div className="section-title-biodata mb-4">{sectionLabels.contact}</div>
            {contactFields.map(f => <PreviewField key={f} field={f} />)}
          </div>
        )}

        {shouldShowSection('other') && (
          <div className="mt-4 pt-4 border-t border-stone-200 border-dashed">
            <div className="section-title-biodata mb-4">{sectionLabels.other}</div>
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
      <div className="text-center text-[10px] text-stone-300 pb-4 uppercase tracking-widest">
        SmartBiodata · Crafted with Tradition
      </div>
    </div>
  );
};

export default ClassicTemplate;

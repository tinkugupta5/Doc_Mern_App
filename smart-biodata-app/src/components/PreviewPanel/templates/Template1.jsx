import React from 'react';
import PreviewField from '../../common/PreviewField';
import { useBiodataContext } from '../../../context/BiodataContext';

const Template1 = () => {
  const { 
    activeTemplate, customFields, visibleSections, photo, 
    sectionLabels, shouldShowSection 
  } = useBiodataContext();
  
  if (activeTemplate !== 'template1') return null;

  const personalFields = ['name', 'dob', 'religion', 'caste', 'edu', 'job', 'salary'];
  const horoscopeFields = ['gothra', 'rashi', 'nakshatra', 'gan'];
  const familyFields = ['father', 'mother'];
  const contactFields = ['mobile', 'address'];

  return (
    <div id="template-template1" className="template-container template1-bg template-active">
      <div className="watermark">PREVIEW</div>
      
      {shouldShowSection('photo') && (
        <div className="photo-box-standard" style={{ top: '193px' }}>
          {photo ? (
            <img src={photo} className="w-full h-full object-cover" alt="Profile" />
          ) : (
            <div className="w-full h-full bg-gray-50 flex flex-col items-center justify-center text-gray-300">
              <span className="text-xl mb-1">📷</span>
              <span className="text-[9px] font-bold uppercase">Photo</span>
            </div>
          )}
        </div>
      )}

      <div className="template1-content">
        {shouldShowSection('personal', personalFields) && (
          <div className="section-personal">
            <div className="t1-section-title" style={{ marginTop: 0 }}>{sectionLabels.personal}</div>
            <div className="w-[65%]">
              {personalFields.map(f => <PreviewField key={f} field={f} />)}
            </div>
          </div>
        )}

        {shouldShowSection('horoscope', horoscopeFields) && (
          <div className="section-horoscope mt-6">
            <div className="t1-section-title">{sectionLabels.horoscope}</div>
            <div className="w-[65%]">
              {horoscopeFields.map(f => <PreviewField key={f} field={f} />)}
            </div>
          </div>
        )}

        {shouldShowSection('family', familyFields) && (
          <div className="section-family mt-6">
            <div className="t1-section-title">{sectionLabels.family}</div>
            {familyFields.map(f => <PreviewField key={f} field={f} />)}
          </div>
        )}

        {shouldShowSection('contact', contactFields) && (
          <div className="section-contact mt-6">
            <div className="t1-section-title">{sectionLabels.contact}</div>
            {contactFields.map(f => <PreviewField key={f} field={f} />)}
          </div>
        )}

        {shouldShowSection('other') && (
          <div className="mt-4 pt-4 border-t border-amber-100 border-dashed">
            <div className="t1-section-title" style={{ marginTop: 0 }}>{sectionLabels.other}</div>
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
    </div>
  );
};

export default Template1;

import React from 'react';
import PreviewField from '../../common/PreviewField';
import { useBiodataContext } from '../../../context/BiodataContext';

const MuslimTemplate = () => {
  const { 
    activeTemplate, customFields, visibleSections, photo,
    sectionLabels, shouldShowSection
  } = useBiodataContext();
  // test
  
  if (activeTemplate !== 'muslim') return null;

  const personalFields = ['name', 'dob', 'religion', 'caste', 'edu', 'job', 'salary'];
  const horoscopeFields = ['gothra', 'rashi', 'nakshatra', 'gan'];
  const familyFields = ['father', 'mother'];
  const contactFields = ['mobile', 'address'];

  return (
    <div id="template-muslim" className="template-container muslim-bg template-active">
      <div className="watermark">PREVIEW</div>
      
      {shouldShowSection('photo') && (
        <div className="photo-box-standard" style={{ top: '160px', borderColor: '#2d5a27' }}>
          {photo ? (
            <img src={photo} className="w-full h-full object-cover" alt="Profile" />
          ) : (
            <div className="w-full h-full bg-green-50 flex items-center justify-center text-green-200 text-xs italic">📷 Photo</div>
          )}
        </div>
      )}

      <div className="muslim-content">
        {shouldShowSection('personal', personalFields) && (
          <div className="w-[65%]">
            <div className="muslim-section-title" style={{ marginTop: 0 }}>{sectionLabels.personal}</div>
            {personalFields.map(f => <PreviewField key={f} field={f} />)}
          </div>
        )}

        {shouldShowSection('horoscope', horoscopeFields) && (
          <div className="mt-8">
            <div className="w-[65%]">
              {horoscopeFields.map(f => <PreviewField key={f} field={f} />)}
            </div>
          </div>
        )}

        {shouldShowSection('family', familyFields) && (
          <div className="mt-8">
            <div className="muslim-section-title">{sectionLabels.family}</div>
            {familyFields.map(f => <PreviewField key={f} field={f} />)}
          </div>
        )}

        {shouldShowSection('contact', contactFields) && (
          <div className="mt-8">
            <div className="muslim-section-title">{sectionLabels.contact}</div>
            {contactFields.map(f => <PreviewField key={f} field={f} />)}
          </div>
        )}

        {shouldShowSection('other') && (
          <div className="mt-6">
            <div className="muslim-section-title" style={{ marginTop: 0 }}>{sectionLabels.other}</div>
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

export default MuslimTemplate;

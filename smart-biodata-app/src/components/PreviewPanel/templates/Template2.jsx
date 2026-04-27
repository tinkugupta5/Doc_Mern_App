import React from 'react';
import PreviewField from '../../common/PreviewField';
import { useBiodataContext } from '../../../context/BiodataContext';

const Template2 = () => {
  const { 
    activeTemplate, customFields, visibleSections, photo,
    sectionLabels, shouldShowSection
  } = useBiodataContext();
  
  if (activeTemplate !== 'template2') return null;

  const personalFields = ['name', 'dob', 'religion', 'caste', 'edu', 'job', 'salary'];
  const horoscopeFields = ['gothra', 'rashi', 'nakshatra', 'gan'];
  const familyFields = ['father', 'mother'];
  const contactFields = ['mobile', 'address'];

  return (
    <div id="template-template2" className="template-container template2-bg template-active">
      <div className="watermark">PREVIEW</div>
      
      {shouldShowSection('photo') && (
        <div className="photo-box-standard" style={{ top: '260px' }}>
          {photo ? (
            <img src={photo} className="w-full h-full object-cover" alt="Profile" />
          ) : (
            <div className="w-full h-full bg-orange-50 flex items-center justify-center text-orange-200 text-xs">📷 Photo</div>
          )}
        </div>
      )}

      <div className="template2-content">
        {shouldShowSection('personal', personalFields) && (
          <div className="w-[65%]">
            <div className="section-title-standard" style={{ color: '#92400e', marginTop: 0 }}>{sectionLabels.personal}</div>
            {personalFields.map(f => <PreviewField key={f} field={f} />)}
          </div>
        )}

        {shouldShowSection('horoscope', horoscopeFields) && (
          <div className="mt-8">
            <div className="section-title-standard" style={{ color: '#92400e' }}>{sectionLabels.horoscope}</div>
            <div className="w-[65%]">
              {horoscopeFields.map(f => <PreviewField key={f} field={f} />)}
            </div>
          </div>
        )}

        {shouldShowSection('family', familyFields) && (
          <div className="mt-8">
            <div className="section-title-standard" style={{ color: '#92400e' }}>{sectionLabels.family}</div>
            {familyFields.map(f => <PreviewField key={f} field={f} />)}
          </div>
        )}

        {shouldShowSection('contact', contactFields) && (
          <div className="mt-8">
            <div className="section-title-standard" style={{ color: '#92400e' }}>{sectionLabels.contact}</div>
            {contactFields.map(f => <PreviewField key={f} field={f} />)}
          </div>
        )}

        {shouldShowSection('other') && (
          <div className="mt-6 pt-4 border-t border-orange-200 border-dashed">
            <div className="section-title-standard" style={{ color: '#92400e', marginTop: 0 }}>{sectionLabels.other}</div>
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

export default Template2;

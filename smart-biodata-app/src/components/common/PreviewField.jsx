import React from 'react';
import { DEFAULT_LABELS } from '../../constants/biodata';
import { useBiodataContext } from '../../context/BiodataContext';

const PreviewField = ({ 
  field, 
  customLabel = null 
}) => {
  const { formData, hiddenFields, customLabels } = useBiodataContext();

  if (hiddenFields.has(field)) return null;

  const label = customLabels[field] || customLabel || DEFAULT_LABELS[field] || field;
  const value = formData[field] || '—';
  
  return (
    <div className="field-row">
      <div className="label-col">{label}</div>
      <div className="colon-col">:</div>
      <div className="value-col">{value}</div>
    </div>
  );
};

export default PreviewField;

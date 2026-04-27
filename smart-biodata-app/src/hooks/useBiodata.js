import { useState, useCallback } from 'react';
import heic2any from 'heic2any';
import { SAMPLE_DATA, DEFAULT_LABELS } from '../constants/biodata';

export const useBiodata = () => {
  const [formData, setFormData] = useState({
    name: '', dob: '', religion: '', caste: '', edu: '', job: '', salary: '',
    father: '', mother: '', gothra: '', rashi: '', nakshatra: '', gan: '',
    mobile: '', address: ''
  });
  
  const [visibleSections, setVisibleSections] = useState({
    personal: true, horoscope: true, family: true, contact: true, photo: true
  });
  
  const [hiddenFields, setHiddenFields] = useState(new Set());
  const [customFields, setCustomFields] = useState([]);
  const [customLabels, setCustomLabels] = useState({});
  const [activeTemplate, setActiveTemplate] = useState('template1');
  const [photo, setPhoto] = useState(null);
  const [isDownloading, setIsDownloading] = useState(false);
  const [sectionLabels, setSectionLabels] = useState({
    personal: 'Personal Details',
    horoscope: 'Horoscope Details',
    family: 'Family Details',
    contact: 'Contact Details',
    other: 'Other Details'
  });

  const handleInputChange = useCallback((e) => {
    const { id, value } = e.target;
    const fieldName = id.replace('in-', '');
    setFormData(prev => ({ ...prev, [fieldName]: value }));
  }, []);

  const toggleSection = useCallback((section) => {
    setVisibleSections(prev => ({ ...prev, [section]: !prev[section] }));
  }, []);

  const toggleField = useCallback((field) => {
    setHiddenFields(prev => {
      const next = new Set(prev);
      if (next.has(field)) next.delete(field);
      else next.add(field);
      return next;
    });
  }, []);

  const addCustomField = useCallback(() => {
    if (customFields.length >= 2) {
      alert("⚠️ Maximum 2 custom fields allowed to maintain 1-page layout.");
      return;
    }
    const uid = 'cf_' + Date.now();
    setCustomFields(prev => [...prev, { id: uid, name: '', value: '' }]);
  }, [customFields]);

  const updateCustomField = useCallback((id, key, val) => {
    setCustomFields(prev => prev.map(f => f.id === id ? { ...f, [key]: val } : f));
  }, []);

  const removeCustomField = useCallback((id) => {
    setCustomFields(prev => prev.filter(f => f.id !== id));
  }, []);

  const setLabel = useCallback((field, label) => {
    setCustomLabels(prev => ({ ...prev, [field]: label }));
  }, []);

  const updateSectionLabel = useCallback((section, val) => {
    setSectionLabels(prev => ({ ...prev, [section]: val }));
  }, []);

  const loadPhoto = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    let targetFile = file;
    if (file.name.toLowerCase().endsWith('.heic')) {
      try {
        const blob = await heic2any({ blob: file, toType: 'image/jpeg' });
        targetFile = blob;
      } catch (err) {
        console.error("HEIC conversion failed", err);
      }
    }

    const reader = new FileReader();
    reader.onload = (event) => setPhoto(event.target.result);
    reader.readAsDataURL(targetFile);
  };

  const fillSampleData = useCallback(() => {
    setFormData({ ...SAMPLE_DATA });
  }, []);

  return {
    formData,
    visibleSections,
    hiddenFields,
    customFields,
    customLabels,
    activeTemplate,
    photo,
    isDownloading,
    setIsDownloading,
    setActiveTemplate,
    handleInputChange,
    toggleSection,
    toggleField,
    addCustomField,
    updateCustomField,
    removeCustomField,
    setLabel,
    loadPhoto,
    fillSampleData,
    sectionLabels,
    updateSectionLabel,
    shouldShowSection: (section, fields) => {
      if (section === 'photo') return visibleSections.photo;
      if (section === 'other') return customFields.length > 0;
      if (section !== 'photo' && !visibleSections[section]) return false;
      
      // Dynamic visibility: show if at least one field is not hidden
      const activeFields = fields.filter(f => !hiddenFields.has(f));
      return activeFields.length > 0;
    }
  };
};

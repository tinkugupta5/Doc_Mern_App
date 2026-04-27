import React, { createContext, useContext, useRef } from 'react';
import { useBiodata } from '../hooks/useBiodata';
import { generatePDF } from '../utils/pdfGenerator';

const BiodataContext = createContext();

export const BiodataProvider = ({ children }) => {
  const biodata = useBiodata();
  const previewWrapperRef = useRef(null);

  const handleDownload = () => {
    generatePDF(
      biodata.activeTemplate, 
      biodata.formData, 
      biodata.isDownloading, 
      biodata.setIsDownloading
    );
  };

  const value = {
    ...biodata,
    previewWrapperRef,
    handleDownload
  };

  return (
    <BiodataContext.Provider value={value}>
      {children}
    </BiodataContext.Provider>
  );
};

export const useBiodataContext = () => {
  const context = useContext(BiodataContext);
  if (!context) {
    throw new Error('useBiodataContext must be used within a BiodataProvider');
  }
  return context;
};

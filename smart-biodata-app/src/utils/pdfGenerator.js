import html2pdf from 'html2pdf.js';

export const generatePDF = async (activeTemplate, formData, isDownloading, setIsDownloading) => {
  if (isDownloading) return;
  setIsDownloading(true);

  const originalElement = document.getElementById(`template-${activeTemplate}`);
  if (!originalElement) {
    setIsDownloading(false);
    return;
  }

  // Senior Approach: Clone the element to a temporary container with "True Visibility"
  const tempContainer = document.createElement('div');
  tempContainer.style.position = 'fixed';
  tempContainer.style.top = '0';
  tempContainer.style.left = '0';
  tempContainer.style.width = '794px';
  tempContainer.style.height = '1121px';
  tempContainer.style.zIndex = '-9999'; // Hidden behind everything
  tempContainer.style.opacity = '0.99'; // Almost full opacity to force engine rendering
  tempContainer.style.pointerEvents = 'none';
  document.body.appendChild(tempContainer);

  const element = originalElement.cloneNode(true);
  element.style.display = 'block';
  element.style.margin = '0';
  element.style.transform = 'none';
  element.style.animation = 'none';
  element.style.opacity = '1';
  element.style.transition = 'none';
  element.style.color = '#000000'; // Force maximum contrast
  
  // High-Contrast Font Fix: Prevent html2canvas from "fading" fonts during anti-aliasing
  const allText = element.querySelectorAll('*');
  allText.forEach(el => {
    el.style.color = '#000000';
    el.style.textShadow = '0.05px 0.05px 0.05px rgba(0,0,0,0.1)';
    el.style.webkitFontSmoothing = 'antialiased';
  });
  
  // Remove watermark and any other overlay artifacts for a clean capture
  const watermark = element.querySelector('.watermark');
  if (watermark) watermark.remove();

  tempContainer.appendChild(element);
  
  await document.fonts.ready;
  await new Promise(r => setTimeout(r, 1200)); // Maximum stability wait

  const opt = {
    margin: 0,
    filename: `Smart_Biodata_${formData.name || 'Profile'}.pdf`,
    image: { type: 'png', quality: 1.0 },
    html2canvas: {
      scale: 4, 
      useCORS: true,
      logging: false,
      letterRendering: true,
      backgroundColor: '#ffffff',
      imageTimeout: 0, // Never timeout on images
      scrollY: 0,
      scrollX: 0
    },
    jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait', compress: false }
  };

  try {
    await html2pdf().set(opt).from(element).save();
  } catch (err) {
    console.error("PDF generation failed:", err);
    alert("PDF generation failed. Please try again.");
  } finally {
    document.body.removeChild(tempContainer);
    setIsDownloading(false);
  }
};

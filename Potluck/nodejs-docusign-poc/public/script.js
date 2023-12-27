document.addEventListener('DOMContentLoaded', () => {
    const generatePdfBtn = document.getElementById('generatePdfBtn');
    const pdfViewer = document.getElementById('pdfViewer');
  
    generatePdfBtn.addEventListener('click', () => {
      const pdfFilePath = 'public/generated.pdf';
      pdfViewer.setAttribute('src', pdfFilePath);
      pdfViewer.style.display = 'block'; // Show the PDF viewer element
    });
  });
  
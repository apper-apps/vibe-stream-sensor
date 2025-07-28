import { toast } from 'react-toastify';

// Mock conversion service for PDF to Word
const conversionService = {
  convertPdfToWord: async (file) => {
    return new Promise((resolve, reject) => {
      // Simulate processing time
      setTimeout(() => {
        try {
          // Create a mock Word document blob
          const wordContent = `Converted from: ${file.name}\n\nThis is a mock conversion of your PDF file.\n\nOriginal file size: ${(file.size / (1024 * 1024)).toFixed(2)} MB\nConversion date: ${new Date().toLocaleString()}\n\nIn a real implementation, this would contain the actual converted content from your PDF file with preserved formatting, text, and layout.`;
          
          const blob = new Blob([wordContent], {
            type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
          });
          
          const filename = file.name.replace('.pdf', '.docx');
          
          resolve({
            blob,
            filename,
            originalSize: file.size,
            convertedSize: blob.size,
            processingTime: '2.3s'
          });
        } catch (error) {
          reject(new Error('Conversion failed'));
        }
      }, 2300); // 2.3 second delay to simulate processing
    });
  },

  getSupportedFormats: () => {
    return {
      input: ['pdf'],
      output: ['docx', 'doc']
    };
  },

  validateFile: (file, maxSize = 100 * 1024 * 1024) => { // 100MB default
    const errors = [];
    
    if (!file) {
      errors.push('No file selected');
      return errors;
    }
    
    if (file.type !== 'application/pdf') {
      errors.push('Only PDF files are supported');
    }
    
    if (file.size > maxSize) {
      errors.push(`File size must be less than ${maxSize / (1024 * 1024)}MB`);
    }
    
    if (file.size === 0) {
      errors.push('File appears to be empty');
    }
    
    return errors;
  },

  getConversionHistory: () => {
    // Mock conversion history
    const history = JSON.parse(localStorage.getItem('conversionHistory') || '[]');
    return history;
  },

  saveToHistory: (conversion) => {
    const history = conversionService.getConversionHistory();
    const newEntry = {
      Id: Date.now(),
      originalName: conversion.originalName,
      convertedName: conversion.convertedName,
      originalSize: conversion.originalSize,
      convertedSize: conversion.convertedSize,
      processingTime: conversion.processingTime,
      timestamp: new Date().toISOString(),
      status: 'completed'
    };
    
    history.unshift(newEntry);
    
    // Keep only last 50 conversions
    if (history.length > 50) {
      history.splice(50);
    }
    
    localStorage.setItem('conversionHistory', JSON.stringify(history));
    return newEntry;
  },

  clearHistory: () => {
    localStorage.removeItem('conversionHistory');
    toast.success('Conversion history cleared');
  }
};

export { conversionService };
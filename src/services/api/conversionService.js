import { toast } from 'react-toastify';

// Mock conversion service for PDF to Word
const conversionService = {
  // Document conversion methods
  convertDocument: async (file, conversionType) => {
    return new Promise((resolve, reject) => {
      const processingTime = Math.random() * 2000 + 1500; // 1.5-3.5s
      
      setTimeout(() => {
        try {
          let result;
          
          switch (conversionType) {
            case 'pdf-to-word':
              result = conversionService.convertPdfToWord(file);
              break;
            case 'pdf-to-excel':
              result = conversionService.convertPdfToExcel(file);
              break;
            case 'pdf-to-ppt':
              result = conversionService.convertPdfToPowerPoint(file);
              break;
            case 'word-to-pdf':
              result = conversionService.convertWordToPdf(file);
              break;
            case 'excel-to-pdf':
              result = conversionService.convertExcelToPdf(file);
              break;
            case 'ppt-to-pdf':
              result = conversionService.convertPowerPointToPdf(file);
              break;
            case 'word-to-excel':
              result = conversionService.convertWordToExcel(file);
              break;
            case 'excel-to-word':
              result = conversionService.convertExcelToWord(file);
              break;
            default:
              throw new Error('Unsupported conversion type');
          }
          
          resolve({
            ...result,
            processingTime: `${(processingTime / 1000).toFixed(1)}s`
          });
        } catch (error) {
          reject(new Error('Document conversion failed'));
        }
      }, processingTime);
    });
  },

  convertPdfToWord: (file) => {
    const content = `Converted from PDF: ${file.name}\n\nDocument Content:\n\nThis is a mock conversion of your PDF document to Word format. In a real implementation, this would contain the actual extracted and formatted content from your PDF file, preserving:\n\n• Text formatting and styles\n• Tables and layouts\n• Images and graphics\n• Headers and footers\n• Page structure\n\nOriginal file: ${file.name}\nFile size: ${(file.size / (1024 * 1024)).toFixed(2)} MB\nConversion date: ${new Date().toLocaleString()}\n\nThe converted document maintains the original structure while making it fully editable in Microsoft Word or compatible word processors.`;
    
    const blob = new Blob([content], {
      type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    });
    
    return {
      blob,
      filename: file.name.replace(/\.pdf$/i, '.docx'),
      originalSize: file.size,
      convertedSize: blob.size
    };
  },

  convertPdfToExcel: (file) => {
    const content = `PDF to Excel Conversion\n${file.name}\n\nSheet1:\nColumn A,Column B,Column C\nData 1,Data 2,Data 3\nExtracted,Table,Content\nFrom,PDF,Document\n\nSheet2:\nSummary,Value\nTotal Pages,Estimated\nTables Found,Multiple\nConversion Quality,High\n\nNote: This is a mock Excel conversion. Real implementation would extract tables, data, and structured content from the PDF file.`;
    
    const blob = new Blob([content], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    });
    
    return {
      blob,
      filename: file.name.replace(/\.pdf$/i, '.xlsx'),
      originalSize: file.size,
      convertedSize: blob.size
    };
  },

  convertPdfToPowerPoint: (file) => {
    const content = `PDF to PowerPoint Conversion\n\nSlide 1: Title Slide\n${file.name}\nConverted PDF Document\n\nSlide 2: Content Overview\n• Extracted from PDF\n• Maintains structure\n• Editable format\n\nSlide 3: Features\n• Page-to-slide conversion\n• Image preservation\n• Text formatting\n\nSlide 4: Summary\nSuccessfully converted PDF to PowerPoint presentation format.\n\nNote: This is a mock PowerPoint conversion. Real implementation would convert PDF pages to presentation slides.`;
    
    const blob = new Blob([content], {
      type: 'application/vnd.openxmlformats-officedocument.presentationml.presentation'
    });
    
    return {
      blob,
      filename: file.name.replace(/\.pdf$/i, '.pptx'),
      originalSize: file.size,
      convertedSize: blob.size
    };
  },

  convertWordToPdf: (file) => {
    const content = `%PDF-1.4\nMock PDF conversion of: ${file.name}\n\nThis represents a PDF version of your Word document.\nAll formatting, images, and layout would be preserved.\n\nOriginal: ${file.name}\nSize: ${(file.size / (1024 * 1024)).toFixed(2)} MB\nConverted: ${new Date().toLocaleString()}`;
    
    const blob = new Blob([content], { type: 'application/pdf' });
    
    return {
      blob,
      filename: file.name.replace(/\.(doc|docx)$/i, '.pdf'),
      originalSize: file.size,
      convertedSize: blob.size
    };
  },

  convertExcelToPdf: (file) => {
    const content = `%PDF-1.4\nExcel to PDF Conversion\n\nSpreadsheet: ${file.name}\nConverted to PDF format\n\nAll worksheets, charts, and formatting preserved in PDF format.\n\nConversion Details:\n- Multi-sheet support\n- Chart preservation\n- Formula display\n- Formatting retention`;
    
    const blob = new Blob([content], { type: 'application/pdf' });
    
    return {
      blob,
      filename: file.name.replace(/\.(xls|xlsx)$/i, '.pdf'),
      originalSize: file.size,
      convertedSize: blob.size
    };
  },

  convertPowerPointToPdf: (file) => {
    const content = `%PDF-1.4\nPowerPoint to PDF Conversion\n\nPresentation: ${file.name}\nConverted to PDF format\n\nAll slides, animations, and content preserved as static PDF pages.\n\nFeatures:\n- Slide-to-page conversion\n- Image quality preservation\n- Text formatting retention\n- Layout consistency`;
    
    const blob = new Blob([content], { type: 'application/pdf' });
    
    return {
      blob,
      filename: file.name.replace(/\.(ppt|pptx)$/i, '.pdf'),
      originalSize: file.size,
      convertedSize: blob.size
    };
  },

  convertWordToExcel: (file) => {
    const content = `Word to Excel Conversion\n${file.name}\n\nExtracted Data:\nSection,Content,Notes\nParagraph 1,Text content,Formatted\nParagraph 2,More content,Extracted\nTables,Structured data,Preserved\n\nMetadata:\nOriginal File,${file.name}\nConversion Type,Word to Excel\nDate,${new Date().toLocaleString()}`;
    
    const blob = new Blob([content], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    });
    
    return {
      blob,
      filename: file.name.replace(/\.(doc|docx)$/i, '.xlsx'),
      originalSize: file.size,
      convertedSize: blob.size
    };
  },

  convertExcelToWord: (file) => {
    const content = `Excel to Word Conversion\n\nSpreadsheet Data from: ${file.name}\n\nConverted Content:\n\nThis document contains the data and structure from your Excel spreadsheet, formatted for word processing:\n\n• Tables converted to Word tables\n• Charts embedded as images\n• Data organized in readable format\n• Formulas displayed as values\n\nOriginal file: ${file.name}\nConversion date: ${new Date().toLocaleString()}\n\nAll spreadsheet content has been structured for document editing.`;
    
    const blob = new Blob([content], {
      type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    });
    
    return {
      blob,
      filename: file.name.replace(/\.(xls|xlsx)$/i, '.docx'),
      originalSize: file.size,
      convertedSize: blob.size
    };
  },

  // Image processing methods
  processImage: async (file, operation, options = {}) => {
    return new Promise((resolve, reject) => {
      const processingTime = Math.random() * 1500 + 800; // 0.8-2.3s
      
      setTimeout(() => {
        try {
          let result;
          
          switch (operation) {
            case 'compress':
              result = conversionService.compressImage(file, options);
              break;
            case 'resize':
              result = conversionService.resizeImage(file, options);
              break;
            case 'convert':
              result = conversionService.convertImageFormat(file, options);
              break;
            case 'split':
              result = conversionService.splitImage(file, options);
              break;
            case 'pdf-to-images':
              result = conversionService.convertPdfToImages(file, options);
              break;
            case 'images-to-pdf':
              result = conversionService.convertImagesToPdf(file, options);
              break;
            default:
              throw new Error('Unsupported image operation');
          }
          
          resolve({
            ...result,
            processingTime: `${(processingTime / 1000).toFixed(1)}s`
          });
        } catch (error) {
          reject(new Error('Image processing failed'));
        }
      }, processingTime);
    });
  },

  compressImage: (file, options) => {
    const quality = options.quality || 80;
    const estimatedSize = Math.floor(file.size * (quality / 100) * 0.8);
    
    // Mock compressed image
    const canvas = document.createElement('canvas');
    canvas.width = 800;
    canvas.height = 600;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#f0f0f0';
    ctx.fillRect(0, 0, 800, 600);
    ctx.fillStyle = '#333';
    ctx.font = '24px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('Compressed Image', 400, 300);
    ctx.fillText(`Quality: ${quality}%`, 400, 350);
    
    canvas.toBlob((blob) => {
      return {
        blob,
        filename: file.name.replace(/\.[^.]+$/, `_compressed_${quality}.jpg`),
        originalSize: file.size,
        convertedSize: blob.size
      };
    }, 'image/jpeg', quality / 100);
    
    // Return mock data immediately for demo
    const mockBlob = new Blob(['compressed image data'], { type: 'image/jpeg' });
    return {
      blob: mockBlob,
      filename: file.name.replace(/\.[^.]+$/, `_compressed_${quality}.jpg`),
      originalSize: file.size,
      convertedSize: estimatedSize
    };
  },

  resizeImage: (file, options) => {
    const width = options.width || 800;
    const height = options.height || 600;
    
    const mockBlob = new Blob(['resized image data'], { type: file.type });
    return {
      blob: mockBlob,
      filename: file.name.replace(/\.[^.]+$/, `_${width}x${height}${file.name.match(/\.[^.]+$/)[0]}`),
      originalSize: file.size,
      convertedSize: Math.floor(file.size * 0.7)
    };
  },

  convertImageFormat: (file, options) => {
    const format = options.format || 'jpg';
    const mimeType = `image/${format === 'jpg' ? 'jpeg' : format}`;
    
    const mockBlob = new Blob(['converted image data'], { type: mimeType });
    return {
      blob: mockBlob,
      filename: file.name.replace(/\.[^.]+$/, `.${format}`),
      originalSize: file.size,
      convertedSize: Math.floor(file.size * 0.9)
    };
  },

  splitImage: (file, options) => {
    // Mock split into 4 parts
    const mockBlob = new Blob(['split image archive'], { type: 'application/zip' });
    return {
      blob: mockBlob,
      filename: file.name.replace(/\.[^.]+$/, '_split.zip'),
      originalSize: file.size,
      convertedSize: Math.floor(file.size * 1.1)
    };
  },

  convertPdfToImages: (file, options) => {
    const format = options.format || 'jpg';
    const mockBlob = new Blob(['pdf pages as images'], { type: 'application/zip' });
    return {
      blob: mockBlob,
      filename: file.name.replace(/\.pdf$/i, `_pages.zip`),
      originalSize: file.size,
      convertedSize: Math.floor(file.size * 1.5)
    };
  },

  convertImagesToPdf: (file, options) => {
    const content = `%PDF-1.4\nImages to PDF\n\nCombined images into PDF document\nSource: ${file.name}\nDate: ${new Date().toLocaleString()}`;
    const blob = new Blob([content], { type: 'application/pdf' });
    
    return {
      blob,
      filename: 'combined_images.pdf',
      originalSize: file.size,
      convertedSize: blob.size
    };
  },

  // Validation and utility methods
  getSupportedFormats: () => {
    return {
      document: {
        input: ['pdf', 'doc', 'docx', 'xls', 'xlsx', 'ppt', 'pptx'],
        output: ['pdf', 'docx', 'xlsx', 'pptx']
      },
      image: {
        input: ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'webp'],
        output: ['jpg', 'png', 'gif', 'webp', 'pdf']
      }
    };
  },

  validateFile: (file, conversionType, maxSize = 100 * 1024 * 1024) => {
    const errors = [];
    
    if (!file) {
      errors.push('No file selected');
      return errors;
    }
    
    if (file.size > maxSize) {
      errors.push(`File size must be less than ${maxSize / (1024 * 1024)}MB`);
    }
    
    if (file.size === 0) {
      errors.push('File appears to be empty');
    }

    // Type validation based on conversion type
    const typeValidation = {
      'pdf-to-word': ['application/pdf'],
      'pdf-to-excel': ['application/pdf'],
      'pdf-to-ppt': ['application/pdf'],
      'word-to-pdf': ['application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'],
      'excel-to-pdf': ['application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'],
      'ppt-to-pdf': ['application/vnd.ms-powerpoint', 'application/vnd.openxmlformats-officedocument.presentationml.presentation'],
      'word-to-excel': ['application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'],
      'excel-to-word': ['application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'],
      'compress': ['image/jpeg', 'image/png', 'image/gif', 'image/bmp', 'image/webp'],
      'resize': ['image/jpeg', 'image/png', 'image/gif', 'image/bmp', 'image/webp'],
      'convert': ['image/jpeg', 'image/png', 'image/gif', 'image/bmp', 'image/webp'],
      'split': ['image/jpeg', 'image/png', 'image/gif', 'image/bmp'],
      'pdf-to-images': ['application/pdf'],
      'images-to-pdf': ['image/jpeg', 'image/png', 'image/gif', 'image/bmp', 'image/webp']
    };

    const allowedTypes = typeValidation[conversionType];
    if (allowedTypes && !allowedTypes.includes(file.type)) {
      const typeNames = allowedTypes.map(type => type.split('/')[1].toUpperCase()).join(', ');
      errors.push(`Only ${typeNames} files are supported for this conversion`);
    }
    
    return errors;
  },

  getConversionHistory: () => {
    const history = JSON.parse(localStorage.getItem('conversionHistory') || '[]');
    return history.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
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
      conversionType: conversion.conversionType,
      timestamp: new Date().toISOString(),
      status: 'completed'
    };
    
    history.unshift(newEntry);
    
    // Keep only last 100 conversions
    if (history.length > 100) {
      history.splice(100);
    }
    
    localStorage.setItem('conversionHistory', JSON.stringify(history));
    return newEntry;
  },

  clearHistory: () => {
    localStorage.removeItem('conversionHistory');
    toast.success('Conversion history cleared');
  },

  getFileIcon: (filename) => {
    const ext = filename.split('.').pop().toLowerCase();
    const iconMap = {
      pdf: 'FileText',
      doc: 'FileText',
      docx: 'FileText',
      xls: 'Table',
      xlsx: 'Table',
      ppt: 'Presentation',
      pptx: 'Presentation',
      jpg: 'Image',
      jpeg: 'Image',
      png: 'Image',
      gif: 'Image',
      bmp: 'Image',
      webp: 'Image'
    };
    return iconMap[ext] || 'File';
  },

  getFileColor: (filename) => {
    const ext = filename.split('.').pop().toLowerCase();
    const colorMap = {
      pdf: 'red',
      doc: 'blue',
      docx: 'blue',
      xls: 'green',
      xlsx: 'green',
      ppt: 'orange',
      pptx: 'orange',
      jpg: 'purple',
      jpeg: 'purple',
      png: 'purple',
      gif: 'purple',
      bmp: 'purple',
      webp: 'purple'
    };
    return colorMap[ext] || 'gray';
  }
};

export { conversionService };
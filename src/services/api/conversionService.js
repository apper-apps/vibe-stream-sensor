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
            case 'crop':
              result = conversionService.cropImage(file, options);
              break;
            case 'rotate':
              result = conversionService.rotateImage(file, options);
              break;
            case 'watermark':
              result = conversionService.addWatermark(file, options);
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
    const targetWidth = 800;
    const targetHeight = 600;
    
    // Create actual compressed image using Canvas
    const canvas = document.createElement('canvas');
    canvas.width = targetWidth;
    canvas.height = targetHeight;
    const ctx = canvas.getContext('2d');
    
    // Create image from file
    return new Promise((resolve) => {
      const img = new Image();
      const reader = new FileReader();
      
      reader.onload = (e) => {
        img.onload = () => {
          // Calculate dimensions maintaining aspect ratio
          const aspectRatio = img.width / img.height;
          let drawWidth = targetWidth;
          let drawHeight = targetHeight;
          
          if (aspectRatio > 1) {
            drawHeight = targetWidth / aspectRatio;
          } else {
            drawWidth = targetHeight * aspectRatio;
          }
          
          // Clear canvas and draw image
          ctx.fillStyle = '#ffffff';
          ctx.fillRect(0, 0, targetWidth, targetHeight);
          
          const x = (targetWidth - drawWidth) / 2;
          const y = (targetHeight - drawHeight) / 2;
          ctx.drawImage(img, x, y, drawWidth, drawHeight);
          
          // Convert to blob with compression
          canvas.toBlob((blob) => {
            resolve({
              blob,
              filename: file.name.replace(/\.[^.]+$/, `_compressed_${quality}.jpg`),
              originalSize: file.size,
              convertedSize: blob.size
            });
          }, 'image/jpeg', quality / 100);
        };
        img.src = e.target.result;
      };
      reader.readAsDataURL(file);
    });
  },

  resizeImage: (file, options) => {
const width = parseInt(options.width) || 800;
    const height = parseInt(options.height) || 600;
    
    // Create actual resized image using Canvas
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');
    
    return new Promise((resolve) => {
      const img = new Image();
      const reader = new FileReader();
      
      reader.onload = (e) => {
        img.onload = () => {
          ctx.drawImage(img, 0, 0, width, height);
          
          canvas.toBlob((blob) => {
            resolve({
              blob,
              filename: file.name.replace(/\.[^.]+$/, `_${width}x${height}${file.name.match(/\.[^.]+$/)[0]}`),
              originalSize: file.size,
              convertedSize: blob.size
            });
          }, file.type);
        };
        img.src = e.target.result;
      };
      reader.readAsDataURL(file);
    });
  },

  convertImageFormat: (file, options) => {
    const format = options.format || 'jpg';
    const mimeType = `image/${format === 'jpg' ? 'jpeg' : format}`;
    
    // Create actual format conversion using Canvas
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    return new Promise((resolve) => {
      const img = new Image();
      const reader = new FileReader();
      
      reader.onload = (e) => {
        img.onload = () => {
          canvas.width = img.width;
          canvas.height = img.height;
          
          // Handle transparency for formats that don't support it
          if (format === 'jpg') {
            ctx.fillStyle = '#ffffff';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
          }
          
          ctx.drawImage(img, 0, 0);
          
          canvas.toBlob((blob) => {
            resolve({
              blob,
              filename: file.name.replace(/\.[^.]+$/, `.${format}`),
              originalSize: file.size,
              convertedSize: blob.size
            });
          }, mimeType, 0.9);
        };
        img.src = e.target.result;
      };
      reader.readAsDataURL(file);
    });
  },

  cropImage: (file, options) => {
    const cropX = parseInt(options.cropX) || 0;
    const cropY = parseInt(options.cropY) || 0;
    const cropWidth = parseInt(options.cropWidth) || 400;
    const cropHeight = parseInt(options.cropHeight) || 400;
    
    const canvas = document.createElement('canvas');
    canvas.width = cropWidth;
    canvas.height = cropHeight;
    const ctx = canvas.getContext('2d');
    
    return new Promise((resolve) => {
      const img = new Image();
      const reader = new FileReader();
      
      reader.onload = (e) => {
        img.onload = () => {
          ctx.drawImage(img, cropX, cropY, cropWidth, cropHeight, 0, 0, cropWidth, cropHeight);
          
          canvas.toBlob((blob) => {
            resolve({
              blob,
              filename: file.name.replace(/\.[^.]+$/, `_cropped${file.name.match(/\.[^.]+$/)[0]}`),
              originalSize: file.size,
              convertedSize: blob.size
            });
          }, file.type);
        };
        img.src = e.target.result;
      };
      reader.readAsDataURL(file);
    });
  },

  rotateImage: (file, options) => {
    const angle = parseInt(options.rotation) || 90;
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    return new Promise((resolve) => {
      const img = new Image();
      const reader = new FileReader();
      
      reader.onload = (e) => {
        img.onload = () => {
          const radians = (angle * Math.PI) / 180;
          
          if (angle === 90 || angle === 270) {
            canvas.width = img.height;
            canvas.height = img.width;
          } else {
            canvas.width = img.width;
            canvas.height = img.height;
          }
          
          ctx.translate(canvas.width / 2, canvas.height / 2);
          ctx.rotate(radians);
          ctx.drawImage(img, -img.width / 2, -img.height / 2);
          
          canvas.toBlob((blob) => {
            resolve({
              blob,
              filename: file.name.replace(/\.[^.]+$/, `_rotated_${angle}deg${file.name.match(/\.[^.]+$/)[0]}`),
              originalSize: file.size,
              convertedSize: blob.size
            });
          }, file.type);
        };
        img.src = e.target.result;
      };
      reader.readAsDataURL(file);
    });
  },

  addWatermark: (file, options) => {
    const watermarkText = options.watermarkText || 'WATERMARK';
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    return new Promise((resolve) => {
      const img = new Image();
      const reader = new FileReader();
      
      reader.onload = (e) => {
        img.onload = () => {
          canvas.width = img.width;
          canvas.height = img.height;
          
          ctx.drawImage(img, 0, 0);
          
          // Add watermark
          ctx.font = `${Math.min(img.width, img.height) / 10}px Arial`;
          ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
          ctx.textAlign = 'center';
          ctx.fillText(watermarkText, img.width / 2, img.height / 2);
          
          canvas.toBlob((blob) => {
            resolve({
              blob,
              filename: file.name.replace(/\.[^.]+$/, `_watermarked${file.name.match(/\.[^.]+$/)[0]}`),
              originalSize: file.size,
              convertedSize: blob.size
            });
          }, file.type);
        };
        img.src = e.target.result;
      };
      reader.readAsDataURL(file);
    });
  },

  splitImage: (file, options) => {
    // Mock split into 4 parts - would need advanced processing for real implementation
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

  // Text processing methods
  processText: async (file, operation, options = {}) => {
    return new Promise((resolve, reject) => {
      const processingTime = Math.random() * 2000 + 1000;
      
      setTimeout(() => {
        try {
          let result;
          
          switch (operation) {
            case 'txt-to-pdf':
              result = conversionService.convertTextToPdf(file);
              break;
            case 'txt-to-word':
              result = conversionService.convertTextToWord(file);
              break;
            case 'pdf-to-txt':
              result = conversionService.extractTextFromPdf(file);
              break;
            case 'ocr-extract':
              result = conversionService.performOCR(file);
              break;
            default:
              throw new Error('Unsupported text operation');
          }
          
          resolve({
            ...result,
            processingTime: `${(processingTime / 1000).toFixed(1)}s`
          });
        } catch (error) {
          reject(new Error('Text processing failed'));
        }
      }, processingTime);
    });
  },

  convertTextToPdf: (file) => {
    const reader = new FileReader();
    return new Promise((resolve) => {
      reader.onload = (e) => {
        const text = e.target.result;
        const content = `%PDF-1.4\nText to PDF Conversion\n\nOriginal File: ${file.name}\nContent:\n\n${text}\n\nConverted: ${new Date().toLocaleString()}`;
        const blob = new Blob([content], { type: 'application/pdf' });
        
        resolve({
          blob,
          filename: file.name.replace(/\.txt$/i, '.pdf'),
          originalSize: file.size,
          convertedSize: blob.size
        });
      };
      reader.readAsText(file);
    });
  },

  convertTextToWord: (file) => {
    const reader = new FileReader();
    return new Promise((resolve) => {
      reader.onload = (e) => {
        const text = e.target.result;
        const content = `Text to Word Conversion\n\nOriginal File: ${file.name}\n\n${text}\n\nConverted to Word format: ${new Date().toLocaleString()}`;
        const blob = new Blob([content], {
          type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
        });
        
        resolve({
          blob,
          filename: file.name.replace(/\.txt$/i, '.docx'),
          originalSize: file.size,
          convertedSize: blob.size
        });
      };
      reader.readAsText(file);
    });
  },

  extractTextFromPdf: (file) => {
    const content = `Extracted text from PDF: ${file.name}\n\nThis is simulated text extraction from your PDF document. In a real implementation, this would contain the actual text content extracted from the PDF file.\n\nDocument analysis:\n- Pages detected: Multiple\n- Text extraction: Successful\n- Images found: Yes\n- Tables detected: Yes\n\nExtracted content would appear here...\n\nExtraction completed: ${new Date().toLocaleString()}`;
    const blob = new Blob([content], { type: 'text/plain' });
    
    return {
      blob,
      filename: file.name.replace(/\.pdf$/i, '_extracted.txt'),
      originalSize: file.size,
      convertedSize: blob.size
    };
  },

  performOCR: (file) => {
    const content = `OCR Text Extraction from: ${file.name}\n\nThis is simulated OCR text extraction. In a real implementation, this would contain text recognized from the image or PDF using OCR technology.\n\nRecognized text would appear here...\n\nOCR Analysis:\n- Language detected: English\n- Confidence: 95%\n- Characters recognized: 1,247\n- Words found: 234\n\nProcessed: ${new Date().toLocaleString()}`;
    const blob = new Blob([content], { type: 'text/plain' });
    
    return {
      blob,
      filename: file.name.replace(/\.[^.]+$/, '_ocr.txt'),
      originalSize: file.size,
      convertedSize: blob.size
    };
  },

  // Archive processing methods
  processArchive: async (file, operation) => {
    return new Promise((resolve, reject) => {
      const processingTime = Math.random() * 2000 + 1500;
      
      setTimeout(() => {
        try {
          let result;
          
          switch (operation) {
            case 'create-zip':
              result = conversionService.createZipArchive(file);
              break;
            case 'extract-zip':
              result = conversionService.extractZipArchive(file);
              break;
            default:
              throw new Error('Unsupported archive operation');
          }
          
          resolve({
            ...result,
            processingTime: `${(processingTime / 1000).toFixed(1)}s`
          });
        } catch (error) {
          reject(new Error('Archive processing failed'));
        }
      }, processingTime);
    });
  },

  createZipArchive: (file) => {
    const content = `Archive created from: ${file.name}\n\nThis simulates creating a ZIP archive. In a real implementation, multiple files would be compressed into a single archive.\n\nArchive contents:\n- ${file.name}\n- Additional files...\n\nCreated: ${new Date().toLocaleString()}`;
    const blob = new Blob([content], { type: 'application/zip' });
    
    return {
      blob,
      filename: file.name.replace(/\.[^.]+$/, '.zip'),
      originalSize: file.size,
      convertedSize: blob.size
    };
  },

  extractZipArchive: (file) => {
    const content = `Extracted from archive: ${file.name}\n\nThis simulates extracting files from a ZIP archive. In a real implementation, this would contain the extracted files.\n\nExtracted files:\n- document1.txt\n- image1.jpg\n- data.csv\n\nExtracted: ${new Date().toLocaleString()}`;
    const blob = new Blob([content], { type: 'application/zip' });
    
    return {
      blob,
      filename: file.name.replace(/\.zip$/i, '_extracted.zip'),
      originalSize: file.size,
      convertedSize: blob.size
    };
  },

  // Validation and utility methods
  getSupportedFormats: () => {
    return {
      document: {
        input: ['pdf', 'doc', 'docx', 'xls', 'xlsx', 'ppt', 'pptx', 'txt'],
        output: ['pdf', 'docx', 'xlsx', 'pptx', 'txt']
      },
      image: {
        input: ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'webp'],
        output: ['jpg', 'png', 'gif', 'webp', 'pdf']
      },
      archive: {
        input: ['zip', 'rar'],
        output: ['zip']
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
      'txt-to-pdf': ['text/plain'],
      'txt-to-word': ['text/plain'],
      'pdf-to-txt': ['application/pdf'],
      'ocr-extract': ['image/jpeg', 'image/png', 'image/gif', 'image/bmp', 'image/webp', 'application/pdf'],
      'crop': ['image/jpeg', 'image/png', 'image/gif', 'image/bmp', 'image/webp'],
      'rotate': ['image/jpeg', 'image/png', 'image/gif', 'image/bmp', 'image/webp'],
      'watermark': ['image/jpeg', 'image/png', 'image/gif', 'image/bmp', 'image/webp'],
      'create-zip': ['image/jpeg', 'image/png', 'image/gif', 'image/bmp', 'image/webp', 'application/pdf', 'text/plain'],
      'extract-zip': ['application/zip', 'application/x-rar-compressed'],
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
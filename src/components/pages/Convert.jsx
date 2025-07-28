import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { conversionService } from "@/services/api/conversionService";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";

const Convert = () => {
  const [activeTab, setActiveTab] = useState('document');
  const [files, setFiles] = useState([]);
  const [converting, setConverting] = useState(false);
  const [convertedFiles, setConvertedFiles] = useState([]);
  const [dragActive, setDragActive] = useState(false);
  const [conversionType, setConversionType] = useState('pdf-to-word');
  const [imageOptions, setImageOptions] = useState({
    quality: 80,
    width: '',
    height: '',
    format: 'jpg',
    splitPages: false
  });
  const [conversionHistory, setConversionHistory] = useState([]);

  useEffect(() => {
    loadConversionHistory();
  }, []);

  const loadConversionHistory = () => {
    const history = conversionService.getConversionHistory();
    setConversionHistory(history.slice(0, 5)); // Show last 5 conversions
  };

  const conversionTabs = [
    { id: 'document', label: 'Document Converter', icon: 'FileText' },
    { id: 'image', label: 'Image Tools', icon: 'Image' },
    { id: 'batch', label: 'Batch Processing', icon: 'FolderOpen' },
    { id: 'history', label: 'History', icon: 'Clock' }
  ];

  const documentConversions = [
    { id: 'pdf-to-word', label: 'PDF to Word', from: 'PDF', to: 'DOCX', icon: 'FileText', color: 'red' },
    { id: 'pdf-to-excel', label: 'PDF to Excel', from: 'PDF', to: 'XLSX', icon: 'Table', color: 'green' },
    { id: 'pdf-to-ppt', label: 'PDF to PowerPoint', from: 'PDF', to: 'PPTX', icon: 'Presentation', color: 'orange' },
    { id: 'word-to-pdf', label: 'Word to PDF', from: 'DOCX', to: 'PDF', icon: 'FileText', color: 'blue' },
    { id: 'excel-to-pdf', label: 'Excel to PDF', from: 'XLSX', to: 'PDF', icon: 'Table', color: 'green' },
    { id: 'ppt-to-pdf', label: 'PowerPoint to PDF', from: 'PPTX', to: 'PDF', icon: 'Presentation', color: 'orange' },
    { id: 'word-to-excel', label: 'Word to Excel', from: 'DOCX', to: 'XLSX', icon: 'ArrowRight', color: 'purple' },
    { id: 'excel-to-word', label: 'Excel to Word', from: 'XLSX', to: 'DOCX', icon: 'ArrowRight', color: 'indigo' }
];

  const textTools = [
    { id: 'txt-to-pdf', label: 'Text to PDF', from: 'TXT', to: 'PDF', icon: 'FileText', color: 'red' },
    { id: 'txt-to-word', label: 'Text to Word', from: 'TXT', to: 'DOCX', icon: 'FileText', color: 'blue' },
    { id: 'pdf-to-txt', label: 'PDF to Text', from: 'PDF', to: 'TXT', icon: 'FileText', color: 'green' },
    { id: 'ocr-extract', label: 'OCR Text Extract', from: 'IMAGE', to: 'TXT', icon: 'FileSearch', color: 'purple' }
  ];
  const imageTools = [
    { id: 'compress', label: 'Compress Images', icon: 'Minimize2', color: 'blue' },
    { id: 'resize', label: 'Resize Images', icon: 'Square', color: 'green' },
    { id: 'convert', label: 'Convert Format', icon: 'RefreshCw', color: 'purple' },
    { id: 'split', label: 'Split Images', icon: 'Scissors', color: 'orange' },
    { id: 'pdf-to-images', label: 'PDF to Images', icon: 'Image', color: 'red' },
    { id: 'images-to-pdf', label: 'Images to PDF', icon: 'FileText', color: 'indigo' }
  ];

  const getAcceptedTypes = () => {
    const typeMap = {
      'pdf-to-word': '.pdf',
      'pdf-to-excel': '.pdf',
      'pdf-to-ppt': '.pdf',
      'word-to-pdf': '.doc,.docx',
      'excel-to-pdf': '.xls,.xlsx',
      'ppt-to-pdf': '.ppt,.pptx',
      'word-to-excel': '.doc,.docx',
      'excel-to-word': '.xls,.xlsx',
      'compress': '.jpg,.jpeg,.png,.gif,.bmp,.webp',
      'resize': '.jpg,.jpeg,.png,.gif,.bmp,.webp',
      'convert': '.jpg,.jpeg,.png,.gif,.bmp,.webp',
      'split': '.jpg,.jpeg,.png,.gif,.bmp',
      'pdf-to-images': '.pdf',
      'images-to-pdf': '.jpg,.jpeg,.png,.gif,.bmp,.webp'
};
    
    // Add new conversion types
    const extendedTypeMap = {
      ...typeMap,
      'txt-to-pdf': '.txt',
      'txt-to-word': '.txt',
      'pdf-to-txt': '.pdf',
      'ocr-extract': '.jpg,.jpeg,.png,.gif,.bmp,.webp,.pdf',
      'crop': '.jpg,.jpeg,.png,.gif,.bmp,.webp',
      'rotate': '.jpg,.jpeg,.png,.gif,.bmp,.webp',
      'watermark': '.jpg,.jpeg,.png,.gif,.bmp,.webp',
      'create-zip': '.jpg,.jpeg,.png,.gif,.bmp,.webp,.pdf,.doc,.docx,.txt',
      'extract-zip': '.zip,.rar'
    };
    
    return extendedTypeMap[conversionType] || '*';
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files) {
      handleFiles(Array.from(e.dataTransfer.files));
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files) {
      handleFiles(Array.from(e.target.files));
    }
  };

  const handleFiles = (selectedFiles) => {
    const validFiles = [];
    const errors = [];

    selectedFiles.forEach(file => {
      const validation = conversionService.validateFile(file, conversionType);
      if (validation.length === 0) {
        validFiles.push({
          Id: Date.now() + Math.random(),
          file,
          status: 'pending',
          progress: 0
        });
      } else {
        errors.push(`${file.name}: ${validation.join(', ')}`);
      }
    });

    if (validFiles.length > 0) {
      setFiles(prev => [...prev, ...validFiles]);
      toast.success(`${validFiles.length} file(s) added for conversion`);
    }

    if (errors.length > 0) {
      errors.forEach(error => toast.error(error));
    }
  };

  const handleConvert = async () => {
    if (files.length === 0) return;

    setConverting(true);
    const results = [];

    try {
      for (let i = 0; i < files.length; i++) {
        const fileItem = files[i];
        
        // Update progress
        setFiles(prev => prev.map(f => 
          f.Id === fileItem.Id ? { ...f, status: 'converting', progress: 0 } : f
));

        let result;
        
        // Determine processing type based on conversion
        if (activeTab === 'image' || ['crop', 'rotate', 'watermark'].includes(conversionType)) {
          result = await conversionService.processImage(
            fileItem.file, 
            conversionType, 
            imageOptions
          );
        } else if (['txt-to-pdf', 'txt-to-word', 'pdf-to-txt', 'ocr-extract'].includes(conversionType)) {
          result = await conversionService.processText(
            fileItem.file, 
            conversionType, 
            imageOptions
          );
        } else if (['create-zip', 'extract-zip'].includes(conversionType)) {
          result = await conversionService.processArchive(
            fileItem.file, 
            conversionType
          );
        } else {
          result = await conversionService.convertDocument(
            fileItem.file, 
            conversionType
          );
        }

        results.push({
          ...result,
          originalFile: fileItem.file,
          conversionType
        });

        // Update file status
        setFiles(prev => prev.map(f => 
          f.Id === fileItem.Id ? { ...f, status: 'completed', progress: 100 } : f
        ));

        // Save to history
        conversionService.saveToHistory({
          originalName: fileItem.file.name,
          convertedName: result.filename,
          originalSize: fileItem.file.size,
          convertedSize: result.blob.size,
          processingTime: result.processingTime,
          conversionType
        });
      }

      setConvertedFiles(results);
      loadConversionHistory();
      toast.success(`${results.length} file(s) converted successfully!`);
    } catch (error) {
      toast.error('Conversion failed. Please try again.');
      console.error('Conversion error:', error);
    } finally {
      setConverting(false);
    }
  };

  const handleDownload = (result) => {
    const url = URL.createObjectURL(result.blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = result.filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success('File downloaded successfully!');
  };

  const handleDownloadAll = () => {
    convertedFiles.forEach(result => {
      setTimeout(() => handleDownload(result), 100);
    });
  };

  const resetConverter = () => {
    setFiles([]);
    setConvertedFiles([]);
    setConverting(false);
  };

  const removeFile = (fileId) => {
    setFiles(prev => prev.filter(f => f.Id !== fileId));
  };

  const clearHistory = () => {
    conversionService.clearHistory();
    setConversionHistory([]);
  };

  const renderDocumentConverter = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {documentConversions.map((conversion) => (
          <motion.button
            key={conversion.id}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setConversionType(conversion.id)}
            className={`p-4 rounded-xl border-2 transition-all ${
              conversionType === conversion.id
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <div className={`w-10 h-10 bg-${conversion.color}-100 rounded-lg flex items-center justify-center mx-auto mb-2`}>
              <ApperIcon name={conversion.icon} className={`w-5 h-5 text-${conversion.color}-600`} />
            </div>
            <h3 className="font-medium text-sm text-gray-900">{conversion.label}</h3>
            <p className="text-xs text-gray-600">{conversion.from} → {conversion.to}</p>
          </motion.button>
        ))}
      </div>

      {renderFileUploadArea()}
      {renderFileList()}
      {renderConvertedFiles()}
    </div>
  );

  const renderImageTools = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {imageTools.map((tool) => (
          <motion.button
            key={tool.id}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setConversionType(tool.id)}
            className={`p-4 rounded-xl border-2 transition-all ${
              conversionType === tool.id
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <div className={`w-10 h-10 bg-${tool.color}-100 rounded-lg flex items-center justify-center mx-auto mb-2`}>
              <ApperIcon name={tool.icon} className={`w-5 h-5 text-${tool.color}-600`} />
            </div>
            <h3 className="font-medium text-sm text-gray-900">{tool.label}</h3>
          </motion.button>
        ))}
      </div>

      {(conversionType === 'resize' || conversionType === 'compress' || conversionType === 'convert') && (
        <div className="bg-gray-50 rounded-xl p-4">
          <h4 className="font-medium text-gray-900 mb-4">Options</h4>
          <div className="grid md:grid-cols-2 gap-4">
            {conversionType === 'resize' && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Width (px)</label>
                  <input
                    type="number"
                    value={imageOptions.width}
                    onChange={(e) => setImageOptions(prev => ({ ...prev, width: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Auto"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Height (px)</label>
                  <input
                    type="number"
                    value={imageOptions.height}
                    onChange={(e) => setImageOptions(prev => ({ ...prev, height: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Auto"
                  />
                </div>
              </>
            )}
            {conversionType === 'compress' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Quality (%)</label>
                <input
                  type="range"
                  min="10"
                  max="100"
                  value={imageOptions.quality}
                  onChange={(e) => setImageOptions(prev => ({ ...prev, quality: parseInt(e.target.value) }))}
                  className="w-full"
                />
                <div className="text-sm text-gray-600 mt-1">{imageOptions.quality}%</div>
              </div>
            )}
            {conversionType === 'convert' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Output Format</label>
                <select
                  value={imageOptions.format}
                  onChange={(e) => setImageOptions(prev => ({ ...prev, format: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="jpg">JPG</option>
                  <option value="png">PNG</option>
                  <option value="webp">WebP</option>
                  <option value="gif">GIF</option>
                </select>
              </div>
            )}
          </div>
        </div>
      )}

      {renderFileUploadArea()}
      {renderFileList()}
      {renderConvertedFiles()}
    </div>
  );

  const renderFileUploadArea = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`border-2 border-dashed rounded-xl p-8 text-center transition-all duration-300 ${
        dragActive 
          ? 'border-blue-500 bg-blue-50' 
          : 'border-gray-300 hover:border-blue-400 hover:bg-gray-50'
      }`}
      onDragEnter={handleDrag}
      onDragLeave={handleDrag}
      onDragOver={handleDrag}
      onDrop={handleDrop}
    >
      <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
        <ApperIcon name="Upload" className="w-6 h-6 text-blue-600" />
      </div>
      
      <h3 className="text-lg font-semibold text-gray-900 mb-2">
        Drop your files here
      </h3>
      <p className="text-gray-600 mb-4">
        or click to browse and select files
      </p>
      
      <input
        type="file"
        accept={getAcceptedTypes()}
        onChange={handleFileChange}
        className="hidden"
        id="file-upload"
        multiple={activeTab === 'batch' || activeTab === 'image'}
      />
<label htmlFor="file-upload" className="inline-block">
        <Button variant="primary" size="lg" className="cursor-pointer">
          <ApperIcon name="Plus" className="w-5 h-5 mr-2" />
          Select Files
        </Button>
      </label>
      
      <p className="text-sm text-gray-500 mt-4">
        Accepted: {getAcceptedTypes()} | Max size: 100MB per file
      </p>
    </motion.div>
  );

  const renderFileList = () => {
    if (files.length === 0) return null;

    return (
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h4 className="font-medium text-gray-900">Files ({files.length})</h4>
          <Button variant="ghost" size="sm" onClick={resetConverter}>
            <ApperIcon name="Trash2" className="w-4 h-4 mr-2" />
            Clear All
          </Button>
        </div>
        
        {files.map((fileItem) => (
          <motion.div
            key={fileItem.Id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
          >
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <ApperIcon name="FileText" className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h5 className="font-medium text-gray-900">{fileItem.file.name}</h5>
                <p className="text-sm text-gray-600">
                  {(fileItem.file.size / (1024 * 1024)).toFixed(2)} MB • {fileItem.status}
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              {fileItem.status === 'converting' && (
                <div className="w-6 h-6">
                  <ApperIcon name="Loader2" className="w-6 h-6 text-blue-600 animate-spin" />
                </div>
              )}
              {fileItem.status === 'completed' && (
                <div className="w-6 h-6">
                  <ApperIcon name="CheckCircle" className="w-6 h-6 text-green-600" />
                </div>
              )}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => removeFile(fileItem.Id)}
                disabled={fileItem.status === 'converting'}
              >
                <ApperIcon name="X" className="w-4 h-4" />
              </Button>
            </div>
          </motion.div>
        ))}
        
        <div className="text-center pt-4">
          <Button
            onClick={handleConvert}
            disabled={converting || files.length === 0}
            size="lg"
            className="min-w-[200px]"
          >
            {converting ? (
              <>
                <ApperIcon name="Loader2" className="w-5 h-5 mr-2 animate-spin" />
                Converting...
              </>
            ) : (
              <>
                <ApperIcon name="RefreshCw" className="w-5 h-5 mr-2" />
                Convert {files.length} File{files.length > 1 ? 's' : ''}
              </>
            )}
          </Button>
        </div>
      </div>
    );
  };

  const renderConvertedFiles = () => {
    if (convertedFiles.length === 0) return null;

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-4"
      >
        <div className="flex items-center justify-between">
          <h4 className="font-medium text-gray-900">Converted Files ({convertedFiles.length})</h4>
          {convertedFiles.length > 1 && (
            <Button onClick={handleDownloadAll} size="sm">
              <ApperIcon name="Download" className="w-4 h-4 mr-2" />
              Download All
            </Button>
          )}
        </div>
        
        {convertedFiles.map((result, index) => (
          <div key={index} className="flex items-center justify-between p-4 bg-green-50 border border-green-200 rounded-xl">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <ApperIcon name="CheckCircle" className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <h5 className="font-medium text-gray-900">{result.filename}</h5>
                <p className="text-sm text-gray-600">
                  {(result.blob.size / (1024 * 1024)).toFixed(2)} MB • Ready
                </p>
              </div>
            </div>
            
            <Button onClick={() => handleDownload(result)} size="sm">
              <ApperIcon name="Download" className="w-4 h-4 mr-2" />
              Download
            </Button>
          </div>
        ))}
      </motion.div>
    );
  };

  const renderHistory = () => (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h4 className="font-medium text-gray-900">Recent Conversions</h4>
        {conversionHistory.length > 0 && (
          <Button variant="ghost" size="sm" onClick={clearHistory}>
            <ApperIcon name="Trash2" className="w-4 h-4 mr-2" />
            Clear History
          </Button>
        )}
      </div>
      
      {conversionHistory.length === 0 ? (
        <div className="text-center py-8">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <ApperIcon name="Clock" className="w-8 h-8 text-gray-400" />
          </div>
          <p className="text-gray-600">No conversion history yet</p>
        </div>
      ) : (
        <div className="space-y-3">
          {conversionHistory.map((item) => (
            <div key={item.Id} className="p-4 bg-gray-50 rounded-xl">
              <div className="flex items-center justify-between">
                <div>
                  <h5 className="font-medium text-gray-900">{item.originalName}</h5>
                  <p className="text-sm text-gray-600">
                    {item.conversionType} • {new Date(item.timestamp).toLocaleDateString()}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">{item.processingTime}</p>
                  <p className="text-sm text-gray-600">{item.status}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Document Conversion Suite
          </h1>
          <p className="text-xl text-gray-600">
            Convert documents, process images, and manage files with professional tools
          </p>
        </motion.div>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Tabs */}
          <div className="border-b border-gray-200">
            <div className="flex overflow-x-auto">
              {conversionTabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <ApperIcon name={tab.icon} className="w-5 h-5" />
                  <span>{tab.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Tab Content */}
          <div className="p-8">
            {activeTab === 'document' && renderDocumentConverter()}
            {activeTab === 'image' && renderImageTools()}
            {activeTab === 'batch' && renderDocumentConverter()}
            {activeTab === 'history' && renderHistory()}
          </div>
        </div>

        {/* Features */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-12 grid md:grid-cols-4 gap-6"
        >
          <div className="text-center p-6">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3">
              <ApperIcon name="Shield" className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">100% Secure</h3>
            <p className="text-sm text-gray-600">
              Files processed locally in your browser
            </p>
          </div>
          
          <div className="text-center p-6">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-3">
              <ApperIcon name="Zap" className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Lightning Fast</h3>
            <p className="text-sm text-gray-600">
              Convert files in seconds
            </p>
          </div>
          
          <div className="text-center p-6">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-3">
              <ApperIcon name="Star" className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">High Quality</h3>
            <p className="text-sm text-gray-600">
              Preserve formatting and layout
            </p>
          </div>

          <div className="text-center p-6">
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-3">
              <ApperIcon name="Layers" className="w-6 h-6 text-orange-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Batch Processing</h3>
            <p className="text-sm text-gray-600">
              Convert multiple files at once
            </p>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Convert;
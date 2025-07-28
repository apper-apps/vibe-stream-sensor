import { motion } from "framer-motion";
import { useState } from "react";
import { toast } from "react-toastify";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";
import { conversionService } from "@/services/api/conversionService";

const Convert = () => {
  const [file, setFile] = useState(null);
  const [converting, setConverting] = useState(false);
  const [convertedFile, setConvertedFile] = useState(null);
  const [dragActive, setDragActive] = useState(false);

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
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = (selectedFile) => {
    if (selectedFile.type !== 'application/pdf') {
      toast.error('Please select a PDF file');
      return;
    }
    
    if (selectedFile.size > 100 * 1024 * 1024) { // 100MB limit
      toast.error('File size must be less than 100MB');
      return;
    }
    
    setFile(selectedFile);
    setConvertedFile(null);
    toast.success('PDF file ready for conversion');
  };

  const handleConvert = async () => {
    if (!file) return;
    
    setConverting(true);
    try {
      const result = await conversionService.convertPdfToWord(file);
      setConvertedFile(result);
      toast.success('Conversion completed successfully!');
    } catch (error) {
      toast.error('Conversion failed. Please try again.');
      console.error('Conversion error:', error);
    } finally {
      setConverting(false);
    }
  };

  const handleDownload = () => {
    if (convertedFile) {
      const url = URL.createObjectURL(convertedFile.blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = convertedFile.filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      toast.success('File downloaded successfully!');
    }
  };

  const resetConverter = () => {
    setFile(null);
    setConvertedFile(null);
    setConverting(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            PDF to Word Converter
          </h1>
          <p className="text-xl text-gray-600">
            Convert your PDF documents to editable Word files instantly
          </p>
        </motion.div>

        <div className="bg-white rounded-2xl shadow-xl p-8">
          {!file ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className={`border-2 border-dashed rounded-xl p-12 text-center transition-all duration-300 ${
                dragActive 
                  ? 'border-blue-500 bg-blue-50' 
                  : 'border-gray-300 hover:border-blue-400 hover:bg-gray-50'
              }`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <ApperIcon name="Upload" className="w-8 h-8 text-blue-600" />
              </div>
              
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Drop your PDF here
              </h3>
              <p className="text-gray-600 mb-6">
                or click to browse and select a file
              </p>
              
              <input
                type="file"
                accept=".pdf,application/pdf"
                onChange={handleFileChange}
                className="hidden"
                id="file-upload"
              />
              <label htmlFor="file-upload">
                <Button variant="upload" size="lg" className="cursor-pointer">
                  <ApperIcon name="FileText" className="w-5 h-5 mr-2" />
                  Select PDF File
                </Button>
              </label>
              
              <p className="text-sm text-gray-500 mt-4">
                Maximum file size: 100MB
              </p>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                    <ApperIcon name="FileText" className="w-6 h-6 text-red-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{file.name}</h3>
                    <p className="text-sm text-gray-600">
                      {(file.size / (1024 * 1024)).toFixed(2)} MB
                    </p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={resetConverter}
                  disabled={converting}
                >
                  <ApperIcon name="X" className="w-4 h-4" />
                </Button>
              </div>

              {!convertedFile ? (
                <div className="text-center">
                  <Button
                    onClick={handleConvert}
                    disabled={converting}
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
                        Convert to Word
                      </>
                    )}
                  </Button>
                  
                  {converting && (
                    <div className="mt-4">
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full animate-pulse w-1/2"></div>
                      </div>
                      <p className="text-sm text-gray-600 mt-2">
                        Processing your document...
                      </p>
                    </div>
                  )}
                </div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center space-y-4"
                >
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                    <ApperIcon name="CheckCircle" className="w-8 h-8 text-green-600" />
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      Conversion Complete!
                    </h3>
                    <p className="text-gray-600">
                      Your Word document is ready for download
                    </p>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button onClick={handleDownload} size="lg">
                      <ApperIcon name="Download" className="w-5 h-5 mr-2" />
                      Download Word File
                    </Button>
                    <Button variant="secondary" onClick={resetConverter} size="lg">
                      <ApperIcon name="Plus" className="w-5 h-5 mr-2" />
                      Convert Another File
                    </Button>
                  </div>
                </motion.div>
              )}
            </motion.div>
          )}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-12 grid md:grid-cols-3 gap-6"
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
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Convert;
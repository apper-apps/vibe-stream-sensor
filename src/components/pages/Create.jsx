import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Button from "@/components/atoms/Button";
import Input from "@/components/atoms/Input";
import ApperIcon from "@/components/ApperIcon";
import { toast } from "react-toastify";
import { postService } from "@/services/api/postService";

const Create = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    caption: "",
    mediaType: "image",
  });
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [isUploading, setIsUploading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      toast.success("Media selected! 📸");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.caption.trim()) {
      toast.error("Please add a caption");
      return;
    }

    setIsUploading(true);
    
    try {
      const newPost = {
        userId: 1, // Current user
        mediaUrl: previewUrl || `https://picsum.photos/400/400?random=${Date.now()}`,
        mediaType: formData.mediaType,
        caption: formData.caption,
        likes: 0,
        comments: [],
        createdAt: new Date().toISOString()
      };

      await postService.create(newPost);
      toast.success("Post created successfully! 🎉");
      
      // Reset form
      setFormData({ caption: "", mediaType: "image" });
      setSelectedFile(null);
      setPreviewUrl("");
      
      // Navigate to home
      navigate("/");
      
    } catch (error) {
      toast.error("Failed to create post. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="min-h-screen bg-gray-50"
    >
      <div className="max-w-md mx-auto">
        <div className="bg-white p-6">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold gradient-text font-display mb-2">
              Create Post
            </h1>
            <p className="text-gray-600">
              Share something amazing with your followers
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Media Upload */}
            <div className="space-y-4">
              <label className="block text-sm font-medium text-gray-700">
                Media
              </label>
              
              <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-primary-400 transition-colors duration-200">
                {previewUrl ? (
                  <div className="relative">
                    <img 
                      src={previewUrl} 
                      alt="Preview" 
                      className="w-full h-64 object-cover rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        setPreviewUrl("");
                        setSelectedFile(null);
                      }}
                      className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors duration-200"
                    >
                      <ApperIcon name="X" className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <div>
                    <div className="w-16 h-16 bg-gradient-to-br from-primary-100 to-secondary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <ApperIcon name="Upload" className="w-8 h-8 text-primary-500" />
                    </div>
                    <p className="text-gray-600 mb-2">
                      Click to upload or drag and drop
                    </p>
                    <p className="text-sm text-gray-500">
                      PNG, JPG, GIF up to 10MB
                    </p>
                  </div>
                )}
                
                <input
                  type="file"
                  accept="image/*,video/*"
                  onChange={handleFileSelect}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
              </div>
            </div>

            {/* Caption */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Caption
              </label>
              <textarea
                name="caption"
                value={formData.caption}
                onChange={handleInputChange}
                placeholder="Write a caption..."
                rows="4"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20 resize-none transition-all duration-200"
              />
            </div>

            {/* Media Type */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Media Type
              </label>
              <div className="flex space-x-4">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="mediaType"
                    value="image"
                    checked={formData.mediaType === "image"}
                    onChange={handleInputChange}
                    className="mr-2 text-primary-500 focus:ring-primary-500"
                  />
                  <span className="text-sm text-gray-700">Image</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="mediaType"
                    value="video"
                    checked={formData.mediaType === "video"}
                    onChange={handleInputChange}
                    className="mr-2 text-primary-500 focus:ring-primary-500"
                  />
                  <span className="text-sm text-gray-700">Video</span>
                </label>
              </div>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              variant="primary"
              size="lg"
              className="w-full"
              disabled={isUploading}
            >
              {isUploading ? (
                <>
                  <ApperIcon name="Loader2" className="w-5 h-5 mr-2 animate-spin" />
                  Creating Post...
                </>
              ) : (
                <>
                  <ApperIcon name="Send" className="w-5 h-5 mr-2" />
                  Share Post
                </>
              )}
            </Button>
          </form>
        </div>
      </div>
    </motion.div>
  );
};

export default Create;
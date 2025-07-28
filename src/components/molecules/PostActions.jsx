import { useState } from "react";
import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";
import { formatNumber } from "@/utils/formatters";

const PostActions = ({ post, onLike, onComment, onShare }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleLike = () => {
    setIsAnimating(true);
    setIsLiked(!isLiked);
    setTimeout(() => setIsAnimating(false), 300);
    onLike && onLike(post.Id);
  };

  return (
    <div className="flex items-center justify-between px-4 py-3">
      <div className="flex items-center space-x-4">
        {/* Like Button */}
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={handleLike}
          className="flex items-center space-x-2 group"
        >
          <motion.div
            animate={isAnimating ? { scale: [1, 1.3, 1] } : {}}
            transition={{ duration: 0.3 }}
            className={`p-2 rounded-full transition-colors duration-200 ${
              isLiked 
                ? "bg-red-50 text-red-500" 
                : "hover:bg-gray-100 text-gray-700"
            }`}
          >
            <ApperIcon 
              name={isLiked ? "Heart" : "Heart"} 
              className={`w-6 h-6 transition-all duration-200 ${
                isLiked ? "fill-current text-red-500" : "group-hover:text-red-500"
              }`}
            />
          </motion.div>
          <span className="text-sm font-medium text-gray-700">
            {formatNumber(post.likes + (isLiked ? 1 : 0))}
          </span>
        </motion.button>

        {/* Comment Button */}
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={() => onComment && onComment(post.Id)}
          className="flex items-center space-x-2 group"
        >
          <div className="p-2 rounded-full hover:bg-gray-100 transition-colors duration-200">
            <ApperIcon 
              name="MessageCircle" 
              className="w-6 h-6 text-gray-700 group-hover:text-blue-500 transition-colors duration-200"
            />
          </div>
          <span className="text-sm font-medium text-gray-700">
            {formatNumber(post.comments?.length || 0)}
          </span>
        </motion.button>

        {/* Share Button */}
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={() => onShare && onShare(post.Id)}
          className="flex items-center space-x-2 group"
        >
          <div className="p-2 rounded-full hover:bg-gray-100 transition-colors duration-200">
            <ApperIcon 
              name="Share" 
              className="w-6 h-6 text-gray-700 group-hover:text-green-500 transition-colors duration-200"
            />
          </div>
        </motion.button>
      </div>

      {/* Bookmark Button */}
      <motion.button
        whileTap={{ scale: 0.9 }}
        className="p-2 rounded-full hover:bg-gray-100 transition-colors duration-200 group"
      >
        <ApperIcon 
          name="Bookmark" 
          className="w-6 h-6 text-gray-700 group-hover:text-primary-500 transition-colors duration-200"
        />
      </motion.button>
    </div>
  );
};

export default PostActions;
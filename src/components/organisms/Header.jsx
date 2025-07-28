import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";

const Header = () => {
  return (
    <motion.header 
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="bg-white border-b border-gray-200 sticky top-0 z-40"
    >
      <div className="max-w-md mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center">
              <ApperIcon name="Zap" className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-xl font-bold gradient-text font-display">
              Vibe Stream
            </h1>
          </Link>
          
          <div className="flex items-center space-x-4">
            <motion.button
              whileTap={{ scale: 0.9 }}
              className="p-2 rounded-full hover:bg-gray-100 transition-colors duration-200"
            >
              <ApperIcon name="Heart" className="w-6 h-6 text-gray-700" />
            </motion.button>
            
            <motion.button
              whileTap={{ scale: 0.9 }}
              className="p-2 rounded-full hover:bg-gray-100 transition-colors duration-200"
            >
              <ApperIcon name="MessageCircle" className="w-6 h-6 text-gray-700" />
            </motion.button>
          </div>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;
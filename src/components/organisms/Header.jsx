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
<Link to="/" className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <ApperIcon name="FileText" className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-xl font-bold text-gray-800 font-display">
              ProConverter.online
            </h1>
          </Link>
          
<nav className="hidden md:flex items-center space-x-6">
            <Link to="/" className="text-gray-600 hover:text-gray-900 transition-colors duration-200">
              Home
            </Link>
            <Link to="/convert" className="text-gray-600 hover:text-gray-900 transition-colors duration-200">
              Convert
            </Link>
            <Link to="/about" className="text-gray-600 hover:text-gray-900 transition-colors duration-200">
              About
            </Link>
            <Link to="/contact" className="text-gray-600 hover:text-gray-900 transition-colors duration-200">
              Contact
            </Link>
          </nav>
          
          <div className="md:hidden">
            <motion.button
              whileTap={{ scale: 0.9 }}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
            >
              <ApperIcon name="Menu" className="w-6 h-6 text-gray-700" />
            </motion.button>
          </div>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;
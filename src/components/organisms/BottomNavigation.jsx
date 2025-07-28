import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";

const BottomNavigation = () => {
  const location = useLocation();

  const navItems = [
    { path: "/", icon: "Home", label: "Home" },
    { path: "/search", icon: "Search", label: "Search" },
    { path: "/create", icon: "Plus", label: "Create", isSpecial: true },
    { path: "/profile/1", icon: "User", label: "Profile" },
  ];

  return (
    <motion.nav 
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50 md:hidden"
    >
      <div className="max-w-md mx-auto px-4 py-2">
        <div className="flex items-center justify-around">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            
            if (item.isSpecial) {
              return (
                <Link key={item.path} to={item.path}>
                  <motion.div
                    whileTap={{ scale: 0.9 }}
                    className="w-12 h-12 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full flex items-center justify-center shadow-lg"
                  >
                    <ApperIcon name={item.icon} className="w-6 h-6 text-white" />
                  </motion.div>
                </Link>
              );
            }
            
            return (
              <Link key={item.path} to={item.path}>
                <motion.div
                  whileTap={{ scale: 0.9 }}
                  className={`flex flex-col items-center space-y-1 p-2 rounded-lg transition-colors duration-200 ${
                    isActive 
                      ? "text-primary-500" 
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  <ApperIcon 
                    name={item.icon} 
                    className={`w-6 h-6 ${
                      isActive ? "text-primary-500" : "text-gray-600"
                    }`}
                  />
                  <span className="text-xs font-medium">{item.label}</span>
                </motion.div>
              </Link>
            );
          })}
        </div>
      </div>
    </motion.nav>
  );
};

export default BottomNavigation;
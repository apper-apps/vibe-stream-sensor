import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";

const Empty = ({ 
  title = "Nothing here yet", 
  description = "Be the first to share something amazing!",
  actionText = "Create Post",
  onAction,
  icon = "Image"
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center p-8 text-center"
    >
      <motion.div
        initial={{ scale: 0, rotate: -10 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ delay: 0.1, type: "spring", stiffness: 200 }}
        className="w-20 h-20 bg-gradient-to-br from-primary-100 to-secondary-100 rounded-full flex items-center justify-center mb-6"
      >
        <ApperIcon name={icon} className="w-10 h-10 text-primary-500" />
      </motion.div>
      
      <h3 className="text-xl font-semibold text-gray-900 mb-2 font-display">
        {title}
      </h3>
      
      <p className="text-gray-600 mb-8 max-w-sm">
        {description}
      </p>
      
      {onAction && (
        <Button onClick={onAction} variant="primary" size="lg">
          <ApperIcon name="Plus" className="w-5 h-5 mr-2" />
          {actionText}
        </Button>
      )}
    </motion.div>
  );
};

export default Empty;
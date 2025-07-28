import { motion } from "framer-motion";
import Avatar from "@/components/atoms/Avatar";

const StoryItem = ({ user, isViewed = false, onClick }) => {
  return (
    <motion.button
      whileTap={{ scale: 0.95 }}
      onClick={() => onClick && onClick(user.Id)}
      className="flex flex-col items-center space-y-1 flex-shrink-0"
    >
      <div className={`p-0.5 rounded-full ${
        isViewed 
          ? "bg-gray-300" 
          : "bg-gradient-to-tr from-primary-500 via-accent-500 to-secondary-500"
      }`}>
        <div className="p-0.5 bg-white rounded-full">
          <Avatar 
            src={user.avatarUrl} 
            alt={user.displayName}
            fallback={user.displayName?.[0]?.toUpperCase()}
            size="lg"
          />
        </div>
      </div>
      <span className="text-xs text-gray-700 max-w-[60px] truncate">
        {user.username}
      </span>
    </motion.button>
  );
};

export default StoryItem;
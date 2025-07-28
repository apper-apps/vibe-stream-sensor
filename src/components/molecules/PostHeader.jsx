import { motion } from "framer-motion";
import Avatar from "@/components/atoms/Avatar";
import ApperIcon from "@/components/ApperIcon";
import { formatTimeAgo } from "@/utils/formatters";

const PostHeader = ({ user, createdAt, onMoreOptions }) => {
  return (
    <div className="flex items-center justify-between p-4">
      <div className="flex items-center space-x-3">
        <Avatar 
          src={user.avatarUrl} 
          alt={user.displayName}
          fallback={user.displayName?.[0]?.toUpperCase()}
          size="md"
        />
        <div>
          <h4 className="font-semibold text-gray-900 text-sm">
            {user.displayName}
          </h4>
          <p className="text-xs text-gray-500">
            @{user.username} • {formatTimeAgo(createdAt)}
          </p>
        </div>
      </div>
      
      <motion.button
        whileTap={{ scale: 0.9 }}
        onClick={onMoreOptions}
        className="p-2 rounded-full hover:bg-gray-100 transition-colors duration-200"
      >
        <ApperIcon name="MoreHorizontal" className="w-5 h-5 text-gray-600" />
      </motion.button>
    </div>
  );
};

export default PostHeader;
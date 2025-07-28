import { motion } from "framer-motion";
import PostHeader from "@/components/molecules/PostHeader";
import PostActions from "@/components/molecules/PostActions";
import { toast } from "react-toastify";

const PostCard = ({ post, user }) => {
  const handleLike = (postId) => {
    toast.success("Post liked! ❤️");
  };

  const handleComment = (postId) => {
    toast.info("Comments coming soon! 💬");
  };

  const handleShare = (postId) => {
    toast.success("Post shared! 🚀");
  };

  const handleMoreOptions = () => {
    toast.info("Options menu coming soon! ⚙️");
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden"
    >
      <PostHeader 
        user={user}
        createdAt={post.createdAt}
        onMoreOptions={handleMoreOptions}
      />
      
      {/* Post Media */}
      <div className="relative aspect-square bg-gradient-to-br from-gray-100 to-gray-200">
        {post.mediaUrl ? (
          <img 
            src={post.mediaUrl} 
            alt="Post content"
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <div className="text-gray-400 text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-primary-100 to-secondary-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <span className="text-2xl">📸</span>
              </div>
              <p className="text-sm">Media content</p>
            </div>
          </div>
        )}
      </div>
      
      <PostActions 
        post={post}
        onLike={handleLike}
        onComment={handleComment}
        onShare={handleShare}
      />
      
      {/* Post Caption */}
      {post.caption && (
        <div className="px-4 pb-4">
          <p className="text-gray-900 text-sm">
            <span className="font-semibold">{user.username}</span>{" "}
            {post.caption}
          </p>
        </div>
      )}
    </motion.article>
  );
};

export default PostCard;
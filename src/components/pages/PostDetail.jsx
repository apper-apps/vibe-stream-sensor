import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import PostCard from "@/components/organisms/PostCard";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import ApperIcon from "@/components/ApperIcon";
import { postService } from "@/services/api/postService";
import { userService } from "@/services/api/userService";

const PostDetail = () => {
  const { postId } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadData = async () => {
    try {
      setLoading(true);
      setError("");
      
      const postData = await postService.getById(parseInt(postId));
      const userData = await userService.getById(postData.userId);
      
      setPost(postData);
      setUser(userData);
    } catch (err) {
      setError("Failed to load post");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [postId]);

  if (loading) return <Loading />;
  if (error) return <Error message={error} onRetry={loadData} />;
  if (!post || !user) return <Error message="Post not found" />;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gray-50"
    >
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="bg-white p-4 border-b border-gray-100 flex items-center space-x-4">
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => navigate(-1)}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors duration-200"
          >
            <ApperIcon name="ArrowLeft" className="w-5 h-5 text-gray-700" />
          </motion.button>
          <h1 className="text-lg font-semibold text-gray-900">Post</h1>
        </div>

        {/* Post Content */}
        <div className="p-4">
          <PostCard post={post} user={user} />
        </div>
      </div>
    </motion.div>
  );
};

export default PostDetail;
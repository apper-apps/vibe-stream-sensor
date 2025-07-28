import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import Avatar from "@/components/atoms/Avatar";
import Button from "@/components/atoms/Button";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import Empty from "@/components/ui/Empty";
import ApperIcon from "@/components/ApperIcon";
import { userService } from "@/services/api/userService";
import { postService } from "@/services/api/postService";
import { formatNumber } from "@/utils/formatters";
import { toast } from "react-toastify";

const Profile = () => {
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState("posts");

  const loadData = async () => {
    try {
      setLoading(true);
      setError("");
      
      const [userData, postsData] = await Promise.all([
        userService.getById(parseInt(userId)),
        postService.getAll()
      ]);
      
      setUser(userData);
      // Filter posts by user
      const userPosts = postsData.filter(post => post.userId === parseInt(userId));
      setPosts(userPosts);
    } catch (err) {
      setError("Failed to load profile");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [userId]);

  const handleFollow = () => {
    toast.success("Followed user! ✨");
  };

  const handleMessage = () => {
    toast.info("Messaging coming soon! 💬");
  };

  if (loading) return <Loading />;
  if (error) return <Error message={error} onRetry={loadData} />;
  if (!user) return <Error message="User not found" />;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gray-50"
    >
      <div className="max-w-md mx-auto">
        {/* Profile Header */}
        <div className="bg-white p-6 border-b border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <Avatar 
                src={user.avatarUrl}
                alt={user.displayName}
                fallback={user.displayName?.[0]?.toUpperCase()}
                size="2xl"
              />
              <div>
                <h1 className="text-xl font-bold text-gray-900 font-display">
                  {user.displayName}
                </h1>
                <p className="text-gray-600">@{user.username}</p>
              </div>
            </div>
          </div>

          {/* Bio */}
          {user.bio && (
            <p className="text-gray-700 mb-4">{user.bio}</p>
          )}

          {/* Stats */}
          <div className="flex justify-around mb-6">
            <div className="text-center">
              <div className="text-xl font-bold text-gray-900">
                {formatNumber(posts.length)}
              </div>
              <div className="text-sm text-gray-600">Posts</div>
            </div>
            <div className="text-center">
              <div className="text-xl font-bold text-gray-900">
                {formatNumber(user.followers)}
              </div>
              <div className="text-sm text-gray-600">Followers</div>
            </div>
            <div className="text-center">
              <div className="text-xl font-bold text-gray-900">
                {formatNumber(user.following)}
              </div>
              <div className="text-sm text-gray-600">Following</div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-3">
            <Button
              onClick={handleFollow}
              variant="primary"
              className="flex-1"
            >
              <ApperIcon name="UserPlus" className="w-4 h-4 mr-2" />
              Follow
            </Button>
            <Button
              onClick={handleMessage}
              variant="secondary"
              className="flex-1"
            >
              <ApperIcon name="MessageCircle" className="w-4 h-4 mr-2" />
              Message
            </Button>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white border-b border-gray-100">
          <div className="flex">
            {["posts", "tagged"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 py-3 text-sm font-medium transition-colors duration-200 ${
                  activeTab === tab
                    ? "text-primary-600 border-b-2 border-primary-600"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                <div className="flex items-center justify-center space-x-1">
                  <ApperIcon 
                    name={tab === "posts" ? "Grid3X3" : "Tag"} 
                    className="w-4 h-4" 
                  />
                  <span className="capitalize">{tab}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="p-4">
          {activeTab === "posts" && (
            posts.length === 0 ? (
              <Empty 
                title="No posts yet"
                description={`${user.displayName} hasn't shared any posts yet.`}
                icon="Image"
              />
            ) : (
              <div className="grid grid-cols-3 gap-1">
                {posts.map((post, index) => (
                  <motion.div
                    key={post.Id}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.05 }}
                    whileHover={{ scale: 1.05 }}
                    className="aspect-square bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg overflow-hidden cursor-pointer"
                    onClick={() => toast.info("Post details coming soon!")}
                  >
                    {post.mediaUrl ? (
                      <img 
                        src={post.mediaUrl} 
                        alt="Post"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <ApperIcon name="Image" className="w-8 h-8 text-gray-400" />
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            )
          )}

          {activeTab === "tagged" && (
            <Empty 
              title="No tagged posts"
              description="Posts where this user is tagged will appear here."
              icon="Tag"
            />
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default Profile;
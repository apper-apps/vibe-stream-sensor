import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import SearchBar from "@/components/molecules/SearchBar";
import Avatar from "@/components/atoms/Avatar";
import Button from "@/components/atoms/Button";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import Empty from "@/components/ui/Empty";
import ApperIcon from "@/components/ApperIcon";
import { userService } from "@/services/api/userService";
import { postService } from "@/services/api/postService";
import { toast } from "react-toastify";

const Search = () => {
  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("trending");

  const loadData = async () => {
    try {
      setLoading(true);
      setError("");
      
      const [usersData, postsData] = await Promise.all([
        userService.getAll(),
        postService.getAll()
      ]);
      
      setUsers(usersData);
      setPosts(postsData);
    } catch (err) {
      setError("Failed to load search data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleSearch = (query) => {
    setSearchQuery(query);
    if (query.trim()) {
      toast.info(`Searching for "${query}"...`);
    }
  };

  const handleFollow = (userId) => {
    toast.success("Followed user! ✨");
  };

  const filteredUsers = users.filter(user => 
    user.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.displayName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const trendingHashtags = [
    "#vibecheck", "#aesthetic", "#mood", "#photography", "#art",
    "#sunset", "#coffee", "#style", "#travel", "#music"
  ];

  if (loading) return <Loading />;
  if (error) return <Error message={error} onRetry={loadData} />;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gray-50"
    >
      <div className="max-w-md mx-auto">
        <div className="bg-white p-4 border-b border-gray-100">
          <SearchBar onSearch={handleSearch} />
          
          {/* Tabs */}
          <div className="flex space-x-4 mt-4">
            {["trending", "people"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  activeTab === tab
                    ? "bg-gradient-to-r from-primary-500 to-secondary-500 text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>
        </div>

        <div className="p-4">
          {activeTab === "trending" && (
            <div className="space-y-6">
              {/* Trending Hashtags */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3 font-display">
                  Trending Hashtags
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {trendingHashtags.map((hashtag, index) => (
                    <motion.button
                      key={hashtag}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => toast.info(`Exploring ${hashtag}...`)}
                      className="p-4 bg-white rounded-xl border border-gray-100 hover:border-primary-200 transition-all duration-200 text-left group"
                    >
                      <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 bg-gradient-to-br from-primary-100 to-secondary-100 rounded-full flex items-center justify-center">
                          <ApperIcon name="Hash" className="w-4 h-4 text-primary-500" />
                        </div>
                        <span className="font-medium text-gray-900 group-hover:text-primary-600 transition-colors duration-200">
                          {hashtag}
                        </span>
                      </div>
                      <p className="text-sm text-gray-500 mt-2">
                        {Math.floor(Math.random() * 50) + 10}k posts
                      </p>
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Trending Posts Grid */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3 font-display">
                  Trending Posts
                </h3>
                <div className="grid grid-cols-3 gap-1">
                  {posts.slice(0, 9).map((post, index) => (
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
                          alt="Trending post"
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
              </div>
            </div>
          )}

          {activeTab === "people" && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 font-display">
                {searchQuery ? `Results for "${searchQuery}"` : "Suggested for you"}
              </h3>
              
              {(searchQuery ? filteredUsers : users).length === 0 ? (
                <Empty 
                  title="No users found" 
                  description="Try searching with different keywords"
                  icon="Users"
                />
              ) : (
                (searchQuery ? filteredUsers : users).map((user, index) => (
                  <motion.div
                    key={user.Id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="flex items-center justify-between p-4 bg-white rounded-xl border border-gray-100"
                  >
                    <div className="flex items-center space-x-3">
                      <Avatar 
                        src={user.avatarUrl}
                        alt={user.displayName}
                        fallback={user.displayName?.[0]?.toUpperCase()}
                        size="lg"
                      />
                      <div>
                        <h4 className="font-semibold text-gray-900">
                          {user.displayName}
                        </h4>
                        <p className="text-sm text-gray-500">
                          @{user.username}
                        </p>
                        <p className="text-xs text-gray-400">
                          {user.followers} followers
                        </p>
                      </div>
                    </div>
                    
                    <Button
                      onClick={() => handleFollow(user.Id)}
                      variant="primary"
                      size="sm"
                    >
                      Follow
                    </Button>
                  </motion.div>
                ))
              )}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default Search;
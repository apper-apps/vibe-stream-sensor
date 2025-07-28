import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import PostCard from "@/components/organisms/PostCard";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import Empty from "@/components/ui/Empty";
import { postService } from "@/services/api/postService";
import { userService } from "@/services/api/userService";

const PostFeed = () => {
  const [posts, setPosts] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadData = async () => {
    try {
      setLoading(true);
      setError("");
      
      const [postsData, usersData] = await Promise.all([
        postService.getAll(),
        userService.getAll()
      ]);
      
      setPosts(postsData);
      setUsers(usersData);
    } catch (err) {
      setError("Failed to load posts. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  if (loading) return <Loading />;
  if (error) return <Error message={error} onRetry={loadData} />;
  if (posts.length === 0) return <Empty title="No posts yet" description="Start following people to see their posts in your feed!" />;

  return (
    <div className="space-y-6">
      {posts.map((post) => {
        const user = users.find(u => u.Id === post.userId);
        return (
          <motion.div
            key={post.Id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <PostCard post={post} user={user} />
          </motion.div>
        );
      })}
    </div>
  );
};

export default PostFeed;
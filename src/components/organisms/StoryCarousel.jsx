import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import StoryItem from "@/components/molecules/StoryItem";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import { userService } from "@/services/api/userService";
import { toast } from "react-toastify";

const StoryCarousel = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadUsers = async () => {
    try {
      setLoading(true);
      setError("");
      
      const usersData = await userService.getAll();
      setUsers(usersData.slice(0, 8)); // Show first 8 users for stories
    } catch (err) {
      setError("Failed to load stories");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const handleStoryClick = (userId) => {
    toast.info("Story viewer coming soon! 📱");
  };

  if (loading) {
    return (
      <div className="flex space-x-4 p-4 overflow-hidden">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.1 }}
            className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-gray-200 to-gray-300 rounded-full"
          />
        ))}
      </div>
    );
  }

  if (error) return null;

  return (
    <div className="bg-white border-b border-gray-100">
      <div className="overflow-x-auto story-scroll">
        <div className="flex space-x-4 p-4 min-w-max">
          {users.map((user, index) => (
            <motion.div
              key={user.Id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <StoryItem 
                user={user}
                isViewed={Math.random() > 0.5}
                onClick={handleStoryClick}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StoryCarousel;
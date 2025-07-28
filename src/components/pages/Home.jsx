import { motion } from "framer-motion";
import StoryCarousel from "@/components/organisms/StoryCarousel";
import PostFeed from "@/components/organisms/PostFeed";

const Home = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gray-50"
    >
      <div className="max-w-md mx-auto">
        <StoryCarousel />
        <div className="p-4">
          <PostFeed />
        </div>
      </div>
    </motion.div>
  );
};

export default Home;
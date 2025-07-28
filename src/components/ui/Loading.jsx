import { motion } from "framer-motion";

const Loading = () => {
  return (
    <div className="space-y-6 p-4">
      {/* Story skeleton */}
      <div className="flex space-x-4 overflow-hidden">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="flex-shrink-0">
            <motion.div
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-16 h-16 bg-gradient-to-br from-gray-200 to-gray-300 rounded-full"
            />
          </div>
        ))}
      </div>

      {/* Post skeletons */}
      {[...Array(3)].map((_, i) => (
        <div key={i} className="bg-white rounded-xl shadow-sm border border-gray-100">
          {/* Header skeleton */}
          <div className="flex items-center p-4 space-x-3">
            <motion.div
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.1 }}
              className="w-10 h-10 bg-gradient-to-br from-gray-200 to-gray-300 rounded-full"
            />
            <div className="flex-1 space-y-2">
              <motion.div
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.1 + 0.1 }}
                className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-24"
              />
              <motion.div
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.1 + 0.2 }}
                className="h-3 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-16"
              />
            </div>
          </div>

          {/* Image skeleton */}
          <motion.div
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.1 + 0.3 }}
            className="w-full h-64 bg-gradient-to-br from-gray-200 to-gray-300"
          />

          {/* Content skeleton */}
          <div className="p-4 space-y-3">
            <div className="flex space-x-4">
              {[...Array(3)].map((_, j) => (
                <motion.div
                  key={j}
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.1 + j * 0.1 }}
                  className="w-6 h-6 bg-gradient-to-br from-gray-200 to-gray-300 rounded"
                />
              ))}
            </div>
            <motion.div
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.1 + 0.4 }}
              className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-32"
            />
            <motion.div
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.1 + 0.5 }}
              className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-48"
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default Loading;
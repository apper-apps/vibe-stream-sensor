import { Outlet, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import BottomNavigation from "@/components/organisms/BottomNavigation";
import Header from "@/components/organisms/Header";

const Layout = () => {
  const location = useLocation();
  const isCreatePage = location.pathname === "/create";

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <Header />
      
      {/* Main Content */}
      <main className="flex-1 pb-16 md:pb-4">
        <motion.div
          key={location.pathname}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="h-full"
        >
          <Outlet />
        </motion.div>
      </main>
      
      {/* Bottom Navigation */}
      <BottomNavigation />
    </div>
  );
};

export default Layout;
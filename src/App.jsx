import { Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Layout from "@/components/Layout";
import Home from "@/components/pages/Home";
import Search from "@/components/pages/Search";
import Create from "@/components/pages/Create";
import Profile from "@/components/pages/Profile";
import PostDetail from "@/components/pages/PostDetail";

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="search" element={<Search />} />
          <Route path="create" element={<Create />} />
          <Route path="profile/:userId" element={<Profile />} />
          <Route path="post/:postId" element={<PostDetail />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
      
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        className="z-[9999]"
      />
    </div>
  );
}

export default App;
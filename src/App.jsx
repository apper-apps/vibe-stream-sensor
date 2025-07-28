import 'react-toastify/dist/ReactToastify.css'
import { Navigate, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import About from "@/components/pages/About";
import Contact from "@/components/pages/Contact";
import Convert from "@/components/pages/Convert";
import React from "react";
import "@/index.css";
import Layout from "@/components/Layout";
import Home from "@/components/pages/Home";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
          <Route path="convert" element={<Convert />} />
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
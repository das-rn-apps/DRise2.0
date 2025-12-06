import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./routes/Home";
import Courses from "./routes/Courses";
import CourseDetails from "./routes/CourseDetails";
import WatchVideo from "./routes/WatchVideo";
import Quiz from "./routes/Quiz";
import Dashboard from "./routes/Dashboard";
import Login from "./routes/Login";
import Signup from "./routes/Signup";
import Profile from "./routes/Profile";

import { useAuthStore } from "./store/authStore";

const App: React.FC = () => {
  const token = useAuthStore((s: { token: any }) => s.token);

  return (
    <div className="min-h-screen flex flex-col bg-linear-to-br from-indigo-50 via-white to-pink-50">
      {/* Navbar */}
      <div className="shadow-md bg-white/80 backdrop-blur-md sticky top-0 z-50">
        <Navbar />
      </div>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-10 flex-1">
        <div className="w-full rounded-2xl">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/courses/:slug" element={<CourseDetails />} />
            <Route
              path="/watch/:lessonId"
              element={token ? <WatchVideo /> : <Navigate to="/login" />}
            />
            <Route
              path="/quiz/:quizId"
              element={token ? <Quiz /> : <Navigate to="/login" />}
            />
            <Route
              path="/dashboard"
              element={token ? <Dashboard /> : <Navigate to="/login" />}
            />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route
              path="/profile"
              element={token ? <Profile /> : <Navigate to="/login" />}
            />
          </Routes>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default App;

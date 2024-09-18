import React, { useState } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import { AuthProvider } from "./AuthContext";
import { Navbar } from "./components/layout/Navbar";
import { Challenges } from "./pages/Challenges";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { Profile } from "./pages/Profile";
import { Register } from "./pages/Register";
import { Scoreboard } from "./pages/Scoreboard";
import { Teams } from "./pages/Teams";
import { Users } from "./pages/Users";

const App: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle("dark");
  };

  return (
    <AuthProvider>
      <div className={isDarkMode ? "dark" : ""}>
        <div className="min-h-screen bg-zinc-100 dark:bg-zinc-900">
          <Router>
            <Navbar toggleDarkMode={toggleDarkMode} isDarkMode={isDarkMode} />
            <div className="container mx-auto p-4">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/users" element={<Users />} />
                <Route path="/teams" element={<Teams />} />
                <Route path="/challenges" element={<Challenges />} />
                <Route path="/scoreboard" element={<Scoreboard />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
              </Routes>
            </div>
          </Router>
        </div>
      </div>
    </AuthProvider>
  );
};

export default App;

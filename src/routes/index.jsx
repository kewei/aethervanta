import { Routes, Route, useLocation } from 'react-router-dom';
import React, { useState } from 'react';
import Sidebar from '@/components/Sidebar';
import Dashboard from '@/pages/Dashboard';
import Spectrum from "@/pages/Spectrum";
import Navigation from "@/pages/Navigation";
import Anomalies from "@/pages/Anomalies";
import Analysis from "@/pages/Analysis";
import Settings from "@/pages/Settings";
import Header from "@/components/Header";


const AppRoutes = () => {
  const [constellations, setConstellations] = useState(["GPS", "Galileo", "BeiDou", "GLONASS"]);

  return (
    <div className="flex flex-col h-screen">
      <Header />

      <div className="flex flex-1 overflow-hidden">
        <Sidebar
          selectedConstellations={constellations[0]}
          onToggle={setConstellations}
        />
        <main className="flex-1 overflow-y-auto p-1">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/spectrum" element={<Spectrum />} />
            <Route path="/navigation" element={<Navigation />} />
            <Route path="/anomalies" element={<Anomalies />} />
            <Route path="/analysis" element={<Analysis />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default AppRoutes;

import { Link } from "react-router-dom";
import ConstellationSelector from "@/components/ConstellationSelector";
import SdrConfigurations from "@/components/SdrConfigurations";

export default function Sidebar({ selectedConstellations, onToggle }) {
  return (
    <aside className="hidden lg:flex flex-col w-50 border-r h-full px-4 py-6 bg-white">
      <div className="mt-2">
        <SdrConfigurations />
      </div>
      <hr className="mt-4 mb-2"/>
      <div className="mt-2">
        <ConstellationSelector />
      </div>
      <hr className="mt-2 mb-2"/>
      <nav className="flex flex-col gap-2 text-sm mt-2">
        <Link to="/" className="hover:text-blue-600">Dashboard</Link>
        <Link to="/spectrum" className="hover:text-blue-600">Spectrum</Link>
        <Link to="/navigation" className="hover:text-blue-600">Navigation</Link>
        <Link to="/anomalies" className="hover:text-blue-600">Anomalies</Link>
        <Link to="/analysis" className="hover:text-blue-600">File Analysis</Link>
      </nav>
    </aside>
  );
}
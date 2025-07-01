import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react"; // from lucide-react (used by shadcn/ui)
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="w-full border-b bg-white shadow-sm px-4 sm:px-6 py-3">
      <div className="flex items-center justify-between">
        {/* Left: Logo + Desktop Nav */}
        <div className="flex items-center gap-4">
          <Link
            to="/"
            className="text-xl font-bold text-blue-600 tracking-tight whitespace-nowrap"
          >
            🛰️ AetherVanda
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-4 text-sm font-medium text-gray-700 ml-6">
            <Link to="/dashboard" className="hover:text-blue-600">
              Dashboard
            </Link>
            <DropdownMenu>
                <DropdownMenuTrigger className="hover:text-blue-600">
                    GNSS Types
                    <svg
                    className="h-4 w-4 ml-1 inline-block"
                    // className={`h-5 w-5 ${
                    //   isDropdownOpen ? "rotate-180" : ""
                    //     }`}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19 9l-7 7-7-7"
                    ></path>
                    </svg>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuItem><Link to="/GPS">GPS</Link></DropdownMenuItem>
                    <DropdownMenuItem><Link to="/Galileo">Galileo</Link></DropdownMenuItem>
                    <DropdownMenuItem><Link to="/BeiDou">BeiDou</Link></DropdownMenuItem>
                    <DropdownMenuItem><Link to="/GLONASS">GLONASS</Link></DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
            <Link to="/reports" className="hover:text-blue-600">
              Reports
            </Link>
          </nav>
        </div>

        {/* Right: Auth Buttons */}
        <div className="flex items-center gap-2">
          {/* Mobile menu toggle */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="lg:hidden p-2 rounded-md hover:bg-gray-100"
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>

          {/* Desktop Auth Buttons */}
          <div className="hidden lg:flex items-center gap-2">
            <Button variant="outline" size="sm" asChild>
              <Link to="/login">Login</Link>
            </Button>
            <Button variant="default" size="sm" asChild>
              <Link to="/signup">Sign up</Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Nav Menu */}
      {menuOpen && (
        <div className="lg:hidden mt-2 flex flex-col gap-2 text-sm font-medium text-gray-700">
          <Link
            to="/dashboard"
            onClick={() => setMenuOpen(false)}
            className="hover:text-blue-600"
          >
            Dashboard
          </Link>
          <div className="relative w-full">
          <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <button
                        className="block text-left hover:text-blue-600 flex items-center"
                    >
                    GNSS Types
                    <svg
                    className="h-4 w-4 ml-1 inline-block"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19 9l-7 7-7-7"
                        ></path>
                        </svg>
                    </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent side="bottom" align="start" className="w-40 mt-1">
                    <DropdownMenuItem><Link to="/GPS">GPS</Link></DropdownMenuItem>
                    <DropdownMenuItem><Link to="/Galileo">Galileo</Link></DropdownMenuItem>
                    <DropdownMenuItem><Link to="/BeiDou">BeiDou</Link></DropdownMenuItem>
                    <DropdownMenuItem><Link to="/GLONASS">GLONASS</Link></DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
            </div>
          <Link
            to="/reports"
            onClick={() => setMenuOpen(false)}
            className="hover:text-blue-600"
          >
            Reports
          </Link>

          {/* Mobile auth buttons */}
          <div className="mt-2 flex gap-2">
            <Button variant="outline" size="sm" asChild className="flex-1">
              <Link to="/login">Login</Link>
            </Button>
            <Button variant="default" size="sm" asChild className="flex-1">
              <Link to="/signup">Sign up</Link>
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}

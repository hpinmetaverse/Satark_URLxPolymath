import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Menu } from "lucide-react"; // Hamburger icon

const Topbar = () => {
  return (
    <nav
      className="flex items-center justify-between px-6 py-3 sticky top-0 
      bg-white/80 backdrop-blur-md shadow-md rounded-2xl w-full max-w-screen-xl mx-auto mt-2 z-20"
    >
      {/* Logo Section */}
      <div className="flex items-center gap-2">
        <Link to="/" className="flex items-center gap-2">
          <img
            src="/vite.svg"
            className="h-10 w-10 rounded-lg"
            alt="Satark Logo"
          />
          <span className="text-xl font-semibold text-gray-800 hidden sm:block">
            SATARK
          </span>
        </Link>
      </div>

      {/* Right Section (Desktop) */}
      <div className="hidden md:flex items-center gap-4">
        <Link to="/uploadpcap">
          <Button
            className="bg-gray-300 hover:bg-white/100 
             text-gray-800 font-medium 
             rounded-xl px-5 py-2.5 shadow-md backdrop-blur-sm transition 
             duration-200"
          >
            Upload Pcap
          </Button>
        </Link>
        {/* Contact Button */}
        <Link to="/contact">
          <Button
            className="bg-gray-300 hover:bg-white/100 
             text-gray-800 font-medium 
             rounded-xl px-5 py-2.5 shadow-md backdrop-blur-sm transition 
             duration-200"
          >
            Contact
          </Button>
        </Link>
      </div>

      {/* Mobile Menu */}
      <div className="md:hidden">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full hover:bg-gray-200"
            >
              <Menu className="h-6 w-6 text-gray-800" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="w-48 rounded-xl shadow-md"
          >
            {/* Main Actions */}
            <DropdownMenuItem asChild>
              <Link to="/uploadpcap">Upload Pcap</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link to="/contact">Contact</Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  );
};

export default Topbar;

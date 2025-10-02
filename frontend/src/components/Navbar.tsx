import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

const Topbar = () => {
  return (
    <nav
      className="flex items-center justify-between px-6 py-3 sticky top-0 
      bg-white/80 backdrop-blur-md shadow-md rounded-2xl w-full max-w-screen-xl mx-auto mt-2 z-20"
    >
      {/* Logo Section */}
      <div className="flex items-center gap-2">
        <img
          src="/vite.svg"
          className="h-10 w-10 rounded-lg"
          alt="AutoInsight Logo"
        />
        <span className="text-xl font-semibold text-gray-800 hidden sm:block">
          SATARK
        </span>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              className="bg-gray-300 hover:bg-white/100 
             text-gray-800 font-medium 
             rounded-xl px-5 py-2.5 shadow-md backdrop-blur-sm transition 
             duration-200"
            >
              EXPORT
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="w-40 rounded-xl shadow-md"
          >
            <DropdownMenuLabel>Format</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>CSV</DropdownMenuItem>
            <DropdownMenuItem>JSON</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  );
};

export default Topbar;

const FooterBar = () => {
  return (
    <nav
      className="flex items-center justify-center px-6 py-6 
      bg-white/80 backdrop-blur-md shadow-md rounded-2xl w-full 
      max-w-screen-xl mx-auto mt-4 z-20"
    >
      <div className="flex flex-col items-center justify-center space-y-3">
        {/* Logo above the text */}
        <img
          src="/image.png"
          className="h-20 w-25 rounded-lg"
          alt="SATARK Logo"
        />

        {/* Text below the logo */}
        <p className="text-sm text-gray-700 text-center">
          &copy; {new Date().getFullYear()} SatarkURL. All rights reserved.
        </p>
      </div>
    </nav>
  );
};

export default FooterBar;

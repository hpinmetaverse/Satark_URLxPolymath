const Footer = () => {
  return (
    <nav
      className="flex items-center justify-center px-6 py-3 
      bg-white/80 backdrop-blur-md shadow-md rounded-2xl w-full 
      max-w-screen-xl mx-auto mt-4 z-20"
    >
      <p className="text-sm text-gray-700">
        &copy; {new Date().getFullYear()} SATARK. All rights reserved.
      </p>
    </nav>
  );
};

export default Footer;

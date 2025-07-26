const Footer = () => {
  return (
    <footer className="bg-gray-100 dark:bg-gray-900 py-4 mt-auto">
      <div className="max-w-7xl mx-auto text-center">
        <p className="text-gray-600 dark:text-gray-400">
          &copy; {new Date().getFullYear()} Task Manager. All rights reserved.
        </p>
        <div className="mt-2 space-x-4">
          <a href="#" className="text-blue-500 hover:underline">Privacy Policy</a>
          <a href="#" className="text-blue-500 hover:underline">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
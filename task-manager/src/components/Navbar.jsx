import { NavLink } from 'react-router-dom';
import { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';

const Navbar = () => {
  const { toggleTheme, isDark } = useContext(ThemeContext);

  return (
    <nav className="bg-white dark:bg-gray-900 shadow-md p-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex space-x-4">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `px-3 py-2 rounded-md ${isActive ? 'bg-blue-500 text-white' : 'text-gray-700 dark:text-gray-300'}`
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/tasks"
            className={({ isActive }) =>
              `px-3 py-2 rounded-md ${isActive ? 'bg-blue-500 text-white' : 'text-gray-700 dark:text-gray-300'}`
            }
          >
            Tasks
          </NavLink>
        </div>
        <button
          onClick={toggleTheme}
          className="p-2 rounded-full bg-gray-200 dark:bg-gray-700"
        >
          {isDark ? '☀️' : '🌙'}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
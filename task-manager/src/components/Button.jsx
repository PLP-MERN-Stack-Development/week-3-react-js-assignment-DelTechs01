import PropTypes from 'prop-types';

const Button = ({ variant = 'primary', children, className, ...props }) => {
  const variants = {
    primary: 'bg-blue-500 hover:bg-blue-600 text-white',
    secondary: 'bg-gray-500 hover:bg-gray-600 text-white',
    danger: 'bg-red-500 hover:bg-red-600 text-white',
  };

  return (
    <button
      className={`px-4 py-2 rounded-md transition-colors duration-200 ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

Button.propTypes = {
  variant: PropTypes.oneOf(['primary', 'secondary', 'danger']),
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

export default Button;
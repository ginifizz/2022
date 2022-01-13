interface ButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  className?: string;
}

const Button = ({ onClick, children, className = '' }: ButtonProps): JSX.Element => (
  <button
    onClick={onClick}
    className={`text-xs md:text-base font-bold px-4 py-3 rounded-sm bg-cyan-600 transition-all text-white uppercase hover:bg-cyan-300 hover:text-cyan-900 ${className}`}
  >
    {children}
  </button>
);

export default Button;

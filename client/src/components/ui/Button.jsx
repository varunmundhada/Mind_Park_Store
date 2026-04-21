export const Button = ({
  children,
  className = "",
  variant = "primary",
  type = "button",
  ...props
}) => {
  const variants = {
    primary: "bg-gradient-to-r from-deepTeal to-sage text-white hover:shadow-glow hover:scale-105 font-semibold",
    secondary: "bg-white text-ink hover:bg-warmCream border-2 border-sage/30 font-medium",
    soft: "bg-gradient-to-br from-softPeach to-warmCream text-ink hover:shadow-soft font-medium",
    coral: "bg-gradient-to-r from-coral to-terracotta text-white hover:shadow-medium hover:scale-105 font-semibold",
  };

  return (
    <button
      type={type}
      className={`inline-flex items-center justify-center rounded-full px-6 py-3.5 text-sm transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:scale-100 ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

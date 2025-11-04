import clsx from 'clsx'

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  className = '',
  icon: Icon,
  ...props
}) {
  const baseStyles = 'font-medium rounded-lg transition-colors duration-200 flex items-center justify-center gap-2'
  
  const variants = {
    primary: 'bg-primary hover:bg-primary-dark text-white',
    secondary: 'bg-secondary hover:bg-secondary-light text-white',
    outline: 'border-2 border-primary text-primary hover:bg-primary hover:text-white',
    ghost: 'text-gray-700 hover:bg-gray-100',
    danger: 'bg-red-500 hover:bg-red-600 text-white',
  }
  
  const sizes = {
    sm: 'px-3 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  }
  
  return (
    <button
      className={clsx(
        baseStyles,
        variants[variant],
        sizes[size],
        fullWidth && 'w-full',
        className
      )}
      {...props}
    >
      {Icon && <Icon className="w-5 h-5" />}
      {children}
    </button>
  )
}

import { forwardRef } from 'react'
import clsx from 'clsx'

const Input = forwardRef(function Input({
  label,
  error,
  className = '',
  ...props
}, ref) {
  return (
    <div className={clsx('flex flex-col gap-2', className)}>
      {label && (
        <label className="font-medium text-gray-700">
          {label}
        </label>
      )}
      <input
        ref={ref}
        className={clsx(
          'input-field',
          error && 'border-red-500 focus:ring-red-500'
        )}
        {...props}
      />
      {error && (
        <p className="text-sm text-red-500">{error}</p>
      )}
    </div>
  )
})

export default Input

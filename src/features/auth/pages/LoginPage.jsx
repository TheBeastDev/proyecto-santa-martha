import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux' // Import useSelector
import { loginUser, selectAuthStatus, selectAuthError } from '@features/auth/authSlice' // Import loginUser, status, error
import Input from '@shared/components/Input'
import Button from '@shared/components/Button'
import { LogIn } from 'lucide-react'

export default function LoginPage() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const authStatus = useSelector(selectAuthStatus); // Get auth status
  const authError = useSelector(selectAuthError); // Get auth error
  
  const { register, handleSubmit, formState: { errors } } = useForm()

  const onSubmit = async (data) => {
    try {
      const resultAction = await dispatch(loginUser(data)).unwrap();
      // Redirect based on role (assuming role is part of the user object in resultAction)
      if (resultAction.user.role === 'ADMIN') { // Use 'ADMIN' as per backend enum
        navigate('/admin');
      } else {
        navigate('/');
      }
    } catch (error) {
      // Error handled by extraReducers, can display a generic message or specific error from state
    }
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-primary rounded-full mb-4">
              <LogIn className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900">
              Iniciar Sesión
            </h2>
            <p className="text-gray-600 mt-2">
              Bienvenido de vuelta a Santa Martha
            </p>
          </div>

          {authStatus === 'failed' && authError && ( // Display error from Redux state
            <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm">
              {authError.message || 'Credenciales inválidas'}
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <Input
              label="Correo Electrónico"
              type="email"
              autoComplete="email"
              placeholder="tu@email.com"
              error={errors.email?.message}
              {...register('email', {
                required: 'El correo es requerido',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Correo electrónico inválido'
                }
              })}
            />

            <Input
              label="Contraseña"
              type="password"
              autoComplete="current-password"
              placeholder="••••••••"
              error={errors.password?.message}
              {...register('password', {
                required: 'La contraseña es requerida',
                minLength: {
                  value: 6,
                  message: 'La contraseña debe tener al menos 6 caracteres'
                }
              })}
            />

            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="rounded border-gray-300 text-primary focus:ring-primary"
                />
                <span className="ml-2 text-sm text-gray-600">
                  Recordarme
                </span>
              </label>
              <Link
                to="/forgot-password"
                className="text-sm text-primary hover:text-primary-dark"
              >
                ¿Olvidaste tu contraseña?
              </Link>
            </div>

            <Button type="submit" fullWidth size="lg" disabled={authStatus === 'loading'}>
              {authStatus === 'loading' ? 'Iniciando Sesión...' : 'Iniciar Sesión'}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              ¿No tienes una cuenta?{' '}
              <Link
                to="/registro"
                className="font-medium text-primary hover:text-primary-dark"
              >
                Regístrate aquí
              </Link>
            </p>
          </div>

          <div className="mt-6 border-t border-gray-200 pt-6">
            <p className="text-xs text-gray-500 text-center">
              <strong>Demo:</strong> Usa cualquier email/contraseña. 
              Para admin, usa un email con "admin" (ej: admin@test.com)
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

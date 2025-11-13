import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux' // Import useSelector
import { registerUser, selectAuthStatus, selectAuthError } from '@features/auth/authSlice' // Import registerUser, status, error
import Input from '@shared/components/Input'
import Button from '@shared/components/Button'
import { UserPlus } from 'lucide-react'

export default function RegisterPage() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const authStatus = useSelector(selectAuthStatus); // Get auth status
  const authError = useSelector(selectAuthError); // Get auth error
  
  const { register: registerField, handleSubmit, watch, formState: { errors } } = useForm()
  const password = watch('password')

  const onSubmit = async (data) => {
    try {
      await dispatch(registerUser(data)).unwrap();
      navigate('/login'); // Redirect to login after successful registration
    } catch (error) {
      console.error('Registration failed:', error);
    }
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-primary rounded-full mb-4">
              <UserPlus className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900">
              Crear Cuenta
            </h2>
            <p className="text-gray-600 mt-2">
              Únete a la familia Santa Martha
            </p>
          </div>

          {authStatus === 'failed' && authError && ( // Display error from Redux state
            <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm">
              {authError.message || 'Error al registrar usuario'}
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <Input
              label="Nombre Completo"
              type="text"
              placeholder="Juan Pérez"
              error={errors.name?.message}
              {...registerField('name', {
                required: 'El nombre es requerido',
                minLength: {
                  value: 3,
                  message: 'El nombre debe tener al menos 3 caracteres'
                }
              })}
            />

            <Input
              label="Correo Electrónico"
              type="email"
              placeholder="tu@email.com"
              error={errors.email?.message}
              {...registerField('email', {
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
              placeholder="••••••••"
              error={errors.password?.message}
              {...registerField('password', {
                required: 'La contraseña es requerida',
                minLength: {
                  value: 6,
                  message: 'La contraseña debe tener al menos 6 caracteres'
                }
              })}
            />

            <Input
              label="Confirmar Contraseña"
              type="password"
              placeholder="••••••••"
              error={errors.confirmPassword?.message}
              {...registerField('confirmPassword', {
                required: 'Por favor confirma tu contraseña',
                validate: value =>
                  value === password || 'Las contraseñas no coinciden'
              })}
            />

            <div className="flex items-start">
              <input
                type="checkbox"
                className="mt-1 rounded border-gray-300 text-primary focus:ring-primary"
                {...registerField('terms', {
                  required: 'Debes aceptar los términos y condiciones'
                })}
              />
              <label className="ml-2 text-sm text-gray-600">
                Acepto los{' '}
                <Link to="/terms" className="text-primary hover:text-primary-dark">
                  términos y condiciones
                </Link>
                {' '}y la{' '}
                <Link to="/privacy" className="text-primary hover:text-primary-dark">
                  política de privacidad
                </Link>
              </label>
            </div>
            {errors.terms && (
              <p className="text-sm text-red-500">{errors.terms.message}</p>
            )}

            <Button type="submit" fullWidth size="lg" disabled={authStatus === 'loading'}>
              {authStatus === 'loading' ? 'Registrando...' : 'Crear Cuenta'}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              ¿Ya tienes una cuenta?{' '}
              <Link
                to="/login"
                className="font-medium text-primary hover:text-primary-dark"
              >
                Inicia sesión aquí
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
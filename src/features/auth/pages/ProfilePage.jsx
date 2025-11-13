import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';
import { User, Key, Save } from 'lucide-react';
import Input from '@shared/components/Input';
import Button from '@shared/components/Button';
import {
  fetchUserProfile,
  updateUserProfile,
  changeUserPassword,
  selectAuthUser,
  selectAuthStatus,
  selectAuthError,
  selectIsAuthenticated,
} from '@features/auth/authSlice'; // Assuming these are in authSlice

export default function ProfilePage() {
  const dispatch = useDispatch();
  const user = useSelector(selectAuthUser);
  const authStatus = useSelector(selectAuthStatus);
  const authError = useSelector(selectAuthError);
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [passwordError, setPasswordError] = useState(null); // New state for password error

  const {
    register: registerProfile,
    handleSubmit: handleSubmitProfile,
    reset: resetProfile,
    formState: { errors: errorsProfile },
  } = useForm({
    defaultValues: {
      name: user?.name || '',
      address: user?.address || '',
      phone: user?.phone || '',
    },
  });

  const {
    register: registerPassword,
    handleSubmit: handleSubmitPassword,
    reset: resetPassword,
    getValues, // Import getValues
    formState: { errors: errorsPassword },
  } = useForm();

  useEffect(() => {
    if (user) {
      resetProfile({
        name: user.name || '',
        address: user.address || '',
        phone: user.phone || '',
      });
    }
  }, [user, resetProfile]);

  const onSubmitProfile = async (data) => {
    try {
      await dispatch(updateUserProfile(data)).unwrap();
      setIsEditingProfile(false);
      // Optionally show a success message
    } catch (error) {
      console.error('Failed to update profile:', error);
      // Handle error
    }
  };

  const onSubmitPassword = async (data) => {
    try {
      setPasswordError(null); // Clear previous error
      await dispatch(changeUserPassword(data)).unwrap();
      resetPassword();
      setShowPasswordForm(false);
      // Optionally show a success message
    } catch (error) {
      console.error('Failed to change password:', error);
      setPasswordError(error.message || 'Error al cambiar la contraseña'); // Set password error
    }
  };

  if (authStatus === 'loading' && !user) {
    return <div className="text-center py-12">Cargando perfil...</div>;
  }

  if (authStatus === 'failed' && !user) {
    return <div className="text-center py-12 text-red-500">Error: {authError}</div>;
  }

  if (!user) {
    return <div className="text-center py-12">No se encontró el perfil del usuario.</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Mi Perfil</h1>

        {/* Profile Information */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
              <User className="w-6 h-6" /> Información Personal
            </h2>
            <Button variant="outline" onClick={() => setIsEditingProfile(!isEditingProfile)}>
              {isEditingProfile ? 'Cancelar' : 'Editar Perfil'}
            </Button>
          </div>

          <form onSubmit={handleSubmitProfile(onSubmitProfile)} className="space-y-6">
            <Input
              label="Nombre"
              {...registerProfile('name', { required: 'El nombre es requerido' })}
              error={errorsProfile.name?.message}
              disabled={!isEditingProfile}
            />
            <Input
              label="Correo Electrónico"
              type="email"
              value={user.email}
              disabled
            />
            <Input
              label="Dirección"
              {...registerProfile('address')}
              error={errorsProfile.address?.message}
              disabled={!isEditingProfile}
            />
            <Input
              label="Teléfono"
              {...registerProfile('phone')}
              error={errorsProfile.phone?.message}
              disabled={!isEditingProfile}
            />

            {isEditingProfile && (
              <Button type="submit" icon={Save}>
                Guardar Cambios
              </Button>
            )}
          </form>
        </div>

        {/* Change Password */}
        <div className="bg-white rounded-lg shadow-md p-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
              <Key className="w-6 h-6" /> Cambiar Contraseña
            </h2>
            <Button variant="outline" onClick={() => setShowPasswordForm(!showPasswordForm)}>
              {showPasswordForm ? 'Cancelar' : 'Cambiar Contraseña'}
            </Button>
          </div>

          {showPasswordForm && (
            <form onSubmit={handleSubmitPassword(onSubmitPassword)} className="space-y-6">
              {passwordError && ( // Display password error
                <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm">
                  {passwordError}
                </div>
              )}
              <Input
                label="Contraseña Actual"
                type="password"
                {...registerPassword('oldPassword', { required: 'La contraseña actual es requerida' })}
                error={errorsPassword.oldPassword?.message}
              />
              <Input
                label="Nueva Contraseña"
                type="password"
                {...registerPassword('newPassword', {
                  required: 'La nueva contraseña es requerida',
                  minLength: {
                    value: 6,
                    message: 'La contraseña debe tener al menos 6 caracteres',
                  },
                })}
                error={errorsPassword.newPassword?.message}
              />
              <Input
                label="Confirmar Nueva Contraseña"
                type="password"
                {...registerPassword('confirmPassword', {
                  required: 'Confirma tu nueva contraseña',
                  validate: (value) =>
                    value === getValues('newPassword') || 'Las contraseñas no coinciden',
                })}
                error={errorsPassword.confirmPassword?.message}
              />
              <Button type="submit" icon={Save}>
                Actualizar Contraseña
              </Button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

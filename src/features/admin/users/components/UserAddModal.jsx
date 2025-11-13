import { useForm } from 'react-hook-form';
import { X } from 'lucide-react';
import Button from '@shared/components/Button';
import Input from '@shared/components/Input';

export default function UserAddModal({ onClose, onSave }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    onSave(data);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Añadir Nuevo Usuario</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
            <X className="w-6 h-6 text-gray-700" />
          </button>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <Input
            label="Nombre Completo"
            autoComplete="name"
            {...register('name', { required: 'El nombre es requerido' })}
            error={errors.name?.message}
          />
          <Input
            label="Correo Electrónico"
            type="email"
            autoComplete="email"
            {...register('email', {
              required: 'El correo es requerido',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Correo electrónico inválido',
              },
            })}
            error={errors.email?.message}
          />
          <Input
            label="Contraseña"
            type="password"
            autoComplete="new-password"
            {...register('password', {
              required: 'La contraseña es requerida',
              minLength: { value: 6, message: 'La contraseña debe tener al menos 6 caracteres' },
            })}
            error={errors.password?.message}
          />
           <div>
            <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-2">
              Rol
            </label>
            <select
              id="role"
              {...register('role', { required: 'El rol es requerido' })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="USER">USER</option>
              <option value="ADMIN">ADMIN</option>
            </select>
          </div>
          <div className="flex justify-end gap-4 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button type="submit">
              Crear Usuario
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

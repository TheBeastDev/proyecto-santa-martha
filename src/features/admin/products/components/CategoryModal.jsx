import { useForm } from 'react-hook-form';
import { X } from 'lucide-react';
import Input from '@shared/components/Input';
import Button from '@shared/components/Button';

export default function CategoryModal({ category, onClose, onSave }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: category || {},
  });

  const onSubmit = (data) => {
    onSave(data);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">
            {category ? 'Editar Categoría' : 'Añadir Categoría'}
          </h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
            <X className="w-6 h-6 text-gray-700" />
          </button>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <Input
            label="Nombre"
            {...register('name', { required: 'El nombre es requerido' })}
            error={errors.name?.message}
          />
          <Input
            label="Descripción"
            {...register('description')}
            error={errors.description?.message}
          />
          <Input
            label="URL de la Imagen"
            {...register('image')}
            error={errors.image?.message}
          />
          <div className="flex justify-end gap-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button type="submit">
              {category ? 'Guardar Cambios' : 'Añadir Categoría'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

import { useForm } from 'react-hook-form';
import { X } from 'lucide-react';
import Input from '@shared/components/Input';
import Button from '@shared/components/Button';

export default function ProductModal({ product, categories, onClose, onSave }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: product ? { ...product, images: product.images?.join(', ') } : {},
  });

  const onSubmit = (data) => {
    const imagesArray = data.images 
      ? data.images.split(',').map(url => url.trim()).filter(url => url) 
      : [];
    onSave({ ...data, images: imagesArray });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-2xl">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">
            {product ? 'Editar Producto' : 'Añadir Producto'}
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
            {...register('description', { required: 'La descripción es requerida' })}
            error={errors.description?.message}
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input
              label="Precio"
              type="number"
              step="0.01"
              {...register('price', { required: 'El precio es requerido', valueAsNumber: true })}
              error={errors.price?.message}
            />
            <Input
              label="Stock"
              type="number"
              {...register('stock', { required: 'El stock es requerido', valueAsNumber: true })}
              error={errors.stock?.message}
            />
          </div>
          <div>
            <label htmlFor="categoryId" className="block text-sm font-medium text-gray-700 mb-2">
              Categoría
            </label>
            <select
              id="categoryId"
              {...register('categoryId', { required: 'La categoría es requerida' })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="">Selecciona una categoría</option>
              {categories.filter(c => c && c.id && c.name).map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
            {errors.categoryId && <p className="text-red-500 text-sm mt-1">{errors.categoryId.message}</p>}
          </div>
          <div>
            <label htmlFor="images" className="block text-sm font-medium text-gray-700 mb-2">
              URLs de las Imágenes
            </label>
            <textarea
              id="images"
              rows="3"
              placeholder="https://example.com/img1.jpg, https://example.com/img2.jpg"
              {...register('images')}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <p className="text-xs text-gray-500 mt-1">
              Pega una o más URLs de imágenes, separadas por comas.
            </p>
            {errors.images && <p className="text-red-500 text-sm mt-1">{errors.images.message}</p>}
          </div>
          <div className="flex justify-end gap-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button type="submit">
              {product ? 'Guardar Cambios' : 'Añadir Producto'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

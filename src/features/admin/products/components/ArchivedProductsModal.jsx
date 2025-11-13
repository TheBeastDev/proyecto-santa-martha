import { ArchiveRestore, X } from 'lucide-react';

export default function ArchivedProductsModal({
  isOpen,
  onClose,
  products,
  onRestore,
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col">
        <div className="p-6 border-b flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-900">Productos Archivados</h2>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-100">
            <X className="w-6 h-6 text-gray-600" />
          </button>
        </div>
        <div className="p-6 overflow-y-auto">
          {products.length === 0 ? (
            <p className="text-center text-gray-500 py-8">No hay productos archivados.</p>
          ) : (
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Producto</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Categoría</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Acciones</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {products.map((product) => (
                  <tr key={product.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={product.images?.[0] || '/cake-roll.svg'}
                          alt={product.name}
                          className="w-12 h-12 object-cover rounded-lg"
                        />
                        <p className="font-medium text-gray-900">{product.name}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">{product.category?.name || 'Sin categoría'}</td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => onRestore(product.id)}
                        className="flex items-center gap-2 text-sm text-green-600 font-semibold hover:bg-green-50 p-2 rounded-lg transition-colors"
                        title="Restaurar"
                      >
                        <ArchiveRestore className="w-4 h-4" />
                        Restaurar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}

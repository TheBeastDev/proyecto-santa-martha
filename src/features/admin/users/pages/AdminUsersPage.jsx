import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Search, UserPlus, Edit, Trash2 } from 'lucide-react';
import Button from '@shared/components/Button';
import { 
  fetchAllUsers, 
  deleteUser,
  updateUser,
  selectAllUsers, 
  selectUsersStatus 
} from '../usersSlice';
import { registerUser } from '@features/auth/authSlice';
import UserEditModal from '../components/UserEditModal';
import UserAddModal from '../components/UserAddModal';

export default function AdminUsersPage() {
  const dispatch = useDispatch();
  const users = useSelector(selectAllUsers);
  const status = useSelector(selectUsersStatus);
  
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    // Initial fetch
    dispatch(fetchAllUsers());
  }, [dispatch]);

  const handleEdit = (user) => {
    setSelectedUser(user);
    setIsEditModalOpen(true);
  };

  const handleSave = (userId, data) => {
    dispatch(updateUser({ userId, data: { role: data.role } }));
    setIsEditModalOpen(false);
    setSelectedUser(null);
  };

  const handleSaveNewUser = async (data) => {
    try {
      await dispatch(registerUser(data)).unwrap();
      setIsAddModalOpen(false);
      dispatch(fetchAllUsers()); // Refresh the user list
    } catch (error) {
      console.error('Failed to create user:', error);
      // Optionally, show an error message to the user in the modal
    }
  };

  const handleDelete = (userId) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar este usuario? Esta acción no se puede deshacer.')) {
      dispatch(deleteUser(userId));
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Usuarios</h1>
          <p className="text-gray-600 mt-2">
            Gestiona los usuarios del sistema
          </p>
        </div>
        <Button icon={UserPlus} onClick={() => setIsAddModalOpen(true)}>
          Añadir Usuario
        </Button>
      </div>

      {/* Search */}
      <div className="bg-white rounded-lg shadow-md p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Buscar usuarios..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Usuario
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Rol
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Fecha Registro
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {status === 'loading' && !users.length ? (
                <tr>
                  <td colSpan="5" className="text-center py-8">Cargando usuarios...</td>
                </tr>
              ) : users.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                        <span className="text-primary font-semibold">
                          {user.name.charAt(0)}
                        </span>
                      </div>
                      <p className="font-medium text-gray-900">{user.name}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {user.email}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 inline-flex text-xs font-semibold rounded-full ${
                      user.role === 'ADMIN'
                        ? 'bg-purple-100 text-purple-800'
                        : 'bg-blue-100 text-blue-800'
                    }`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {new Date(user.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button 
                        onClick={() => handleEdit(user)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => handleDelete(user.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {isEditModalOpen && (
        <UserEditModal
          user={selectedUser}
          onClose={() => setIsEditModalOpen(false)}
          onSave={handleSave}
        />
      )}

      {isAddModalOpen && (
        <UserAddModal
          onClose={() => setIsAddModalOpen(false)}
          onSave={handleSaveNewUser}
        />
      )}
    </div>
  )
}

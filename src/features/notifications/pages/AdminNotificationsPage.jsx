import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Bell, CheckCheck } from 'lucide-react';
import { 
  fetchUserNotifications, 
  markAllAsRead,
  selectNotifications,
  selectNotificationsStatus
} from '../notificationsSlice';

export default function AdminNotificationsPage() {
  const dispatch = useDispatch();
  const notifications = useSelector(selectNotifications);
  const status = useSelector(selectNotificationsStatus);

  useEffect(() => {
    dispatch(fetchUserNotifications());
  }, [dispatch]);

  const handleMarkAllAsRead = () => {
    dispatch(markAllAsRead());
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Notificaciones</h1>
          <p className="text-gray-600 mt-2">
            Aquí están tus últimas actualizaciones y alertas.
          </p>
        </div>
        <button 
          onClick={handleMarkAllAsRead}
          className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
        >
          <CheckCheck className="w-5 h-5" />
          Marcar todas como leídas
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-md">
        <ul className="divide-y divide-gray-200">
          {status === 'loading' && <li className="p-6 text-center">Cargando...</li>}
          {notifications.length > 0 ? (
            notifications.map(notification => (
              <li 
                key={notification.id} 
                className={`p-6 flex items-start gap-4 ${!notification.read ? 'bg-orange-50' : ''}`}
              >
                <div className={`mt-1 flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${!notification.read ? 'bg-primary text-white' : 'bg-gray-100 text-gray-500'}`}>
                  <Bell className="w-5 h-5" />
                </div>
                <div>
                  <p className={`text-sm ${!notification.read ? 'font-semibold text-gray-900' : 'text-gray-700'}`}>
                    {notification.message}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    {new Date(notification.createdAt).toLocaleString()}
                  </p>
                </div>
              </li>
            ))
          ) : (
            status === 'succeeded' && <li className="p-6 text-center text-gray-500">No tienes notificaciones.</li>
          )}
        </ul>
      </div>
    </div>
  );
}

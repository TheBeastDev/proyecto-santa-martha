import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Bell, CheckCircle } from 'lucide-react';
import {
  fetchUserNotifications,
  markNotificationAsRead,
  selectNotifications,
  selectNotificationsStatus,
  selectNotificationsError,
} from '@features/notifications/notificationsSlice'; // Assuming these are in notificationsSlice
import Button from '@shared/components/Button';

export default function NotificationsPage() {
  const dispatch = useDispatch();
  const notifications = useSelector(selectNotifications);
  const notificationsStatus = useSelector(selectNotificationsStatus);
  const notificationsError = useSelector(selectNotificationsError);

  useEffect(() => {
    if (notificationsStatus === 'idle') {
      dispatch(fetchUserNotifications());
    }
  }, [notificationsStatus, dispatch]);

  const handleMarkAsRead = (notificationId) => {
    dispatch(markNotificationAsRead(notificationId));
  };

  let content;

  if (notificationsStatus === 'loading') {
    content = <div className="text-center py-12">Cargando notificaciones...</div>;
  } else if (notificationsStatus === 'failed') {
    content = <div className="text-center py-12 text-red-500">Error: {notificationsError}</div>;
  } else if (notifications.length === 0) {
    content = (
      <div className="text-center py-12">
        <div className="inline-flex items-center justify-center w-24 h-24 bg-gray-100 rounded-full mb-6">
          <Bell className="w-12 h-12 text-gray-400" />
        </div>
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          No tienes notificaciones
        </h2>
        <p className="text-gray-600 mb-8">
          Cuando haya algo nuevo, lo verás aquí.
        </p>
      </div>
    );
  } else {
    content = (
      <div className="space-y-4">
        {notifications.map((notification) => (
          <div
            key={notification.id}
            className={`bg-white rounded-lg shadow-md p-6 flex items-center justify-between ${
              notification.read ? 'opacity-60' : ''
            }`}
          >
            <div className="flex items-center gap-4">
              <Bell className={`w-6 h-6 ${notification.read ? 'text-gray-400' : 'text-primary'}`} />
              <div>
                <p className={`font-medium ${notification.read ? 'text-gray-600' : 'text-gray-900'}`}>
                  {notification.message}
                </p>
                <p className="text-sm text-gray-500">
                  {new Date(notification.createdAt).toLocaleString()}
                </p>
              </div>
            </div>
            {!notification.read && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleMarkAsRead(notification.id)}
                icon={CheckCircle}
              >
                Marcar como leído
              </Button>
            )}
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Notificaciones</h1>
        {content}
      </div>
    </div>
  );
}

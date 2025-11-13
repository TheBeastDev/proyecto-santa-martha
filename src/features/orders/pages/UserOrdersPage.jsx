import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchUserOrders, selectOrders, selectOrdersStatus } from '@features/orders/ordersSlice';
import { translateOrderStatus } from '@shared/utils/orderStatus';

export default function UserOrdersPage() {
  const dispatch = useDispatch();
  const orders = useSelector(selectOrders);
  const status = useSelector(selectOrdersStatus);

  useEffect(() => {
    dispatch(fetchUserOrders());
  }, [dispatch]);

  if (status === 'loading') {
    return <div className="text-center py-12">Cargando tus pedidos...</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Mis Pedidos</h1>
      
      {orders.length === 0 && status === 'succeeded' ? (
        <div className="text-center bg-white p-12 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-700">Aún no tienes pedidos</h2>
          <p className="text-gray-500 mt-2 mb-6">
            Parece que todavía no has realizado ninguna compra. ¡Explora nuestro catálogo y encuentra algo delicioso!
          </p>
          <Link to="/catalogo" className="bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-dark transition-colors">
            Ir al Catálogo
          </Link>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map(order => (
            <div key={order.id} className="bg-white rounded-lg shadow-md p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <p className="font-bold text-lg text-gray-900">Pedido #{order.orderNumber}</p>
                  <p className="text-sm text-gray-500">
                    Realizado el: {new Date(order.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-lg text-gray-900">${order.total.toFixed(2)}</p>
                  <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    order.status === 'PENDING' ? 'bg-yellow-100 text-yellow-800'
                    : order.status === 'PROCESSING' ? 'bg-blue-100 text-blue-800'
                    : order.status === 'COMPLETED' ? 'bg-green-100 text-green-800'
                    : order.status === 'CANCELLED' ? 'bg-red-100 text-red-800'
                    : 'bg-gray-100 text-gray-800'
                  }`}>
                    {translateOrderStatus(order.status)}
                  </span>
                </div>
              </div>
              <div className="border-t border-gray-200 pt-4">
                <h3 className="font-semibold text-md mb-2">Productos:</h3>
                <ul className="space-y-2">
                  {order.orderItems.map(item => (
                    <li key={item.id} className="flex justify-between text-sm">
                      <span className="text-gray-600">{item.product?.name || 'Producto'} x {item.quantity}</span>
                      <span className="text-gray-800 font-medium">${(item.price * item.quantity).toFixed(2)}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
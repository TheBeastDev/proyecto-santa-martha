import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchOrderById, selectOrders } from '@features/orders/ordersSlice';
import { ArrowLeft, User, MapPin, Phone, Hash, Calendar, DollarSign, Tag } from 'lucide-react';
import { translateOrderStatus } from '@shared/utils/orderStatus';

export default function AdminOrderDetailPage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  
  // We find the order in the existing list, or fetch if not present
  const order = useSelector(state => 
    state.orders.orders.find(o => o.id === id)
  );
  const orderStatus = useSelector(state => state.orders.status);

  useEffect(() => {
    if (!order) {
      dispatch(fetchOrderById(id));
    }
  }, [id, order, dispatch]);

  if (orderStatus === 'loading' || !order) {
    return <div className="text-center py-12">Cargando detalles del pedido...</div>;
  }

  const orderInfo = [
    { icon: Hash, label: 'Número de Pedido', value: `#${order.orderNumber}` },
    { icon: Calendar, label: 'Fecha', value: new Date(order.createdAt).toLocaleDateString() },
    { icon: DollarSign, label: 'Monto Total', value: `$${order.total.toFixed(2)}` },
    { icon: Tag, label: 'Estado', value: translateOrderStatus(order.status) },
  ];

  const customerInfo = [
    { icon: User, label: 'Cliente', value: order.user?.name || 'N/A' },
    { icon: MapPin, label: 'Dirección de Envío', value: order.deliveryAddress },
    { icon: Phone, label: 'Teléfono', value: order.phone },
  ];

  return (
    <div className="space-y-8">
      <Link to="/admin/pedidos" className="flex items-center gap-2 text-gray-600 hover:text-primary mb-6">
        <ArrowLeft className="w-5 h-5" />
        Volver a todos los pedidos
      </Link>

      <div className="bg-white rounded-lg shadow-md p-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Detalles del Pedido</h1>

        {/* Order Info */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8 border-b border-gray-200 pb-8">
          {orderInfo.map(info => (
            <div key={info.label}>
              <p className="text-sm text-gray-500 flex items-center gap-2"><info.icon className="w-4 h-4" /> {info.label}</p>
              <p className="font-semibold text-lg">{info.value}</p>
            </div>
          ))}
        </div>

        {/* Customer Info */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 border-b border-gray-200 pb-8">
          {customerInfo.map(info => (
            <div key={info.label}>
              <p className="text-sm text-gray-500 flex items-center gap-2"><info.icon className="w-4 h-4" /> {info.label}</p>
              <p className="font-medium text-gray-800">{info.value}</p>
            </div>
          ))}
        </div>

        {/* Order Items */}
        <div>
          <h2 className="text-xl font-bold text-gray-900 mb-4">Productos en el Pedido</h2>
          <div className="space-y-4">
            {order.orderItems?.map(item => (
              <div key={item.id} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                <img 
                  src={item.product?.images?.[0] || '/cake-roll.svg'} 
                  alt={item.product?.name} 
                  className="w-16 h-16 object-cover rounded-md"
                />
                <div className="flex-1">
                  <p className="font-semibold text-gray-800">{item.product?.name || 'Producto no disponible'}</p>
                  <p className="text-sm text-gray-600">Cantidad: {item.quantity}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-gray-800">${(item.price * item.quantity).toFixed(2)}</p>
                  <p className="text-sm text-gray-500">${item.price.toFixed(2)} c/u</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

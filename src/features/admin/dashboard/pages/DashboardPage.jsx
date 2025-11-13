import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DollarSign, ShoppingCart, Users, Package } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { fetchAllOrders, selectOrders } from '@features/orders/ordersSlice';
import { fetchProducts, selectProducts } from '@features/products/productsSlice';
import { fetchAllUsers, selectAllUsers } from '@features/admin/users/usersSlice';

export default function DashboardPage() {
  const dispatch = useDispatch();
  const orders = useSelector(selectOrders);
  const products = useSelector(selectProducts);
  const users = useSelector(selectAllUsers);

  useEffect(() => {
    dispatch(fetchAllOrders());
    dispatch(fetchProducts({}));
    dispatch(fetchAllUsers());
  }, [dispatch]);

  // Métricas
  const todaysRevenue = useMemo(() => {
    const today = new Date().toDateString();
    return orders
      .filter(order => {
        const orderDate = new Date(order.createdAt).toDateString();
        return order.status === 'COMPLETED' && orderDate === today;
      })
      .reduce((sum, order) => sum + order.total, 0);
  }, [orders]);

  const pendingOrders = orders.filter(order => order.status === 'PENDING').length;

  const newCustomersToday = useMemo(() => {
    const today = new Date().toDateString();
    return users.filter(user => {
      const userDate = new Date(user.createdAt).toDateString();
      return userDate === today;
    }).length;
  }, [users]);

  const lowStockProducts = products.filter(p => p.stock <= 10).length;

  const totalRevenue = useMemo(() => {
    return orders
      .filter(order => order.status === 'COMPLETED')
      .reduce((sum, order) => sum + order.total, 0);
  }, [orders]);

  // Process data for sales chart
  const salesData = useMemo(() => {
    const monthNames = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"];
    const monthlySales = {};

    orders
      .filter(order => order.status === 'COMPLETED')
      .forEach(order => {
        const date = new Date(order.createdAt);
        const monthKey = `${date.getFullYear()}-${String(date.getMonth()).padStart(2, '0')}`;
        
        if (!monthlySales[monthKey]) {
          monthlySales[monthKey] = {
            name: `${monthNames[date.getMonth()]} '${String(date.getFullYear()).slice(2)}`,
            sales: 0,
            sortKey: date.getFullYear() * 100 + date.getMonth(),
          };
        }
        monthlySales[monthKey].sales += order.total;
      });

    return Object.values(monthlySales).sort((a, b) => a.sortKey - b.sortKey);
  }, [orders]);

  const stats = [
    {
      title: 'Ingresos Totales',
      value: `$${totalRevenue.toFixed(2)}`,
      icon: DollarSign,
      bgColor: 'bg-green-50',
      iconColor: 'text-green-600'
    },
    {
      title: 'Total Pedidos',
      value: orders.length,
      icon: ShoppingCart,
      bgColor: 'bg-blue-50',
      iconColor: 'text-blue-600'
    },
    {
      title: 'Nuevos Clientes Hoy',
      value: newCustomersToday,
      icon: Users,
      bgColor: 'bg-purple-50',
      iconColor: 'text-purple-600'
    },
    {
      title: 'Stock Crítico',
      value: lowStockProducts,
      icon: Package,
      bgColor: 'bg-red-50',
      iconColor: 'text-red-600'
    }
  ];

  const recentOrders = orders.filter(order => order.status === 'COMPLETED').slice(0, 5);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Resumen General</h1>
        <p className="text-gray-600 mt-2">
          Bienvenido al panel de administración de Santa Martha.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.title} className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between mb-4">
              <div className={`${stat.bgColor} p-3 rounded-lg`}>
                <stat.icon className={`w-6 h-6 ${stat.iconColor}`} />
              </div>
            </div>
            <h3 className="text-gray-600 text-sm mb-1">{stat.title}</h3>
            <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Sales Chart */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="mb-6">
          <h2 className="text-xl font-bold text-gray-900">Evolución de Ventas</h2>
          <p className="text-gray-600 text-sm">Mensual +12%</p>
        </div>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={salesData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="name" stroke="#9ca3af" />
            <YAxis stroke="#9ca3af" />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#fff',
                border: '1px solid #e5e7eb',
                borderRadius: '8px'
              }}
            />
            <Line 
              type="monotone" 
              dataKey="sales" 
              stroke="#FF8C00" 
              strokeWidth={3}
              dot={{ fill: '#FF8C00', r: 5 }}
              activeDot={{ r: 7 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Recent Orders */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900">Últimos Pedidos</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  ID Pedido
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Cliente
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Estado
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {recentOrders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    #{order.orderNumber}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {order.user?.name || 'Usuario Eliminado'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      order.status === 'PENDING'
                        ? 'bg-yellow-100 text-yellow-800'
                        : order.status === 'PROCESSING'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-green-100 text-green-800'
                    }`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    ${order.total.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <button className="text-primary hover:text-primary-dark font-medium">
                      Ver detalles
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

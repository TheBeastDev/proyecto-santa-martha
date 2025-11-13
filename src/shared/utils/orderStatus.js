export const orderStatusMap = {
  PENDING: {
    text: 'Pendiente',
    className: 'bg-yellow-50 text-yellow-800 border-yellow-200',
  },
  PROCESSING: {
    text: 'En Proceso',
    className: 'bg-blue-50 text-blue-800 border-blue-200',
  },
  SHIPPED: {
    text: 'Enviado',
    className: 'bg-cyan-50 text-cyan-800 border-cyan-200',
  },
  DELIVERED: {
    text: 'Entregado',
    className: 'bg-purple-50 text-purple-800 border-purple-200',
  },
  COMPLETED: {
    text: 'Completado',
    className: 'bg-green-50 text-green-800 border-green-200',
  },
  CANCELLED: {
    text: 'Cancelado',
    className: 'bg-red-50 text-red-800 border-red-200',
  },
};

export const translateOrderStatus = (status) => {
  return orderStatusMap[status]?.text || status;
};

export const getOrderStatusClassName = (status) => {
  return orderStatusMap[status]?.className || 'bg-gray-50 text-gray-800 border-gray-200';
};

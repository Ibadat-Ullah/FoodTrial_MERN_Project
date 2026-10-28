import { foodSchema } from './food';
import { orderSchema } from './order';
import { paymentSchema } from './payment';
import { riderSchema } from './rider';

export const resourceConfigs = {
  foods: {
    title: 'Foods',
    singular: 'Food',
    canCreate: true,
    separateForms: true,
    endpoint: 'foods',
    schema: foodSchema,
    fields: [
      { name: 'name', label: 'Name' },
      { name: 'description', label: 'Description', type: 'textarea' },
      { name: 'price', label: 'Price', type: 'number' },
      { name: 'category', label: 'Category' },
      { name: 'image', label: 'Food photo', type: 'file', accept: 'image/jpeg,image/png,image/webp' },
      { name: 'available', label: 'Available', type: 'checkbox' }
    ],
    columns: [
      { key: 'name', label: 'Name' },
      { key: 'category', label: 'Category' },
      { key: 'price', label: 'Price', format: (value) => `Rs. ${Number(value).toLocaleString()}` },
      { key: 'available', label: 'Available', format: (value) => (value ? 'Yes' : 'No') }
    ]
  },
  orders: {
    title: 'Orders',
    singular: 'Order',
    canCreate: false,
    endpoint: 'orders',
    emptyMessage: 'Customer orders will appear here after they are placed from the storefront.',
    schema: orderSchema,
    fields: [
      { name: 'customerName', label: 'Customer name' },
      { name: 'phone', label: 'Phone' },
      { name: 'address', label: 'Address', type: 'textarea' },
      { name: 'items', label: 'Items', type: 'textarea' },
      { name: 'total', label: 'Total', type: 'number' },
      { name: 'status', label: 'Status', type: 'select', options: ['pending', 'preparing', 'delivered', 'cancelled'] }
    ],
    columns: [
      { key: 'customerName', label: 'Customer' },
      { key: 'phone', label: 'Phone' },
      { key: 'total', label: 'Total', format: (value) => `Rs. ${Number(value).toLocaleString()}` },
      { key: 'status', label: 'Status' }
    ]
  },
  payments: {
    title: 'Payments',
    singular: 'Payment',
    canCreate: false,
    endpoint: 'payments',
    emptyMessage: 'Payment records are created from customer orders on the storefront.',
    schema: paymentSchema,
    fields: [
      { name: 'orderId', label: 'Order ID' },
      { name: 'amount', label: 'Amount', type: 'number' },
      { name: 'method', label: 'Method', type: 'select', options: ['cash', 'card', 'online'] },
      { name: 'status', label: 'Status', type: 'select', options: ['pending', 'paid', 'failed'] }
    ],
    columns: [
      { key: 'orderId', label: 'Order ID' },
      { key: 'amount', label: 'Amount', format: (value) => `Rs. ${Number(value).toLocaleString()}` },
      { key: 'method', label: 'Method' },
      { key: 'status', label: 'Status' }
    ]
  },
  riders: {
    title: 'Riders',
    singular: 'Rider',
    canCreate: true,
    separateForms: true,
    endpoint: 'riders',
    schema: riderSchema,
    fields: [
      { name: 'name', label: 'Name' },
      { name: 'phone', label: 'Phone' },
      { name: 'vehicleNumber', label: 'Vehicle number' },
      { name: 'status', label: 'Status', type: 'select', options: ['available', 'busy'] }
    ],
    columns: [
      { key: 'name', label: 'Name' },
      { key: 'phone', label: 'Phone' },
      { key: 'vehicleNumber', label: 'Vehicle' },
      { key: 'status', label: 'Status' }
    ]
  }
};

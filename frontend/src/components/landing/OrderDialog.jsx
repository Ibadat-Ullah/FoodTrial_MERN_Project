import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import api from '../../api/client';
import { checkoutSchema } from '../../schemas/checkout';
import Button from '../common/Button';
import Input from '../common/Input';
import Modal from '../common/Modal';

export default function OrderDialog({ food, open, onClose }) {
  const [createdOrder, setCreatedOrder] = useState(null);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: zodResolver(checkoutSchema),
    defaultValues: { customerName: '', phone: '', address: '', method: 'cash' }
  });

  const close = () => {
    if (submitting) return;
    setCreatedOrder(null);
    setSuccess('');
    setError('');
    reset();
    onClose();
  };

  const recordPayment = async (order, method) => {
    await api.post('/payments', {
      orderId: order._id,
      amount: order.total,
      method,
      status: 'pending'
    });
  };

  const submit = async (values) => {
    setSubmitting(true);
    setError('');
    let order;
    try {
      const { data } = await api.post('/orders', {
        customerName: values.customerName,
        phone: values.phone,
        address: values.address,
        items: `${food.name} x 1`,
        total: food.price,
        status: 'pending'
      });
      order = data;
      setCreatedOrder({ order, method: values.method });
    } catch (requestError) {
      setError(requestError.response?.data?.message || requestError.message || 'We could not submit your order. Please try again.');
      setSubmitting(false);
      return;
    }

    try {
      await recordPayment(order, values.method);
      setSuccess(`Your order is in! Order #${order._id.slice(-6)} has been received.`);
    } catch (requestError) {
      setError(`Your order was created, but its payment record could not be saved: ${requestError.response?.data?.message || requestError.message}`);
    } finally {
      setSubmitting(false);
    }
  };

  const retryPayment = async () => {
    setSubmitting(true);
    setError('');
    try {
      await recordPayment(createdOrder.order, createdOrder.method);
      setSuccess(`Your order is in! Order #${createdOrder.order._id.slice(-6)} has been received.`);
    } catch (requestError) {
      setError(`The payment record could not be saved: ${requestError.response?.data?.message || requestError.message}`);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Modal open={open} title={success ? 'Order received' : `Order ${food.name}`} onClose={close}>
      {success ? (
        <div>
          <p role="status" className="rounded-xl bg-green-50 p-4 text-sm leading-6 text-green-800">{success}</p>
          <Button type="button" className="mt-5 w-full" onClick={close}>Done</Button>
        </div>
      ) : (
        <>
          <div className="mb-5 flex items-center justify-between rounded-xl bg-brand-50 px-4 py-3 text-sm">
            <span className="font-semibold text-stone-700">{food.name}</span>
            <span className="font-extrabold text-brand-700">Rs. {Number(food.price).toLocaleString()}</span>
          </div>
          {error && <p role="alert" className="mb-4 rounded-xl bg-red-50 px-4 py-3 text-sm leading-5 text-red-700">{error}</p>}
          {createdOrder ? (
            <Button type="button" className="w-full" onClick={retryPayment} disabled={submitting}>{submitting ? 'Saving…' : 'Retry payment record'}</Button>
          ) : (
            <form className="space-y-4" onSubmit={handleSubmit(submit)} noValidate>
              <Input label="Your name" autoComplete="name" error={errors.customerName?.message} {...register('customerName')} />
              <Input label="Phone" type="tel" autoComplete="tel" error={errors.phone?.message} {...register('phone')} />
              <div>
                <label htmlFor="delivery-address" className="mb-2 block text-sm font-semibold text-stone-700">Delivery address</label>
                <textarea id="delivery-address" rows={3} className={`w-full rounded-xl border bg-white px-4 py-3 text-sm outline-none focus:border-brand-500 focus:ring-4 focus:ring-brand-100 ${errors.address ? 'border-red-400' : 'border-stone-200'}`} {...register('address')} />
                {errors.address && <p className="mt-1.5 text-xs font-medium text-red-600">{errors.address.message}</p>}
              </div>
              <div>
                <label htmlFor="payment-method" className="mb-2 block text-sm font-semibold text-stone-700">Payment method</label>
                <select id="payment-method" className="w-full rounded-xl border border-stone-200 bg-white px-4 py-3 text-sm outline-none focus:border-brand-500 focus:ring-4 focus:ring-brand-100" {...register('method')}>
                  <option value="cash">Cash on delivery</option>
                  <option value="card">Card (recorded as pending)</option>
                  <option value="online">Online (recorded as pending)</option>
                </select>
              </div>
              <Button type="submit" className="w-full" disabled={submitting}>{submitting ? 'Placing order…' : 'Place order'}</Button>
            </form>
          )}
        </>
      )}
    </Modal>
  );
}

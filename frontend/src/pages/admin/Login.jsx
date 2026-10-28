import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import api from '../../api/client';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import AuthLayout from './AuthLayout';
import { loginSchema } from '../../schemas/auth';

export default function Login() {
  const navigate = useNavigate();
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({ resolver: zodResolver(loginSchema) });

  const submit = async (values) => {
    setError('');
    setMessage('');
    try {
      const { data } = await api.post('/auth/login', values);
      setMessage(data.message);
      window.setTimeout(() => navigate('/admin'), 900);
    } catch (requestError) {
      setError(requestError.response?.data?.message || requestError.message || 'Unable to submit your login.');
    }
  };

  return (
    <AuthLayout title="Welcome back" description="Sign in to manage your FoodTrial kitchen." footer={<>New to FoodTrial? <Link to="/admin/register" className="font-bold text-brand-700 hover:text-brand-900">Create an account</Link></>}>
      {message && <p role="status" className="mb-5 rounded-xl bg-green-50 px-4 py-3 text-sm text-green-700">{message}</p>}
      {error && <p role="alert" className="mb-5 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>}
      <form className="space-y-5" onSubmit={handleSubmit(submit)} noValidate>
        <Input label="Email address" type="email" autoComplete="email" placeholder="you@example.com" error={errors.email?.message} {...register('email')} />
        <Input label="Password" type="password" autoComplete="current-password" placeholder="At least 6 characters" error={errors.password?.message} {...register('password')} />
        <Button type="submit" className="w-full" disabled={isSubmitting}>{isSubmitting ? 'Signing in…' : 'Sign in'}</Button>
      </form>
    </AuthLayout>
  );
}

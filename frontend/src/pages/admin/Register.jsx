import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import api from '../../api/client';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import AuthLayout from './AuthLayout';
import { registerSchema } from '../../schemas/auth';

export default function Register() {
  const navigate = useNavigate();
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({ resolver: zodResolver(registerSchema) });

  const submit = async (values) => {
    setError('');
    setMessage('');
    try {
      const { data } = await api.post('/auth/register', values);
      setMessage(data.message);
      window.setTimeout(() => navigate('/admin'), 900);
    } catch (requestError) {
      setError(requestError.response?.data?.message || requestError.message || 'Unable to submit your registration.');
    }
  };

  return (
    <AuthLayout title="Create an account" description="Set up your details to get started." footer={<>Already have an account? <Link to="/admin/login" className="font-bold text-brand-700 hover:text-brand-900">Sign in</Link></>}>
      {message && <p role="status" className="mb-5 rounded-xl bg-green-50 px-4 py-3 text-sm text-green-700">{message}</p>}
      {error && <p role="alert" className="mb-5 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>}
      <form className="space-y-4" onSubmit={handleSubmit(submit)} noValidate>
        <Input label="Name" autoComplete="name" placeholder="Your name" error={errors.name?.message} {...register('name')} />
        <Input label="Email address" type="email" autoComplete="email" placeholder="you@example.com" error={errors.email?.message} {...register('email')} />
        <Input label="Password" type="password" autoComplete="new-password" placeholder="At least 6 characters" error={errors.password?.message} {...register('password')} />
        <Input label="Confirm password" type="password" autoComplete="new-password" placeholder="Enter your password again" error={errors.confirmPassword?.message} {...register('confirmPassword')} />
        <Button type="submit" className="w-full" disabled={isSubmitting}>{isSubmitting ? 'Creating account…' : 'Create account'}</Button>
      </form>
    </AuthLayout>
  );
}

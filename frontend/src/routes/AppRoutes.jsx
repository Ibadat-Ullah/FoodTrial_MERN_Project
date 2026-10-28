import { Route, Routes } from 'react-router-dom';
import AdminLayout from '../components/admin/AdminLayout';
import Dashboard from '../pages/admin/Dashboard';
import FoodPage from '../pages/admin/FoodPage';
import Login from '../pages/admin/Login';
import OrderPage from '../pages/admin/OrderPage';
import PaymentPage from '../pages/admin/PaymentPage';
import Register from '../pages/admin/Register';
import RiderPage from '../pages/admin/RiderPage';
import UserPage from '../pages/admin/UserPage';
import ResourceFormPage, { ResourceDeletePage } from '../components/admin/ResourceFormPage';
import LandingPage from '../pages/LandingPage';
import NotFound from '../pages/NotFound';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/admin/login" element={<Login />} />
      <Route path="/admin/register" element={<Register />} />
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="foods" element={<FoodPage />} />
        <Route path=":resource/new" element={<ResourceFormPage mode="new" />} />
        <Route path=":resource/:id/edit" element={<ResourceFormPage mode="edit" />} />
        <Route path=":resource/:id/delete" element={<ResourceDeletePage />} />
        <Route path="orders" element={<OrderPage />} />
        <Route path="payments" element={<PaymentPage />} />
        <Route path="riders" element={<RiderPage />} />
        <Route path="users" element={<UserPage />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

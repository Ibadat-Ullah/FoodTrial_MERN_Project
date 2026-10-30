import { Route, Routes } from 'react-router-dom';
import AdminLayout from '../components/admin/AdminLayout';
import ResourcePage from '../components/admin/ResourcePage';
import Dashboard from '../pages/admin/Dashboard';
import UserPage from '../pages/admin/UserPage';
import ResourceFormPage, { ResourceDeletePage } from '../components/admin/ResourceFormPage';
import LandingPage from '../pages/LandingPage';
import NotFound from '../pages/NotFound';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<Dashboard />} />
        <Route path=":resource" element={<ResourcePage />} />
        <Route path=":resource/new" element={<ResourceFormPage mode="new" />} />
        <Route path=":resource/:id/edit" element={<ResourceFormPage mode="edit" />} />
        <Route path=":resource/:id/delete" element={<ResourceDeletePage />} />
        <Route path="users" element={<UserPage />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

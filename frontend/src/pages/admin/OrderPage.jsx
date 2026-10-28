import ResourcePage from '../../components/admin/ResourcePage';
import { resourceConfigs } from '../../schemas/adminResources';

export default function OrderPage() {
  return <ResourcePage config={resourceConfigs.orders} />;
}

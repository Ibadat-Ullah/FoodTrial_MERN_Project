import ResourcePage from '../../components/admin/ResourcePage';
import { resourceConfigs } from '../../schemas/adminResources';

export default function PaymentPage() {
  return <ResourcePage config={resourceConfigs.payments} />;
}

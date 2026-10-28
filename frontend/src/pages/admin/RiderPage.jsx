import ResourcePage from '../../components/admin/ResourcePage';
import { resourceConfigs } from '../../schemas/adminResources';

export default function RiderPage() {
  return <ResourcePage config={resourceConfigs.riders} />;
}

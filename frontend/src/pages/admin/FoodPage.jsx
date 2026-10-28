import ResourcePage from '../../components/admin/ResourcePage';
import { resourceConfigs } from '../../schemas/adminResources';

export default function FoodPage() {
  return <ResourcePage config={resourceConfigs.foods} />;
}

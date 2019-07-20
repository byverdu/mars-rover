import { TRoutesInput } from '../types/types';
import { EnumApiRoutes } from '../types/enums';
import { getHealthCheck } from '../controllers';

export default ({ app }: TRoutesInput) => {
  app.get(EnumApiRoutes.getHealthCheck, getHealthCheck);
};

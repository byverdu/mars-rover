import { TRoutesInput } from '../models/types';
import { EnumApiRoutes } from '../models/enums';
import { getHealthCheck } from '../controllers';

export default ({ app }: TRoutesInput) => {
  app.get(EnumApiRoutes.getHealthCheck, getHealthCheck);
};

import { TRoutesInput } from '../types/types';
import { EnumApiRoutes } from '../types/enums';
import {
  getHealthCheck,
  getRoot,
  getPlateau,
  postPlateau
} from '../controllers';

export default ({ app }: TRoutesInput) => {
  app.get(EnumApiRoutes.getRoot, getRoot);
  app.get(EnumApiRoutes.getHealthCheck, getHealthCheck);
  app.get(EnumApiRoutes.getPlateau, getPlateau);
  app.post(EnumApiRoutes.postPlateau, postPlateau);
};

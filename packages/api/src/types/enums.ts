export enum EnumCardinalPoints {
  N = 'N',
  S = 'S',
  E = 'E',
  W = 'W'
}

export enum EnumRoverStatus {
  moving = 'moving',
  sleep = 'sleep',
  ko = 'KO'
}

export enum EnumApiRoutes {
  getHealthCheck = '/health-check',
  getPlateau = '/api/plateau',
  getRoot = '/',
  postPlateau = '/api/plateau/launch-rovers'
}

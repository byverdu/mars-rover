export enum EnumCardinalPoints {
  N = 'N',
  S = 'S',
  E = 'E',
  W = 'W'
}

export enum EnumsSteps {
  M = 'M',
  L = 'L',
  R = 'R'
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

export enum EnumProxyAddress {
  development = 'http://localhost:9000',
  production = 'http://mars-rover_api:9000'
}

export enum EnumRotation {
  N = 'rotate-0',
  E = 'rotate-90',
  S = 'rotate-180',
  W = 'rotate-270'
}

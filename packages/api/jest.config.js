module.exports = {
  displayName: 'Api Unit Tests',
  globalSetup: './jest/setup',
  preset: 'ts-jest',
  globalTeardown: './jest/teardown.js',
  testEnvironment: './jest/mongo-environment.js',
  testPathIgnorePatterns: ['__tests__/mockData.ts'],
  collectCoverage: true,
  collectCoverageFrom: ['src/**/*', '!src/database/**', '!src/app/**', '!src/types/**', '!src/routes/**', '!src/index.ts']
};

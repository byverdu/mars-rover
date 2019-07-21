module.exports = {
  globalSetup: './jest/setup',
  preset: 'ts-jest',
  globalTeardown: './jest/teardown.js',
  testEnvironment: './jest/mongo-environment.js',
  testPathIgnorePatterns: ['__tests__/mockData.ts'],
  collectCoverage: true,
  collectCoverageFrom: ['src/**/*', '!src/connect/**', '!src/app/**', '!src/types/**', '!src/routes/**', '!src/index.ts']
};

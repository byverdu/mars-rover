module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testPathIgnorePatterns: ['__tests__/mockData.ts'],
  collectCoverage: true,
  collectCoverageFrom: ['src/**/*', '!src/connect/**', '!src/app/**', '!src/types/**', '!src/routes/**', '!src/index.ts']
};

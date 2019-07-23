module.exports = {
  displayName: 'Client Unit Tests',
  collectCoverage: true,
  globals: {
    'ts-jest': {
      tsConfig: '<rootDir>/tsconfig.test.json'
    }
  },
  roots: [
    '<rootDir>/src'
  ],
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  testMatch: ["**/__tests__/**/*.ts?(x)", "**/?(*.)+(test).ts?(x)"],
  transform: {
    '^.+\\.(ts|tsx)?$': 'ts-jest'
  },
  moduleFileExtensions: [
    'ts',
    'tsx',
    'js',
    'jsx',
    'json',
    'node'
  ],
  setupFilesAfterEnv: [
    '<rootDir>/src/setupTests.ts'
  ],
  coveragePathIgnorePatterns: [
    // '<rootDir>/src/**/*scss',
    // '<rootDir>/src/Models/*ts',
  ]
}
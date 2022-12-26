export default {
  preset: 'ts-jest',
  coverageDirectory: './coverage',
  coveragePathIgnorePatterns: ['node_modules'],
  moduleNameMapper: {
    '\\.css$': '<rootDir>/src/mocks/styleMock.ts',
  },
  reporters: ['default'],
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
  testEnvironment: 'jsdom',
  testMatch: ['<rootDir>/src/**/*.test.{ts,tsx}'],
  testPathIgnorePatterns: ['/node_modules/'],
  transform: {
    '/.ts/': ['ts-jest', { diagnostics: false }],
  },
};

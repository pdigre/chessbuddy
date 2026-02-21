/** @type {import('ts-jest').JestConfigWithTsJest} */
export default {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
  transform: {
    '^.+\\.tsx?$': [
      'ts-jest',
      {
        useESM: true,
      },
    ],
  },
  extensionsToTreatAsEsm: ['.ts', '.tsx'],
  moduleNameMapper: {
    '^service/(.*)$': '<rootDir>/../common/service/$1',
    '^model/(.*)$': '<rootDir>/../common/model/$1',
    '^(\\.{1,2}/.*)\\.js$': '$1',
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
  },
};

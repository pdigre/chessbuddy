/** @type {import('jest').Config} */
module.exports = {
  // The test environment that will be used for testing
  testEnvironment: 'node',

  // This setup is required to make ts-jest work with ESM projects
  extensionsToTreatAsEsm: ['.ts'],
  moduleNameMapper: {
    // This helps Jest resolve ".js" file extensions in imports for ESM
    '^(\\.{1,2}/.*)\\.js$': '$1',
  },
  transform: {
    '^.+\\.tsx?$': [
      'ts-jest',
      {
        useESM: true,
      },
    ],
  },
};
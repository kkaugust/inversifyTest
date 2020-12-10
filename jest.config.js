/* eslint-disable @typescript-eslint/no-var-requires */
const { defaults } = require('jest-config');

const envPath = require('path').resolve(__dirname, './bin/jest/server-env.js');

module.exports = {
  rootDir: require('path').resolve(__dirname),
  roots: [__dirname],
  testEnvironment: envPath,
  preset: 'ts-jest',
  globals: {
    dotEnvDir: __dirname, // used in `testEnvironment: envPath`
    'ts-jest': {
      tsConfig: `${__dirname}/tsconfig.json`,
      isolatedModules: true,
      diagnostics: false,
    },
  },
  moduleNameMapper: {
    '^app(.*)$': `${__dirname}/src$1`,
  },
  moduleFileExtensions: [...defaults.moduleFileExtensions, 'ts', 'tsx'],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
  transformIgnorePatterns: ['<rootDir>/node_modules/', `${__dirname}/node_modules/`],
  testPathIgnorePatterns: ['/node_modules/', '/dist/'],
  testMatch: [`${__dirname}/**/__tests__/**/*-test.(ts|js)`],
  setupFilesAfterEnv: [`${__dirname}/bin/jest/setupTestFramework.js`],
  setupFiles: [`${__dirname}/bin/jest/setupFiles/mongoms.ts`],
};

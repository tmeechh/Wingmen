module.exports = {
  moduleNameMapper: {
    // Maps static asset imports (like images) to a mock file in the `__mocks__` folder.
    '\\.(jpg|jpeg|png|gif|webp|svg)$': '<rootDir>/__mocks__/fileMock.ts',
  },
  testEnvironment: 'jest-environment-jsdom', // Simulates a browser-like environment for React component testing.
  transform: {
    '^.+\\.(ts|tsx)$': ['ts-jest', { tsconfig: 'tsconfig.app.json'}], // Transforms TypeScript files using `ts-jest` to make them compatible with Jest.
  },
  moduleFileExtensions: ['js', 'ts', 'tsx', 'json', 'node'], // Specifies file extensions Jest should recognize.
};

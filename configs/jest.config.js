module.exports = {
    preset: 'jest-preset-angular',
    rootDir: '..',
    roots: ['<rootDir>/src'],
    setupFilesAfterEnv: ['<rootDir>/src/setup-jest.ts'],
    testPathIgnorePatterns: [
      "<rootDir>/node_modules/",
      "<rootDir>/dist/"
    ],
    globals: {
      "ts-jest": {
        "tsconfig": "<rootDir>/tsconfig.spec.json",
        "stringifyContentPathRegex": "\\.html$"
      }
    }
};
  
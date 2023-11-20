import dotenv from 'dotenv'
dotenv.config()

export default {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  testMatch: ['<rootDir>/src/**/*.test.{ts,tsx}'],
  transform: {
    '.+\\.(css|styl|less|sass|scss)$': 'jest-css-modules-transform',
  },
  moduleNameMapper: {
    '^assets(.*)$': '<rootDir>/src/assets$1',
    '^components(.*)$': '<rootDir>/src/components$1',
    '^consts(.*)$': '<rootDir>/src/consts$1',
    '^features(.*)$': '<rootDir>/src/features$1',
    '^hooks(.*)$': '<rootDir>/src/hooks$1',
    '^mocks(.*)$': '<rootDir>/src/mocks$1',
    '^pages(.*)$': '<rootDir>/src/pages$1',
    '^services(.*)$': '<rootDir>/src/services$1',
    '^theme(.*)$': '<rootDir>/src/theme$1',
    '^types(.*)$': '<rootDir>/src/types$1',
    '^utils(.*)$': '<rootDir>/src/utils$1',
  },
  globals: {
    __SERVER_PORT__: process.env.SERVER_PORT,
  },
}

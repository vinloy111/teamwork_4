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
    '^types(.*)$': '<rootDir>/src/types$1',
    // '^pages(.*)$': '<rootDir>/src/pages$1',
    // '^features(.*)$': '<rootDir>/src/features$1',
    // '^components(.*)$': '<rootDir>/src/components$1',
  },
  globals: {
    __SERVER_PORT__: process.env.SERVER_PORT,
  },
}

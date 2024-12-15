module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  transform: {
    '^.+\\.ts$': 'ts-jest', // שימוש ב-ts-jest לתמיכה בקבצי TypeScript
  },
  moduleFileExtensions: ['ts', 'js'], // אפשרות לקבצי TS ו-JS
  testMatch: ['**/tests/**/*.test.ts']
};

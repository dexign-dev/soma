module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint/eslint-plugin'],
  extends: [
    'eslint:recommended',  // ESLint의 기본 권장 설정을 사용합니다.
    'plugin:@typescript-eslint/recommended',  // TypeScript에 대한 권장 설정을 사용합니다.
    'prettier',  // Prettier 설정과 충돌되지 않게 ESLint 규칙을 조정합니다.
    'prettier/@typescript-eslint',  // Prettier TypeScript 설정과 충돌되지 않게 ESLint 규칙을 조정합니다.
  ],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  ignorePatterns: ['.eslintrc.js'],
  rules: {
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
  },
};

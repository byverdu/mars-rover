const baseConfig = require('eslint-config-react-app');
const baseOverrides = Array.isArray(baseConfig.overrides) ? baseConfig.overrides : [baseConfig.overrides];
const baseTsOverride = baseOverrides.find(x => x.files.find(f => f.indexOf('*.ts') > 0));

module.exports = {
  ...baseConfig,
  overrides: [
    {
      ...baseTsOverride,
      parserOptions: {
        ecmaVersion: 2019
      },
      rules: {
        ...baseTsOverride.rules,

        // Remove with next npm release of eslint-config-react-app:
        'no-useless-constructor': 'off',
        'semi': 'off',
        'no-console': ['warn', { allow: ['warn', 'error', 'info'] }],
        'no-alert': 'warn',
        'no-debugger': 'warn',
        'max-len': ['warn', { code: 240 }],
        'no-multiple-empty-lines': 'warn',
        'default-case': 'warn',
        'comma-dangle': 'warn',
        'no-shadow': 'warn',
        'no-duplicate-imports': 'warn',
        'quotes': [1, 'single'],
        'no-dupe-class-members': 'off',
        'eqeqeq': [2],
        '@typescript-eslint/no-useless-constructor': 'warn',
        '@typescript-eslint/no-unused-vars': 'warn',
        '@typescript-eslint/semi': ['warn']
        // << add your own custom rules here >>
      },
      globals: {
        cy: true
      },
      env: {
        mocha: true
      }
    }
  ],
  rules: {
    ...baseConfig.rules,
    // << add your own custom rules here >>
  },
};
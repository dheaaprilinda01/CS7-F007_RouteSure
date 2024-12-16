import globals from 'globals';
import pluginJs from '@eslint/js';
import daStyle from 'eslint-config-dicodingacademy';

export default [
  {
    languageOptions: {
      globals: globals.browser
    }
  },
  pluginJs.configs.recommended,
  daStyle,
  {
    rules: {
      'no-undef': 'off',
      'camelcase': 'off',
      'react/react-in-jsx-scope': 'off',
      'no-unused-vars': 'off',
    },
  },
];
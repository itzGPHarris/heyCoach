module.exports = {
    root: true, // Ensure this is the root configuration
    parser: '@typescript-eslint/parser', // Use TypeScript parser
    parserOptions: {
      ecmaVersion: 2020, // Support modern ECMAScript features
      sourceType: 'module', // Allow using ES modules
      ecmaFeatures: {
        jsx: true, // Enable JSX
      },
    },
    plugins: [
      'react',
      'react-hooks',
      'jsx-a11y',
      'import',
      '@typescript-eslint',
      'material-ui',
    ],
    extends: [
      'eslint:recommended',
      'plugin:react/recommended',
      'plugin:react-hooks/recommended',
      'plugin:jsx-a11y/recommended',
      'plugin:@typescript-eslint/recommended',
      'plugin:import/errors',
      'plugin:import/warnings',
      'plugin:import/typescript',
      'plugin:material-ui/recommended',
      'prettier', // Optional, for Prettier integration
    ],
    rules: {
      // General rules
      'no-unused-vars': 'off', // Let @typescript-eslint handle this
      '@typescript-eslint/no-unused-vars': ['warn'],
      'react/react-in-jsx-scope': 'off', // Not needed with Vite
  
      // React-specific rules
      'react/prop-types': 'off', // Not needed when using TypeScript
      'react/jsx-uses-react': 'off', // Not needed with React 17+
  
      // Accessibility
      'jsx-a11y/anchor-is-valid': 'warn',
  
      // Import rules
      'import/order': [
        'warn',
        {
          groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
          'newlines-between': 'always',
        },
      ],
      'import/no-unresolved': 'error',
      'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
  
      // Material-UI rules
      'material-ui/no-hardcoded-labels': 'warn',
  
      // TypeScript-specific rules
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/no-explicit-any': 'warn',
    },
    settings: {
      react: {
        version: 'detect', // Automatically detect React version
      },
      'import/resolver': {
        typescript: {}, // Use TypeScript for module resolution
      },
    },
    env: {
      browser: true, // Browser global variables
      node: true, // Node.js global variables
      es6: true, // Enable ES6 syntax
    },
  };
  
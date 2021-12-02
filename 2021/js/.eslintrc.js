module.exports = {
    env: {
        commonjs: true,
        es2021: true,
        node: true
    },
    extends: [
        'prettier'
    ],
    parserOptions: {
        ecmaVersion: 2021
    },
    rules: {
        quotes: ['error', 'single'],
        semi: ['error', 'always']
    }
};

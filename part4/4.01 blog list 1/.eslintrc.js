// extends: 'airbnb',
// extends: ['airbnb', 'airbnb/hooks'],
// extends: 'eslint:recommended',

module.exports = {
    env: {
        node: true,
        commonjs: true,
        es2021: true,
    },
    extends: ['airbnb', 'airbnb/hooks'],
    overrides: [
        {
            env: {
                node: true,
            },
            files: [
                '.eslintrc.{js,cjs}',
            ],
            parserOptions: {
                sourceType: 'script',
            },
        },
    ],
    parserOptions: {
        ecmaVersion: 'latest',
    },
    rules: {
        indent: [
            'error',
            4,
        ],
        'linebreak-style': [
            'error',
            'unix',
        ],
        quotes: [
            'error',
            'single',
        ],
        semi: [
            'error',
            'never',
        ],
        // // disallow multiple spaces except before a comment disallowed in `extends: 'airbnb'`
        // 'no-multi-spaces': ['error', { ignoreEOLComments: true }],

        // disallow == and != // use === and !== instead
        eqeqeq: 'error',

        // disallow trailing whitespace at the end of lines
        'no-trailing-spaces': 'error',

        // enforce consistent spacing inside braces
        'object-curly-spacing': [
            'error', 'always',
        ],

        // enforce consistent spacing before and after the arrow in arrow functions
        'arrow-spacing': [
            'error', { before: true, after: true },
        ],

        // allow console.log() disallowed in 'eslint:recommended'
        'no-console': 0,

        // allow '_id' and '__v' disallowed in `extends: 'airbnb'`
        'no-underscore-dangle': ['error', { allow: ['_id', '__v'] }],
    },
}

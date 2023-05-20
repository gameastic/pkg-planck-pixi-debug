module.exports = {
    parser: '@typescript-eslint/parser',
    extends: ['standard-with-typescript', 'prettier'],
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        project: './tsconfig.json',
    },
    rules: {
        'prefer-arrow-callback': 'error',
        curly: ['error', 'all'],

        'no-confusing-arrow': ['error', { allowParens: false }],
        'no-unexpected-multiline': 'error',
        quotes: ['error', 'single', { avoidEscape: true, allowTemplateLiterals: false }],
        'no-restricted-syntax': ['error', 'SequenceExpression'],
        'no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
        '@typescript-eslint/no-floating-promises': ['error', { ignoreIIFE: true }],
        '@typescript-eslint/explicit-function-return-type': ['error', { allowExpressions: true }],
        '@typescript-eslint/explicit-member-accessibility': 'error',
        '@typescript-eslint/no-non-null-assertion': 'off',
        '@typescript-eslint/strict-boolean-expressions': 'off',
        '@typescript-eslint/restrict-template-expressions': 'off',
        '@typescript-eslint/ban-ts-comment': 'off',
        '@typescript-eslint/naming-convention': [
            'error',
            {
                selector: 'default',
                format: ['camelCase'],
            },

            {
                selector: 'variable',
                format: ['camelCase', 'UPPER_CASE'],
            },
            {
                selector: 'parameter',
                format: ['camelCase'],
                leadingUnderscore: 'allow',
            },

            {
                selector: 'memberLike',
                modifiers: ['private'],
                format: ['camelCase'],
                leadingUnderscore: 'require',
            },

            {
                selector: 'typeLike',
                format: ['PascalCase'],
            },
            {
                selector: 'interface',
                format: ['PascalCase'],
                custom: {
                    regex: '^I[A-Z]',
                    match: true,
                },
            },
        ],
        '@typescript-eslint/member-ordering': [
            'error',
            {
                default: [
                    // Index signature
                    'signature',
                    'call-signature',

                    // Fields
                    'public-static-field',
                    'protected-static-field',
                    'private-static-field',
                    '#private-static-field',

                    'public-instance-field',
                    'protected-instance-field',
                    'private-instance-field',
                    '#private-instance-field',

                    'public-abstract-field',
                    'protected-abstract-field',

                    'public-field',
                    'protected-field',
                    'private-field',
                    '#private-field',

                    'static-field',
                    'instance-field',
                    'abstract-field',

                    'field',

                    // Static initialization
                    'static-initialization',

                    // Constructors
                    'public-constructor',
                    'protected-constructor',
                    'private-constructor',

                    'constructor',

                    // Methods
                    'public-static-method',
                    'protected-static-method',
                    'private-static-method',
                    '#private-static-method',

                    'public-instance-method',
                    'protected-instance-method',
                    'private-instance-method',
                    '#private-instance-method',

                    'public-abstract-method',
                    'protected-abstract-method',

                    'public-method',
                    'protected-method',
                    'private-method',
                    '#private-method',

                    'static-method',
                    'instance-method',
                    'abstract-method',

                    'method',
                ],
            },
        ],
    },
};

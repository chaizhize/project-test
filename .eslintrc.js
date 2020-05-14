module.exports = {
    root: true,
    env: {
        browser: true,
        node: true,
        es6: true
    },
    extends: ['plugin:vue/essential', '@vue/prettier'],
    rules: {
        'no-console': process.env.NODE_ENV === 'production' ? 'off' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'off' : 'off',
        "no-unused-vars":process.env.NODE_ENV === 'production' ? 'off' : 'off',
        'prettier/prettier': [
            'warn',
            {
                tabWidth: 4,
                printWidth: 200,
                singleQuote: true,
                trailingComma: 'none',
                bracketSpacing: true,
                jsxBracketSameLine: false,
                semi: true,
                htmlWhitespaceSensitivity: "ignore",
                endOfLine: "auto"
            }
        ]
    },
    parserOptions: {
        parser: 'babel-eslint'
    },
    globals: {
        
    }
};

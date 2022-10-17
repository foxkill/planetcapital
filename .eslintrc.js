module.exports = {
    env: {
        es6: true,
        node: true,
        jest: true,
        browser: true
    },
    extends: [
        "eslint:recommended",
        "plugin:react/recommended",
    ],
    parser: "@typescript-eslint/parser",
    plugins: [
        "@typescript-eslint",
        "react",
    ],
    parserOptions: {
        ecmaVersion: 2017,
        sourceType: "module",
        ecmaFeatures: {
            jsx: true
        }
    },
    overrides: [{
        files: ["**/*.ts", "**/*.tsx"]
    }],
    rules: {
        indent: ["error", 4],
        "linebreak-style": ["error", "unix"],
        quotes: [0, "double"],
        "no-console": "warn",
        "no-unused-vars": "off",
        "@typescript-eslint/no-unused-vars": [
            "error",
            { vars: "all", args: "after-used", ignoreRestSiblings: false },
        ],
        "@typescript-eslint/explicit-function-return-type": "warn", // Consider using explicit annotations for object literals and function return types even when they can be inferred.
        "no-empty": "warn",
        "no-undef": "off",
    },
};
module.exports = {
    env: {
        es2021: true,
        node: true
    },
    extends: [
        "eslint:recommended",
        "plugin:react/recommended",
        "plugin:@typescript-eslint/recommended",
        "prettier",
        "prettier/@typescript-eslint",
        "prettier/react"
    ],
    parser: "@typescript-eslint/parser",
    parserOptions: {
        ecmaFeatures: {
            jsx: true
        },
        ecmaVersion: 12,
        sourceType: "module"
    },
    plugins: ["react", "@typescript-eslint"],
    settings: {
        react: {
            version: "detect"
        }
    },
    rules: {
        // "no-console": "warn"
    }
};

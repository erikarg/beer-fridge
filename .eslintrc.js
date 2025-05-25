module.exports = {
    parser: "@typescript-eslint/parser",
    plugins: ["@typescript-eslint/eslint-plugin"],
    extends: [
        "plugin:@typescript-eslint/recommended",
        "plugin:prettier/recommended",
    ],
    root: true,
    env: {
        node: true,
        jest: true,
    },
    ignorePatterns: [".eslintrc.js", "dist/", "node_modules/"],
    rules: {
        // TypeScript specific rules
        "@typescript-eslint/no-unused-vars": [
            "error",
            { argsIgnorePattern: "^_" },
        ],
        "@typescript-eslint/explicit-function-return-type": "off",
        "@typescript-eslint/no-explicit-any": "warn",
        "@typescript-eslint/prefer-nullish-coalescing": "error",
        "@typescript-eslint/prefer-optional-chain": "error",

        // General rules
        "no-console": "warn",
        "no-trailing-spaces": "error",
        "eol-last": "error",
        "prefer-const": "error",

        // Prettier integration
        "prettier/prettier": [
            "error",
            {
                singleQuote: true,
                trailingComma: "es5",
                tabWidth: 2,
                semi: true,
            },
        ],
    },
};

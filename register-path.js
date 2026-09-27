// Preloaded by `expressots prod` (node -r ./dist/register-path.js) so the
// tsconfig "paths" aliases resolve against the compiled output in dist/.
// Keep in sync with compilerOptions.paths in tsconfig.json.
const tsConfigPaths = require("tsconfig-paths");

tsConfigPaths.register({
    baseUrl: __dirname,
    paths: {
        "@useCases/*": ["src/useCases/*"],
    },
});

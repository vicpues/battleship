import js from "@eslint/js";
import eslintConfigPrettier from "eslint-config-prettier";
import globals from "globals";
import { includeIgnoreFile } from "@eslint/compat";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const gitignorePath = path.resolve(__dirname, ".gitignore");

export default [
    includeIgnoreFile(gitignorePath),
    js.configs.recommended,
    eslintConfigPrettier,
    {
        files: ["src/**/*.*([mc])js"],
        languageOptions: {
            globals: {
                ...globals.browser,
            },
        },
    },
    {
        files: ["**/*.*([mc])js"],
        ignores: ["src", "tests"],
        languageOptions: {
            globals: {
                ...globals.commonjs,
                ...globals.node,
            },
        },
    },
    {
        files: ["**/*.test.*([mc])js"],
        languageOptions: {
            globals: {
                ...globals.jest,
            },
        },
    },
];

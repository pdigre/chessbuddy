import { fixupConfigRules } from "@eslint/compat";
import path from "node:path";
import { fileURLToPath } from "node:url";
import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
});

export default [
    ...fixupConfigRules(compat.extends("react-app", "react-app/jest")),
    {
        rules: {
            "@typescript-eslint/no-useless-constructor": "off",
            "import/no-useless-path-segments": "off"
        }
    }
];

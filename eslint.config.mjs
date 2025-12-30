import { defineConfig, globalIgnores } from "eslint/config";
import pluginNext from "eslint-config-next";

const eslintConfig = defineConfig([
  ...pluginNext.configs["recommended"],
  globalIgnores([
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    // Ignore legacy Gatsby files during migration
    "gatsby-*.js",
    ".cache/**",
    "public/**",
  ]),
]);

export default eslintConfig;

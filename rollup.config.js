import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import dts from "rollup-plugin-dts";
import {terser} from "rollup-plugin-terser";
import peerDepsExternal from "rollup-plugin-peer-deps-external";

import packageJson from "./package.json" assert {type: "json"};

export default [
  {
    input: "./src/main.ts",
    output: [
      {
        file: packageJson.main,
        format: "cjs",
        sourcemap: true,
      },
      {
        file: packageJson.module,
        format: "esm",
        sourcemap: true,
      },
    ],
    plugins: [
      peerDepsExternal(),
      resolve(),
      commonjs(),
      typescript({tsconfig: "./tsconfig.json"}),
      terser()
    ],
    external: ["react", "react-dom", "styled-components"],
  },
  {
    input: "dist/main.d.ts",
    output: [{file: "dist/main.d.ts", format: "esm"}],
    plugins: [
      dts()
    ],
  }
];

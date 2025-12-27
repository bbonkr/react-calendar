import typescript from 'rollup-plugin-typescript2';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import resolve from '@rollup/plugin-node-resolve';
import babel from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import copy from 'rollup-plugin-copy';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
// Read package.json via fs (avoid import assertions)
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const pkg = JSON.parse(
  fs.readFileSync(path.resolve(__dirname, 'package.json'), 'utf-8')
);

const extensions = ['.js', '.jsx', '.ts', '.tsx'];
const external = ['react', 'react-dom', 'dayjs'];

process.env.BABEL_ENV = 'production';

/**
 * @type {import('rollup').RollupOptions}
 */
const config = {
    input: 'src/index.ts',
    output: [
        {
            file: pkg.main,
            format: 'cjs',
            sourcemap: true,
        },
        {
            file: pkg.module,
            format: 'esm',
            sourcemap: true,
        },
    ],
    plugins: [
        resolve({ extensions }),
        babel({
            exclude: /node_modules/,
            babelHelpers: 'runtime',
        }),
        commonjs({
            include: /node_modules/,
        }),
        typescript({
            tsconfig: 'tsconfig.json',
            useTsconfigDeclarationDir: false,
            declarationDir: 'dist',
            clean: true,
            // verbosity: 3,
        }),
        peerDepsExternal(),
        copy({
            targets: [{ src: 'src/**/*.css', dest: 'dist' }],
        }),
    ],
    external,
};

export default config;

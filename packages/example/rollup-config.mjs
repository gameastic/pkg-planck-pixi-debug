import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import copy from 'rollup-plugin-copy';
import livereload from 'rollup-plugin-livereload';
import serve from 'rollup-plugin-serve';

export default [
    {
        input: 'src/index.ts',

        output: [
            //
            { dir: 'dist', format: 'esm' },
        ],

        plugins: [
            //
            typescript(),
            commonjs({ sourceMap: false }),
            resolve({ preferBuiltins: false }),
            serve({ port: 8080 }),
            livereload({ delay: 0 }),
            copy({
                targets: [{ src: 'assets', dest: 'dist' }],
            }),
        ],
    },
];

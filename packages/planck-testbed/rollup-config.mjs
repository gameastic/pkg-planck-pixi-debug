import terser from '@rollup/plugin-terser';
import typescript from '@rollup/plugin-typescript';

export default [
    {
        input: 'src/index.ts',

        external: ['@box2d/core', 'pixi.js'],

        output: [
            //
            { file: 'dist/index.js', sourcemap: true, format: 'esm' },
            { file: 'dist/index.min.js', format: 'esm', plugins: [terser()] },
        ],

        plugins: [
            //
            typescript(),
        ],
    },
];

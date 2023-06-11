// // import commonjs from '@rollup/plugin-commonjs';
// // import resolve from '@rollup/plugin-node-resolve';
// // import copy from 'rollup-plugin-copy';
// import esbuild from 'rollup-plugin-esbuild';
// // import livereload from 'rollup-plugin-livereload';
// // import serve from 'rollup-plugin-serve';
// import typescript from 'rollup-plugin-typescript';

// export default [
//     {
//         input: 'src/index.ts',

//         output: [
//             //
//             { dir: 'dist', format: 'esm' },
//         ],

//         plugins: [
//             //
//             typescript(),
//             esbuild({
//                 target: 'es6',
//                 loaders: 'ts',
//                 exclude: 'node_modules',
//                 platform: 'browser',
//             }),
//             // serve({ port: 8080 }),
//             // livereload({ delay: 0 }),
//             // copy({
//             //     targets: [{ src: 'assets', dest: 'dist' }],
//             // }),
//         ],
//     },
// ];

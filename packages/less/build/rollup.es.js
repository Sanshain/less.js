//@ts-check

const rollup = require('rollup');
/**
 * @type {Function}
 */
//@ts-ignore
const typescript = require('rollup-plugin-typescript2');
/**
 * @type {Function}
 */
//@ts-ignore
const commonjs = require('@rollup/plugin-commonjs');
/**
 * @type {Function}
 */
//@ts-ignore
const json = require('@rollup/plugin-json');
const resolve = require('@rollup/plugin-node-resolve').nodeResolve;
const terser = require('rollup-plugin-terser').terser;
const banner = require('./banner');
const path = require('path');

const rootPath = path.join(__dirname, '..');

const args = require('minimist')(process.argv.slice(2));

let outDir = './dist/mjs';

async function buildBrowser() {
    let bundle = await rollup.rollup({
        input: './src/less-browser/bootstrap.js',
        output: [
            // {
            //     file: 'less-browser.js',
            //     format: 'iife'
            // },
            {
                file: 'less.js',
                format: 'iife',
                name: 'less'
            },
            {
                file: 'less.min.js',
                format: 'iife',
                name: 'less'
            }
        ],
        plugins: [
            resolve(),
            commonjs(),
            json(),
            typescript({
                verbosity: 2,
                tsconfigDefaults: {
                    compilerOptions: {
                        allowJs: true,
                        sourceMap: true,
                        target: 'ES5'
                    }
                },
                include: [ '*.ts', '**/*.ts', '*.js', '**/*.js' ],
                exclude: ['node_modules'] // only transpile our source code
            }),
            terser({
                compress: true,
                include: [/^.+\.min\.js$/],
                output: {
                    comments: function(node, comment) {
                        if (comment.type == "comment2") {
                            // preserve banner
                            return /@license/i.test(comment.value);
                        }
                    }
                }
            })
        ]
    }); 

    if (!args.out || args.out.indexOf('less.js') > -1) {
        const file = args.out || `${outDir}/less.js`;
        console.log(`Writing ${file}...`);
        await bundle.write({
            file: path.join(rootPath, file),
            format: 'es',
            name: 'less',
            banner
        }); 
    }

    if (!args.out || args.out.indexOf('less.min.js') > -1) {
        const file = args.out || `${outDir}/less.min.js`;
        console.log(`Writing ${file}...`);
        await bundle.write({
            file: path.join(rootPath, file),
            format: 'es',
            name: 'less',
            sourcemap: true,
            banner
        });
    }
}

async function build() {
    await buildBrowser();
}

build();

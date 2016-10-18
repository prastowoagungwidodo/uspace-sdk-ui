var webpack = require('webpack');
var path = require('path');

var BUILD_DIR = path.resolve(__dirname, 'dist/');
var APP_DIR = path.resolve(__dirname);

var config = {
    externals: [
        {
            react: {
                root: 'React',
                commonjs2: 'react',
                commonjs: 'react',
                amd: 'react'
            }
        }
    ],

    module: {
        loaders: [
            {
                test: /\.(jsx|js)$/,
                exclude: /node_modules/,
                loader: 'babel'
            }
        ]
    },
    plugins:[
        new webpack.optimize.UglifyJsPlugin({minimize: true})
    ],
    entry: APP_DIR + '/src/index.js',
    output: {
        path: BUILD_DIR,
        filename: 'bundle.js',
        library: 'uspace-sdk-ui',
        libraryTarget: 'umd'
    }
};

module.exports = config;

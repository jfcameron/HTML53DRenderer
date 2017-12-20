const path    = require('path');
const webpack = require("webpack");

module.exports = 
{
    resolve: 
    {
        extensions:
        [
            '.tsx',
            '.ts',
            '.js'
        ],

        modules: 
        [
            path.resolve('./src/js'),
            path.resolve('./src/css'),
            path.resolve('./src/img'),
            path.resolve('./src/html'),

            path.resolve('./../Engine/src/'),
        ]
    },

    context: path.resolve(__dirname, './src/'),

    entry: './js/main.ts',

    output: 
    {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    },

    plugins: 
    [
        /*new webpack.optimize.UglifyJsPlugin //Requires ES5 transpilation
        ({
            minimize: true,
            mangle: true,
            compress: true,
            warnings: true
        }),*/
    ],

    module: 
    {
        rules: 
        [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/
            },

            {
                test: /\.(html|ico)$/,
                use: 
                [
                    {
                        loader: 'file-loader',
                        options: 
                        {
                            name: '[name].[ext]'
                        }  
                    }
                ]
            },

            {
                test: /\.(css)$/,
                use: 
                [
                    {
                        loader: 'file-loader',
                        options: 
                        {
                            name: '/css/[name].[ext]'
                        }  
                    }
                ]
            },

            {
                test: /\.(png|jpg|gif)$/,
                use: 
                [
                    {
                        loader: 'file-loader',
                        options: 
                        {
                            name: '/img/[name].[ext]'
                        }  
                    }
                ]
            }
        ]
    }
};

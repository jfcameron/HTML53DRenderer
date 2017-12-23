const path    = require('path');
const webpack = require("webpack");

module.exports = (env) =>
{
    //--------------
    // Build configs
    //--------------
    const stdconfig = 
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

        entry: './ts/main.ts',

        output: 
        {
            filename: 'bundle.js',
            path: path.resolve(__dirname, 'dist')
        },

        plugins: 
        [
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
                    ],
                    exclude: /node_modules/
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
                    ],
                    exclude: /node_modules/
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
                    ],
                    exclude: /node_modules/
                }
            ]
        }
    };

    const debugcfg =
    {
        devtool: 'inline-source-map'
    }

    const releasecfg =
    {

        plugins: 
        [
            new webpack.optimize.UglifyJsPlugin
            ({
                minimize: true,
                mangle: true,
                compress: true,
                warnings: true
            }),
        ]
    };

    //--------------------
    // Export final config
    //--------------------
    let config;

    if (env.release === true)
    {
        config = Object.assign(stdconfig, releasecfg);
    }
    else if (env.debug === true)
    {
        config = Object.assign(stdconfig, debugcfg);
    }

    return config;
}

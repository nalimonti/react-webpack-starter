const HtmlWebPackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require('path');


module.exports = {
    entry: [
        'babel-polyfill',
        path.join(__dirname, './src/js/index'),
    ],
    output: {
        path: path.join(__dirname, './src/js'),
        filename: 'bundle.js',
        publicPath: '/',
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015', 'react', 'stage-0'],
                    plugins: [
                        [
                            'react-transform',
                            {
                                transforms: [
                                    {
                                        transform: 'react-transform-hmr',
                                        imports: ['react'],
                                        // this is important for Webpack HMR:
                                        locals: ['module'],
                                    },
                                ],
                            },
                        ],
                    ],
                },
            },
            {
                test: /\.html$/,
                use: [
                    {
                        loader: "html-loader",
                        options: {minimize: true}
                    }
                ]
            },
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, "css-loader"]
            }
        ]
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: "./src/index.html",
            filename: "./index.html"
        }),
        new MiniCssExtractPlugin({
            filename: "[name].css",
            chunkFilename: "[id].css"
        })
    ]
};

"use strict";
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
process.env.NODE_ENV === 'development';
module.exports = {
    entry: './client/src/index.js',
    mode: process.env.NODE_ENV,
    output: {
        path: path.resolve(__dirname, './build'),
        filename: 'bundle.js',
    },
    module: {
        rules: [
            {
                test: /\.jsx?/,
                exclude: /(node_modules)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-react', '@babel/preset-env'],
                    },
                },
            },
            {
                test: /\.tsx?$/,
                exclude: /(node_modules)/,
                use: 'ts-loader',
            },
            {
                test: /\.s[ac]ss$/i,
                use: ['style-loader', 'css-loader', 'sass-loader'],
            },
        ],
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js'],
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            title: 'Harmonode',
        }),
    ],
    devServer: {
        historyApiFallback: {
            index: '/index.html', // Specify the entry point HTML file
        },
    },
    stats: {
        children: true, // Enable detailed stats for child compilations
    },
};
//# sourceMappingURL=webpack.config.js.map
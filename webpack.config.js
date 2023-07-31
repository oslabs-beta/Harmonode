const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
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
        test: /\.s?[ac]ss$/i,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.(png|jp(e*)g|svg|gif)$/,
        include: path.resolve(__dirname, 'server'),
        use: [
          {
            loader: 'file-loader',
            options: {
              outputPath: '',
              name: '[name].[ext]',
            },
          },
        ],
      },
      { test: /\\.(png|jp(e*)g|svg|gif)$/, use: ['file-loader'] },
    ],
  },

  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
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
    client: {
      overlay: {
        runtimeErrors: (error) => {
          if (error.message === 'ResizeObserver loop limit exceeded') {
            return false;
          }
          return true;
        },
      },
    },
  },
};

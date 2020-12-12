const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
  mode: 'production',
  output: {
    path: path.resolve('lib'),
    filename: 'index.js',
    libraryTarget: 'commonjs2',
  },
  entry: './src/index.tsx',
  externals: [
    {
      react: 'react',
      'react-dom': 'react-dom',
      'prop-types': 'prop-types',
    },
  ],
  module: {
    rules: [
      {
        test: /\.(js|ts)x?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              modules: {
                localIdentName: '[name]__[local]--[hash:base64:5]',
              },
            },
          },
        ],
        include: /\.mod\.css$/,
      },
      {
        test: /\.svg$/,
        use: [
          {
            loader: 'svg-url-loader',
            options: {
              limit: 10000,
            },
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
  },
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin()],
  },
};

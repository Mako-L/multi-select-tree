const path = require('path');

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
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
  },
};

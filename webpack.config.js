var path = require('path');
var webpack = require('webpack');

module.exports = {
  mode: 'production',
  entry: {
    index: './lib/index.ts',
  },
  target: 'node',
  module: {
    rules: [{ test: /\.ts(x?)$/, loader: 'ts-loader' }],
  },
  plugins: [new webpack.DefinePlugin({ 'process.env.NODE_ENV': '"production"' })],
  resolve: {
    extensions: ['.ts', '.js'],
  },
  output: {
    libraryTarget: 'commonjs',
    path: path.join(__dirname, 'dist'),
    filename: '[name].js',
  },
};

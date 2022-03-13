const nodeExternals = require('webpack-node-externals');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
  target: 'node',
  externals: [nodeExternals()],
  entry: {
    bundle: './server.js',
    'bundle.min': './server.js',
  },
  devtool: 'source-map',
  output: {
    filename: '[name].js',
    libraryTarget: 'commonjs2',
  },
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin()],
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              [
                'env',
                {
                  targets: {
                    node: 'current',
                  },
                },
              ],
            ],
          },
        },
      },
    ],
  },
};

const path = require('path');

module.exports = {
  entry: path.resolve(__dirname, 'src/index.js'),
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: [{
          loader: 'babel-loader',
        }],
      },
    ],
  },
  resolve: {
    extensions: ['*', '.js', '.jsx'],
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index.js',
    library: 'PurpleDot',
    libraryTarget: 'umd',
    globalObject: 'this',
  },
  target: 'web',
  mode: 'production',
  externals: {
    react: 'react',
  },
};

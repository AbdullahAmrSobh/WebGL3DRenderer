const path = require('path');

module.exports = {
  mode: 'development',
  devtool: 'eval-source-map',
  entry: './target/main.js',
  
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  
  resolve: {
    alias:{ 
      Engine: path.resolve(__dirname, './target'),
      Assets: path.resolve(__dirname, './target/assets'),
      Models: path.resolve(__dirname, './target/assets/models'),
      Shaders: path.resolve(__dirname, './target/assets/shaders'),
    }
  },

  module: {
    rules: [
      { test: /\.glsl$/, use: 'raw-loader' }
     ]
  },  
  
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    compress: true,
    port: 9000
  }
};

//webpack --display-error-details --watch -d
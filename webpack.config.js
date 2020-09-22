const path = require('path');

module.exports = {
  
  entry: './target/main.js',
  
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  
  resolve: {
    alias:{ 
      Engine: path.resolve(__dirname,  './target'),
    }
  },

  module: {
    rules: [
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          'file-loader',
        ],
      },
     ]
  }
};

//webpack --display-error-details --watch -d
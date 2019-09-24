const path = require('path');

module.exports = {
  entry: './predist/main.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  resolve: {
    alias:{ 
      Engine: path.resolve(__dirname,  './predist'),
    }
  }
};

//webpack --display-error-details --watch -d
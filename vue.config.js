const path = require('path');

function resolve(dir) {
  return path.join(__dirname, dir);
}

module.exports = {
  pages: {
    index: {
      entry: './examples/main.js',
    },
  },
  configureWebpack: {
    resolve: {
      alias: {
        '@': resolve('examples'),
        '@a': resolve('examples/assets'),
        '@c': resolve('examples/components'),
      },
    },
    externals: {},
  },
};

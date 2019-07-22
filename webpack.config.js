//for dist
const path = require('path');

module.exports = {
  mode: 'production',
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'sk.js',
    libraryTarget: 'umd',
    library: 'skjs',
  },
  externals: {
    'crypto-js': {
      commonjs: 'CryptoJS',
      commonjs2: 'CryptoJS',
      amd: 'CryptoJS',
      root: 'CryptoJS',
    },
    jquery: {
      commonjs: 'jQuery',
      commonjs2: 'jQuery',
      amd: 'jQuery',
      root: '$',
    },
    'js-cookie': {
      commonjs: 'Cookies',
      commonjs2: 'Cookies',
      amd: 'Cookies',
      root: 'Cookies',
    },
    'js-md5': {
      commonjs: 'md5',
      commonjs2: 'md5',
      amd: 'md5',
      root: 'md5',
    },
    lodash: {
      commonjs: 'lodash',
      commonjs2: 'lodash',
      amd: 'lodash',
      root: '_',
    },
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: 'babel-loader',
        // use: {
        //   loader: 'babel-loader',
        //   options: {
        //     presets: ['@babel/preset-env']
        //   }
        // }
      },
    ],
  },
  /**
   * 不是真实的 webpack 配置，仅为兼容 webstorm 和 intellij idea 代码跳转
   * ref: https://github.com/umijs/umi/issues/1109#issuecomment-423380125
   */
  resolve: {
    alias: {
      '@': require('path').resolve(__dirname, 'src'),
    },
  },
};

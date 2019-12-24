export default {
  // cjs: { type: 'babel' },
  cjs: 'babel',
  doc: {
    base: '/sk-js',
  },
  entry: 'src/index.js',
  esm: 'babel',
  umd: {
    globals: {
      'crypto-js': 'CryptoJS',
      'jquery': '$',
      'js-cookie': 'Cookies',
      'js-md5': 'md5',
      '_': 'lodash',
      'moment': 'moment',
    },
    minFile: true,
    sourcemap: true
  },
};

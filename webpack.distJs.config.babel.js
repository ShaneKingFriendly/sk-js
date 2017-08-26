export default {
  entry: {
    'sk': './src/sk.js'
  },

  output: {
    // path: 'dist/js',
    filename: '[name].js',
    library: 'SK',
    libraryTarget: 'umd'
  },

  externals: [
    {
      'lodash': {
        root: '_',
        commonjs2: 'lodash',
        commonjs: 'lodash',
        amd: 'lodash'
      }
    },
    {
      'js-cookie': {
        root: 'Cookies',
        commonjs2: 'js-cookie',
        commonjs: 'js-cookie',
        amd: 'js-cookie'
      }
    }
  ],

  module: {
    loaders: [
      {test: /\.js/, loader: 'babel-loader?cacheDirectory', exclude: /node_modules/}
    ]
  },

  cache: true,
  stats: {
    colors: true,
    reasons: true,
    hash: true,
    version: true,
    timings: true,
    chunks: true,
    chunkModules: true,
    cached: true,
    cachedAssets: true
  }
};

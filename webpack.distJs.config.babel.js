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
    }
  ],

  module: {
    loaders: [
      {test: /\.js/, loader: 'babel?cacheDirectory', exclude: /node_modules/}
    ]
  },

  cache: true,
  debug: true,
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

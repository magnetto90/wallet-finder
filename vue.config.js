const { defineConfig } = require('@vue/cli-service')
const webpack = require('webpack');
module.exports = defineConfig({
  configureWebpack: {
    plugins: [
      new webpack.ProvidePlugin({
        Buffer: ['buffer', 'Buffer'],
      }),
      new webpack.ProvidePlugin({
          process: 'process/browser',
      })
    ],
    resolve: {
      fallback: {
        "os": require.resolve("os-browserify/browser"),
        "url": require.resolve("url/"),
        "crypto": require.resolve("crypto-browserify"),
        "https": require.resolve("https-browserify"),
        "http": require.resolve("stream-http"),
        "assert": require.resolve("assert/"),
        "stream": require.resolve("stream-browserify"),
        "buffer": require.resolve("buffer")
      }
    }
  },

  transpileDependencies: [
    'vuetify'
  ]

})
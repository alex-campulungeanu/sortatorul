module.exports = {
  devServer: {
    proxy: {
      '^/api': {
        target: 'http://localhost:3090',
        changeOrigin: true,
        logLevel: 'debug',
        pathRewrite: { '^/api': '/' },
      }
    },
    overlay: {
      warnings: true,
      errors: true
    },
    port: 3090
  },
  lintOnSave: 'error', //true - for showing the erros only in console
}
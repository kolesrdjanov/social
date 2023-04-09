module.exports = {
  publicPath: './',
  chainWebpack: config => config.optimization.minimize(true),
  productionSourceMap: false,
  devServer: {
    allowedHosts: 'all'
  },
  css: {
    loaderOptions: {
      sass: {
        prependData: `@import "@/styles/base/_vars.scss";`
      },
    },
  },
}

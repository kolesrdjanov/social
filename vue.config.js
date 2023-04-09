module.exports = {
  publicPath: './',
  chainWebpack: config => config.optimization.minimize(true),
  productionSourceMap: false,
  devServer: {
    disableHostCheck: true
  },
  css: {
    loaderOptions: {
      sass: {
        prependData: `@import "@/styles/base/_vars.scss";`
      },
    },
  },
}

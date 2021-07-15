module.exports = {
  publicPath: './',
  css: {
    loaderOptions: {
      sass: {
        prependData: `@import "@/styles/base/_vars.scss";`
      },
    },
  },
}

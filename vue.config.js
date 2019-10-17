module.exports = {
  publicPath: process.env.PUBLIC_PATH,
  configureWebpack: {
    plugins: []
  },
  css: {
    loaderOptions: {
      sass: {
        data: `@import "~@/styles/sass/main.scss"`,
      },
    },
  },
}
module.exports = {
    css: {
      loaderOptions: {
        sass: {
          data: `@import "~@/sass/main.scss";`,
        },
      },
    },
    
    // need the section below to use single file sass variables in components 
    chainWebpack: config => {
      ["vue-modules", "vue", "normal-modules", "normal"].forEach((match) => {
        config.module.rule('sass').oneOf(match).use('sass-loader')
          .tap(opt => Object.assign(opt, { data: `@import '~@/sass/main.sass'` }))
      })
    }
  }
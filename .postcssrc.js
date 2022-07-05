module.exports = {
    plugins: {
      'autoprefixer': {
        browsers: ['Android >= 4.0', 'iOS >= 8']
      },
      "postcss-pxtorem":{
        rootValue:(arg) =>{
            // 动态设置
              console.log(arg);
            //   判断需要处理的样式文件是否是vant组件的
            // arg里面的file属性，为文件的路径
              return arg.file.includes("vant") ? 37.5 : 75;
           },
           ropList:["*"],
              }
      }
    }
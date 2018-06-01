//index.js
//获取应用实例
var app = getApp()
Page( {
  data: {
  },
  onLoad: function() {
    console.log( 'onLoad' )
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo( function( userInfo ) {
      console.log("userInfo", userInfo);
      //更新数据
      that.setData( {
        userInfo: userInfo
      })
    })
  },
  naviToCourse: function(event) {
    console.log("naviToCourse")
    wx.navigateTo({
      url: 'timetable/timetable',
    })
  },
  naviToAttend: function (event) {
    console.log("naviToAttend")
    wx.navigateTo({
      url: 'attend/attend',
    })
  },
  onReady: function () {
    wx.setNavigationBarTitle({
      title: '首页'
    })
    wx.setNavigationBarColor({
      frontColor: '#ffffff',
      backgroundColor: '#009688',
      animation: {
        duration: 400,
        timingFunc: 'easeIn'
      }
    })
  }
})

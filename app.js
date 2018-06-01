//app.js
App({
  onLaunch: function () {
    console.log('App Launch')
    //调用API从本地缓存中获取数据
    // var logs = wx.getStorageSync('logs') || []
    // logs.unshift(Date.now())
    // wx.setStorageSync('logs', logs)
    
  },
  getUserInfo:function(cb){

    if(this.globalData.userInfo){
      typeof cb == "function" && cb(this.globalData.userInfo, this.globalData.openid) 
    }else{
      //调用登录接口
      this.login()
    }
  },
  onShow: function () {
    console.log('App Show')
  },
  onHide: function () {
    console.log('App Hide')
  },
  globalData:{
    server:'http://localhost:5000',
    // server: 'http://192.168.1.103:5000',
    // server: 'http://192.168.1.106:5000', //XJJ
    userInfo:null,
    openid:null
  },
  login: function(){
    var that = this
    wx.login({
      success: function (res) {
        console.log("loginRes:", res)
        if (res.code) {
          //code 换取 session_key及openId
          wx.request({
            url: 'https://api.weixin.qq.com/sns/jscode2session?'
            + 'appid=wx0c968d297f10614b'
            + '&secret=c37e47687189473eebe7d3459aa5a0b3'
            + '&grant_type=authorization_code'
            + '&js_code=' + res.code
            ,
            success: function (res) {
              console.log('sessionRes', res)
              that.globalData.openid = res.data.openid
              //获取用户信息
              wx.getUserInfo({
                success: function (res) {
                  console.log("userInfo", res.userInfo)
                  that.globalData.userInfo = res.userInfo
                  //typeof cb == "function" && cb(that.globalData.userInfo)
                  console.log("that.globalData:", that.globalData)
                }
              })
            }
          })

        } else {
          console.log('获取用户登录态失败！' + res.errMsg)
        }

      }
    })
  }
})
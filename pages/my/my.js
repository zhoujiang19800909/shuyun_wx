const testData = require('../../utils/testData')

//index.js
//获取应用实例
var app = getApp()
Page( {
  data: {
    userInfo: {},
    odooUserInfo: {},
    userExist: false
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo( {
      url: 'register/register',
      success: function(){
        var page = getCurrentPages().pop();
        if (page == undefined || page == null) return;
        page.onLoad();
      }
      
    })
  },

  onLoad: function() {
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo( function( userInfo, openid ) {
      //更新数据
      that.setData( {
        userInfo: userInfo
      })
      //查询Odoo账号
      console.log("getOdooUserByOpenid", openid);
      //TODO 调用util
      wx.request({
        url: app.globalData.server+'/getOdooUserByOpenid?openid=' + openid,
        method: 'GET',
        data: {},
        header: {
          'Accept': 'application/json'
        },
        success: function (res) {
          console.log("odooUserInfo", res.data);
          that.setData({ odooUserInfo: res.data.result });
          if (res.data.rowCnt > 0){
            that.setData({ userExist: true })
          }
          
        },
        fail: function (res){
          console.log("fail", res);
        },
        complete: function (res) {
          console.log("complete", res);
          if (app.globalData.runMode == 'demo'){
            that.setData({ odooUserInfo: testData.odooUser });
            that.setData({ userExist: true })
          }
        }
      })

    })
  },

  onReady: function () {
    wx.setNavigationBarTitle({
      title: '我的'
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

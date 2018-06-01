const util = require('../../../utils/util');

// pages/home/attend/attend.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    students:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    var that = this;
    util.doGet("/getStudentBySession?sessionId=123123", function (res) {
      // console.log("students",res.result);
      that.setData({ students: res.result });

    });

    wx.setNavigationBarTitle({
      title: '签到'
    })
    wx.setNavigationBarColor({
      frontColor: '#ffffff',
      backgroundColor: '#009688',
      animation: {
        duration: 400,
        timingFunc: 'easeIn'
      }
    })
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },
  chkStudent: function (e) {
    console.log("chkStudent",e);
    // e.currentTarget.setStyle("background-color:#ff0000");
    var id = e.currentTarget.id;
    var students = this.data.students;
    for (var i = 0; i < students.length;i++){
      for (var j = 0; j < students[i].length; j++) {
        // console.log(students[i][j].id,id);
        if (id == students[i][j].id){
          // console.log("-----chkStudent------", id);
          students[i][j].chkin = !students[i][j].chkin;
        }
      }
    }
    console.log("-----students------", students);
    this.setData({ students: students});
  }
})
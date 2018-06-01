// pages/my/register/register.js
//获取应用实例
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    usertypes_view: ['学生', '家长', '教师'],
    usertypes: ['student', 'parent', 'faculty'],
    usertype_index: "2",
    genders_view: ['男','女'],
    genders_student: ['f', 'm'],
    genders_faculty: ['male', 'female'],
    gender_index:"1",
    date: '2009-09-09'
  },
  onLoad: function() {
    //自动设置注册信息的性别
    this.setData({ gender_index: app.globalData.userInfo.gender - 1})
  },
  /** 日期选择控制 */
  pickerConfirm: function (e) {
    this.setData({
      pickerHidden: true
    })
    this.setData({
      chosen: e.detail.value
    })
  },
  pickerCancel: function (e) {
    this.setData({
      pickerHidden: true
    })
  },
  pickerShow: function (e) {
    this.setData({
      pickerHidden: false
    })
  },
  //提交事件
  formSubmit: function (e) {
    console.log('form发生了submit事件，携带数据为：', e.detail.value)

    // const Promise = global.Promise = require('../lib/es6-promise')
    // const regeneratorRuntime = global.regeneratorRuntime = require('../lib/regenerator-runtime')
    // const co = require('../lib/co')


    //输入内容检查
    if (e.detail.value["name"] == ""){
      this.setData(
        { popErrorMsg: "姓名不能为空！" }
      );
    } else if(e.detail.value["phone"] == "") {
      this.setData(
        { popErrorMsg: "手机号码不能为空！" }
      );
    }else{
      //检查OK
      this.setData(
        { popErrorMsg: null }
      );
      //调用接口插入学生信息及微信用户信息
      if (e.detail.value["usertype_index"] == 0){
        this.insertStudent(e)
      } else if (e.detail.value["usertype_index"] == 1) {
        this.insertParent(e)
      } else if (e.detail.value["usertype_index"] == 2) {
        this.insertFaculty(e)
      }

    }

    // this.ohShitfadeOut();
    // 执行成功
    wx.showToast({
      title: e.detail.value["name"],
      icon: "success",
      duration: 2000
    })

  },
  //重置事件
  formReset: function (e) {
    console.log('form发生了reset事件，携带数据为：', e.detail.value)
    this.setData({
      chosen: ''
    })
  },
  bindGenderChange: function (e) {
    console.log('bindGenderChange ', e.detail.value)
    this.setData({
      gender_index: e.detail.value
    })
  },
  bindUserTypeChange: function (e) {
    console.log('bindUserTypeChange ', e.detail.value)
    this.setData({
      usertype_index: e.detail.value
    })
  },
  bindDateChange: function (e) {
    this.setData({
      date: e.detail.value
    })
  },
  bindTimeChange: function (e) {
    this.setData({
      time: e.detail.value
    })
  },
  //首先创建学生账户
  insertStudent: function (e) {
    console.log("-------------insertStudent--------------------");
    var that = this
    wx.request({
      url: app.globalData.server + '/insertStudent',
      method: 'POST',
      data: [{
        'name': e.detail.value['name'],
        // 'birth_date': e.detail.value['birth_date'],
        'gender': e.detail.value['gender'],
        'phone': e.detail.value['phone']
      }],
      header: {
        'Accept': 'application/json'
      },
      success: function (res) {
        console.log("insertStudent ID is ", res.data.result.id)
        that.insertWxUser(res,'student')
      }
    })
  },
  //创建家长账户
  insertParent: function (e) {
    console.log("-------------insertParent--------------------");
    var that = this
    wx.request({
      url: app.globalData.server + '/insertParent',
      method: 'POST',
      data: [{
        'name': e.detail.value['name'],
        // 'birth_date': e.detail.value['birth_date'],
        // 'gender': e.detail.value['gender'],
        // 'phone': e.detail.value['phone']
      }],
      header: {
        'Accept': 'application/json'
      },
      success: function (res) {
        console.log("insertParent ID is ", res.data.result.id)
        that.insertWxUser(res, 'parent')
      }
    })
  },
  //创建教师账户
  insertFaculty: function (e) {
    console.log("-------------insertFaculty--------------------", this.data);
    var that = this
    wx.request({
      url: app.globalData.server + '/insertFaculty',
      method: 'POST',
      data: [{
        'name': e.detail.value['name'],
        // 'birth_date': e.detail.value['birth_date'],
        'gender': that.data.genders_faculty[e.detail.value['gender_index']],
        // 'phone': e.detail.value['phone'],
        'last_name': e.detail.value['name'],
        'birth_date': '1900-01-01',
      }],
      header: {
        'Accept': 'application/json'
      },
      success: function (res) {
        console.log("insertFaculty ID is ", res.data.result.id)
        that.insertWxUser(res, 'faculty')
      }
    })
  },
  //绑定微信账户
  insertWxUser: function (res,user_type) {
    console.log("people Id is ", res.data.result.id)
    console.log("app.globalData.userInfo", app.globalData.userInfo)
    wx.request({
      url: app.globalData.server + '/insertWxuser',
      method: 'POST',
      data: [{
        'wx_openid': app.globalData.openid,
        'wx_nickname': app.globalData.userInfo.nickName,
        'wx_avatarUrl': app.globalData.userInfo.avatarUrl,
        'user_type': user_type,
        'student_id': (user_type=='student')?res.data.result.id:null,
        'parent_id': (user_type == 'parent') ? res.data.result.id : null,
        'faculty_id': (user_type == 'faculty') ? res.data.result.id : null,
      }],
      header: {
        'Accept': 'application/json'
      },
      success: function (res) {
        console.log("insertWxUser ID is ", res.data.result.id)

        //返回到登录页面
        wx.switchTab({
          url: '../index',
          success: function () {
            console.log("success---------");
            var page = getCurrentPages().pop();
            if (page == undefined || page == null) return;
            page.onLoad();
          },
          fail: function () {
            // console.log("fail---------", e);
          }
        })

      }
    })
  },

})
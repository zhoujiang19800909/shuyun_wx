// pages/home/timetable/timetable.js
// require('date-utils');
const util = require('../../../utils/util');


//获取应用实例
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    monday: new Date(), //星期一
    sunday: new Date(), //星期日
    mondayView: util.formatDate(new Date()), //星期一用于显示
    sundayView: util.formatDate(new Date()), //星期日用于显示
    startHour:0, //课程表的开始小时
    endHour: 0, //课程表的结束小时
    days: [], //周一到周日的日期
    sessions:[], //课程信息
    selectedSession:{} //选中的课程，默认为当前课程
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
    wx.setNavigationBarTitle({
      title: '课程表'
    })
    wx.setNavigationBarColor({
      frontColor: '#ffffff',
      backgroundColor: '#009688',
      animation: {
        duration: 400,
        timingFunc: 'easeIn'
      }
    })

    //一周日期范围的计算
    //当天
    var currDate = new Date();
    // nowDate.setDate(nowDate.getDate() + 7);
    var nowDay = new Date().getDay();
    //星期一
    var monday = new Date(currDate);
    monday.setDate(currDate.getDate() - nowDay + 1);
    monday.setHours(0);
    monday.setMinutes(0);
    monday.setSeconds(0);
    //星期天
    var sunday = new Date(currDate);
    sunday.setDate(currDate.getDate() - nowDay + 7);
    sunday.setHours(23);
    sunday.setMinutes(59);
    sunday.setSeconds(59);

    that.drawTimetable(monday, sunday);

  }
  ,
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
  //点击
  touchstart:function(e){
    console.log("-------touchend--!------", e.changedTouches[0].x, e.changedTouches[0].y)
    var x = e.changedTouches[0].x;
    var y = e.changedTouches[0].y;
    //UNDO 获取课程对象，并修改颜色
    for (var i in this.data.sessions) {
      var session = this.data.sessions[i];
      if (x > session.x && x < session.x_max && y > session.y && y < session.y_max){
        console.log("touched----->", session.id);
        //设置选中的课程
        this.setData({ selectedSession: session})
      }

    }

  },
  //上一周
  lastWeek: function(e){
    var monday = new Date(this.data.monday);
    monday.setDate(monday.getDate() - 7);
    var sunday = new Date(this.data.sunday);
    sunday.setDate(sunday.getDate() - 7);

    this.drawTimetable(monday,sunday);
  },
  //下一周
  nextWeek: function (e) {
    var monday = new Date(this.data.monday);
    monday.setDate(monday.getDate() + 7);
    var sunday = new Date(this.data.sunday);
    sunday.setDate(sunday.getDate() + 7);

    this.drawTimetable(monday, sunday);
  },
  // 画课程表
  drawTimetable: function (monday,sunday) {
    var that = this;
    console.log("drawTimetable", monday,sunday);

    //计算每周的日数
    var day = new Date(monday);
    var days = [];
    for (var i = 0; i < 7; i++) {
      days[i] = day.getDate();
      // console.log("day------->", day.getDate());
      day.setDate(day.getDate() + 1);
    }

    if(this.data.endHour == 0){
      //根据课程节次设置数据生成课程表表格
      util.doGet('/getTimingStartEnd',
        function (res) {
          that.drawCanvas(res.result.startHour, res.result.endHour, monday, sunday);
          // console.log("onReady--->", monday, sunday);
          that.setData({
            'startHour': res.result.startHour,
            'endHour': res.result.endHour
          })

        }
      );
    }else{
      that.drawCanvas(that.data.startHour, that.data.endHour, monday, sunday);

    }

    this.setData({
      monday: monday,
      sunday: sunday,
      mondayView: util.formatDate(monday),
      sundayView: util.formatDate(sunday),
      days: days
    })
    
  },
  //画课程表(画板)
  drawCanvas: function (startHour, endHour, monday, sunday) {
    var that = this;
    // 使用 wx.createctx 获取绘图上下文 ctx
    var ctx = wx.createCanvasContext('timetable');
    var canvas_left = 45;
    var canvas_width = 300;
    var canvas_height = 200;

    // 设置行列数量
    var grid_cols = 7;
    var grid_rows = endHour - startHour + 1;
    var cell_height = canvas_height / grid_rows;
    var cell_width = canvas_width / grid_cols;

    // ctx.setFillStyle("#ff8699");
    // ctx.fillRect(45,0,300,200);

    // 结束边框描绘
    ctx.beginPath();
    // 准备画时间
    for (var row = 0; row <= grid_rows - 2; row++) {
      
      var y = (row + 1) * cell_height;
      ctx.setFillStyle("#008699");
      ctx.setTextBaseline('middle');
      ctx.setFontSize(12);
      // ctx.setFontSize("10px");
      var hour = startHour + row;
      if (hour < 10) {
        hour = '0' + hour + ':00'
      } else {
        hour = hour + ':00'
      }
      //BUG 点击下一周上一周后会向左偏移
      ctx.fillText(hour, 0, y);
      // console.log("------------------hour---------->", hour);

    }

    // 准备画横线
    for (var col = 0; col <= grid_cols; col++) {
      var x = col * cell_width + canvas_left;
      ctx.moveTo(x, 0);
      ctx.lineTo(x, canvas_height);
    }
    // 准备画竖线
    for (var row = 0; row <= grid_rows; row++) {
      var y = row * cell_height;
      ctx.moveTo(canvas_left, y);
      ctx.lineTo(canvas_width + canvas_left, y);
    }
    ctx.setLineWidth(0.3);
    ctx.setStrokeStyle("rgba(0,86,99,0.3)");
    // ctx.stroke();

    //上课开始结束时间
    var startTime = util.formatTime(monday);
    var endTime = util.formatTime(sunday);
    // console.log("startDate", startTime, endTime);

    //获取课程表数据
    util.doGet("/getSessionByWeek?startTime='" + startTime + "'&endTime='" + endTime + "'",
      function (res) {
        console.log("getSessionByWeek--->", res.result);
        var sessions = res.result;
        for (var i in sessions) {
          // console.log("session--->", sessions[i]);
          var startTime = sessions[i].startTime;
          var endTime = sessions[i].endTime;
          var shortName = sessions[i].shortName;
          var duration = sessions[i].duration;
          var color = sessions[i].color;
          //计算列数
          var colNum = startTime.getDay() - 1;
          //计算行数
          var rowNum = startTime.getHours() - startHour + 1;
          // console.log("colNum", colNum, rowNum, duration);

          // 准备画矩形
          ctx.setFillStyle(color);
          //计算课程的位置信息
          var x = cell_width * colNum + canvas_left;
          var y = cell_height * rowNum;
          var width = cell_width;
          var height = cell_height * duration;
          ctx.fillRect(x, y, width, height);
          //计算课程的边界坐标
          sessions[i].x = x;
          sessions[i].x_max = x + width;
          sessions[i].y = y;
          sessions[i].y_max = y + height;
          // console.log("-------sessions[i]--------", sessions[i]);

          // 填写课程名称
          ctx.setFontSize(12);
          ctx.setFillStyle("#ffffff");
          ctx.setTextAlign('center');
          ctx.setTextBaseline('middle');
          ctx.fillText(shortName, cell_width * (colNum + 1 / 2) + canvas_left,
            cell_height * (rowNum + duration / 2));
          ctx.stroke();
        }
        console.log("set ssession ",that);
        that.setData({ sessions: sessions});
      }
    )
    //画图
    ctx.draw()
  }
})
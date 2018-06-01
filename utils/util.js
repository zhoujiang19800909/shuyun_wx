const testData = require('testData')

var runMode = 'demo'
function doGet(url,successCB){
  console.log("------------util.doGet-------------",url);
  if (runMode == 'demo') {//DEMO模式下，获取本地测试数据
    var result = testData.getData(url)
    successCB({ 'success': true, 'result': result, 'msg': '' })
  }else{
    wx.request({
      url: app.globalData.server + url,
      method: 'GET',
      data: {},
      header: {
        'Accept': 'application/json'
      },
      success: successCB,
      fail: function () {
        //UNDO 失败处理
      },
      complete: function () {
        //UNDO 完成后处理
      }
    })
  }
  



  return "";
}




function formatTime(date) {

  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()

  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

function formatDate(date) {

  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()


  return [year, month, day].map(formatNumber).join('/') 
}

function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}

module.exports = {
  formatTime: formatTime,
  formatDate: formatDate,
  doGet: doGet
}

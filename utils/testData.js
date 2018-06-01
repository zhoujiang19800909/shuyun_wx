//测试数据

function getData(url){


  var urlarray = url.toString().split("?");
  // console.log("urlarray",urlarray);
  var path = urlarray[0];

  switch (path){
    case '/getTimingStartEnd':
      return { 'startHour': 8, 'endHour': 17 };
    case '/getSessionByWeek':

      var startTime = new Date();
      var endTime = new Date();
      var randHour = Math.round( 8 + Math.random() * 6, 0);
      var duration = Math.round(Math.random() * 3, 2);
      startTime.setHours(randHour); 
      endTime.setHours(randHour + duration); 
      
      var startTime1 = new Date();
      var endTime1 = new Date();
      var randHour1 = Math.round(8 + Math.random() * 6, 0);
      var duration1 = Math.round(Math.random() * 2, 2);
      startTime1.setDate(randHour1);
      startTime1.setHours(randHour1 + duration1); 
      endTime1.setDate(startTime1.getDate() + 1);
      endTime1.setHours(14); 
      return [{ 'id': 1, 'startTime': startTime, 'endTime': endTime, 'shortName': '数电', 'duration': duration, 'color': "rgba(256,99,0,0.4)",'timeView':'2018年1月23日 09:00 - 11:30','classroom':'虹口校区 201教室','faculty':'李珍珍','studentCnt':12},
        { 'id': 2, 'startTime': startTime1, 'endTime': endTime1, 'shortName': '图论', 'duration': duration1, 'color': "rgba(256,0,0,0.4)", 'timeView': '2018年1月24日 13:00 - 14:00', 'classroom': '杨浦校区 807教室', 'faculty': '吴聪', 'studentCnt': 32}];
    case '/getStudentBySession':
      return [[{ 'id': 1, 'name': '李小冉', 'image': '../../../image/my.png', 'chkin': false, 'chkout':false }, 
        { 'id': 2, 'name': '李小龙', 'image': '../../../image/my.png', 'chkin': false, 'chkout': false },
        { 'id': 3, 'name': '李小璐', 'image': '../../../image/my.png', 'chkin': false, 'chkout': false },
        { 'id': 4, 'name': '李小刚', 'image': '../../../image/my.png', 'chkin': false, 'chkout': false }],
        [{ 'id': 5, 'name': '李小强', 'image': '../../../image/my.png', 'chkin': false, 'chkout': false },
          { 'id': 6, 'name': '李小勇', 'image': '../../../image/my.png', 'chkin': false, 'chkout': false },
          { 'id': 7, 'name': '李大明', 'image': '../../../image/my.png', 'chkin': false, 'chkout': false },
          { 'id': 8, 'name': '李大大', 'image': '../../../image/my.png', 'chkin': false, 'chkout': false }],
        [{ 'id': 5, 'name': '李小强', 'image': '../../../image/my.png', 'chkin': false, 'chkout': false },
        { 'id': 6, 'name': '李小勇', 'image': '../../../image/my.png', 'chkin': false, 'chkout': false },
        { 'id': 7, 'name': '李大明', 'image': '../../../image/my.png', 'chkin': false, 'chkout': false },
        { 'id': 8, 'name': '李大大', 'image': '../../../image/my.png', 'chkin': false, 'chkout': false }],
        [{ 'id': 9, 'name': '李大红', 'image': '../../../image/my.png', 'chkin': false, 'chkout': false },
          { 'id': 10, 'name': '李大兰', 'image': '../../../image/my.png', 'chkin': false, 'chkout': false },
      {},{}]];
  }

}

module.exports = {
  getData: getData
}
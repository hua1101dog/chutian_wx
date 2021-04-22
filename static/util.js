function changeDataType(obj){
  let str = ''
  if(typeof obj == 'object'){
    for(let i in obj){
      if(typeof obj[i] != 'function' && typeof obj[i] != 'object'){
        str += i + '=' + obj[i] + '&' ;
      }else if (typeof obj[i] == 'object'){
        nextStr = '';
        str += changeSonType(i, obj[i])
      }
    }
  }
  return str.replace(/&$/g, '');
}
function changeSonType(objName, objValue){
  if(typeof objValue == 'object'){
    for(let i in objValue){
      if(typeof objValue[i] != 'object'){
        let value = objName + '[' + i + ']=' + objValue[i];
        nextStr += encodeURI(value) + '&';
      }else{
        changeSonType(objName + '[' + i + ']', objValue[i]);
      }
    }
  }
  return nextStr;
}

function checkLogin(vm,fn){

  vm.$root.userPromiss.then(data => {
      console.log(vm.$root.userInfo)
    if (vm.$root.userInfo && vm.$root.userInfo.id) {
        vm.userInfo = vm.$root.userInfo
        console.log(vm.$root.userInfo)
        fn && fn()
    } else {
      console.log(vm.$root.userInfo)
      vm.$router.push({path: "/attentionQr/attentionQr"});
    }
  })

}

function isWechat(){
  var ua = navigator.userAgent.toLowerCase();
  if(ua.match(/MicroMessenger/i) == 'micromessenger'){
    return true;
  }else{
    return false;
  }
}
function formatMsgTime(timespan) {

  timespan=timespan.replace(/-/g, '/')
  var dateTime = new Date(timespan);

  var year = dateTime.getFullYear();
  var month = dateTime.getMonth() + 1;
  var day = dateTime.getDate();
  var hour = dateTime.getHours();
  var minute = dateTime.getMinutes();
  var second = dateTime.getSeconds();
  var now = new Date();
  var now_new = Date.parse(now.toDateString());  //typescript转换写法
  var timeSpan_new= Date.parse(dateTime.toDateString())
  // var now_new = now.getTime();  //typescript转换写法
  // var timeSpan_new=dateTime.getTime()

  var milliseconds = 0;
  var timeSpanStr;

  milliseconds = now_new - timeSpan_new;

  if (milliseconds <= 1000 * 60 * 1) {
    timeSpanStr = '刚刚';
  }
  else if (1000 * 60 * 1 < milliseconds && milliseconds <= 1000 * 60 * 60) {
    timeSpanStr = Math.round((milliseconds / (1000 * 60))) + '分钟前';
  }
  else if (1000 * 60 * 60 * 1 < milliseconds && milliseconds <= 1000 * 60 * 60 * 24) {
    timeSpanStr = Math.round(milliseconds / (1000 * 60 * 60)) + '小时前';
  }
  else if (1000 * 60 * 60 * 24 < milliseconds && milliseconds <= 1000 * 60 * 60 * 24 * 15) {
    timeSpanStr = Math.round(milliseconds / (1000 * 60 * 60 * 24)) + '天前';
  }
  else if (milliseconds > 1000 * 60 * 60 * 24 * 15 && year == now.getFullYear()) {
    timeSpanStr = month + '-' + day + ' ' + hour + ':' + minute;
  } else {
    timeSpanStr = year + '-' + month + '-' + day + ' ' + hour + ':' + minute;
  }
 
  return timeSpanStr;
};

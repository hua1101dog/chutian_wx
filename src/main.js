// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'

import Mint from 'mint-ui'
import'mint-ui/lib/style.css'

Vue.use(Mint);
Vue.prototype.$http = axios;
// 异常处理

function addInterceptor(){

  
  axios.interceptors.response.use(response => {
    /*return {
      code: response.status,
      message: response.statusText,
      data: response.data
    }*/
    return response.data
  }, err => {
    if (err && err.response) {
      switch (err.response.status) {
        case 400:
          err.message = '错误请求'
          break
        case 401:
          err.message = '未授权，请重新登录'
          // router.push({path:"/login/login"});
          break
        case 403:
          err.message = '拒绝访问'
          break
        case 404:
          err.message = '请求错误,未找到该资源'
          break
        case 405:
          err.message = '请求方法未允许'
          break
        case 408:
          err.message = '请求超时'
          break
        case 500:
          err.message = '服务器端出错'
          break
        case 501:
          err.message = '网络未实现'
          break
        case 502:
          err.message = '网络错误'
          break
        case 503:
          err.message = '服务不可用'
          break
        case 504:
          err.message = '网络超时'
          break
        case 505:
          err.message = 'http版本不支持该请求'
          break
        default:
          err.message = `连接错误${err.response.status}`
      }
      let errData = {
        code: err.response.status,
        message: err.message
      }
      // 统一错误处理可以放这，例如页面提示错误...
      console.log('统一错误处理: ', errData)
    }
    return Promise.reject(err)
  })
}

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  data: function () {
    return {
      userPromiss:"",
      userInfo:{},
    
    }
  },
  methods:{
    getPhotoUrl(url){
      if(!url){
        return "/assets/logo.png";
      }else {
        return url;
      }
    },
    wxLogin(){
      let vm = this;
      this.userPromiss =  new Promise(function(resolve,reject){
          vm.$http.get('/wx/wxLoginUrl').then(resp=>{
            if(resp.data.code === 0){
              //resp.data.data 就是userInfo
              vm.userInfo = resp.data.data;
                resolve(vm.userInfo);
                
            }else if(resp.data.code ===2){
            
              //需要重新登录
               
                  let wxLoginUrl = resp.data.data;
             
                  // if(location.href.indexOf('Qr_code')!==-1){
                  //   location.href=location.href.replace(/Qr_code/g,'attentionQr')
                  //   console.log('location.href1 ----'+location.href)
                  //   // location.href=wxLoginUrl.replace("ACCESS_URL",encodeURIComponent(location.href))
                  //   console.log('location.href2 ----'+location.href)
                  //   console.log('wxLoginUrlPlace'+wxLoginUrl.replace("ACCESS_URL",encodeURIComponent(href)))
                  // }else{
                  //   // location.href=wxLoginUrl.replace("ACCESS_URL",encodeURIComponent(location.href))
                  //   console.log('location.href3 ----'+wxLoginUrl.replace("ACCESS_URL",encodeURIComponent(location.href)))
                  // }
                  location.href=wxLoginUrl.replace("ACCESS_URL",encodeURIComponent(location.href))
             
             
            }
          }).catch((err)=>{
            resolve(undefined)
          });
      })
      return this.userPromiss;
    },
    browserLogin(){
      let vm = this;
      this.userPromiss =  new Promise(function(resolve,reject){
        if(vm.$route.query.token){
          document.cookie='token' +"="+vm.$route.query.token+'; path = /'
        }else{
          console.log("参数错误");
          return;
        }
        vm.$http.get('/auth/userInfo').then(resp=>{
          vm.userInfo = resp.data.data;
          resolve(vm.userInfo)
        }).catch((err)=>{
          resolve(undefined)
        });
      });
      return this.userPromiss;
    },
   
  },
  created(){
    if(isWechat()){
      this.wxLogin();
    }else{
      this.browserLogin();
    }
    addInterceptor();

  },
  router,
  components: { App },
  template: '<App/>'
})

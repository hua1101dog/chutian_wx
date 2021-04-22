<template>
  <div class="bggray">
    <mt-field
      class='myInput'
      :state="state.userName"
      v-model="data.userName"
      :attr="{ 'maxlength': 40 }"
      
      label="姓名"
      placeholder="请输入真实姓名"
      @blur.native.capture="blurElem"
    ></mt-field>
   
    <div class="mint-cell mint-field myInput">
      <div class="mint-cell-wrapper">
        <div class="mint-cell-title">
          <span class="mint-cell-text">性别</span>
        </div>
        <div
          class="mint-cell-value"
          style="display: inline-block;"
        >
          <label
            role="button"
            style="line-height:32px;margin-right: 15px; float: right;"
          >
            <input
              type="radio"
              style="margin:0 5px"
              v-model="data.sex"
              value="女"
              name="sex"
            >女</label>
          <label
            role="button"
            style="line-height:32px;float: right;margin-right: 10px;"
          >
            <input
              type="radio"
              style="margin:0 5px"
              v-model="data.sex"
              value="男"
              name="sex"
            >男</label>
        </div>
      </div>

    </div>
     <mt-field
      class=' myInput'
      :state="state.phone"
      v-model="data.phone"
      :attr="{ 'maxlength': 11 }"
      label="手机号"
      placeholder="请输入您的手机号"
      @blur.native.capture="blurElem"
    ></mt-field>
    <div class="mint-cell mint-field myInput">
      <div class="mint-cell-wrapper">
        <div class="mint-cell-title">
          <span class="mint-cell-text">动态密码</span>
        </div>
        <div
          class="mint-cell-value"
          style="display: inline-block;"
        >
          <input
            placeholder="请输入动态密码"
            type="tel"
            oninput="if(value.length>6)value=value.slice(0,6)"
            pattern="[0-9]*"
            v-model="data.authCode"
            class="mint-field-core"
            style="width: 60%;margin-left: -21px;text-align: center;"
            maxlength="40"
            @blur.native.capture="blurElem"
          >
          <span
            class="mint-cell-text"
            v-if="!isTimer"
            style="color: #129DFF;font-size:14px;padding-left:10px"
            @click="getTimer"
          >动态密码</span>
          <span
            class="mint-cell-text"
            v-if="isTimer"
            style="font-weight:400;font-size:16px;padding-left:10px;font-family: -webkit-body;color: #129DFF"
          >{{timerNum}} s</span>
        </div>
      </div>

    </div>

    <mt-cell
      title="上传人脸照"
      style="clear:both"
    ></mt-cell>
    <span class="faceDetail">园区采用人脸识别开门，请按示意图上传您的照片</span>
    <div class="bg-white photoWrap">
      <div class="userImg">
        <img
          alt=""
          max-height="100%"
          max-width="100%"
          @click="uploadPic"
          :src="data.faceImg"
        >
      </div>
      <div class="userImg">
        <img
          alt=""
          max-height="100%"
          max-width="100%"
          @click="uploadPic"
          :src="data.tip_src"
        >
      </div>
    </div>
    <div class="padlr10">
      <mt-button
        size="large"
        type="primary"
        @click="send()"
      >提交</mt-button>
    </div>

  </div>
</template>
<script>
import { Toast, Indicator } from "mint-ui";
import { DatetimePicker } from "mint-ui";
import { formatDate } from "@/assets/commonUtil.js";
import { constants } from 'fs';
let attrs = [
  { name: "userName", title: "姓名", reg: /^.{2,6}$/ },
  { name: "phone", title: "手机号", reg: /^\d{11}$/}
];
const TIME_COUNT = 60;
export default {
  name: "Qr_code",
  data() {
    return {
      //default_pic.png
      data: {
       
        faceImg: require("../../assets/icons/photo_collect.png"),
        tip_src: require("../../assets/icons/photo_tip.png"),
        'sex':'男',
        photoId:'6655',
          companyId:'',

      },
      state: { userName: "", phone: "" },
      timerNum: 0,
      isTimer: false,
      timer: null, //定时器
    
    };
  },
  filters: {
    formatDate(time) {
      var date = new Date(time);
      return formatDate(date, "yyyy-MM-dd hh:mm");
    }
  },
  watch: {
    data: {
      handler(newVal, oldVal) {
        attrs.forEach(n => {
          if (newVal[n.name] == undefined || newVal[n.name] == "") {
            this.state[n.name] = "";
          } else {
            this.state[n.name] = n.reg.test(newVal[n.name])
              ? "success"
              : "error";
          }
        });
      },
      deep: true
    }
  },
  methods: {
    uploadPic: function() {
      let vm = this;
      wx.chooseImage({
        count: 1,
        sizeType: ["original", "compressed"], // 可以指定是原图还是压缩图，默认二者都有
        sourceType: ["camera", "album"], //, // 可以指定来源是相册还是相机，默认二者都有
        success: function(res) {
          wx.uploadImage({
            localId: res.localIds[0],
            success: function(data) {
              //   var height = $dom.css("height");

              vm.data.faceImg = res.localIds[0];
              vm.data.mediaId = data.serverId;
             
              /*    alert(res.localIds[0])
                      //  $dom.css('height',height);
                      images[position] = data.serverId;*/
            },
            fail: function(res) {
              //   alert(JSON.stringify(res));
              Toast(res);
            }
          });
        }
      });
    },
     blurElem:function(e){
         
              setTimeout(function() {
                var scrollHeight = document.documentElement.scrollTop || document.body.scrollTop || 0;
                window.scrollTo(0, Math.max(scrollHeight - 1, 0));
        }, 100);

              
            }, 
    send: function() {
      let vm = this;
      let attr = attrs.find(n => {
        return vm.state[n.name] != "success";
      });
      if (attr) {
        Toast(attr.title + "输入错误!");
        return;
      }
      if (!this.data.mediaId) {
        Toast("请上传您的照片!");
        return;
      }

      if (!this.data.sex) {
        Toast("请选择性别!");
        return;
      }
      if (!this.data.authCode) {
        Toast("请输入动态密码!");
        return;
      }
     

      let temp = Object.assign({}, this.data);
      Indicator.open({
        text: "提交中...",
        spinnerType: "fading-circle"
      });
      this.$http.post("/customer/addStaff", temp).then(resp => {
        Indicator.close();
        if (resp.code == 0) {
          Toast("信息提交成功");
          this.data= {
        faceImg: require("../../assets/icons/photo_collect.png"),
        tip_src: require("../../assets/icons/photo_tip.png"),
         'sex':'男',
        photoId:'',
          companyId:this.data.companyId,
         }
          this.isTimer = false;
                  clearInterval(this.timer); // 清除定时器
                  this.timer = null;
        } else {
          this.isTimer = false;
                  clearInterval(this.timer); // 清除定时器
                  this.timer = null;
          Toast(resp.msg);
        }
      });
    },
    
    getTimer: function() {
      this.$http
        .get("/free/sendCode", {params:{ mobile: this.data.phone }})
        .then(resp => {
          if (resp.code == 0) {
           
            if (!this.timer) {
              this.timerNum = TIME_COUNT;
              this.isTimer = true;
              this.timer = setInterval(() => {
                if (this.timerNum > 0 && this.timerNum <= TIME_COUNT) {
                  this.timerNum--;
                } else {
                  this.isTimer = false;
                  clearInterval(this.timer); // 清除定时器
                  this.timer = null;
                }
              }, 1000);
            }
          } else {
            Toast(resp.msg);
              this.isTimer = false;
                  clearInterval(this.timer); // 清除定时器
                  this.timer = null;
           
          }
        });
    },
     configWx:function(){
       console.log('configWx')
              this.$http.get("/auth/getJsConfig?url="+location.href).then(function(resp){
                if(resp.code == 0){
                  let config  = resp.data;
                  config.jsApiList = [
                    'checkJsApi',
                    'chooseImage',
                    'previewImage',
                    'uploadImage',
                    'onMenuShareTimeline',
                    'onMenuShareAppMessage',
                    'showAllNonBaseMenuItem'
                  ];
                  config.debug = false;
                  wx.config(config);
                }
              });
            }
  },
  created() {
    let vm = this;
    // this.data.companyId=this.$route.query.id
    this.data.companyId=this.$route.params.id
          vm.$http.get('/wx/wxLoginUrl').then(resp=>{
            console.log('resp'+JSON.stringify(resp))
            if(resp.code === 0){
              //resp.data.data 就是userInfo
              console.log('11111')
              vm.userInfo = resp.data;
              vm.configWx()
              
                
            }else if(resp.code ===2){
            
              //需要重新登录
                  let wxLoginUrl = resp.data;
                  location.href=wxLoginUrl.replace("ACCESS_URL",encodeURIComponent(location.href))
             
             
            }
          })
    
    
   
  },
//      beforeRouteEnter(to, from, next){
// 	next(vm =>{
//     if(vm.$root.userInfo && vm.$root.userInfo.id){
//       next()
//     }else{
//       next({
//         path:'/attentionQr/attentionQr'
//       })
//     }
		
// 	})
// },
};
</script>
<style scoped>
.photoWrap {
  padding: 10px;
}
.gray {
  background-color: #eaeaea;
  color: #999999;
  font-size: 26px;
  height: 60px;
  line-height: 60px;
}
.userImg {
  width: 50%;
  height: 160px;
  margin: 0 auto;
  background-color: white;
  border-radius: 15px;
  display: flex;
  align-items: center;
}
.userImg img {
  max-height: 100%;
  max-width: 100%;
  margin: 0 auto;
}
.faceTitle {
  padding: 0 10px;
}
.faceDetail {
  font-size: 14px;
  text-align: center;
  width: 100%;
  display: inline-block;
  height: 22px;
  background: #fff;
  padding: 5px 0;
}
.sex {
  background: #fff;
  display: inline-block;
}
.getPwd {
  font-size: 12px;
  float: right;
  /* display: inline-block; */
  /* line-height: 35px; */
}
</style>
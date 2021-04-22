<template>
  <div style="background: #F6F6F6;height: 100%">
      <div class="top_scroll_1">
         <img
      v-bind:src="$root.getPhotoUrl(photoUrl)"
      alt=""
      width="100%"
      height="200px"
      :onerror="defaultImgEro"
      style="object-fit: scale-down;"
    >
    
    <div style="background: #fff;margin-bottom: 10px;">
      <p class="titleFont">{{title}}</p>
    </div>
    <mt-cell
      title="活动开始时间"
      :value="beginTime"
    ></mt-cell>
    <mt-cell
      title="活动结束时间"
      :value="endTime"
    ></mt-cell>
   
     <div class="mint-cell mint-field">
      <div class="mint-cell-wrapper">
        <div class="mint-cell-title" style="min-width: 50%;flex: auto;">
          <span class="mint-cell-text">活动地点</span>
        </div>
        <div class="mint-cell-value" style="color:#888;word-break: break-all;flex:0 1 auto;">
         <span>{{place}}</span>
          
        </div>
      </div>

    </div>
    <mt-cell
      title="报名截止时间"
      :value="deadlineTime"
    ></mt-cell>
    
    <div class="mint-cell mint-field">
      <div class="mint-cell-wrapper">
        <div class="mint-cell-title" style="min-width: 50%;flex: auto;">
          <span class="mint-cell-text">主办方</span>
        </div>
        <div class="mint-cell-value" style="color:#888;word-break: break-all;flex:0 1 auto;">
         <span>{{sponsor}}</span>
          
        </div>
      </div>
    </div>
    <mt-cell
      title="报名费"
      :value="price==0?'免费':price"
    ></mt-cell>
    <div
      style="margin:10px 0"
      @click="target('activityPerson')"
    >
      <mt-cell
        title="报名成员"
        is-link
      >
        <span>{{countPeople}}/{{maxPeople}}</span>
      </mt-cell>
    </div>
    <div style="background: #fff;margin: 10px 0px;height: 200px;">
      <label
        for=""
        class="mint-cell-text"
        style="padding:10px;display: inherit;"
      >活动介绍</label>
      <p class="introduction" v-html="content"  style="background: #fff;"></p>
    </div>
      </div>
   <div class="bottom_fix_1">
      <mt-button
      type="primary"
      size="large"
      style="    width: 96%;    margin: 20px 2% 5px; margin-top:0px;"
      v-if="canEnroll==1"
      @click="target('activitySign')"
    >我要报名</mt-button>
    <mt-button
      size="large"
      disabled
      style="width: 96%;     margin: 20px 2% 5px; margin-top:0px;background: #CCCCCC;"
      v-if="canEnroll!==1"
    >{{point}}</mt-button>
   </div>
  </div>

</template>

<script scoped>
import { Toast, Indicator } from "mint-ui";
import { Cell } from "mint-ui";
import { Field } from "mint-ui";
export default {
  name: "acDetail",
  data() {
    return {
            beginTime:'',
           endTime:'',
           deadlineTime :'',
            activityType:1,
            applyRange:1,
          
            content:'',
            countPeople :0,
            createTime:'',
            dataStatus:'',
            isEnroll :0,
            maxPeople:0,
            nickname:'',
            photoUrl:'',
           place:'',
            point :'',
            price:0,
             pubishType :2,
            sponsor:'',
      defaultImgEro: 'this.src="' + require("../../assets/img/error.png") + '"',
      device: "",
      title:'',
      canEnroll:0,

      // ...
    };
  },
  methods: {
    loadMore: function() {
      let vm = this;
      this.$http
        .get("/activity/getByActivityId", {
          params: { activityId: this.$route.params.id }
        })
        .then(resp => {
          if (resp.code == 0) {
            this.beginTime = resp.data.beginTime.substring(0,16)
           this.endTime = resp.data.endTime.substring(0,16)
           this.deadlineTime = resp.data.deadlineTime.substring(0,16)
            this.activityType = resp.data.activityType
            this.applyRange = resp.data.applyRange
            this.content = resp.data.content
             this.countPeople = resp.data.countPeople
              this.createTime = resp.data.createTime
               this.dataStatus = resp.data.dataStatus
         
                this.maxPeople = resp.data.maxPeople
                this.nickname = resp.data.nickname
                this.photoUrl = resp.data.photoUrl
                this.place = resp.data.place
                this.point = resp.data.point
                this.price = resp.data.price
                this.pubishType = resp.data.pubishType
                 this.sponsor = resp.data.sponsor
                this.canEnroll = resp.data.canEnroll
                this.isEnroll = resp.data.isEnroll

          } else {
            Toast("请求失败");
          }
        });
    },
    target: function(str) {
      if (this.device == "ios") {
        var _data = {
          action: str
        };

        window.webkit.messageHandlers.nativeObject.postMessage(_data);
      } else if (this.device == "Android") {
        window.hello.TestMessage(str);
      }
    }
  },
  mounted() {
    let vm = this;
    vm.loadMore();

    var u = navigator.userAgent;
    if (u.indexOf("Android") > -1 || u.indexOf("Linux") > -1) {
      //安卓手机
      this.device = "Android";
    } else if (u.indexOf("iPhone") > -1) {
      //苹果手机
      this.device = "ios";
    } else if (u.indexOf("Windows Phone") > -1) {
      //winphone手机
    }
  }
};
</script>

<style>
.titleFont {
  font-size: 20px;
  font-family: SourceHanSansCN-Medium;
  font-weight: 600;
  color: rgba(51, 51, 51, 1);
  /* margin-top: 17px; */
  margin: -3px 20px 10px 20px;
  /* line-height: 50px; */
}
.mint-cell-text {
  vertical-align: middle;
  /* color: #222222; */
  font-size: 18px;
  font-family: SourceHanSansCN-Regular;
  font-weight: 400;
  color: rgba(34, 34, 34, 1);
  margin-left: 10px;
}
.mint-cell-value {
  color: #888;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  margin-right: 24px;
}
.introduction {
  /* border: 0px; */
  padding: 0px 20px;
  width: 100%;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  margin-right: 24px;
  font-size: 14px;
  font-family: SourceHanSansCN-Regular;
  font-weight: 400;
  color: rgba(102, 102, 102, 1);
    word-break: break-all;
  margin-top: 0px;
 
    
}
.introduction img{
  max-width: 100% !important;
}
.cssAdapt{
    max-width:750px;
    margin:0 auto;
  }
  .fagure{
    padding-top:89%;
     background-repeat:no-repeat;
     background-size:100% 100%;
     
  }
  .bottom_fix_1{
   height: 61px;
 }
 .top_scroll_1{
   height: calc(100% - 81px);
   overflow: auto;
   margin-bottom: 20px;
 }
</style>

<template>
  <div style="background: #F6F6F6;height: 100%;
">
    <div class="top_scroll" :style="{height:(item.isEnroll==0 && item.canEnroll==1?'calc(100% - 198px)':'calc(100% - 81px)')}">
       <img
      v-bind:src="$root.getPhotoUrl(item.photoUrl)"
      alt=""
      width="100%"
      height="200px"
      :onerror="defaultImgEro"
      style="object-fit: scale-down;"
    >

     <!-- <div class="fagure" :style=" {backgroundImage:'url('+item.photoUrl+')'}"></div> -->
   
    <div style="background: #fff;margin-bottom: 10px;">
      <p class="titleFont">{{item.title}}</p>
    </div>
    <mt-cell
      title="活动开始时间"
      :value=item.beginTime
    ></mt-cell>
    <mt-cell
      title="活动结束时间"
      :value=item.endTime
    ></mt-cell>
 
      <div class="mint-cell mint-field">
      <div class="mint-cell-wrapper">
        <div class="mint-cell-title" style="min-width: 50%;flex: auto;">
          <span class="mint-cell-text">活动地点</span>
        </div>
        <div class="mint-cell-value" style="color:#888;word-break: break-all;flex:0 1 auto;">
         <span>{{item.place}}</span>
          
        </div>
      </div>

    </div>
    <mt-cell
      title="报名截止时间"
      :value=item.deadlineTime
    ></mt-cell>
   
    <div class="mint-cell mint-field">
      <div class="mint-cell-wrapper">
        <div class="mint-cell-title" style="min-width: 50%;flex: auto;">
          <span class="mint-cell-text">主办方</span>
        </div>
        <div class="mint-cell-value" style="color:#888;word-break: break-all;flex:0 1 auto;">
         <span>{{item.sponsor}}</span>
          
        </div>
      </div>
    </div>
    <mt-cell
      title="报名费"
      :value="item.price==0?'免费':item.price"
    ></mt-cell>
 
    <div style="background: #fff;margin: 10px 0px">
      
      <p class="introduction" v-html="item.content"></p>

    </div>
    </div>
   <div class="bottom_fix" :style="{height:(item.isEnroll==0 && item.canEnroll==1?'178px':'61px')}">
        <div class="mint-cell mint-field"  v-if="item.isEnroll==0 && item.canEnroll==1">
        <div class="mint-cell-wrapper">
        <div class="mint-cell-title required">
          <span class="mint-cell-text">姓名</span>
        </div>
        <div
          class="mint-cell-value">
          <input class="mint-field-core"
            placeholder="请输入真实姓名"
            @blur.native.capture="blurElem"
             :state="state.name"
             :attr="{ 'maxlength': 40 }"
             v-model="item.name"
            
            type="text">
          
        </div>
      </div>

    </div>
    <div class="mint-cell mint-field"  v-if="item.isEnroll==0 && item.canEnroll==1">
      <div class="mint-cell-wrapper">
        <div class="mint-cell-title required">
          <span class="mint-cell-text">手机号</span>
        </div>
        <div
          class="mint-cell-value">
          <input class="mint-field-core"
            placeholder="请输入您的手机号"
            @blur.native.capture="blurElem"
             :state="state.mobile"
             :attr="{ 'maxlength': 40 }"
             v-model="item.mobile"
             
            type="text">
          
        </div>
      </div>

    </div>
    <mt-button
      type="primary"
      size="large"
      style="width: 96%; margin: 20px 2%;"
      v-if="item.canEnroll==1"
      @click="send()"
    >我要报名</mt-button>
    <mt-button
      size="large"
      disabled
      style="width: 96%; margin: 20px 2%; background: #CCCCCC;"
      v-if="item.canEnroll!==1">{{item.point}}</mt-button>
   </div>
  </div>

</template>

<script>
import { Toast, Indicator } from "mint-ui";
import { Cell } from "mint-ui";
import { Field } from "mint-ui";
import { constants } from 'fs';
  let attrs = [{name:'name',title:'姓名',reg:/^.{2,6}$/},
    {name:'mobile',title:'手机号',reg:/^1[34578]\d{9}$/}];
export default {
  name: "acDetailWx",
  // inject:['reload'],
  //   created(){
  //     this.reload();
  //   },
  data() {
    return {
      item: {},
      defaultImgEro: 'this.src="' + require("../../assets/img/error.png") + '"',
      state: { name: "", mobile: "" }

      // ...
    };
  },
  watch: {
    item: {
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
    loadDeatil: function() {
      let vm = this;
      
      this.$http
        .get("/activity/getByActivityId", {
          params: { activityId: this.$route.params.id }
        })
        .then(resp => {
          if (resp.code == 0) {
            this.item = resp.data;
             this.item.beginTime = resp.data.beginTime.substring(0,16)
               this.item.endTime = resp.data.endTime.substring(0,16)
            // this.item.activeTime=resp.data.beginTime+'~'+resp.data.endTime
             this.item.deadlineTime = resp.data.deadlineTime.substring(0,16)
             
          } else {
            Toast("请求失败");
          }
        });
    },
      blurElem:function(e){
             
              setTimeout(function() {
                var scrollHeight = document.documentElement.scrollTop || document.body.scrollTop || 0;
                window.scrollTo(0, Math.max(scrollHeight - 1, 0));
                 console.log(scrollHeight)
        }, 100);

              
            },    
    send: function(str) {
    
      let attr = attrs.find(n => {
        return this.state[n.name] != "success";
      });
      if (attr) {
        Toast(attr.title + "输入错误!");
        return;
      }
     

      Indicator.open({
        text: "报名中...",
        spinnerType: "fading-circle"
      });
      this.$http
        .get("/activity/enroll", {
          params: {
            activityId: this.$route.params.id,
            name: this.item.name,
            mobile: this.item.mobile
          }
        })
        .then(resp => {
          Indicator.close();
          if (resp.code == 0) {
            Toast("报名成功");
            this.item.isEnroll==1
             this.$router.push("/activity/activity")
          } else {
            Toast(resp.msg);
          }
        });
    }
  },
   created() {
       
    this.loadDeatil();
  },
  mounted() { 
  //   document.getElementById("app").scrollTop = 0;
  // document.getElementByIdx_x("app").scrollTop = 0
  let scrollTop = document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop;
  document.documentElement.scrollTop = document.body.scrollTop = 0;
     window.scrollTo(0,0);
   }

};
</script>

<style scoped>
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
  flex: unset;
}
.introduction {
  /* border: 0px; */
  padding: 20px;
  font-size: 14px;
  font-family: SourceHanSansCN-Regular;
  font-weight: 400;
  color: rgba(102, 102, 102, 1);
  line-height: 21px;
  word-break: break-all;
  
 
}
.introduction img{
  max-width: 100% !important;
}
.required:after{
content: "*";
    color: #ff0000;
    vertical-align: middle
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
 .bottom_fix{
   height: 178px;
 }
 .top_scroll{
   /* height: calc(100% - 198px); */
   overflow: auto;
   margin-bottom: 20px;
 }
</style>

<template>
  <div class="bggray">
    <div class="alignCenter gray">请填写真实预约信息</div>
    <div class="bg-white photoWrap">
      <div class="userImg">
        <img
          alt=""
          max-height="100%"
          max-width="100%"
          @click="uploadPic()"
          :src="data.src"
        />
      </div>
      <div class="userImg">
        <img
          alt=""
          max-height="100%"
          max-width="100%"
          @click="uploadPic()"
          :src="data.tip_src"
        />
      </div>
    </div>

    <mt-field
      class="mgtop10 myInput"
      :state="state.name"
      v-model="data.name"
      :attr="{ maxlength: 40 }"
      label="姓名"
      placeholder="请输入您的姓名"
    ></mt-field>
    <mt-field
      class=" myInput"
      :state="state.phone"
      v-model="data.phone"
      :attr="{ maxlength: 11 }"
      label="手机号"
      placeholder="请输入您的手机号"
    ></mt-field>
    <mt-field
      class=" myInput"
      label="来访时间"
      placeholder="请选择时间"
      type="datetime"
      :readonly="true"
      v-model="data.appointmentTime"
      @click.native="openPicker"
    ></mt-field>
    <mt-field
      class=" myInput"
      label="离开时间"
      placeholder="请选择时间"
      type="datetime"
      :readonly="true"
      v-model="data.endTime"
      @click.native="openPickerLeave"
    ></mt-field>

    <div class="padlr10">
      <mt-button size="large" type="primary" @click="send()"
        >提交申请</mt-button
      >
    </div>

    <mt-datetime-picker
      @touchmove.prevent
      v-model="datetime"
      ref="datePicker"
      type="datetime"
      year-format="{value} "
      month-format="{value} 月"
      date-format="{value} 日"
      hour-format="{value} 点"
      minute-format="{value} 分"
      :startDate="startDate"
      @confirm="closePicker"
      @visible-change="visbleChange"
    >
    </mt-datetime-picker>

    <mt-datetime-picker
      @touchmove.prevent
      v-model="datetime1"
      ref="datePickerLeave"
      type="datetime"
      year-format="{value} "
      month-format="{value} 月"
      date-format="{value} 日"
      hour-format="{value} 点"
      minute-format="{value} 分"
      :startDate="leaveDate"
      :endDate="leaveDateEnd"
      @confirm="closePickerLeave"
      @visible-change="visbleChange"
    >
    </mt-datetime-picker>

    <!-- <mt-navbar v-model="selected">
          <mt-tab-item id="1"><span style="font-size: 16px">访客申请</span></mt-tab-item>
          <mt-tab-item id="2"><span style="font-size: 16px">申请历史</span></mt-tab-item>
        </mt-navbar>

        <mt-tab-container v-model="selected" >
          <mt-tab-container-item id="1">

          </mt-tab-container-item>
          <mt-tab-container-item id="2">
            历史
          </mt-tab-container-item>
        </mt-tab-container>-->
  </div>
</template>
<script>
import { Toast, Indicator } from "mint-ui";
import { DatetimePicker } from "mint-ui";
import { formatDate, formatDate1 } from "@/assets/commonUtil.js";
let attrs = [
  { name: "name", title: "姓名", reg: /^.{2,6}$/ },
  { name: "phone", title: "手机号", reg: /^\d{11}$/ }
];

export default {
  name: "appointment",
  data() {
    return {
      selected: "1",
      //default_pic.png
      data: {
        appointmentTime: "",
        endTime: "",
        src: require("../../assets/icons/photo_collect.png"),
        tip_src: require("../../assets/icons/photo_tip.png")
      },
      state: { name: "", phone: "" },
      datetime: new Date(),
      datetime1: new Date(),
      startDate: new Date(),

      leaveDate: new Date(),
      leaveDateEnd: new Date(),
      handler: function(e) {
        e.preventDefault();
      }
    };
  },
  filters: {
    formatDate(time) {
      var date = new Date(time);
      return formatDate(date, "yyyy/MM/dd hh:mm");
    },
    formatDate1(time) {
      var date = new Date(time);
      return formatDate1(date, "yyyy/MM/dd hh:mm");
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
    openPicker: function() {
      this.$refs.datePicker.open();
    },
    openPickerLeave: function() {
      if (!this.data.appointmentTime) {
        Toast("请先填写来访时间!");
        return;
      }
      var leaveDate = new Date(this.data.appointmentTime).getTime();
      var leaveDateEnd =
        new Date(this.data.appointmentTime).getTime() + 2 * 86400 * 1000; //不得大于来访时间48小时
      this.leaveDate = new Date(leaveDate); //最小值

      this.leaveDateEnd = new Date(leaveDateEnd); //最大值

      this.$refs.datePickerLeave.open();
    },
    closePicker: function(value) {
      this.data.appointmentTime = formatDate(value, "yyyy/MM/dd hh:mm");
      var date = new Date(value).getTime() + 7200 * 1000;

      this.data.endTime = formatDate(new Date(date), "yyyy/MM/dd hh:mm");
      //;

      this.$refs.datePicker.close();
    },
    closePickerLeave: function(value) {
      this.data.endTime = formatDate(value, "yyyy/MM/dd hh:mm");
      this.$refs.datePickerLeave.close();
    },
    visbleChange(val) {
      if (val) {
        this.closeTouch();
      } else {
        this.openTouch();
      }
    },
    /*解决页面层级相互影响滑动的问题*/
    closeTouch() {
      document
        .getElementsByTagName("body")[0]
        .addEventListener("touchmove", this.handler, { passive: false }); //阻止默认事件
    },
    openTouch() {
      document
        .getElementsByTagName("body")[0]
        .removeEventListener("touchmove", this.handler, { passive: false }); //打开默认事件
    },
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

              vm.data.src = res.localIds[0];
              vm.data.mediaId = data.serverId;
              /*    alert(res.localIds[0])
                      //  $dom.css('height',height);
                      images[position] = data.serverId;*/
            },
            fail: function(res) {
              alert(JSON.stringify(res));
            }
          });
        }
      });
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

      if (!this.data.appointmentTime) {
        Toast("请选择预约时间!");
        return;
      }

      if (!this.data.endTime) {
        Toast("请选择离开时间!");
        return;
      }

      let temp = Object.assign({}, this.data);
      let appointmentTimeStr = this.data.appointmentTime.replace(/-/g, "/");
      let endTime = this.data.endTime.replace(/-/g, "/");

      temp.appointmentTime = new Date(appointmentTimeStr).getTime();
      temp.endTime = new Date(endTime).getTime();
      console.log(temp);
      Indicator.open({
        text: "提交中...",
        spinnerType: "fading-circle"
      });

      this.$http.post("/appointment/submitAppointment", temp).then(resp => {
        Indicator.close();
        if (resp.code == 0) {
          vm.selected = "2";
          vm.$router.push("/appointment/success");
        } else {
          Toast(resp.msg);
        }
      });
    },
    configWx: function() {
      this.$http
        .get("/auth/getJsConfig?url=" + location.href)
        .then(function(resp) {
          if (resp.code == 0) {
            let config = resp.data;

            config.jsApiList = [
              "checkJsApi",
              "chooseImage",
              "previewImage",
              "uploadImage",
              "onMenuShareTimeline",
              "onMenuShareAppMessage",
              "showAllNonBaseMenuItem"
            ];
            config.debug = false;
            wx.config(config);
          }
        });
    }
  },
  created() {
    //window.scrollTo(0,0);
    document.documentElement.scrollTop = document.body.scrollTop = 0;

    let vm = this;
    checkLogin(this, function() {
      vm.configWx();
    });
  }
};
</script>
<style scoped>
.photoWrap {
  padding: 10px;
}
.gray {
  background-color: #eaeaea;
  color: #999999;
  font-size: 18px;
  height: 40px;
  line-height: 40px;
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
</style>

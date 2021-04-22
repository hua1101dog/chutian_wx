<template>
  <div>
  <div class="container">
        <!-- <div class="title">{{item.title}}</div> -->
        <!-- <div class="second">
            <span class="zc">{{item.infoType==2?'政策':'新闻'}}</span>
            <span class="time">{{item.createTime}}</span>
            <span class="views">浏览 {{item.readCount || '0'}}</span>
        </div> -->
        <div style="clear:both;padding: 40px 20px;">
            <img style="width: 100%;" class="img-responsive"
              v-bind:src="$root.getPhotoUrl(item.contentPhoto)"
               :onerror="defaultImgEro" />
        </div>
        <div class="introduce">
           {{item.content}}
        </div>

    </div>
  </div>

</template>

<script>
import { Toast, Indicator } from "mint-ui";
export default {
  name: "bannerDetail",
  data() {
    return {
      item: {},
      defaultImgEro: 'this.src="' + require("../../assets/img/error.png") + '"',
    };
  },

  methods: {
    loadDeatil: function() {
      let vm = this;
      this.$http
        .get("/advert/get", {
          params: { advertisementId: this.$route.params.advertisementId }
        })
        .then(resp => {
          if (resp.code == 0) {
            this.item = resp.data;
          } else {
            Toast("请求失败");
          }
        });
    },
      
   
  },
   created() {
       
    this.loadDeatil();
  },
 
 

};
</script>

<style scope>
 .title {
            text-align: left;
            font-size: 22px;
            font-weight: 700;
            padding: 40px 20px;
        }

        .second {
            padding: 0 20px
        }

        .second .zc {
            font-size: 14px;
            font-family: SourceHanSansCN-Regular;
            font-weight: 400;
            color: rgba(51, 121, 242, 1);
            border: 1px solid rgba(51, 121, 242, 1);
            padding: 2px 5px;
        }

        .second .time {
            font-size: 14px;
            font-family: Helvetica; 
            font-weight: 400;
            color: rgba(153, 153, 153, 1);
            margin-left: 15px;
        }

        .second .views {
            font-size: 14px;
            font-family: SourceHanSansCN-Regular;
            font-weight: 400;
            color: rgba(153, 153, 153, 1);
            float: right;
        }

        .introduce {
            padding: 0 20px 40px 20px;
    font-size: 20px;
    font-family: SourceHanSansCN-Regular;
    font-weight: 400;
    color: rgba(34, 34, 34, 1);
    line-height: 30px;
        }
             .introduce img{
 
max-width:100% !important;

  }
</style>

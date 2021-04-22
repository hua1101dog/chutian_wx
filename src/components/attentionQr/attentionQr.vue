<template>
  <div>
  <div class="container">
        <div style="clear:both;padding: 40px 20px;">
            <!-- <img style="width: 100%;" class="img-responsive"
              v-bind:src="$root.getPhotoUrl(item.contentPhoto)"
               :onerror="defaultImgEro" /> -->
                 <img  class="Qrimg"
              v-bind:src="$root.getPhotoUrl(item.contentPhoto)"
               :onerror="defaultImgEro" />
        </div>
        <div  class="content">
          <span class="detail">
            按住图片识别图中二维码关注公众号后，返回至该页面再点击下一步，加入企业;<br>
            如已关注，请直接点击下一步
          </span>
        </div>
          <img  class="arrow" src="../../assets/img/arrow.png" />
            <router-link :to="'/Qr_code/Qr_code/'+companyId">
            <mt-button type="primary" size="large" class="nexBtn">下一步</mt-button>
            </router-link>
        

    </div>
  </div>

</template>

<script>

export default {
  name: "attentionQr",
  data() {
    return {
      item: {},
      companyId:'',
      defaultImgEro: 'this.src="' + require("../../assets/img/ctkc.jpg") + '"',
    };
  },

  methods: {
  
      
   
  },
   created() {
    let vm = this;
    this.companyId=this.$route.query.id
   
  }
  
 

};
</script>

<style scoped>
.content{
      margin: 20px;
    border: 2px solid #1AADFF;
    padding: 15px;
}
  .detail{

    font-weight: 700;
    color: #1AADFF;
    line-height: 23px;
  }
  .nexBtn{
    width: calc(100% - 40px);
    margin: 0 auto;
  }
  .arrow{
    margin: 20px auto;
    display: inherit;
  }
  .Qrimg{
    margin: 0 auto;
    display: inherit;
  }
</style>




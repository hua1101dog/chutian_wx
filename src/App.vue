<template>
  <div id="app" >
    <mt-header fixed :title="subTitle"  v-show="subPage">
          <span @click="goBack" slot="left">
            <mt-button icon="back" ></mt-button>
          </span>
    </mt-header>
    <div style="height: 40px" v-if="subPage"></div>

    <transition :name="transitionName">
      <router-view class="Router" />
    </transition>
    <!--<tabbar :selected="selected" :tabs='tabs'></tabbar>-->
  </div>
</template>

<script>

export default {
  name: 'App',
  components:{},
  // provide() {
  //           return {
  //               reload: this.reload
  //           }
  //       },
  data(){
    return{
      transitionName:'slide-right',
      subPage:false,
      subTitle:"",
      selected:"one",
      tabs:[{id:"one",name:"one"}
        ,{id:"two",name:"two"}
        ,{id:"three",name:"three"}
        ,{id:"four",name:"four"}]
        // ,isReloadAlive:true
    }
  },
  methods:{
    // reload() {
    //             this.transitionName = '';
    //             this.isReloadAlive = false;
    //             this.$nextTick(function () {
    //                 this.isReloadAlive = true;
    //             })
    //         },
    goBack(){
      window.isBack = true;
      if(history.length>2){
        window.history.go(-1);
      }else{
        this.$router.push("/appointment/appointment");
      }
    },
    isSubPage(route){
      if(route.fullPath && /.+\/.+/.test(route.fullPath)){
        if(!route.fullPath == '/appointment/appointment'){
          this.subTitle = route.meta.title;
          this.subPage = true;
        }
      }else{
        this.subPage = false;
      }
    }
  },
  watch:{
    '$route' (to,from){
       let isBack = window.isBack;
       this.transitionName = isBack?'slide-right':'slide-left';
       window.isBack = false;
       document.title = to.meta.title;
      this.isSubPage(to);
    }
  },created: function () {
   
    document.title = this.$route.meta.title;
    this.isSubPage(this.$route);
  }

/*
  pc 与 mobile两套不同的css
  ,created: function () {
    if (document.documentElement.clientWidth > 640) {
      require('./style/index.scss');
      this.plaform = 'pc';
    } else {
      require('./style/mobile.scss');
      this.plaform = 'mobile';
    }
  }*/
}
</script>

<style>
  html,body{
    margin: 0 auto;
    overflow-x: hidden;
    height: 100%;
    background-color: #fff;
  }
  a{
    text-decoration: none;
  }
  strong {
    font-weight: normal;
    font-style: normal;
  }
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  width: 100%;
  margin: 0 auto;
  position: relative;
  height: 100%;
}
.mint-cell-wrapper{
  background-image: none!important;
}
.mint-cell:last-child{
  background-image: none!important;
}
  .mint-tab-item-label{
    white-space: nowrap;
  }
  .mint-header-title{
   font-size: 16px;
  }
  .mint-cell-value{
    color:#BCBCBC;
  }
  .right{
    float: right;
  }
  .left{
    float: left;
  }
  .alignCenter{
    text-align: center;
  }

  .clear:after{
    display: table;
    clear: both;
    content: "";
  }
  .mt5{
    margin-top: 5px;
  }
  .pad5{
    padding: 5px;
  }
  .padt40{
    padding-top: 40px;
  }
  .padlr10{
    padding:10px;
  }
  .mgtop10{
     margin-top: 10px;
   }
   .mr10{
     margin-right: 10px;
   }
   .ml10{
     margin-left: 10px;
   }
.bggray{
  background: #f8f8f8;
}
  .box-shadow {
    box-shadow: 0 2px 2px rgba(0, 0, 0, 0.05), 0 1px 0 rgba(0, 0, 0, 0.05);
  }
  .phead{
    text-indent: 2em
  }
  .Router {
    position: absolute;
    width: 100%;
    transition: all .8s ease;
    /* padding-bottom: 55px; */
  }
  .slide-left-enter,
  .slide-right-leave-active {
    opacity: 0;
    -webkit-transform: translate(100%, 0);
    transform: translate(100%, 0);
  }
  .slide-left-leave-active,
  .slide-right-enter {
    opacity: 0;
    -webkit-transform: translate(-100%, 0);
    transform: translate(-100% 0);
  }
  .mainDiv{
    display: flex;
    flex-direction: column;
  }
  .content {
    flex:1;
  }
  :-moz-placeholder
  {
    text-align: right;
  }
  ::-moz-placeholder
  {
    text-align: right;
  }
  ::-webkit-input-placeholder
  {
    text-align: right;
  }
  .myInput .mint-cell-wrapper{
    border-bottom: 1px solid lightgray;
  }
  .myRadio .mint-cell{
    float: left;
  }
  /*  */
  .myRadio .mint-cell .mint-cell-wrapper{
    padding: 0;
  }
  .line{
    width: 100%;
    height: 10px;
    background: #f7f7f7;
  }
  .border-bot .mint-cell-wrapper{
    width: auto;
    padding: 0;
    margin: 0 10px;
    border-bottom: 1px solid #EEEEEE;
  }
   .h60 .mint-cell-wrapper{
     height: 60px;
   }
   .bg-white{
     background: #fff;
   }
   .h60 .col-12{
    width: 49%;
    display: inline-block;
  }
 .h60 .col-tit{
    color: #333333;
    margin-bottom: 10px;
  }
  .h60 .col-txt{
    color: #666666;
    font-size: 14px;
  }
 .h60 .col-num{
font-size:20px;
font-family:SourceHanSansCN-Normal;
font-weight:400;
color:rgba(5,140,242,1);
line-height:27px;
text-align: right;
  }
  .headTit  .mint-cell-wrapper{
    line-height: 24px;
  }
</style>

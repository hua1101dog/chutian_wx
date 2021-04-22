<template>
  <!-- <mt-search class="mainDiv mySearch" v-model="name" cancel-text="取消"  placeholder="搜索" :show=true> -->
       <div>
         <!-- <p class="acTitle">活动</p> -->
         <div  v-infinite-scroll="loadMore" infinite-scroll-disabled="disableLoading" infinite-scroll-distance="10">
      <div class="cell" v-for="(cell,index) in page.data" :key="index" >
         <router-link :to="'/activity/detailWx/'+cell.id">
        <b class="statusIcon" :class="cell.activityStatus=='1'?'ingIcon':'endIcon'"></b>
           <div class="img" style="    padding: 10px 20px; ">
                <img v-bind:src="$root.getPhotoUrl(cell.photoUrl)" width="100%" height="180" :onerror="defaultImgEro" style="object-fit: scale-down;">
           </div>
          
          <b class="freeorPayIcon" :class="cell.price=='0'?'freeIcon':'payIcon'"></b>
           <div class="content">
                <h3 :class="detailId==cell.id?'active':''">{{cell.title}}</h3>
                <div style="display: flex;">
                  <div class="cont_detail cont_left">{{cell.place}}</div>
                   <div class="cont_detail cont_right">{{cell.beginTime.substring(0,16)}}</div>
                  </div>
            </div>

         </router-link>        
     
      </div>
    </div>
       </div>
    
  <!-- </mt-search> -->
</template>

<script>
 
import { Toast, Indicator } from "mint-ui";
import { Search } from 'mint-ui';
import { Cell } from 'mint-ui';
  export default {
    name: "activity",
    // inject:['reload'],
    // created(){
    //   this.reload();
    // },
    data() {
      return {
        name:"",
        disableLoading: false,
        page:{pageIndex:-1,data:[]},
        detailId:'',
          defaultImgEro: 'this.src="' + require('../../assets/img/error.png') + '"'
        // ...
      };
    },
    methods: {
      loadMore:function(){
        this.disableLoading = true;
        let vm = this;
         
        this.$http.get("/activity/activityList",{params:{pageIndex:this.page.pageIndex+1,name:this.name}}).then((resp)=>{
          vm.page.pageIndex = resp.data.pageIndex;
          vm.page.pageTotal = resp.data.pageTotal;
       
          vm.page.data.push.apply(vm.page.data, resp.data.data);
           if(resp.data.data.length==0){
                 Toast('暂无数据')
          }
          if(resp.data.pageIndex +1 != resp.data.pageTotal){
             
            vm.disableLoading = false;
          }else{
           
             vm.disableLoading = true;
            
          }
        })
      },
    },
   
    beforeRouteEnter(to, from, next){
	next(vm =>{
    if(from.params.id){

      // console.log(from)   // 上一页面的路由信息
           vm.detailId=from.params.id 
    }
		
	})
},
mounted(){

}

  }
</script>

<style>
  .mySearch .mint-searchbar-inner .mintui-search{
    font-size: 18px;
  }
</style>
<style scoped>
  .cell{
        min-height: 66px;
    /* float: left; */
    width: calc(100%-30px);
    min-height: 295px;
    position: relative;
    background: #F2F4F5;
    /* -webkit-box-sizing: border-box; */
    /* box-sizing: border-box; */
    /* padding: 15px; */
   
    -webkit-box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.4);
    box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.4);
    margin: 15px;
    border-radius: 10px;
  }
    .active{
     color: #129DFF !important
   }
  .statusIcon{
 
        position: absolute;
    width: 85px;
    height: 32px;
    text-align: center;
    line-height: 32px;
    color: #fff;
    font-size: 14px;
  }
  .freeorPayIcon{
       position: absolute;
    width: 40px;
    height: 40px;
    right: 15px;
    top: 15px;
  }
  .ingIcon{
     background: url(../../assets/img/ing.png) no-repeat;
        background-size: 100% 100%;
    z-index: 9;
  }
   .endIcon{
     background: url(../../assets/img/end.png) no-repeat;
        background-size: 100% 100%;
    z-index: 9;
  }
  .payIcon{
     background: url(../../assets/img/pay.png) no-repeat;
        background-size: 100% 100%;
    z-index: 9;
  }
    .freeIcon{
     background: url(../../assets/img/free.png) no-repeat;
        background-size: 100% 100%;
    z-index: 9;
  }
  .content{
    box-sizing: border-box;
    margin: 0px 20px;
  }
  .content h3{
    color: #333;
        /* line-height: 20px;
    height: 20px; */
  }
  .content .cont_detail{
       font-size: 15px;
    font-family: SourceHanSansCN-Regular;
    font-weight: 400;
    color: rgba(153,153,153,1);
    margin-bottom: 20px;

  }
  .cellTitle{
    padding: 10px;
    display: inline-block;
    vertical-align: middle;
  }
  .cellName{
    font-size: 18px;
    line-height: 30px;
  }
  .cellLabel{
    color:lightskyblue;
  }
  .cellLabel span{
    padding-right: 5px;
  }
  .mainDiv{
    max-height: 100%;
    overflow-y: auto;
  }
.acTitle{
    text-align: center;
    font-size: 18px;
    font-weight: 700;
}
.cont_right{
 float: right;
    width: 130px;
    margin-top: 2px;
    word-break: break-all;
}
.cont_left{
     flex: 1;
     margin-right: 10px;
     word-break: break-all;
}


</style>

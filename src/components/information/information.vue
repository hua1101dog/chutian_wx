<template>
       <div style="width:100%">
         <!-- <p class="acTitle">活动</p> -->
         <div  v-infinite-scroll="loadMore" infinite-scroll-disabled="disableLoading" infinite-scroll-distance="10" style="width:100%">
      <div class="cell" v-for="(cell,index) in page.data" :key="index" >
         <router-link :to="'/information/detail/'+cell.id">
         <div class="left_box inline_block">
           <div class="left_top" :class="detailId==cell.id?'active':''">{{cell.title}}
            
           </div>
             <span class="zc">{{cell.infoType==2?'政策':'新闻'}}</span>
            <span class="time">{{cell.createTime.split(' ')[0]}}</span>
            <span class="time">{{cell.msgStr}}</span>
             <!-- <div class="left_bottom">
            <span class="zc">{{cell.infoType==2?'政策':'新闻'}}</span>
            <span class="time">{{cell.createTime.split(' ')[0]}}</span>
            <span class="views">浏览 {{cell.readCount || '0'}}</span>
        </div> -->
         </div>
         <div class="right_box inline_block">
                 <img v-bind:src="$root.getPhotoUrl(cell.titlePhoto)"  height= 100%; width="100%" :onerror="defaultImgEro">
         </div>
       
        
         
           <!-- <div class="content">
                <h3 :class="detailId==cell.id?'active':''">{{cell.title}}</h3>
                <p>
                  <span>{{cell.place}}</span>
                   <span style="float: right;">{{cell.beginTime}}</span>
                  </p>
            </div> -->

         </router-link>
     

        
     
      </div>
    </div>
       </div>
    
  <!-- </mt-search> -->
</template>

<script>
import { Search } from 'mint-ui';
import { Cell } from 'mint-ui';
  export default {
    name: "information",
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
         
        this.$http.get("/info/query",{params:{pageIndex:this.page.pageIndex+1,infoType:2}}).then((resp)=>{
          vm.page.pageIndex = resp.data.pageIndex;
          vm.page.pageTotal = resp.data.pageTotal;
         
          vm.page.data.push.apply(vm.page.data, resp.data.data);
            vm.page.data &&  vm.page.data.forEach(element => {
               element.msgStr=formatMsgTime(element.updateTime)
          });
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
}
  }
</script>


<style scoped>
.cell{
 
    position: relative;
    border-bottom: 1px solid rgba(227,227,227,1);
    padding: 20px;
    box-sizing: border-box;
    position: relative;
    
   
  }
     .inline_block{
         display: inline-block
     }
    .active{
     color: #129DFF !important
   }
   .left_box{
       
       margin-right: 110px;
       position: relative;
   
  }
  
  .right_box{
   width: 100px;
    position: absolute;
    right: 0;
    top: 0;
    height: 100%;
    padding: 10px;
    box-sizing: border-box
  
  }
 
 
  .content{
    box-sizing: border-box;
    margin: -15px 20px;
  }

   .left_top {
     padding-bottom: 10px;
     font-size:16px;
font-family:SourceHanSansCN-Regular;
font-weight:400;
color:rgba(34,34,34,1);
        }
  

         .zc {
            font-size: 12px;
            font-family: SourceHanSansCN-Regular;
            font-weight: 400;
            color: rgba(51, 121, 242, 1);
            border: 1px solid rgba(51, 121, 242, 1);
            padding: 2px 5px;
        }

        .time {
           font-size: 12px;
    font-family: Helvetica;
    font-weight: 400;
    color: rgba(153, 153, 153, 1);
    margin-left: 3px;
        }

       .views {
            font-size: 14px;
            font-family: SourceHanSansCN-Regular;
            font-weight: 400;
            color: rgba(153, 153, 153, 1);
            float: right;
        }

  

</style>

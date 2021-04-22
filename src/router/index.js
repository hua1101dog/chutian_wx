import Vue from 'vue'
import Router from 'vue-router'
import appointment from '@/components/appointment/appointment'
import success from '@/components/appointment/success'
import news from '@/components/news/news'
import newsDetail from '@/components/news/newsDetail'
import information from '@/components/information/information'
import informationDetail from '@/components/information/informationDetail'
import activity from '@/components/activity/activity'
import acDetail from '@/components/activity/detail'
import acDetailWx from '@/components/activity/detailWx'
import bannerDetail from '@/components/banner/bannerDetail'
import Qr_code from '@/components/Qr_code/Qr_code'
import attentionQr from '@/components/attentionQr/attentionQr'
import haier from '@/components/haier/haier'
import luoyue from '@/components/luoyue/luoyue'

Vue.use(Router)

export default new Router({
  routes: [
    { path: '/', component: appointment,meta:{title:'访客预约'}},
    { path: '/appointment/appointment',  component: appointment,meta:{title:'访客预约'}},
    { path: '/appointment/success',  component: success,meta:{title:'预约成功'}},
    { path: '/activity/activity',  component: activity,meta:{title:'活动'}},
    { path: '/news/news',  component: news,meta:{title:'园区资讯'}},
    { path: '/news/detail/:id',  component: newsDetail,meta:{title:''}},
    { path: '/information/information',  component: information,meta:{title:'政策汇编'}},
    { path: '/information/detail/:id',  component: informationDetail,meta:{title:''}},
    { path: '/activity/detail/:id',  component: acDetail,meta:{title:'活动详情'}},
    { path: '/activity/detailWx/:id',  component: acDetailWx,meta:{title:'活动详情'}},
    { path: '/banner/bannerDetail/:advertisementId',  component: bannerDetail,meta:{title:'Baner详情'}},
    { path: '/Qr_code/Qr_code/:id',  component: Qr_code,meta:{title:'加入企业'}},
    { path: '/attentionQr/attentionQr',  component: attentionQr,meta:{title:'洺悦府人才公寓'}},
    { path: '/haier/haier',  component: haier,meta:{title:'海尔国际人才公寓'}},
    { path: '/luoyue/luoyue',  component: luoyue,meta:{title:'洺悦府人才公寓'}},

  ],
  scrollBehavior (to, from, savedPosition) {

    return { x: 0, y: 0 }
  }

})

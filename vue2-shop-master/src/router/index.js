import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router);
//按需加载,当渲染其他页面时才加载其组件,并缓存,减少首屏加载时间
const Index = resolve => require(['@/views/Index.vue'], resolve)
const Category = resolve => require(['@/views/Category.vue'], resolve)
const CategoryMain = resolve => require(['@/components/category/main.vue'], resolve)
const Car = resolve => require(['@/views/Car.vue'],resolve)
const User = resolve => require(['@/views/User.vue'], resolve)
const Detail = resolve => require(['@/views/Detail.vue'], resolve)
const Search = resolve => require(['@/views/Search.vue'], resolve)
const Pay = resolve => require(['@/components/car/pay/pay.vue'], resolve)
const Login = resolve => require(['@/views/login.vue'], resolve)
const Coupons= resolve => require(['@/views/Coupons.vue'], resolve)
const BannerDetail = resolve => require(['@/views/BannerDetail.vue'], resolve)
const PhoneLogin = resolve => require(['@/views/PhoneLogin.vue'], resolve)
const Regist = resolve => require(['@/views/Regist.vue'], resolve)
const RegistInformation= resolve => require(['@/views/RegistInformation.vue'], resolve)
const Order= resolve => require(['@/views/Order.vue'], resolve)
const GetCoupons= resolve => require(['@/views/GetCoupons.vue'], resolve)
const Eveluate= resolve => require(['@/views/Eveluate.vue'], resolve)
const UserInformation= resolve => require(['@/views/UserInformation.vue'], resolve)
const UseCoupons= resolve => require(['@/views/UseCoupons.vue'], resolve)

export default new Router({
  routes: [{
      path: '/',
      name: '首页',
      component: Index
    }, {
      path: '/category',
      name: '分类页',
      redirect: '/category/all',
      component: Category,
      children: [{
        path: '/category/:tab',
        component:CategoryMain
      }]
    }, {
      path: '/car',
      name: '购物车页',
      component: Car
    }, {
      path: '/car/pay',
      name: '支付页',
      component: Pay
    },
    {
      path: '/user',
      name: '用户页',
      component: User,
      meta: {
           requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录才能进入的
       },
    }, {
      path: '/detail',
      name: '详情页',
      component: Detail
    },
    {
      path: '/bannerDetail',
      name: '广告详情页',
      component: BannerDetail
    }, {
      path: '/phoneLogin',
      name: '验证码登录',
      component: PhoneLogin
    }, {
      path: '/regist',
      name: '注册',
      component: Regist
    },
    {
      path: '/registInformation',
      name: '注册信息',
      component: RegistInformation
    },
    {
      path: '/getCoupons',
      name: '兑换优惠卷',
      component: GetCoupons
    },
    {
      path: '/useCoupons',
      name: '使用优惠卷',
      component: UseCoupons
    },

    {
      path: '/userInformation',
      name: '用户信息页',
      component: UserInformation
    },
    {
      path: '/order',
      name: '订单信息',
      component: Order
    },
    {
      path: '/eveluate',
      name: '评价',
      component: Eveluate
    },
    {
      path: '/search',
      name: '搜索页',
      component: Search
    },{
      path: '/login',
      name: '登录页',
      component: Login
    },
    {
      path:'/coupons',
      name:'优惠卷页',
      component:Coupons
    }
  ]
})

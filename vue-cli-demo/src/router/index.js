import Vue from 'vue'
import Router from 'vue-router'


//异步加载组件
const Home = () => import('@/components/Home');
const Echarts = () => import('@/components/Echarts');
const Login = () => import('@/components/Login');
const Register = () => import('@/components/Register');
const DataAnalysis = () => import('@/components/DataAnalysis');
const memberList = () => import('@/components/member/memberList');
const Index = () => import('@/components/webview/Index');
Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/Register',
      name: 'Register',
      component: Register
    },
    {
      path: '/Index',
      name: 'Index',
      component: Index
    },
    {
      path: '/Home',
      component: Home,
      children: [
        {
          path: '/Echarts',
          name: 'Echarts',
          component: Echarts,
          meta: {
             requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
          }
        },
        {
          path: '/DataAnalysis',
          name: 'DataAnalysis',
          component: DataAnalysis,
        },
        {
          path: '/memberList',
          name: 'memberList',
          component: memberList,
        },
      ]
    },
  ]
})

router.beforeEach((to, from, next) => {
  let islogin = sessionStorage.getItem("isLogin");
  islogin = Boolean(Number(islogin));//返回布尔值
  if (to.meta.requireAuth) { // 判断该路由是否需要登录权限
    if (islogin) { //true
      next();
    } else {
      next({
        path: '/',
      })
    }
  } else {
    next();
  }
});

export default router


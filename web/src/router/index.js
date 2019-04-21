import Vue from 'vue'
import Router from 'vue-router'

// 导入对应的vuex文件
import store from './../store/store'

// 导入相应的子组件
import Nav from './../components/Nav'
import Hello from './../components/Hello'
import Yike from './../components/Home'
//import Works from './../components/Works'

//后台页面
import login from './../components/admin/login'
import manage from './../components/admin/manage'
import total from './../components/admin/total'
import files from './../components/admin/files'
import fworks from './../components/admin/fworks'
import add from './../components/admin/add'
import upwork from './../components/admin/upwork'

Vue.use(Router)

var router = new Router({
    mode: 'history',
    routes: [
        { 
            name: 'nav', path: '/', redirect:'/home', component: Nav,
            children:[
                {
                    path:'home',
                    component:Yike
                },
                {
                    path: 'works',
                    component: Hello
                }
            ]
        },
        { name: 'login', path: '/login', component: login },
        { 
            name: 'manage', path: '/manage', redirect:'/manage/total', component: manage,
            children:[
                {
                    path:'total',
                    component:total
                },
                {
                    path: 'files',
                    component: files
                }
            ]
        },
        {
            name: 'add',path:'/add',component: add,
            children:[
                {
                    path:'upwork',
                    component:upwork
                },
                {
                    path: 'files',
                    component: files
                }
            ]
        }
    ]
})

export default router
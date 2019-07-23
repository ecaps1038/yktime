import Vue from 'vue'
import Router from 'vue-router'

// 导入对应的vuex文件
import store from './../store/store'

// 导入相应的子组件
import Nav from './../views/Nav'
import Hello from './../views/Hello'
import Yike from './../views/Home'
import detial from './../views/detial'
import Works from './../views/Works'
import Article from './../views/article'

import pages from './../components/pages'
import top from './../components/top'
import workMd from './../components/work-md'

//后台页面
import login from './../views/admin/login'
import manage from './../views/admin/manage'
import total from './../views/admin/total'
import files from './../views/admin/files'
import works from './../views/admin/fworks'
import artic from './../views/admin/fartic'
import add from './../views/admin/add'
import upwork from './../views/admin/upwork'
import preview from './../views/admin/preview'
import diary from './../views/admin/diary'

Vue.use(Router)

var router = new Router({
    mode: 'history',
    routes: [
        { 
            name: 'nav', path: '/', redirect:'/home', component: Nav,
            children:[
                {
                    path:'home',
                    component:Yike,
                    children:[ {path: '',component:top}]
                },
                {
                    path: 'works',
                    component: Works,
                    children:[ {path: '',components:{workMd,pages,top}}]
                },
                {
                    path: 'article',
                    component: Article,
                    children:[ {path: '',components:{workMd,pages,top}}]
                },
                {
                    path: 'detial',
                    component: detial,
                    children:[ {path: '',component:top}]
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
                },
                {
                    path: 'works',
                    component: works,
                    children:[ {path: '',component:pages}]
                },
                {
                    path: 'artic',
                    component: artic,
                    children:[ {path: '',component:pages}]
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
                },
                {
                    path: 'diary',
                    component: diary
                },
                {
                    path: 'preview',
                    component: preview
                }
            ]
        }
    ]
})

export default router
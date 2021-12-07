import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/pages/login'
import Course from '@/pages/course'

// import NavMeny from '../components/NavMeny'
// import Header from '../components/Header'
// import MainContent from '../components/MainContent'
import Index from '@/pages/Index'
import Studentsinformation from '@/pages/studentsinformation'
import Home from '@/pages/home'
Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: Login,
    },

    {
      path: '/',
      name: 'Index',
      component: Index,
      redirect: 'home',
      children: [
          {
              path: '/home',
              name: 'home',
              component: Home,
          },
          {
            path: '/teaching/course',
            name: 'Course',
            component: Course,
            meta: {
                name: '课程管理',
                keepAlive: false,
            }
          },
          {
            path: '/students/studentsinformation',
            name: 'Studentsinformation',
            component: Studentsinformation,
            meta: {
              name: '学生信息管理',
              keepAlive: false,
            }
          },
      ]
    },
  ]
})

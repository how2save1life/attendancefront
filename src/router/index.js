import Vue from 'vue'
import Router from 'vue-router'
import Header from '@/components/box/Header'
import LeftBox from '@/components/box/LeftBox'
import MainBox from '@/components/box/MainBox'
import login from '@/components/login'
import teacherinfo from '@/components/teacherinfo'
import studentinfo from '@/components/studentinfo'
import courseinfo from '@/components/courseinfo'
import teacherAtten from '@/components/teacherAtten'
import goCheck from '@/components/goCheck'
Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/login',
      name: 'login',
      component: login
    },

    {
      path: '/',
      components: {
        'header': Header,
        'left': LeftBox,
        'main': MainBox
      },
      children: [
        {
          path: 'teacherinfo',
          name: 'teacherinfo',
          component: teacherinfo
        }, {
          path: 'studentinfo',
          name: 'studentinfo',
          component: studentinfo
        },
        {
          path: 'courseinfo',
          name: 'courseinfo',
          component: courseinfo
        },
        {
          path: 'teacherAtten',
          name: 'teacherAtten',
          component: teacherAtten
        },
        {
          path: 'goCheck',
          name: 'goCheck',
          component: goCheck
        }

      ],
    },

  ], mode: 'history'   //去除#号
})

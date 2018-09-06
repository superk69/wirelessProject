import Vue from 'vue'
import Router from 'vue-router'
import Dashboard from '@/components/Dashboard'
import Charts from '@/components/Charts'
import Console from '@/components/Console'
import Global from '@/components/Global'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Dashboard',
      component: Dashboard
    },
    {
      path: '/Charts',
      name: 'Charts',
      component: Charts,
      props: true
    },
    {
      path: '/console',
      name: 'Console',
      component: Console
    }
    ,
    {
      path: '/Global',
      name: 'Global',
      component: Global
    }
  ]
})

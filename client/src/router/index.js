import Router from 'vue-router'
import Activities from '@/components/Activities'
import GetStarted from '@/components/GetStarted'
import Detail from '@/components/Detail'

// assign components to routes
export default new Router({
  routes: [
    {
      path: '/',
      component: GetStarted
    },
    {
      path: '/activities',
      component: Activities
    },
    {
      path: '/detail/:name',
      name: 'Detail',
      component: Detail
    }
  ]
})
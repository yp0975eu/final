import Router from 'vue-router'
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
      path: '/detail/:name',
      name: 'Detail',
      component: Detail
    }
  ]
})
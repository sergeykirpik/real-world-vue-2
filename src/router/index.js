import Vue from 'vue'
import VueRouter from 'vue-router'
import EventList from '@/views/EventList.vue'
import EventShow from '@/views/EventShow.vue'
import EventCreate from '@/views/EventCreate.vue'
import FileNotFound from '@/views/FileNotFound.vue'
import User from '@/views/User.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: EventList,
    name: 'EventList',
  },
  {
    path: '/event/create',
    component: EventCreate,
    name: 'EventCreate',
  },
  {
    path: '/event/:id',
    component: EventShow,
    name: 'EventShow',
    props: true,
  },
  {
    path: '/user/:username',
    component: User,
    name: 'User',
    props: true,
  },
  {
    path: '*',
    component: FileNotFound,
  },
]

const router = new VueRouter({
  mode: 'history',
  routes,
})

export default router

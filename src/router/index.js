import {createRouter, createWebHistory} from 'vue-router'
import About from '../views/About.vue'
import Home from '../views/Home.vue'
import MainLayout from '../layouts/MainLayout.vue'

const routes = [
  {
    path: '/',
    name: 'root',
    redirect: '/zoso/comments'
  },
  {
    path: '/zoso',
    // name: 'Home',
    // redirect: "/",
    component: MainLayout,
    children: [
      {
        path: 'comments',
        component: Home
      },
      {
        path: 'about',
        component: About
      }
    ]
  },
  {
    path: '/about',
    name: 'About',
    component: About
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
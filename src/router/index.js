import {createRouter, createWebHistory} from 'vue-router'
import NProgress from 'nprogress'
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

router.beforeResolve((to, from, next) => {
  // If this isn't an initial page load.
  if (to.name) {
      // Start the route progress bar.
      NProgress.start()
  }
  next()
})

router.afterEach(() => {
  // Complete the animation of the route progress bar.
  NProgress.done()
})

export default router
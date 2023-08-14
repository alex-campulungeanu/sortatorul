import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './index.css'
import './assets/styles/tailwind.css'
import '../node_modules/nprogress/nprogress.css'

createApp(App)
  .use(router)
  .mount('#app')
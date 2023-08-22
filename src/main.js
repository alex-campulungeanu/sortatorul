import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './index.css'
import './assets/styles/tailwind.css'
import '../node_modules/nprogress/nprogress.css'

// Vuetify
// import 'vuetify/styles'
// import { createVuetify } from 'vuetify'
// import * as components from 'vuetify/components'
// import * as directives from 'vuetify/directives'

// const vuetify = createVuetify({
//   components,
//   directives
// })

createApp(App)
  .use(router)
  // .use(vuetify)
  .mount('#app')
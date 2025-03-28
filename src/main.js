import { createApp } from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia'
import router from './js/router'
import './styles/main.scss'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import './styles/bootstrap-icons.scss'

const app = createApp(App)
app.use(createPinia())
app.use(router)
app.mount('#app')

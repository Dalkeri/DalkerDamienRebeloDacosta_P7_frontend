import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import VueAxios from 'vue-axios'

axios.defaults.baseURL = "http://localhost:3000/api";
// const Authorization = { 'Bearer '}; 

createApp(App).use(VueAxios, axios).use(store).use(router).mount('#app')


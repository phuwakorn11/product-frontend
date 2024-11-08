// src/main.js

import { createApp } from 'vue';
import App from './App.vue';
import router from './router'; // นำเข้า router

createApp(App)
  .use(router) // ใช้งาน router
  .mount('#app');

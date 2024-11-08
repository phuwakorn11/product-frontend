// src/router/index.js

import { createRouter, createWebHistory } from 'vue-router';

import ProductList from '../components/ProductList.vue';
import ProductAdd from '@/components/ProductAdd.vue';
import OrderList from '@/components/OrderList.vue';
import TransportList from '@/components/TransportList.vue';
import OrderView from '@/components/OrderView.vue';

const routes = [
  {
    path: '/', // เส้นทางหลัก
    name: 'Product List',
    component: ProductList, // แสดงคอมโพเนนต์ Home
  },
  {
    path: '/product/create',
    name: 'Product Add',
    component:ProductAdd,
  },
  {
    path: '/order',
    name: 'Order List',
    component:OrderList,
  },
  {
    path: '/order/view',
    name: 'Order View',
    component:OrderView,
  },
  {
    path: '/transport',
    name: 'Transport List',
    component:TransportList,
  },

  
  
];

const router = createRouter({
  history: createWebHistory(), // ใช้ history mode
  routes, // เส้นทางทั้งหมด
});

export default router;

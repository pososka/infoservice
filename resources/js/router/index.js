import { createRouter, createWebHistory } from 'vue-router';

import FeedbackArchive from '../views/feedback/Archive.vue';
import FeedbackCreate from '../views/feedback/Create.vue';
import Register from '../views/auth/Register.vue';
import Login from '../views/auth/Login.vue';
import Verify from '../views/auth/Verify.vue';

const routes = [
  {
    path: '/',
    component: FeedbackCreate,
  },
  {
    path: '/feedback',
    component: FeedbackArchive,
  },
  {
    path: '/register',
    component: Register,
  },
  {
    path: '/login',
    component: Login,
  },
  {
    path: '/verify',
    component: Verify,
  },
];

export default createRouter({
  history: createWebHistory(),
  routes,
});

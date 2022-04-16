import { createRouter, createWebHistory } from 'vue-router';

import store from '../store';
import FeedbackArchive from '../views/feedback/Archive.vue';
import FeedbackCreate from '../views/feedback/Create.vue';
import Register from '../views/auth/Register.vue';
import Login from '../views/auth/Login.vue';
import Verify from '../views/auth/Verify.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    meta: {
      auth: true,
    },
    component: FeedbackCreate,
  },
  {
    path: '/feedbacks',
    name: 'Feedbacks',
    meta: {
      auth: true,
    },
    component: FeedbackArchive,
  },
  {
    path: '/verify',
    name: 'Verify',
    meta: {
      auth: true,
    },
    component: Verify,
  },
  {
    path: '/register',
    name: 'Register',
    meta: {
      auth: false,
    },
    component: Register,
  },
  {
    path: '/login',
    name: 'Login',
    meta: {
      auth: false,
    },
    component: Login,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.meta.auth && to.name !== 'Login' && !store.getters['auth/isAuth']) {
    next({ name: 'Login' });
  } else if (
    (to.name === 'Register' || to.name === 'Login') &&
    !!store.getters['auth/isAuth']
  ) {
    next({ name: 'Home' });
  } else {
    next();
  }
});

export default router;

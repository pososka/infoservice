<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  data: () => ({
    menu: {
      primary: [
        {
          to: '/',
          name: 'Feedback',
        },
        {
          to: '/feedback',
          name: 'My Feedbacks',
        },
      ],
      auth: [
        {
          to: '/login',
          name: 'Login',
        },
        {
          to: '/register',
          name: 'Register',
        },
      ],
    },
  }),
  computed: mapGetters({
    getUserName: 'auth/getUserName',
    isAuth: 'auth/isAuth',
  }),
  methods: {
    ...mapActions({
      logout: 'auth/logout',
    }),
    logoutHandler() {
      this.logout(() => {
        this.$router.push('/login');
      });
    },
  },
};
</script>

<template>
  <header class="header">
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <div class="container-lg">
        <router-link class="navbar-brand" to="/">InfoService</router-link>

        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#header-navbar-1"
        >
          <span class="navbar-toggler-icon"></span>
        </button>

        <div
          v-if="isAuth"
          class="collapse navbar-collapse"
          id="header-navbar-1"
        >
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li v-for="link in menu.primary" :key="link.to" class="nav-item">
              <router-link class="nav-link" :to="link.to" active-class="active">
                {{ link.name }}
              </router-link>
            </li>
          </ul>

          <ul class="navbar-nav ms-auto">
            <li class="nav-item dropdown">
              <a
                id="navbarDropdown"
                class="nav-link dropdown-toggle"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
              >
                {{ getUserName }}
              </a>

              <div class="dropdown-menu dropdown-menu-end">
                <button class="dropdown-item" @click="logoutHandler">
                  Logout
                </button>
              </div>
            </li>
          </ul>
        </div>

        <div v-else class="collapse navbar-collapse" id="header-navbar-1">
          <ul class="navbar-nav ms-auto">
            <li v-for="link in menu.auth" :key="link.to" class="nav-item">
              <router-link class="nav-link" :to="link.to" active-class="active">
                {{ link.name }}
              </router-link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </header>

  <main class="main">
    <router-view></router-view>
  </main>
</template>

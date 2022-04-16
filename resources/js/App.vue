<script>
import { mapActions, mapGetters } from 'vuex';

import Menu from './components/Menu.vue';
import Button from './components/Button.vue';

export default {
  components: {
    Menu,
    Button,
  },
  data: () => ({
    menu: {
      primary: {
        Home: 'Feedback',
        Feedbacks: 'My Feedbacks',
      },
      auth: {
        Login: 'Login',
        Register: 'Register',
      },
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
        this.$router.push({ name: 'Login' });
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

        <Button
          class="navbar-toggler"
          data-bs-toggle="collapse"
          data-bs-target="#header-navbar-1"
        >
          <span class="navbar-toggler-icon"></span>
        </Button>

        <div
          v-if="isAuth"
          class="collapse navbar-collapse"
          id="header-navbar-1"
        >
          <Menu :links="menu.primary" class="me-auto mb-2 mb-lg-0" />

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
                <Button class="dropdown-item" @click="logoutHandler">
                  Logout
                </Button>
              </div>
            </li>
          </ul>
        </div>

        <div v-else class="collapse navbar-collapse" id="header-navbar-1">
          <Menu :links="menu.auth" class="ms-auto" />
        </div>
      </div>
    </nav>
  </header>

  <main class="main">
    <router-view></router-view>
  </main>
</template>

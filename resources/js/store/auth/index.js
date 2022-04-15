import VueCookies from 'vue-cookies';

import { authAPI } from '../../utils/auth';

const auth = {
  namespaced: true,

  state() {
    return {
      user: {
        name: VueCookies.get('infoservice_user')?.name || null,
        email: VueCookies.get('infoservice_user')?.email || null,
      },
      errors: {
        name: '',
        email: '',
        password: '',
      },
      isLoading: false,
    };
  },

  getters: {
    isAuth: (state) => {
      return (
        state.user.name &&
        state.user.email &&
        VueCookies.isKey('infoservice_user')
      );
    },

    getUserName: (state) => {
      return state.user.name;
    },

    getUserEmail: (state) => {
      return state.user.email;
    },

    getErrorName: (state) => {
      return state.errors.name;
    },

    getErrorEmail: (state) => {
      return state.errors.email;
    },

    getErrorPassword: (state) => {
      return state.errors.password;
    },

    getIsLoading: (state) => {
      return state.isLoading;
    },
  },

  mutations: {
    setUser(state, { name, email }) {
      state.user.name = name;
      state.user.email = email;
    },

    setIsLoading(state, value) {
      state.isLoading = value;
    },

    setError(state, { name, email, password }) {
      state.errors.name = name || '';
      state.errors.email = email || '';
      state.errors.password = password || '';
    },
  },

  actions: {
    login({ commit }, { email, password, remember, callback }) {
      commit('setIsLoading', true);
      commit('setError', {
        name: '',
        email: '',
        password: '',
      });

      authAPI
        .login(email, password, remember)
        .then((response) => {
          const user = response.data.user;

          commit('setUser', {
            name: user.name,
            email: user.email,
          });

          VueCookies.set('infoservice_user', user, remember ? '30d' : '1d');
        })
        .then(callback)
        .catch((error) => {
          const data = error.response.data;

          if (data.errors) {
            commit('setError', {
              email: (data.errors.email || '')[0],
              password: (data.errors.password || '')[0],
            });
          }
        })
        .finally(() => {
          commit('setIsLoading', false);
        });
    },

    register({ commit }, { name, email, password, confirm, callback }) {
      commit('setIsLoading', true);
      commit('setError', {
        name: '',
        email: '',
        password: '',
      });

      authAPI
        .register(name, email, password, confirm)
        .then((response) => {
          const user = response.data.user;

          commit('setUser', {
            name: user.name,
            email: user.email,
          });

          VueCookies.set('infoservice_user', user, '1d');
        })
        .then(callback)
        .catch((error) => {
          const data = error.response.data;

          if (data.errors) {
            commit('setError', {
              name: (data.errors?.name || '')[0],
              email: (data.errors?.email || '')[0],
              password: (data.errors?.password || '')[0],
            });
          }
        })
        .finally(() => {
          commit('setIsLoading', false);
        });
    },

    logout({ commit }, callback) {
      authAPI
        .logout()
        .then(() => {
          commit('setUser', {
            name: null,
            email: null,
          });

          VueCookies.remove('infoservice_user');
        })
        .then(callback);
    },

    sendVerificationEmail() {
      authAPI.sendVerificationEmail();
    },
  },
};

export default auth;

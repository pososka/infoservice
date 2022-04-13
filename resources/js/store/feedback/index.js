import { feedbackAPI } from '../../utils/feedback';

const feedback = {
  namespaced: true,

  state() {
    return {
      errors: {
        name: '',
        phone: '',
        company: '',
        title: '',
        message: '',
        file: '',
      },
      info: {
        has: false,
        type: '',
        message: '',
      },
      feedbacks: [],
      isLoading: false,
    };
  },

  getters: {
    getFeedbacks: (state) => {
      return state.feedbacks;
    },

    getInfoHas: (state) => {
      return state.info.has;
    },

    getInfoType: (state) => {
      return state.info.type;
    },

    getInfoMessage: (state) => {
      return state.info.message;
    },

    getErrorName: (state) => {
      return state.errors.name;
    },

    getErrorPhone: (state) => {
      return state.errors.phone;
    },

    getErrorCompany: (state) => {
      return state.errors.company;
    },

    getErrorTitle: (state) => {
      return state.errors.title;
    },

    getErrorMessage: (state) => {
      return state.errors.message;
    },

    getErrorFile: (state) => {
      return state.errors.file;
    },

    getIsLoading: (state) => {
      return state.isLoading;
    },
  },

  mutations: {
    setInfo(state, { has, type, message }) {
      state.info.has = has || false;
      state.info.type = type || '';
      state.info.message = message || '';
    },

    setIsLoading(state, value) {
      state.isLoading = value;
    },

    setFeedbacks(state, feedbacks) {
      state.feedbacks = feedbacks;
    },

    setError(state, { name, phone, company, title, message, file }) {
      state.errors.name = name || '';
      state.errors.phone = phone || '';
      state.errors.company = company || '';
      state.errors.title = title || '';
      state.errors.message = message || '';
      state.errors.file = file || '';
    },
  },

  actions: {
    create(
      { commit },
      { name, phone, company, title, message, file, callback },
    ) {
      commit('setIsLoading', true);
      commit('setInfo', { has: false });
      commit('setError', {
        name: '',
        phone: '',
        company: '',
        title: '',
        message: '',
        file: '',
      });

      feedbackAPI
        .create(name, phone, company, title, message, file)
        .then((response) => {
          commit('setInfo', { has: false });

          if (response.data.success) {
            commit('setInfo', {
              has: true,
              type: 'success',
              message: response.data.message,
            });
          } else {
            commit('setInfo', {
              has: true,
              type: 'danger',
              message: response.data.message,
            });
          }
        })
        .then(callback)
        .catch((error) => {
          const data = error.response.data;

          if (data.message) {
            commit('setInfo', {
              has: true,
              type: 'danger',
              message: data.message,
            });
          }

          if (data.errors) {
            commit('setError', {
              name: (data.errors.name || '')[0],
              phone: (data.errors.phone || '')[0],
              company: (data.errors.company || '')[0],
              title: (data.errors.title || '')[0],
              message: (data.errors.message || '')[0],
              file: (data.errors.file || '')[0],
            });
          }
        })
        .finally(() => {
          commit('setIsLoading', false);
        });
    },

    loadFeedbacks({ commit }) {
      commit('setIsLoading', true);

      feedbackAPI
        .load()
        .then((response) => {
          if (response.data.success) {
            commit('setFeedbacks', response.data.feedbacks);
          }
        })
        .finally(() => {
          commit('setIsLoading', false);
        });
    },
  },
};

export default feedback;

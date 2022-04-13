import { createStore } from 'vuex';

import auth from './auth';
import feedback from './feedback';

const store = createStore({
  modules: {
    auth,
    feedback,
  },
});

export default store;

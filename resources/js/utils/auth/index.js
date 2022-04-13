import axios from 'axios';

export const authAPI = {
  login(email, password, remember) {
    const formData = new FormData();

    formData.append('email', email);
    formData.append('password', password);
    formData.append('remember', remember);

    return axios.get('/sanctum/csrf-cookie').then(() => {
      return axios.post('/api/login', formData);
    });
  },

  register(name, email, password, confirm) {
    const formData = new FormData();

    formData.append('name', name);
    formData.append('email', email);
    formData.append('password', password);
    formData.append('password_confirmation', confirm);

    return axios.get('/sanctum/csrf-cookie').then(() => {
      return axios.post('/api/register', formData);
    });
  },

  logout() {
    return axios.post('/api/logout');
  },
};

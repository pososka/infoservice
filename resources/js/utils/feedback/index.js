import axios from 'axios';

export const feedbackAPI = {
  create(name, phone, company, title, message, file) {
    const formData = new FormData();

    formData.append('name', name);
    formData.append('phone', phone);
    formData.append('company', company);
    formData.append('title', title);
    formData.append('message', message);
    formData.append('file', file);

    return axios.post('/api/feedback', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },

  load() {
    return axios.get('/api/feedback');
  },
};

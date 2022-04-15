<script>
import { mapActions, mapGetters } from 'vuex';

import Alert from '../../components/Alert.vue';

export default {
  components: {
    Alert,
  },
  data: () => ({
    form: {
      name: '',
      phone: '+7',
      company: '',
      title: '',
      message: '',
      file: '',
    },
  }),
  computed: {
    ...mapGetters({
      isAuth: 'auth/isAuth',
      getInfoHas: 'feedback/getInfoHas',
      getInfoType: 'feedback/getInfoType',
      getInfoMessage: 'feedback/getInfoMessage',
      getErrorName: 'feedback/getErrorName',
      getErrorPhone: 'feedback/getErrorPhone',
      getErrorCompany: 'feedback/getErrorCompany',
      getErrorTitle: 'feedback/getErrorTitle',
      getErrorMessage: 'feedback/getErrorMessage',
      getErrorFile: 'feedback/getErrorFile',
      getIsLoading: 'feedback/getIsLoading',
    }),
  },
  methods: {
    ...mapActions({
      create: 'feedback/create',
    }),
    fileUploaded(event) {
      this.form.file = event.target.files[0];
    },
    submitHandler() {
      this.create({
        ...this.form,
        callback: () => {
          this.form.name = '';
          this.form.phone = '+7';
          this.form.company = '';
          this.form.title = '';
          this.form.message = '';
          this.form.file = '';
        },
      });
    },
  },
  mounted() {
    if (!this.isAuth) {
      this.$router.push('/login');
    }
  },
};
</script>

<template>
  <div class="container">
    <h1 class="mb-5 text-center">Feedback</h1>

    <div class="row justify-content-center">
      <div class="col-md-6">
        <Alert
          v-if="getInfoHas"
          :message="getInfoMessage"
          :type="getInfoType"
        />

        <form @submit.prevent="submitHandler">
          <!-- @csrf -->

          <div class="form-group mb-3">
            <label class="form-label" for="name">Name</label>
            <input
              :class="{
                'form-control': true,
                'is-invalid': getErrorName,
              }"
              type="text"
              id="name"
              name="name"
              v-model="form.name"
            />

            <div v-if="getErrorName" class="invalid-feedback">
              {{ getErrorName }}
            </div>
          </div>

          <div class="form-group mb-3">
            <label class="form-label" for="phone">Phone</label>
            <input
              :class="{
                'form-control': true,
                'is-invalid': getErrorPhone,
              }"
              type="text"
              id="phone"
              name="phone"
              v-model="form.phone"
            />

            <div v-if="getErrorPhone" class="invalid-feedback">
              {{ getErrorPhone }}
            </div>
          </div>

          <div class="form-group mb-3">
            <label class="form-label" for="company">Company</label>
            <input
              :class="{
                'form-control': true,
                'is-invalid': getErrorCompany,
              }"
              type="text"
              id="company"
              name="company"
              v-model="form.company"
            />

            <div v-if="getErrorCompany" class="invalid-feedback">
              {{ getErrorCompany }}
            </div>
          </div>

          <div class="form-group mb-3">
            <label class="form-label" for="title">Title</label>
            <input
              :class="{
                'form-control': true,
                'is-invalid': getErrorTitle,
              }"
              type="text"
              id="title"
              name="title"
              v-model="form.title"
            />

            <div v-if="getErrorTitle" class="invalid-feedback">
              {{ getErrorTitle }}
            </div>
          </div>

          <div class="form-group mb-3">
            <label class="form-label" for="message">Message</label>
            <textarea
              :class="{
                'form-control': true,
                'is-invalid': getErrorMessage,
              }"
              id="message"
              name="message"
              rows="5"
              v-model="form.message"
            ></textarea>

            <div v-if="getErrorMessage" class="invalid-feedback">
              {{ getErrorMessage }}
            </div>
          </div>

          <div class="form-group mb-3">
            <label class="form-label" for="file">File</label>
            <input
              :class="{
                'form-control': true,
                'is-invalid': getErrorFile,
              }"
              type="file"
              id="file"
              accept="image/png, image/jpeg, image/gif, .pdf, .txt"
              @change="fileUploaded"
            />

            <div v-if="getErrorFile" class="invalid-feedback">
              {{ getErrorFile }}
            </div>
          </div>

          <div class="form-group">
            <button
              type="submit"
              :disabled="getIsLoading"
              class="btn btn-primary"
            >
              Send

              <span
                v-if="getIsLoading"
                class="spinner-border spinner-border-sm"
              ></span>
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

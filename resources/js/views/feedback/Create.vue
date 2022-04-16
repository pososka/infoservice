<script>
import { mapActions, mapGetters } from 'vuex';

import Alert from '../../components/Alert.vue';
import Button from '../../components/Button.vue';

export default {
  components: {
    Alert,
    Button,
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
      getUserName: 'auth/getUserName',
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
          this.form.name = this.getUserName;
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
    this.form.name = this.getUserName;
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
            <Button type="submit" class="btn-primary" :hasLoader="getIsLoading">
              Send
            </Button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

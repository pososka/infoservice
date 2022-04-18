<script>
import { mapActions, mapGetters } from 'vuex';

import Alert from '../../components/Alert.vue';
import Button from '../../components/Button.vue';
import Input from '../../components/Input.vue';
import Textarea from '../../components/Textarea.vue';

export default {
  components: {
    Alert,
    Button,
    Input,
    Textarea,
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
            <Input
              id="name"
              type="text"
              class="form-control"
              :hasError="!!getErrorName"
              :errorMessage="getErrorName"
              v-model="form.name"
            />
          </div>

          <div class="form-group mb-3">
            <label class="form-label" for="phone">Phone</label>
            <Input
              id="phone"
              type="text"
              class="form-control"
              :hasError="!!getErrorPhone"
              :errorMessage="getErrorPhone"
              v-model="form.phone"
            />
          </div>

          <div class="form-group mb-3">
            <label class="form-label" for="company">Company</label>
            <Input
              id="company"
              type="text"
              class="form-control"
              :hasError="!!getErrorCompany"
              :errorMessage="getErrorCompany"
              v-model="form.company"
            />
          </div>

          <div class="form-group mb-3">
            <label class="form-label" for="title">Title</label>
            <Input
              id="title"
              type="text"
              class="form-control"
              :hasError="!!getErrorTitle"
              :errorMessage="getErrorTitle"
              v-model="form.title"
            />
          </div>

          <div class="form-group mb-3">
            <label class="form-label" for="message">Message</label>
            <Textarea
              id="message"
              class="form-control"
              rows="5"
              :hasError="!!getErrorMessage"
              :errorMessage="getErrorMessage"
              v-model="form.message"
            />
          </div>

          <div class="form-group mb-3">
            <label class="form-label" for="file">File</label>
            <Input
              id="file"
              type="file"
              class="form-control"
              accept="image/png, image/jpeg, image/gif, .pdf, .txt"
              :hasError="!!getErrorFile"
              :errorMessage="getErrorFile"
              @input="fileUploaded"
            />
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

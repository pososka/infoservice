<script>
import { mapActions, mapGetters } from 'vuex';

import Button from '../../components/Button.vue';
import Input from '../../components/Input.vue';

export default {
  components: {
    Button,
    Input,
  },
  data: () => ({
    form: {
      name: '',
      email: '',
      password: '',
      confirm: '',
    },
  }),
  computed: {
    ...mapGetters({
      isAuth: 'auth/isAuth',
      getErrorName: 'auth/getErrorName',
      getErrorEmail: 'auth/getErrorEmail',
      getErrorPassword: 'auth/getErrorPassword',
      getIsLoading: 'auth/getIsLoading',
    }),
  },
  methods: {
    ...mapActions({
      register: 'auth/register',
    }),
    submitHandler() {
      this.register({
        ...this.form,

        callback: () => {
          this.$router.push({ name: 'Verify' });
        },
      });
    },
  },
};
</script>

<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-md-6">
        <div class="card">
          <div class="card-header">Register</div>

          <div class="card-body">
            <form @submit.prevent="submitHandler">
              <!-- @csrf -->

              <div class="row mb-3">
                <label for="name" class="col-md-4 col-form-label text-md-end">
                  Name
                </label>

                <div class="col-md-6">
                  <Input
                    id="name"
                    type="text"
                    class="form-control"
                    :hasError="!!getErrorName"
                    :errorMessage="getErrorName"
                    v-model="form.name"
                  />
                </div>
              </div>

              <div class="row mb-3">
                <label for="email" class="col-md-4 col-form-label text-md-end">
                  Email Address
                </label>

                <div class="col-md-6">
                  <Input
                    id="email"
                    type="email"
                    class="form-control"
                    :hasError="!!getErrorEmail"
                    :errorMessage="getErrorEmail"
                    v-model="form.email"
                  />
                </div>
              </div>

              <div class="row mb-3">
                <label
                  for="password"
                  class="col-md-4 col-form-label text-md-end"
                >
                  Password
                </label>

                <div class="col-md-6">
                  <Input
                    id="password"
                    type="password"
                    class="form-control"
                    :hasError="!!getErrorPassword"
                    :errorMessage="getErrorPassword"
                    v-model="form.password"
                  />
                </div>
              </div>

              <div class="row mb-3">
                <label
                  for="password-confirm"
                  class="col-md-4 col-form-label text-md-end"
                >
                  Confirm Password
                </label>

                <div class="col-md-6">
                  <Input
                    id="password-confirm"
                    type="password"
                    class="form-control"
                    v-model="form.confirm"
                  />
                </div>
              </div>

              <div class="row mb-0">
                <div class="col-md-6 offset-md-4">
                  <Button
                    type="submit"
                    class="btn-primary"
                    :hasLoader="getIsLoading"
                  >
                    Register
                  </Button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

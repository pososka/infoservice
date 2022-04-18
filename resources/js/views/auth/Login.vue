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
      email: '',
      password: '',
      remember: false,
    },
  }),
  computed: {
    ...mapGetters({
      isAuth: 'auth/isAuth',
      getErrorEmail: 'auth/getErrorEmail',
      getErrorPassword: 'auth/getErrorPassword',
      getIsLoading: 'auth/getIsLoading',
    }),
  },
  methods: {
    ...mapActions({
      login: 'auth/login',
    }),
    submitHandler() {
      this.login({
        ...this.form,

        callback: () => {
          this.$router.push({ name: 'Home' });
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
          <div class="card-header">Login</div>

          <div class="card-body">
            <form @submit.prevent="submitHandler">
              <!-- @csrf -->

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
                <div class="col-md-6 offset-md-4">
                  <div class="form-check">
                    <Input
                      class="form-check-input"
                      id="remember"
                      type="checkbox"
                      v-model="form.remember"
                    />

                    <label class="form-check-label" for="remember">
                      Remember Me
                    </label>
                  </div>
                </div>
              </div>

              <div class="row mb-0">
                <div class="col-md-8 offset-md-4">
                  <Button
                    type="submit"
                    class="btn-primary"
                    :hasLoader="getIsLoading"
                  >
                    Login
                  </Button>

                  <!-- <a class="btn btn-link" href="#">Forgot Your Password?</a> -->
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

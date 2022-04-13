<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  data: () => ({
    form: {
      email: '',
      password: '',
      remember: false,
    },
  }),
  computed: {
    ...mapGetters({
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
          this.$router.push('/');
        },
      });
    },
  },
};
</script>

<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-md-8">
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
                  <input
                    id="email"
                    type="email"
                    name="email"
                    :class="{
                      'form-control': true,
                      'is-invalid': getErrorEmail,
                    }"
                    v-model="form.email"
                  />

                  <div v-if="getErrorEmail" class="invalid-feedback">
                    {{ getErrorEmail }}
                  </div>
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
                  <input
                    id="password"
                    type="password"
                    name="password"
                    :class="{
                      'form-control': true,
                      'is-invalid': getErrorPassword,
                    }"
                    v-model="form.password"
                  />

                  <div v-if="getErrorPassword" class="invalid-feedback">
                    {{ getErrorPassword }}
                  </div>
                </div>
              </div>

              <div class="row mb-3">
                <div class="col-md-6 offset-md-4">
                  <div class="form-check">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      id="remember"
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
                  <button
                    type="submit"
                    :disabled="getIsLoading"
                    class="btn btn-primary"
                  >
                    Login

                    <span
                      v-if="getIsLoading"
                      class="spinner-border spinner-border-sm"
                    ></span>
                  </button>

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

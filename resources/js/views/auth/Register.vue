<script>
import { mapActions, mapGetters } from 'vuex';

export default {
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
          this.$router.push('/verify');
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
                  <input
                    id="name"
                    type="text"
                    name="name"
                    :class="{
                      'form-control': true,
                      'is-invalid': getErrorName,
                    }"
                    v-model="form.name"
                  />

                  <div v-if="getErrorName" class="invalid-feedback">
                    {{ getErrorName }}
                  </div>
                </div>
              </div>

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
                <label
                  for="password-confirm"
                  class="col-md-4 col-form-label text-md-end"
                >
                  Confirm Password
                </label>

                <div class="col-md-6">
                  <input
                    id="password-confirm"
                    type="password"
                    name="password-confirm"
                    class="form-control"
                    v-model="form.confirm"
                  />
                </div>
              </div>

              <div class="row mb-0">
                <div class="col-md-6 offset-md-4">
                  <button
                    type="submit"
                    :disabled="getIsLoading"
                    class="btn btn-primary"
                  >
                    Register

                    <span
                      v-if="getIsLoading"
                      class="spinner-border spinner-border-sm"
                    ></span>
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

import Alert from '../../components/Alert.vue';
import Button from '../../components/Button.vue';

export default {
  components: {
    Alert,
    Button,
  },
  data: () => ({
    isSend: false,
  }),
  methods: {
    ...mapActions({
      sendVerificationEmail: 'auth/sendVerificationEmail',
    }),
    resend() {
      this.isSend = true;

      this.sendVerificationEmail();
    },
  },
};
</script>

<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-md-8">
        <div class="card">
          <div class="card-header">Verify Your Email Address</div>

          <div class="card-body">
            <Alert
              message="A fresh verification link has been sent to your email address."
              type="info"
            />

            <p>
              Before proceeding, please check your email for a verification
              link.
            </p>
            <p>If you did not receive the email</p>

            <Button
              class="btn-link p-0 m-0 align-baseline"
              :disabled="isSend"
              @click="resend"
            >
              click here to request another
            </Button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

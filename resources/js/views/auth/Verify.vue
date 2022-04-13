<script>
import axios from 'axios';
import Alert from '../../components/Alert.vue';

export default {
  components: {
    Alert,
  },
  data: () => ({
    isSend: false,
  }),
  methods: {
    sendVerification() {
      this.isSend = true;

      axios.post('/api/email/verification-notification');
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

            <button
              :disabled="isSend"
              @click="sendVerification"
              class="btn btn-link p-0 m-0 align-baseline"
            >
              click here to request another
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

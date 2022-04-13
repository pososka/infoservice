<script>
import { mapActions, mapGetters } from 'vuex';

import Table from '../../components/Table.vue';

export default {
  components: {
    Table,
  },
  computed: {
    ...mapGetters({
      isAuth: 'auth/isAuth',
      getFeedbacks: 'feedback/getFeedbacks',
      getIsLoading: 'feedback/getIsLoading',
    }),
  },
  methods: {
    ...mapActions({
      loadFeedbacks: 'feedback/loadFeedbacks',
    }),
  },
  mounted() {
    if (!this.isAuth) {
      this.$router.push('/login');
    } else {
      this.loadFeedbacks();
    }
  },
};
</script>

<template>
  <div class="container">
    <h1 class="mb-5 text-center">My Feedback</h1>

    <div class="row justify-content-center">
      <div v-if="getIsLoading" class="col-md-6">
        <div class="text-center pt-5">
          <div class="spinner-border" style="width: 4rem; height: 4rem">
            <span class="visually-hidden">Loading...</span>
          </div>
        </div>
      </div>

      <div v-else-if="getFeedbacks.length" class="col-12">
        <div class="overflow-auto">
          <Table
            :headings="['Name', 'Phone', 'Company', 'Title', 'Message', 'File']"
          >
            <tr v-for="feedback in getFeedbacks" :key="feedback.id">
              <td>{{ feedback.name }}</td>
              <td>{{ feedback.phone }}</td>
              <td>{{ feedback.company }}</td>
              <td>{{ feedback.title }}</td>
              <td>{{ feedback.message }}</td>
              <td>
                <a
                  v-if="feedback.file"
                  :href="feedback.file"
                  download="download"
                >
                  Download
                </a>
              </td>
            </tr>
          </Table>
        </div>
      </div>

      <div v-else class="col-md-6">
        <div class="alert alert-info text-center">You not have feedbacks</div>
      </div>
    </div>
  </div>
</template>

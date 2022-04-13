<script>
export default {
  props: {
    headings: {
      type: Array,
      required: true,
    },
  },
};
</script>

<template>
  <table class="table table-striped">
    <thead>
      <tr>
        <th v-for="(heading, index) in headings" :key="index">{{ heading }}</th>
      </tr>
    </thead>

    <tbody>
      <slot />
    </tbody>
  </table>
</template>

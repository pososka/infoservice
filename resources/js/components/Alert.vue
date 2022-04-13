<script>
export default {
  props: {
    message: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      default: 'info',
    },
  },
};
</script>

<template>
  <div :class="`alert alert-${type}`">
    {{ message }}
  </div>
</template>

<script>
export default {
  props: {
    hasLoader: {
      type: Boolean,
      default: false,
    },
    type: {
      type: String,
      default: 'button',
    },
  },
};
</script>

<template>
  <button :type="type" :disabled="hasLoader" class="btn">
    <slot />
    <span v-if="hasLoader" class="spinner-border spinner-border-sm ms-2"></span>
  </button>
</template>

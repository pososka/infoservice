<script>
export default {
  props: {
    errorMessage: {
      type: String,
      default: null,
    },
    hasError: {
      type: Boolean,
      default: false,
    },
    type: {
      type: String,
      default: 'text',
    },
    modelValue: {
      type: String,
    },
  },
  emits: ['update:modelValue'],
};
</script>

<template>
  <input
    v-bind="$attrs"
    :type="type"
    :class="{
      'is-invalid': hasError,
    }"
    :value="modelValue"
    @input="$emit('update:modelValue', $event.target.value)"
  />

  <div v-if="hasError" class="invalid-feedback">
    {{ errorMessage }}
  </div>
</template>

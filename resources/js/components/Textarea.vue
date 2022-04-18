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
    modelValue: {
      type: String,
    },
  },
  emits: ['update:modelValue'],
};
</script>

<template>
  <textarea
    v-bind="$attrs"
    :class="{
      'is-invalid': hasError,
    }"
    :value="modelValue"
    @input="$emit('update:modelValue', $event.target.value)"
  ></textarea>

  <div v-if="hasError" class="invalid-feedback">
    {{ errorMessage }}
  </div>
</template>

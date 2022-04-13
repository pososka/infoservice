<script>
export default {
  props: {
    classes: {
      type: String,
      default: 'navbar-nav',
    },
    links: {
      type: [String],
      default: [],
    },
  },
};
</script>

<template>
  <ul :class="classes">
    <li v-for="link in links" :key="link.to" class="nav-item">
      <router-link class="nav-link" :to="link.to">
        {{ link.name }}
      </router-link>
    </li>
  </ul>
</template>

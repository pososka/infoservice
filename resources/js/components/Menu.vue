<script>
export default {
  props: {
    links: {
      type: Array,
      required: true,
    },
  },
};
</script>

<template>
  <ul class="navbar-nav">
    <li v-for="link in links" :key="link.to" class="nav-item">
      <router-link class="nav-link" :to="link.to" active-class="active">
        {{ link.name }}
      </router-link>
    </li>
  </ul>
</template>

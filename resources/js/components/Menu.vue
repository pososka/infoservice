<script>
export default {
  props: {
    links: {
      type: Object,
      required: true,
    },
  },
};
</script>

<template>
  <ul class="navbar-nav">
    <li v-for="(title, name) in links" :key="name" class="nav-item">
      <router-link class="nav-link" :to="{ name }" active-class="active">
        {{ title }}
      </router-link>
    </li>
  </ul>
</template>

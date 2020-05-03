<template>
  <div class="ui secondary pointing menu">
    <router-link :to="{ path: '/', params: {} }" class="active item">
      Image Storage
    </router-link>
    <div class="right menu">
      <div v-if="isLoggedIn" class="horizontal">
        <router-link :to="{ path: '/', params: {} }" class="ui item">
          Gallery
        </router-link>
        <router-link :to="{ path: '/upload', params: {} }" class="ui item">
          Upoad
        </router-link>
        <a href="#" class="ui item" v-on:click="logout">Logout</a>
      </div>
      <a v-else class="ui item" href="#" v-on:click="login">
        Login
      </a>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "AppHeader",
  methods: {
    ...mapActions(["login", "logout"])
  },
  computed: {
    ...mapGetters(["isLoggedIn"])
  }
};
</script>

<style scoped>
.horizontal {
  display: flex;
  flex-direction: row;
}
</style>

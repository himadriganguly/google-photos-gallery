<template>
  <div class="ui three column grid">
    <div class="column" v-for="image in allImages" v-bind:key="image.id">
      <div class="ui segment">
        <img v-bind:src="image.baseUrl" v-bind:alt="image.filename" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "ImageList",
  computed: {
    ...mapGetters(["allImages"])
  },
  methods: {
    ...mapActions(["fetchImages"])
  },
  created() {
    this.fetchImages();
  }
};
</script>

<style scoped>
div {
  margin-top: 20px !important;
}
</style>

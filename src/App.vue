<script setup>
// Vue Components
import top from "./components/top.vue";
import content from "./components/content.vue";

// Three.js app
import Experience from "./Experience/Experience";
const experience = new Experience();
const manager = experience.manager;
</script>

<template>
  <top :manager="manager"></top>
  <content :manager="manager"></content>
</template>

<style lang="scss">
#app {
  position: relative;
  width: 100vw;
  min-height: var(--vh);
  z-index: 20;
}
</style>

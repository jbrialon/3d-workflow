<script setup>
// Vue Components
import content from "./components/content.vue";

// Three.js app
import Experience from "./Experience/Experience";
const experience = new Experience();
const manager = experience.manager;
</script>

<template>
  <header>
    <h1>3D workflow</h1>
    <ul>
      <li>Blender</li>
      <li>Three JS</li>
      <li>Any Platform</li>
    </ul>
    <!-- <button class="primary">More</button> -->
  </header>
  <content :manager="manager"></content>
</template>

<style lang="scss">
#app {
  position: relative;
  width: 100vw;
  min-height: var(--vh);
  z-index: 20;
}

header {
  position: fixed;
  display: flex;
  padding-right: 40px;
  background: #dedfe1;

  h1 {
    font-weight: 500;
    letter-spacing: 0.2;
    padding: 50px 30px 30px 80px;
  }
}

ul {
  list-style: none;
  display: flex;
  padding: 50px 40px 30px 80px;
  border-right: 2px solid black;
  border-left: 2px solid black;
}

li {
  padding: 0 20px;
  font-size: 16px;
}

section.section {
  display: flex;
  flex-direction: column;
  height: calc(100vh);
  padding: 370px 70px 70px 70px;

  h2 {
    font-size: 48px;
    max-width: 15vw;
    line-height: 1.2;
    font-weight: 500;
    margin-bottom: 45px;
  }

  p {
    max-width: 30vw;
    font-size: 14px;
  }
}

.primary {
  display: inline-block;
  margin: 50px 0 auto auto;
  background: transparent;
  border: 2px solid black;
  padding: 10px 15px;
  font-size: 16px;
  font-weight: 600;
  letter-spacing: 1px;
  font-family: "Work Sans", sans-serif;
  cursor: pointer;
}

.secondary {
}
</style>

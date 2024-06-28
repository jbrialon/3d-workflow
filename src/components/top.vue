<template>
  <header>
    <h1>3D workflow</h1>
    <ul>
      <li>Blender</li>
      <li>Three JS</li>
      <li>Any Platform</li>
    </ul>
    <button @click="debug()" class="primary">debug</button>
  </header>
</template>

<script>
export default {
  name: "top",
  props: {
    manager: {
      required: true,
      type: Object,
    },
  },
  methods: {
    debug() {
      this.manager.trigger("columns-toggleDebug");
    },
  },
  mounted() {},
};
</script>

<style lang="scss" scoped>
header {
  position: fixed;
  display: flex;
  width: 100vw;
  padding-right: 40px;
  background: #dedfe1;
  z-index: 40;

  h1 {
    font-weight: 500;
    letter-spacing: 0.2;
    padding: 50px 30px 30px 80px;
  }

  button {
    margin: 50px 55px auto auto;
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
</style>

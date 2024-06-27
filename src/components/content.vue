<template>
  <section class="section">
    <h2>{{ title }}</h2>
    <p>
      Donec et porta arcu. Vivamus placerat varius purus ac blandit. Donec eget
      erat varius, aliquam est in, porta est. Aliquam lacinia massa ipsum, sed
      mattis mauris fringilla nec. Vestibulum cursus eleifend purus, ut
      scelerisque sapien tempus quis. In ac scelerisque augue, ut mollis nibh.
    </p>
  </section>
</template>

<script>
export default {
  name: "content",
  props: {
    manager: {
      required: true,
      type: Object,
    },
  },
  data() {
    return {
      title: "3D Elements to build your universe.",
    };
  },
  mounted() {
    this.manager.on("content-update", (name) => {
      console.log(name);
      this.title = name;
    });

    this.manager.on("infowindow-hide", () => {
      this.show = false;
      this.activeMarker = null;
    });

    this.manager.on("infowindow-update-position", (position) => {
      if (this.show) {
        this.position = position;
      }
    });
  },
};
</script>

<style lang="scss" scoped></style>

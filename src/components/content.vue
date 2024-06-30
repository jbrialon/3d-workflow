<template>
  <section class="section">
    <Transition name="slide-up">
      <div class="section__content" v-if="id === '00'">
        <h2>3D Elements to build your universe.</h2>
        <p>
          Donec et porta arcu. Vivamus placerat varius purus ac blandit. Donec
          eget erat varius, aliquam est in, porta est. Aliquam lacinia massa
          ipsum, sed mattis mauris fringilla nec. Vestibulum cursus eleifend
          purus, ut scelerisque sapien tempus quis. In ac scelerisque augue, ut
          mollis nibh.
        </p>
      </div>
      <div class="section__content" v-else-if="id === '01'">
        <h2>Text Collider {{ id }}.</h2>
        <p>
          Vestibulum cursus eleifend purus, ut scelerisque sapien tempus quis.
          In ac scelerisque augue, ut mollis nibh.
        </p>
      </div>
      <div class="section__content" v-else-if="id === '02'">
        <h2>Text Collider {{ id }}.</h2>
        <p>
          Donec et porta arcu. Vivamus placerat varius purus ac blandit. Donec
          eget erat varius, aliquam est in, porta est. Aliquam lacinia massa
          ipsum, sed mattis mauris fringilla nec.
        </p>
      </div>
      <div class="section__content" v-else-if="id === '03'">
        <h2>Text Collider {{ id }}.</h2>
        <p>
          Donec et porta arcu. Vivamus placerat varius purus ac blandit. Donec
          eget erat varius, aliquam est in, porta est. Aliquam lacinia massa
          ipsum, sed mattis mauris fringilla nec.
        </p>
      </div>
      <div class="section__content" v-else-if="id === '04'">
        <h2>Text Collider {{ id }}.</h2>
        <p>
          Donec et porta arcu. Vivamus placerat varius purus ac blandit. Donec
          eget erat varius, aliquam est in, porta est. Aliquam lacinia massa
          ipsum, sed mattis mauris fringilla nec.
        </p>
      </div>
    </Transition>
    <Transition name="fade">
      <div v-if="showScrollIndicator" class="section__scroll">
        <box-icon name="mouse"></box-icon>
        <box-icon name="chevron-down" animation="fade-up"></box-icon>
      </div>
    </Transition>
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
      id: "00",
      showScrollIndicator: true,
    };
  },
  mounted() {
    this.manager.on("content-update", (name) => {
      this.id = name.match(/\d+$/)[0];
      this.showScrollIndicator = false;
    });
  },
};
</script>

<style lang="scss" scoped>
.section {
  position: relative;
  z-index: $z-content;
  display: flex;
  flex-direction: column;
  height: var(--vh);
  justify-content: center;
  padding: 0 70px 70px 70px;

  @include small-only {
    padding: 0 35px 35px 15px;
    justify-content: flex-end;
  }

  &__content {
    position: absolute;
  }

  &__scroll {
    position: absolute;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);

    box-icon {
      display: block;
    }
  }

  h2 {
    font-size: 48px;
    max-width: 300px;
    line-height: 1.2;
    font-weight: 500;
    margin-bottom: 45px;

    @include small-only {
      font-size: 32px;
      max-width: none;
    }
  }

  p {
    max-width: 30vw;
    font-size: 14px;

    @include small-only {
      max-width: 85vw;
      padding-bottom: 100px;
    }
  }
}
</style>

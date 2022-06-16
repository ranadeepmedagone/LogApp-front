<!-- <template>
  <div class="sticky__buttons" ref="sticky-header" :class="classes">
    <div class="container">
      <slot>
        <div>sticky</div>
      </slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Sticky',
  data() {
    return {
      classes: [],
    }
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll)
  },
  activated() {
    this.handleScroll()
  },
  destroyed() {
    window.removeEventListener('scroll', this.handleScroll)
  },
  methods: {
    handleScroll() {
      var header = this.$refs['sticky-header']
      var sticky = header.offsetTop
      if (window.pageYOffset > sticky) {
        this.classes = 'sticky'
      } else {
        this.classes = ''
      }
    },
  },
}
</script>

<style lang="scss">
.sticky {
  position: fixed;
  top: 0;
  width: 100%;
}

.sticky__buttons {
  background-color: $--border-color-extra-light;
  padding-top: 8px;
  padding-bottom: 8px;
  z-index: 99;

  position: fixed;
  top: 70px;
  width: 100%;

  > .container {
    display: flex;
    justify-content: space-between;
  }
}
</style> -->
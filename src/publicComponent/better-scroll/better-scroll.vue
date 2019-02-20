<template>
  <div class="scroll-container"
       ref="scrollContainer"
       :style="{height: $attrs.height, width: $attrs.width||'100vw'}">
    <div class="scroll-first-child">
      <slot></slot>
    </div>
  </div>
</template>

<script>
/*  eslint-disable  */
import BScroll from 'better-scroll';  //  依赖

export default {
  name: "better-scroll",
  data() {
    return {
      scroller: null,
    }
  },
  mounted() {
    this.scroller = new BScroll(this.$refs.scrollContainer, {
      startX: this.startX,
      startY: this.startY,
      scrollX: this.scrollX,
      scrollY: this.scrollY,
      click: this.click,
      probeType: this.dispatchScroll,
      pullDownRefresh: this.pullDownRefresh,
    });
    this.scroller.on('pullingDown', () => {
      this.pullDownCb && this.pullDownCb();
    });
  },
  props: {
    startX: {
        type: Number,
        default:0
      },
    startY: {
        type: Number,
        default:0
      },
    scrollX: {
        type: Boolean,
        default: true,
      },
    scrollY: {
        type: Boolean,
        default: true,
      },
    click: {
        type: Boolean,
        default: true
      },
    dispatchScroll: {
      type: Number,
      default: 0,
      validator(value) {
        return [0, 1, 2, 3].indexOf(value) > -1;
      }
    },
    pullDownRefresh: {
      type: [Boolean, Object],
      default: false,
    },
    pullDownCb: {
      type: Function
    },
    refreshed: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    refreshed(newValue) {
      if(newValue) {
        this.scroller.finishPullDown();
        // this.refreshed = false;
      }
    }
  }
}
</script>

<style scoped>
  .scroll-container{
    overflow: hidden;
  }
</style>

<template>
  <div class="header--component">
    <span class="back--key" @click="getBack"><i class="fa fa-2x fa-angle-left"></i></span>
    <span class="content">
      <slot></slot>
    </span>
    <span></span>
  </div>
</template>

<script>
export default {
  name: 'app-header',
  methods: {
    getBack() {
      this.$router.push('/shoppingMall');
    }
  }
};
</script>

<style scoped lang="scss">
  @function ref($px,$unit:640){
    @return $px/($unit/10)#{rem};
  }
.header--component{
  height: 1.4666666667rem;
  position: fixed;
  right: 0;
  left: 0;
  top: 0;
  background: #fff;
  color: #3c3c3c;
  font-size: 14px;
  /*border-bottom: 1px solid #c2c2c2;*/
}
  .back--key{
    position: absolute;
    left: .5733333333rem;
    top: .42222222222227rem;
  }
  .content{
    display: inline-block;
    text-align: center;
    position: absolute;
    left: 0;
    right: 0;
    top: .62222222222227rem;
    font-size: ref(32);
  }
</style>

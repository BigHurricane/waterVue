<template>
    <span class="el-button"><slot></slot></span>
</template>

<script>
export default {
  name: 'app-button',
};
</script>

<style scoped>
.el-button{
  position: absolute;
  bottom: .226666666667rem;
  left: 0;
  right: 0;
  margin: 0 auto;
  display: block;
  text-align: center;
  width: 6.3066666667rem;
  height: 0.92rem;
  line-height: 0.92rem;
  border-radius: .4666666666666667rem;
  background: #3c9dfc;
  cursor: pointer;
  color: #fff;
}
</style>

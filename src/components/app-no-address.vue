<template>
<div>
  <img src="../assets/address.jpg"/>
  <p class="no-address">无收获地址</p>
</div>
</template>

<script>
export default {
  name: 'app-no-address',
};
</script>

<style scoped>
  img{
    width: 4.05333333333rem;
    margin: 0 auto;
    display: block;
    position: absolute;
    top: 6.1333333333337rem;
    left: 0;
    right: 0;
  }
  .no-address{
    margin-top:  7rem;
    text-align: center;
    color: #b3b3b3;
    font-size: .3333333333rem;
  }
</style>

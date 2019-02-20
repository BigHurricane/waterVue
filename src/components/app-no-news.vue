<template>
  <div>
    <img src="../assets/no_data_icon.png"/>
    <p class="no-address">暂无数据</p>
  </div>
</template>

<script>
  export default {
    name: 'app-no-news'
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

<template>
  <div class="myMall-header">
    <div class="selectCont">
      <i class="iconfont icon-kefu orderIcon relService"></i>
      <img class="searchIcon" src="../../assets/search.png" />
      <input class="searchMall" type="text" placeholder="保暖内衣">
      <!--<i class="iconfont icon-cart_icon shoppingCart"></i>-->
    </div>
    <van-tabs color="#2864d9" @click="send" v-model="active">
      <van-tab v-for="item in tabTitle" :title="item" color="#2864d9"></van-tab>
    </van-tabs>
  </div>
</template>

<script>
  export default {
    name: 'commodity-header',
    data() {
      return {
        tabTitle:['推荐','美妆护肤','超值百货','名品腕表','品质家电'],
        active: 0
    }

    },
    methods:{
      send(index){
        console.log(this.active);
         if(index === 0){
           this.$router.push('./shoppingStore');
         }
         if(index === 1){
           this.$router.push('/classifyPage');
         }
      }
    }
  };
</script>

<style scoped lang="scss">
  @function r($px, $unit:75) {
    @return $px/$unit#{rem}
  }
  @import '../../demo/iconfont.css';
  .myMall-header{
    width: 100vw;
    height: 2.54rem;
    background: white;
    overflow: hidden;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 999;
  }
  .selectCont{
    height: r(86);
    width: 100vw;
    border-bottom: 1px solid #f3f3f3;
  }
  .tabs{
    height: r(76);
  }
  .relService{
    font-size: r(34);
    position: absolute;
    top: r(31);
    left: r(23);
  }
  .searchMall{
    position: absolute;
    top: r(20);
    left: r(80);
    width: 63vw;
    height: r(55);
    background: #f5f5f5;
    border-radius: r(10);
    border: none;
    padding-left: r(60);
  }
  .searchIcon{
    position: absolute;
    top: r(36);
    left: r(90);
    height: r(30);
    width: r(30);
    z-index: 999;
  }
  .shoppingCart{
    font-size: r(34);
    position: absolute;
    top: r(32);
    right: r(23);
  }
</style>

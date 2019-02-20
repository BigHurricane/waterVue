<template>
     <div class="MyOrder_container">
       <van-nav-bar title="我的订单"
                    left-arrow
                    @click-left="onClickLeft"
       >
       </van-nav-bar>
       <van-tabs color="#2864d9" @click="send" v-model="active">
         <van-tab v-for="item in tabTitle" :title="item" color="#2864d9"></van-tab>
       </van-tabs>
       <app-no-news></app-no-news>
     </div>
</template>

<script>
  import AppNoNews from '../components/app-no-news';
  export default {
    name: 'MyOrder',
    data() {
      return {
        tabTitle:['全部','待付款','待收货','已完成','已取消'],
        active: 0
      }
    },
    methods: {
      onClickLeft() {

      }
    },
    components: { AppNoNews }
  };
</script>

<style scoped lang="scss">
  @function r($px, $unit:75) {
    @return $px/$unit#{rem}
  }

</style>

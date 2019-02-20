<template>
    <div class="classifyPage-container">
      <commodity-header></commodity-header>
       <div class="classifyPage-container_bodyer">
           <div class="logo_img"></div>
          <van-tabs color="#2864d9">
            <van-tab v-for="item in tabTitle" :title="item" color="#2864d9"></van-tab>
          </van-tabs>
          <div class="classifyPage-container_bodyer_Goods">
              <ul class="">
                 <li v-for="(item,key) in 2" :key="key" class="Goods_item">
                   <img src="" alt="">
                    <p>非官方个地方法规法规回复更多</p>
                    <span>￥69元</span>
                    <del>￥79元</del>
                 </li>
              </ul>
          </div>
       </div>
      <footer-nav></footer-nav>
    </div>
</template>

<script>
  export default {
    name: 'classifyPage',
    data() {
      return {
        current: 0,
        tabTitle:['推荐','美妆护肤','超值百货','名品腕表','品质家电'],
      }
    },
    methods: {

    }
  };
</script>

<style scoped lang="scss">
  @function r($px, $unit:75) {
    @return $px/$unit#{rem}
  }
  *{
    margin: 0;
    padding: 0;
    user-select: none;
    -webkit-tap-highlight-color: rgba(0,0,0,0);
  }
  @at-root .classifyPage-container{
    width: 100vw;
    height: 100vh;
    background: #f3f3f3;
    position: relative;
    z-index: 9999;
    overflow-y: auto;
    &::-webkit-scrollbar{         //清除滚动条
      display: none;
    }
  }
  @at-root .classifyPage-container_bodyer{
    margin-top: 2.5rem;
     @at-root .logo_img{
       height: 5rem;
       background: #0077aa;
     }
     @at-root .classifyPage-container_bodyer_Goods{
        @at-root .Goods_item{
           width: 50%;
            background: pink;
        }
     }
  }
</style>

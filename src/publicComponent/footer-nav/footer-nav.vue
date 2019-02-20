<template>
  <div class="shopping_mall_footer">
    <ul class="shopping_mall_footer_box">
      <router-link to="/shoppingStore" class="footer_item">
        <li class="shopping_mall_footer-item">
          <i class="iconfont icon-shangcheng logo_size"></i>
          <span class="fontSize">商城</span>
        </li>
      </router-link >

        <li class="shopping_mall_footer-item">
          <i class="iconfont icon-huankuan logo_size"></i>
          <span class="fontSize">还款</span>
        </li>

         <li class="shopping_mall_footer-item" @click="toShoppingCar">
            <i class="iconfont icon-cart_icon logo_size changeColor"></i>
            <span class="fontSize changeColor_item">购物车</span>
             <span class="cartCount">{{num || 0}}</span>
          </li>

      <router-link to="/shoppingMall" class="footer_item">
        <li class="shopping_mall_footer-item">
          <i class="iconfont icon-wode logo_size"></i>
          <span class="fontSize">我的</span>
        </li>
      </router-link>
    </ul>
  </div>
</template>

<script>
  export default {
    name: 'footer-nav',
    data() {
      return {
        num:'',
      }
    },
    methods: {
      toShoppingCar() {
        this.$router.push('shoppingCar');
      }
    },
    created() {
      this.$request.getCartCount()
        .then( (data) => {
          this.num = data.data.data.cartCount;
          console.log(data.data.data.cartCount);
        })
        .catch((err) => {
          console.log(err);
        })
    }

  };
</script>

<style scoped lang="scss">
  @function r($px, $unit:75) {
    @return $px/$unit#{rem}
  }
  a{
    color: #9d9d9d;
  }
  @import '../../demo/iconfont.css';
  .footer_item{
    width: 25vw;
  }
  @at-root .shopping_mall_footer{
    position: fixed;
    background: #fff;
    bottom: 0;
    height: r(97);
    @at-root .shopping_mall_footer_box{
      @at-root .shopping_mall_footer-item{
        width: 25vw;
        float: left;
        text-align: center;
        @at-root .logo_size{
          font-size: r(50);
          display: block;
          margin-top: r(12);
        }
        @at-root .fontSize{
          font-size: r(21);
          color: #9d9d9d;
        }
      }
    }
  }
  .router-link-active{
    color: #1989fa;
  }
  .router-link-active>li>span{
    color: #1989fa;
  }
  .cartCount{
    width: r(30);
    height: r(30);
    border-radius: 50%;
    background: red;
    color: #fff;
    line-height: r(30);
    text-align: center;
    display: inline-block;
    position: absolute;
    top: r(10);
  }
</style>

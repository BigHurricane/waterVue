<template>
    <div class="affirmOrder_container">
      <van-nav-bar title="确认订单"
                   left-arrow
                   @click-left="onClickLeft"
      >
      </van-nav-bar>
      <ul class="content">
        <li class="content-item">
          <div class="list-item__left"><img class="item-top__left" src="../assets/position.png" alt="#"></div>
          <div class=list-item__right>
            <span class="title">{{recieveInfo.receiver}}</span>
            <span class="time">{{recieveInfo.phoneNumber}}</span>
            <p>{{recieveInfo.location}} {{recieveInfo.details}}</p>
          </div>
          <i class="fa fa-2x fa-angle-right right_angle"></i>
        </li>
      </ul>
      <div class="goods_Content">
        <img src="../assets/one.jpg" alt="" class="logo_img_size">
        <span class="sumScore">共{{recieveInfo.score}}件</span>
        <i class="fa fa-2x fa-angle-right right_angle"></i>
      </div>
      <div class="pay_news_container">
        <div class="pay_way_container">
          <span class="pay_way left_word">支付方式</span>
          <span class="right_word onlinePay">在线支付</span>
        </div>
        <div class="highestDiscount_container">
          <span class="highestDiscount left_word">最高可以优惠金额</span>
          <span class="right_word discount_price">30元</span>
        </div>
        <div class="actual_discount_price_container">
          <span class="actual_discount_price left_word">实际优惠金额</span>
          <span class="right_word has_no_use">无可用</span>
        </div>
      </div>
      <div class="goods_price_container">
           <div class="goods_price_box">
             <span class="goods_price left_word">商品金额</span>
             <span class="right_price right_word">￥59.9</span>
           </div>
            <div class="freight_box">
              <span class="freight_word left_word">运费</span>
              <span class="freight_price">￥0</span>
            </div>
      </div>
      <div class="total_price_container">
          <div class="total_price_box">
            <span class="total_title">合计:</span>
            <span class="total_price">￥59.9</span>
          </div>
      </div>
      <div class="closeAccount">立即下单</div>
    </div>
</template>

<script>
  export default {
    name: 'affirmOrder',
    data(){
      return {
        recieveInfo: {
          receiver: 'ere',
          phoneNumber: 1345436213214,
          location: 'dfdfgfgf',
          details: 1212151,
          score: 1
        }
      }
    },
    methods: {
      onClickLeft() {
         this.$router.push('/shoppingCar');
      }
    }
  };
</script>

<style scoped lang="scss">
  @function r($px, $unit:75) {
    @return $px/$unit#{rem}
  }
  .left_word{
    color: #777777;
    font-size: r(25);
  }
  .right_word{
    color: #030207;
    letter-spacing: 1px;
  }
  @at-root .affirmOrder_container {
    background: #f0eff5;
    height: 100vh;
    overflow: hidden;
    @at-root .content {
      @at-root .content-item {
        position: relative;
        height: r(155);
        background: #fff;
        border-top: 1px solid #ccc;
        @at-root .list-item__left {
          width: 1.2266666666rem;
          height: r(118);
          border-radius: 0.13333333rem;
          display: inline-block;
          line-height: 2.13333333rem;
          position: absolute;
          left: r(27);
          top: 0;
          bottom: 0.45333333333rem;
          right: 0.45333333333rem;
          .item-top__left {
            width: .48rem;
            height: .48rem;
            display: inline-block;
          }

        }

        @at-root .list-item__right {
          /*width: 7.9333333333rem;*/
          height: r(118);
          position: absolute;
          display: inline-block;
          left: 1.1333333rem;
          bottom: 0;
          top: 0;
          right: 0;
          @at-root .title {
            font-size: 0.4rem;
            color: #252525;
            position: absolute;
            top: .313333333rem;

          }
          @at-root .time {
            font-size: .32rem;
            color: #999999;
            position: absolute;
            top: .3133333333rem;
            right: r(82);
          }
          @at-root p {
            color: #999999;
            font-size: .3333333rem;
            position: absolute;
            bottom: .133333333rem;
          }
        }

        @at-root .right_angle{
          color:#dbdede;
          position: absolute;
          right: r(56);
          top: r(72);
        }
      }
    }
    @at-root .goods_Content{
      height: r(221);
      border-top: 2px solid #f0eff5;
      position: relative;
      background: #fff;
      .logo_img_size{
        width: r(200);
        position:absolute;
        top: r(30);
        left: r(42);
      }
      .sumScore{
        font-size: r(25);
        position: absolute;
        right: r(60);
        top: r(100);
        color: #585858;
      }
      .right_angle{
        position: absolute;
        right: r(29);
        top: r(102);
        color: #dbdede;
      }
    }
    @at-root .pay_news_container{
      height: r(246);
      margin-top: r(13);
      background: #fff;
      padding: 0 r(58) 0 r(29);
      @at-root .pay_way_container{
         line-height: r(85);
         position: relative;
         .onlinePay{
            position: absolute;
            right: 0;
         }
      }
      @at-root .highestDiscount_container{
         line-height: r(82);
          position: relative;
          .discount_price{
            position: absolute;
            right: 0;
          }
      }
      @at-root .actual_discount_price_container{
        line-height: r(80);
        position: relative;
        .has_no_use{
          position: absolute;
          right: 0;
        }
      }
    }
    @at-root .goods_price_container{
     padding: 0 r(58) 0 r(29);
     background: #fff;
     margin-top: r(5);
      @at-root .goods_price_box{
        line-height: r(88);
        position: relative;
        .right_price{
          position: absolute;
          right: 0;
        }
      }
      @at-root .freight_box{
        position: relative;
        line-height: r(76);
         .freight_price{
              position: absolute;
           right: 0;
           color: #ec4a21;
         }
      }
   }
    @at-root .total_price_container{
        line-height: r(82);
        background: #fff;
      height: r(82);
        margin-top: r(13);
      position: relative;
      .total_price_box{
        position: absolute;
        right: r(55);
      }
      .total_title{
        color: #676767;
        font-size: r(27);
        letter-spacing: 2px;
      }
      .total_price{
        color: #ec4a21;
        font-size: r(20);
      }
        /*text-align: right;*/
    }
    @at-root .closeAccount{
      background: #458df7;
      color: #fff;
      text-align: center;
      position: fixed;
      left: 0;
      right: 0;
      bottom: 0;
      line-height: r(80);
      letter-spacing: 1px;
    }
  }
</style>

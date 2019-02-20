<template>
  <div class="shopping_mall">
    <div class="shopping_mall_header">
      <img src="../assets/shopping_mall_banner.png" alt="" class="bg_img">
      <div class="user"><img src="../assets/user.png" class="user_img"></div>
      <span class="login" @click="immediatelyLogin">{{title||loginTitle}}</span>
    </div>
    <div class="shopping_mall_nav">
        <ul>
          <li class="shopping_mall_nav-item">
            <i class="iconfont icon-daifukuan logo_nav_img"></i>
            <span class="nav_item">待付款</span>
          </li>
          <li class="shopping_mall_nav-item">
            <i class="iconfont icon-daishouhuo logo_nav_img"></i>
            <span class="nav_item">待收货</span>
          </li>
          <li class="shopping_mall_nav-item">
            <i class="iconfont icon-shouhoufuwu logo_nav_img"></i>
            <span class="nav_item">售后/退换货</span>
          </li>
          <li class="shopping_mall_nav-item">
            <i class="iconfont icon-dingdan logo_nav_img"></i>
            <span class="nav_item">所有订单</span>
          </li>
        </ul>
    </div>
    <div class="shopping_mall_management">
      <ul class="shopping_mall_management_Ul">
        <li class="shopping_mall_management-item">
          <i class="iconfont icon-qianbao logo_management_img mall_order"></i>
          <span class="order">商城分期订单</span>
          <span class="waitPlay">待还0.0元</span>
          <i class="fa fa-2x fa-angle-right right_angle"></i>
        </li>
        <li class="shopping_mall_management-item">
          <i class="iconfont icon-yinxingqia logo_management_img my_card" ></i>
          <span>我的银行卡</span>
          <i class="fa fa-2x fa-angle-right right_angle"></i>
        </li>
        <li class="shopping_mall_management-item">
          <i class="iconfont icon-shouhuodizhi logo_management_img cargo_addr" @click="cargonAddr"></i>
          <span @click="cargonAddr">收货地址</span>
          <i class="fa fa-2x fa-angle-right right_angle"></i>
        </li>
        <li class="shopping_mall_management-item">
          <i class="iconfont icon-youhuiquan logo_management_img coupon"></i>
          <span>优惠券</span>
          <i class="fa fa-2x fa-angle-right right_angle"></i>
        </li>
      </ul>
    </div>
    <div class="shopping_mall_help">
       <ul class="shopping_mall_help_management">
         <li class="shopping_mall_help_management-item">
             <i class="iconfont icon-duanxin feedback"></i>
             <span>我要反馈</span>
             <i class="fa fa-2x fa-angle-right right_angle"></i>
         </li>
         <li class="shopping_mall_help_management-item">
           <i class="iconfont icon-shezhi set"></i>
           <span>设置</span>
           <i class="fa fa-2x fa-angle-right right_angle"></i>
         </li>
         <li class="shopping_mall_help_management-item">
           <i class="iconfont icon-bangzhuzhongxin helpCenter"></i>
           <span>帮助中心</span>
           <i class="fa fa-2x fa-angle-right right_angle"></i>
         </li>
       </ul>
    </div>
    <footer-nav></footer-nav>
  </div>
</template>

<script>
  export default {
    name: 'shoppingMall',
    data() {
      return {
        code: 0,
        loginTitle: '立即登录',
        title: '',
      }
    },
    methods:{
      immediatelyLogin() {
        if(this.title === '已登录'){
              this.$notify({
                message: '您已登录',
                duration: 2000,
                background: '#1989fa'
              });
        }else{
          this.$router.push('./auth/login');
        }

      },
      cargonAddr() {
        if(this.title !== '已登录'){
          this.$toast('请登录');
          setTimeout(() => {this.$router.push('/auth/login');},2000)
        }else{
          this.$router.push('/addAddress');
        }
      },
    },
    created() {
      this.title = this.$route.query.Data;

      this.$request.login()
        .then((data) => {
          console.log(data);
          this.code = data.data.code;
          console.log(this.code);
        })
        .catch(() => {

        });
    }
  };
</script>

<style scoped lang="scss">
  @function r($px, $unit:75) {
    @return $px/$unit#{rem}
  }
 @import '../demo/iconfont.css';
 *{
   margin: 0;
   padding: 0;
   user-select: none;
   -webkit-tap-highlight-color: rgba(0,0,0,0);
 }
  .shopping_mall {
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    background: #f6f6f6;
    @at-root .shopping_mall_header {
      height: r(312);
      width: inherit;
      position: relative;
      @at-root .bg_img {
        height: r(312);
        width: 100vw;
      }
      @at-root .user {
        width: r(122);
        height: r(122);
        background: #d8d8d8;
        border-radius: 50%;
        position: absolute;
        left: r(80);
        top: r(118);
        @at-root .user_img {
          width: r(182);
          height: r(182);
          position: absolute;
          left: r(-27);
          top: r(-20);
        }
      }
      @at-root .login {
        width: r(280);
        height: r(72);
        background: #196fe3;
        color: #f5f8fa;
        border-radius: r(50);
        position: absolute;
        left: r(250);
        top: r(142);
        text-align: center;
        line-height: r(72);
      }
    }
    @at-root .shopping_mall_nav {
      height: r(150);
      background: #fff;
      margin-top: r(17);
      @at-root ul {
        /*font-size: 0;*/
        @at-root .shopping_mall_nav-item {
          /*display: inline-block;*/
          width: 25vw;
          text-align: center;
          float: left;
          /*box-sizing: border-box;*/
          @at-root .logo_nav_img {
            font-size: r(44);
            display: block;
            margin-top: r(22);
            margin-bottom: r(28);
          }
          @at-root .nav_item {
            font-size: r(26);
            display: block;
          }
        }
      }
    }
    @at-root .shopping_mall_management{
      background: #fff;
      margin-top: r(10);
      @at-root .shopping_mall_management_Ul{
         padding-left: r(33);
        @at-root .shopping_mall_management-item{
          line-height: r(88);
          position: relative;
          @at-root .logo_management_img{
            font-size: r(30);
            margin-right: r(45);
          }
          @at-root .mall_order{
            color:#f54f66;
          }
          @at-root .my_card{
            color:#2979e5;
          }
          @at-root .cargo_addr{
            color:#feb041;
          }
          @at-root .coupon{
            color:#ef7fad;
          }
          @at-root span{
            font-size: r(28);
          }
          @at-root .waitPlay{
            color:#c8c7cd;
            position: absolute;
            right: r(63);
          }
          @at-root .right_angle{
            color:#c8c7cd;
            position: absolute;
            right:r(30);
            top:r(9);
          }
        }
      }
    }
    @at-root .shopping_mall_help{
      margin-top: r(12);
      background: #fff;
      @at-root .shopping_mall_help_management{
        padding-left: r(33);
        @at-root .shopping_mall_help_management-item{
          line-height: r(88);
          position: relative;
          @at-root .feedback,.set,.helpCenter{
            font-size: r(30);
            margin-right: r(45);
          }
          @at-root .feedback{
            color:#f44e63;
          }
          @at-root .set{
            color: #2879e5;
          }
          @at-root .helpCenter{
            color:#ffb142;
          }
          @at-root .right_angle{
            color:#c8c7cd;
            position: absolute;
            right:r(30);
            top:r(17);
          }
        }
      }
    }
    }

</style>

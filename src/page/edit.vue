<template>
  <div>
    <div class="containers">
      <!--<router-link to="/addAddress"><app-header>添加收货地址</app-header></router-link>-->
      <van-nav-bar title="添加收货地址"
                   left-arrow
                   left-text="返回"
                   right-text="next"
                   @click-left="onClickLeft"
                   @click-right="onClickRight"
      >
      </van-nav-bar>
      <div class="mask" v-if="mask"></div>
      <ul class="main--container">
        <li class="main--container__item">
          <span class="main--container__item--left">收货人</span><!--
          --><input type="text" class="main--container__item--right" placeholder="请填写收货人姓名"
                    v-model.lazy="userName" @blur="user">
        </li>
        <li class="main--container__item">
          <span class="main--container__item--left">手机号码</span><!--
          --><input type="tel" class="main--container__item--right" placeholder="请填写手机号码"
                    v-model="phoneNumber" @blur="validate" @keyup="show_del">
          <span class="del_phone_num" v-show="isDelShow" @click="del_phoneNumber">
            <img src="../assets/del.png" alt="" class="del_logo">
          </span>
        </li>
        <li class="main--container__item">
          <span class="main--container__item--left">所在区域</span><!--
        --><input type="text" class="main--container__item--right address--down" placeholder="请选择"
                   :value="address" @click="getAddress" readonly>
        </li>
        <li class="main--container__items">
          <span class="main--container__item--lefts">详细地址</span>
          <input type="text" class="main--container__item--rights" placeholder="街道楼号"
                 v-model="detailAddress" @blur="detailInfo">
        </li>
      </ul>
      <app-button style="bottom: 7.4rem;" @click.native="save">保存</app-button>
    </div>
    <div class="confirm" v-if="isShows">
      <div class="tipContainer">
          <div class="del" @click="tosend"><img src="../assets/del.png"/></div>
        <span class="tip--title">提示</span>
        <span class="tip--content">收货地址保存成功</span>
          <app-button @click.native="tosend" class="sure_btn">确定</app-button>
      </div>
    </div>
    <select-area :is-show.sync="isShow" v-model="address"></select-area>
  </div>
</template>

<script>
import AppHeader from '../components/app-header';
import AppButton from '../components/app-button';


export default {
  name: 'edit',
  components: { AppButton, AppHeader},
  data() {
    return {
      isRefeshed: true,
      userName:  '',
      phoneNumber: '',
      address: '',
      selectAddress: '请选择',
      arr: [],
      detailAddress: '',
      mask: false,
      isShow: false,
      addrIsShow: false,
      sendInfo: {},
      isShows: false,
      isDelShow: false,
    };
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    },
    onClickRight() {
      this.$router.go(1);
    },
    user() {
      if(this.username === ''){
        this.$notify({
          message: '请输入用户名！',
          duration: 800,
          background: '#1989fa'
        });
      }
    },
    validate() {
      if (!(/^1[3-8][0-9]{9}$/.test(this.phoneNumber))) {
        this.$notify({
          message: '请输入正确的号码！',
          duration: 800,
          background: '#1989fa'
        })
      }
    },
    detailInfo() {
      if (this.detailAddress === '') {
        this.$notify({
          message: '请输入街道信息！',
          duration: 800,
          background: '#1989fa'
        })
      }
    },
    show_del(){
      if(this.phoneNumber !== ""){
        this.isDelShow = true;
      }else{
        this.isDelShow = false;
      }
    },
    del_phoneNumber() {
       this.phoneNumber = '';
       this.isDelShow = false;
    },
    getAddress() {
      // this.mask = true;
      // this.addrIsShow = true;
      this.isShow = true;
      this.$request.addr()
        .then((data)=>console.log(data))
        .catch((error)=>console.log(error));
      // this.$on('input',(data)=>this.address=data);
    },
    closeAddr() {
      this.mask = false;
      this.addrIsShow = false;
    },
    save() {
      if (this.userName !== '' && this.phoneNumber !== '' && this.address !== '' && this.detailAddress !== '') {
        this.mask = true;
        this.isShows = true;
        this.sendInfo = {
          userName: this.userName,
          phoneNumber: this.phoneNumber,
          address: this.address,
          detailAddress: this.detailAddress,
        };
      }else{
        this.$notify({
          message: '请输入相关信息！',
          duration: 800,
          background: '#1989fa'
        })
      }

    },
    tosend() {
      console.log(this.sendInfo);
      this.$request.addAddr(
        {
          receiver: this.userName,
          location: this.address,
          details: this.detailAddress,
          phoneNumber: this.phoneNumber
        }
      ).then((data => {
        if(data.data.code === 4001){
        console.log(data);
        this.$router.push('/addAddress');
      }
      })).catch((error)=>console.log(error));
    },
  },
  created() {
    if(this.$route.query.Data){
      this.userName = this.$route.query.Data.receiver;
      this.phoneNumber = this.$route.query.Data.phoneNumber;
      this.address = this.$route.query.Data.location;
      this.detailAddress = this.$route.query.Data.details;
    }
  }
};
</script>

<style scoped lang="scss">
  @function r($px, $unit:75) {
    @return $px/$unit#{rem}
  }
  $mainFC:#363636;
  $secondFC:#cdcdcd;
  $bg:#fff;
  $mainBC:#c0c0bf;
  $secondBC:#e4e4e4;
  $goldC: #1c94cf;
  *{
    margin: 0;
    padding: 0;
  }
  .sure_btn{
    bottom: 0.77777rem;
  }
  .del_phone_num{
         width: 16px;
        display: inline-block;
        background: #ccc;
    position: absolute;
    right:30px;
    top:20px;
    border-radius: 50%;
    text-align: center;
    line-height: 16px;
    z-index: 888;
  }
  .del_logo{
    width: 10px;
    height: 10px;
  }
  .containers {
    width: 100vw;
    user-select: none;
    @at-root .mask {
      width: 100vw;
      height: 100vh;
      position: absolute;
      top: 0;
      left: 0;
      z-index: 999;
      background: rgba(0,0,0,.3);
      display: block;
    }

    @at-root .main--container {
      position: relative;
      @at-root .main--container__item {
        list-style: none;
        background-color: #fff;
        height: 1.41333333333rem;
        position: relative;
        font-size: .37333333333333rem;
        &::after {
          content: '';
          display: inline-block;
          width: 8.9333333333333rem;
          height: 1px;
          background: $secondBC;
          position: absolute;
          left: 0.533333333333rem;
          top: 1.41333333333rem;
          z-index: 99;
        }

        @at-root .main--container__item--left {
          text-indent: .533333333333rem;
          display: inline-block;
          width: 2.6666666666666rem;
          height: inherit;
          line-height: 1.4133333333333rem;
          vertical-align: middle;

        }
        @at-root .main--container__item--right {
          display: inline-block;
          width: 7.333333333333rem;
          border: none;
          outline: none;
          caret-color: $secondFC;
          color: $mainFC;
          vertical-align: middle;
        }
      }
      @at-root .main--container__items {
        list-style: none;
        background-color: #fff;
        height: r(155);
        position: relative;
        font-size: .37333333333333rem;
        &::after {
          content: '';
          display: inline-block;
          width: 8.9333333333333rem;
          height: 1px;
          background: $secondBC;
          position: absolute;
          left: 0.533333333333rem;
          top: r(155);
          z-index: 99;
        }
        @at-root .main--container__item--lefts {
          text-indent: .533333333333rem;
          display: inline-block;
          width: 2.6666666666666rem;
          height: inherit;
          line-height: 1.4133333333333rem;
          vertical-align: middle;

        }
        @at-root .main--container__item--rights {
          display: inline-block;
          width: 8.9333333333333rem;
          border: none;
          outline: none;
          caret-color: $secondFC;
          color: $mainFC;
          vertical-align: middle;
          position: absolute;
          top: r(80);
          left: r(40);
        }
      }
    }
  }
  .confirm{
    .tipContainer{
      background: #fff;
      width: r(600);
      height: r(400);
      position: relative;
      z-index: 9999;
      top: r(-110);
      left: 0;
      right: 0;
      margin: 0 auto;
      border: 1px solid #fff;
      &::before{
        content: '！';
        color: #fff;
        text-align: center;
        position: absolute;
        left: 0;
        right: 0;
        margin: 0 auto;
        top: r(-60);
        width: r(120);
        height: r(120);
        border: 1px solid #fff;
        border-radius: 50%;
        background: url("../assets/dingdong.png") center no-repeat #fff;
        background-size: 56%;
      }
      @at-root .del{
        width: r(40);
        height: r(40);
        display: block;
        position: absolute;
        top: r(20);
        right: r(20);
        @at-root img{
          width: r(40);
          height: r(40);
        }
      }
      @at-root .tip--title{
        display: block;
        font-size: r(25);
        text-align: center;
        color: $mainFC;
        position: absolute;
        top: r(100);
        margin: 0 auto;
        left: 0;
        right: 0;
      }
      @at-root .tip--content{
        display: block;
        font-size: r(25);
        text-align: center;
        color: #aaa;
        position: absolute;
        top: r(170);
        margin: 0 auto;
        left: 0;
        right: 0;
      }
    }
  }
  .address--wrap{
    width: 100vw;
    height: r(830);
    position: absolute;
    z-index: 99999;
    bottom: 0;
    background: #fff;
    @at-root .wrap-title{
      display: inline-block;
      text-align: center;
      position: absolute;
      left: 0;
      top: r(20);
      right: 0;
      margin: 0 auto;
      font-size: r(28);
    }
    @at-root .wrap-close{
      position: absolute;
      top: r(20);
      right: r(15);
    }
    @at-root .select-addr{
      line-height: r(40);
      position: absolute;
      font-size: r(28);
      top: r(50);
      left: r(40);
    }

.wrapCon--item{
  list-style: none;
  line-height: 1.41333333333rem;
  border-top: 1px solid #ccc;
  margin-left: r(40);
}
  }
</style>

<template>
    <div class="shoppingCar">
      <van-nav-bar title="购物车"
                   left-arrow
                   right-text="编辑"
                   @click-left="onClickLeft"
                   @click-right='onClickRight'
      >
      </van-nav-bar>
      <div class="shoppingCar_container">
           <div class="shoppingCar_container_header">
              <van-checkbox class="autotrophy" v-model="checked">快捷商城自营</van-checkbox>
           </div>
           <div class="shoppingCar_container_bodyer" v-for="(item,key) in imgArr">
             <img src="../assets/no-default.png" alt="" class="default" @click="changeDefault(key)" v-show="isNoDefault">
             <img src="../assets/default.png" alt="" class="default itemDefault" v-show="isDefault">
             <div class="carLogo"><img :src="item.prod.prodImage[0]" alt="" class="carLogo_img"></div>
              <div class="right_box">
                     <span class="right_box_title">{{item.prod.prodSupTitle}}</span>
                     <span class="price_title">￥{{item.prod.currentPrice}}</span>
                <div class="allBtn">
                  <span class="subtractBtn" @click="subtractNum(key)">-</span>
                  <span class="numScore">{{item.num}}</span>
                  <span class="addBtn" @click="addNum(key)">+</span>
                </div>
              </div>
           </div>
          <div class="clear_box" v-show="Clear_show" @click="removeNews">
            <span class="remove">删除({{this.imgArr.length}})</span>
          </div>
           <div class="shoppingCar_footer" v-show="isCloseAccount">
              <img src="../assets/no-default.png" alt="" class="default">
              <div class="center_news">
                <p class="first_news">合计:<span class="sumPrive">{{sumMoney}}</span><span class="hasNoFreight">不含运费</span></p>
                <p class="discountPrice">已优惠金额:<span>￥{{discountprice}}</span></p>
              </div>
              <div class="closeAccount" @click="toAffirmOrder">结算({{this.imgArr.length}})</div>
           </div>
      </div>
    </div>
</template>

<script>
  export default {
    name: 'shoppingCar',
    data(){
      return {
             discountPrice: 0,
             imgArr: [],
             Clear_show: false,
             isCloseAccount: true,
             isShow: false,
             showIsDefault: false,
             checked: false,
             isDefault: false,
             isNoDefault:true,
             userInfo: {
               idArr: [],
          },
          codeId: [],
          idCode: [],
      }
    },
    methods: {
      changeDefault(key){
          this.userInfo.idArr.push(this.imgArr[key]._id);
      },
      toAffirmOrder() {
         this.$router.push('/affirmOrder');
      },
      //减少数量
      subtractNum(key){
       /* console.log(this.imgArr[key]._id);
        console.log(this.imgArr[key].num);*/
        this.idCode.push(this.imgArr[key]._id);
        this.imgArr[key].num --;
        if(this.imgArr[key].num <= 0){
          this.imgArr[key].num = 1;
        }
        this.$request.updateCart({cartid: this.idCode,num: +(this.imgArr[key].num),checked: true})
          .then(data => {
            console.log(data);
          })
          .catch(err => {
            console.log(err);
          })
      },

      //增加数量
      addNum(key){
        this.idCode.push(this.imgArr[key]._id);
        this.imgArr[key].num ++;
        this.$request.updateCart({cartid: this.idCode,num: +(this.imgArr[key].num),checked: true})
          .then(data => {
            console.log(data);
          })
          .catch(err => {
            console.log(err);
          })
      },

      //删除商品
      removeNews() {
        console.log(this.userInfo.idArr);
        this.$request.deleteCart({cartids:this.userInfo.idArr})
          .then(data => {
            if(data.data.code === 1){
              this.imgArr.splice(0,this.imgArr.length);
            }
            console.log(data);
          })
          .catch(err => {
            console.log(err);
          })
      },
      // 跳转
      onClickLeft() {
        this.$router.push('./commodityDetails');
      },
      // 点击编辑显示结算 或 删除
      onClickRight() {
         if(!this.isShow){
           this.Clear_show = true;
           this.isCloseAccount = false;
           this.isShow = true;
         }else{
           this.Clear_show = false;
           this.isCloseAccount = true;
           this.isShow = false;
         }
      },
    },
    computed: {
      sumMoney() {
        return this.imgArr.reduce(function (prev, currentValue){
          return prev + ((+currentValue.prod.currentPrice) * (+currentValue.num))
        },0);
      },
      discountprice() {
        return this.imgArr.reduce(function (prev, currentValue){
          return prev + ((+currentValue.prod.originPrice) - (+currentValue.prod.currentPrice)) * (+currentValue.num)
        },0);
      }
    },
    created() {
      this.$request.getCart()
        .then((data) => {
          if(data.data.code === 1) {
            console.log(data);
            this.imgArr = data.data.data;
            console.log(this.imgArr[1]);
          }
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
  *{
    margin: 0;
    padding: 0;
    user-select: none;
    -webkit-tap-highlight-color: rgba(0,0,0,0);
  }
  @at-root .allBtn{
    width: r(200);
    height: r(60);
    display: inline-block;
    border: 1px solid #bbbbbb;
    line-height: r(60);
    border-radius: r(10);
    box-sizing: border-box;
    margin-left: r(33);
    position: absolute;
    right: r(10);
    top: r(140);
    .subtractBtn{
      display: inline-block;
      width: r(60);
      text-align: center;
      border-right: 1px solid #dedede;
    }
    .numScore{
      width: r(60);
      display: inline-block;
      text-align: center;
    }
    .addBtn{
      width: r(60);
      border-left: 1px solid #dedede;
      text-align: center;
      float: right;
    }
  }
  @at-root .shoppingCar_container{
     background: #f6f6f6;
     height: 100vh;
     overflow: hidden;
     overflow-y: auto;

    &::-webkit-scrollbar{
      display: none;
    }
    .showItem{
      float: left;
      margin-right: r(30);
    }
     @at-root .shoppingCar_container_header{
        line-height: r(80);
        border-bottom: 1px solid #ebebeb;
        padding-left: r(28);
       background: #fff;
       .default{
         width: r(40);
         height: r(40);
         position: relative;
         top: r(10);
       }
       .autotrophy{
            font-size: r(25);
            margin-left: r(10);
       }
     }
     @at-root .shoppingCar_container_bodyer{
        height: r(227);
        border-bottom: 1px solid #ebebeb;
        line-height: r(227);
       position: relative;
       padding-left: r(28);
       background: #fff;
       .default{
         width: r(40);
         height: r(40);
         vertical-align: middle;
         margin-right: r(10);
       }
       .carLogo{
         width: r(144);
         height: r(144);
         border: 1px solid #ebebeb;
         display: inline-block;
         line-height: r(144);
         vertical-align: middle;
         .carLogo_img{
           width: r(144);
           height: r(144);
         }
       }
       .right_box{
         float: left;
         .right_box_title{
                font-size: r(26);
                position: absolute;
                top: r(-60);
                left: r(260);
         }
         .price_title{
           position: absolute;
           left: r(260);
           top:r(55);
           font-size: r(23);
         }
         .scoreBtn{
            position: absolute;
           right: r(15);
           top: r(60);
         }
       }
     }
     @at-root .clear_box{
         position: fixed;
         background: #fff;
         bottom: r(0);
         right:r(0);
         /*height: r(85);*/
          width: 100vw;
          .remove{
             background: #ea5331;
             color: #fff;
             text-align: center;
             display: inline-block;
             width: r(216);
             height: r(85);
             font-size: r(28);
             line-height: r(85);
            float: right;
          }
     }
     @at-root .shoppingCar_footer{
        position: fixed;
        bottom: 0;
        height: r(92);
        left: 0;
        right: 0;
        background: #fff;
       padding-left: r(28);
        .default{
          width: r(40);
          height: r(40);
          position: relative;
          top: r(-6);
          margin-right: r(33);
        }
        @at-root .center_news{
            height: r(92);
            display: inline-block;
             @at-root .first_news{
                  height: r(46);
                 line-height: r(46);
                 font-size: r(25);
                .sumPrive{
                  color: #e53133;
                  font-size: r(21);
                }
               .hasNoFreight{
                  color:  #d5d5d5;
                 margin-left: r(5);
                 font-size: r(10);
               }
             }
          @at-root .discountPrice{
            height: r(46);
            line-height: r(46);
            font-size: r(19);
          }

        }
        @at-root .closeAccount{
          background: #458df7;
          color: #fff;
          text-align: center;
          display: inline-block;
          width: r(216);
          height: r(92);
          font-size: r(28);
          line-height: r(92);
          float: right;
        }
     }
  }
</style>

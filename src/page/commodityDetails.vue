<template>
    <div class="commodityDetails_container">
      <div class="commodityDetails_container_header">
        <span class="back--key"><router-link to="shoppingStore" class="back--key"><i class="fa fa-3x fa-angle-left"></i></router-link></span>
        <span class="content">
             <a class="commodity liner" href="#Commodity" @click="Commodity">商品</a>
              <i class="far"></i>
             <a href="#goodsDetails" class="Details" @click="Details">详情</a>
         </span>
         <img src="../assets/share.png" alt="" class="shareLogo">
      </div>
      <div class="center_container" id="Commodity" name="Commodity">
        <div class="swiper_box">
          <van-swipe @change="onChange" class="adfd">
            <van-swipe-item v-for="(item,key) in skillImgArr.prodImage" :key="key">
              <img :src="item" class='swipe_img'>
            </van-swipe-item>
            <div class="custom-indicator" slot="indicator">
            {{ current + 1 }}/4
            </div>
          </van-swipe>
        </div>
        <div class="commodity_goodNews_box">
          <div class="superBag">
            <p class="superBag_title">{{skillImgArr.prodSubTitle}}</p>
            <p class="superBag_discountCoupon">{{skillImgArr.prodSupTitle}}</p>
            <span class="price">￥{{skillImgArr.currentPrice||skillImgArr.killPrice}}</span>
          </div>
          <div class="quality_safeguard">
            <i class="quality_safeguard_logo"></i>
            <span class="quality_safeguard_title">100%正品保障</span>
          </div>
          <div class="address">
            <p class="address_box">
              <span class="delivery">配送至</span>
              <span class="address_title">{{addressTitle}}</span>
              <i class="fa fa-3x fa-angle-right right_angle"></i>
            </p>

            <span class="hasGoods">有货</span>
          </div>
          <div class="choosed_goods_box">
            <span class="choosed_title">已选</span>
            <span class="choosed_count">1件</span>
            <i class="fa fa-3x fa-angle-right right_angle"></i>
          </div>
        </div>
        <div class="commodityDetails_Details_container">
          <div class="details_box">
            <span class="left_logo"></span>
            <span class="goods_Details" id="goodsDetails">商品详情</span>
          </div>
          <div class="img_logo" v-for="(item,key) in skillImgArr.prodImage" :key="key">
            <img :src="item" alt="" class="img_logo">
          </div>
        </div>
        <div class="commodityDetails_container_footer">
          <i class="iconfont icon-cart_icon shoppingCar" @click="toshoppingCar"></i>
          <div class="btn_box">
            <span class="shoppingCar_btn" @click="showMask">加入购物车</span>
            <span class="immediately_buy_btn" @click="showMask">立即购买</span>
          </div>
        </div>
      </div>
      <div class="mask" v-show="isMask" @click='hideMask'></div>
      <div class="mask_news" v-show="isMaskNews">
          <div class="mask_news_container">
            <div class="mask_logoImg"><img :src="skillImgArr.prodImage[0]" alt="" class="skillImg_logo"></div>
            <p class="price_title">￥{{skillImgArr.currentPrice||skillImgArr.killPrice}}</p>
            <p class="goodsCode">商品编号:<span>{{skillImgArr._id}}</span></p>
           </div>
            <div class="line"></div>
            <div class="title_score">
                  <span>数量</span>
                  <div class="allBtn">
                    <span class="subtractBtn" @click="subtractNum">-</span>
                    <span class="numScore">{{goodsNumScore}}</span>
                    <span class="addBtn" @click="addNum">+</span>
                  </div>
            </div>
            <div class="footer_btn" @click="submitBtn">确认</div>
      </div>
    </div>
</template>

<script>
  export default {
    name: 'commodityDetails',
    data() {
      return {
          current: 0,
          skillImgArr: [],
          isMask: false,
          isMaskNews: false,
          goodsNumScore: 1,
          addressTitle: '',
      }
    },
    methods: {
      //跳转购物车页面
      toshoppingCar(){
        this.$router.push('/shoppingCart');
      },
      submitBtn() {
        this.$request.addCart({prodid: this.skillImgArr._id,num: this.goodsNumScore})
          .then((data) => {
            console.log(data);
            if(data.data.code === 1){
              this.isMask = false;
              this.isMaskNews = false;
            }
          })
          .catch((err) => {
            console.log(err);
          })
      },
      Commodity(){
        var Details = document.getElementsByClassName("Details")[0];
        var commodity = document.getElementsByClassName("commodity")[0];
        Details.className = 'Details';
        commodity.className = 'commodity liner';
      },
      Details() {
           var Details = document.getElementsByClassName("Details")[0];
           var commodity = document.getElementsByClassName("commodity")[0];
           Details.className = 'Details liner';
           commodity.className = 'commodity';
     },
      subtractNum(){
        this.goodsNumScore --;
        if(this.goodsNumScore <= 0){
          this.goodsNumScore = 1;
        }
      },
      addNum() {
        this.goodsNumScore ++;
      },
      onChange(index) {
        this.current = index;
      },
      showMask() {
        this.isMask = true;
        this.isMaskNews = true;
      },
      hideMask(){
        this.isMask = false;
        this.isMaskNews = false;
      }
    },

    created() {
      this.skillImgArr = this.$route.query.dataImg;
      console.log(this.skillImgArr);

      //获取地址

       this.$request.addr()
         .then(data => {
           this.addressTitle = data.data.data[0].location;
         })
         .catch(err => console.log(err));
    }
  };
</script>

<style scoped lang="scss">
  @import '../demo/iconfont.css';
  @function r($px, $unit:75) {
    @return $px/$unit#{rem}
    }
  *{
    margin: 0;
    padding: 0;
    user-select: none;
    -webkit-tap-highlight-color: rgba(0,0,0,0);
  }
  @at-root .commodityDetails_container{
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    background: #f3f3f3;
    overflow-y: auto;
    &::-webkit-scrollbar{
      display: none;
    }
      @at-root .commodityDetails_container_header{
        line-height: r(99);
        text-align: center;
        background: #fff;
        position: fixed;
        left: 0;
        right: 0;
        z-index: 999;
        @at-root .back--key{
          position: absolute;
          left: r(31);
          top:r(10);
          color:#3f3f3f;
        }
        @at-root .content{
           font-size: r(35);
          font-weight: 700;
          letter-spacing: 1px;
          a{
            color:#2f2f2f;
          }
      /*  .commodity{

             }*/
          .liner{
            color: #2269e8;
            display: inline-block;
            border-bottom: 3px solid #196ef8;
          }
         /* .Details:hover{
            color: #2269e8;
            display: inline-block;
            border-bottom: 3px solid #196ef8;
          }*/
          .far{
            width: r(63);
            display: inline-block;
          }
        }
        @at-root .shareLogo{
          width: r(40);
          height: r(38);
          position: absolute;
          top:r(33);
          right: r(30);
        }
    }
      @at-root .center_container{
        margin-top: r(120);
      }
      @at-root .swiper_box{
        width: 100vw;
        height: r(750);
        background: #fff;
        margin-bottom: r(44);
        position: relative;
        .swipe_img {
          width: 100vw;
           height: r(750);
        }
        .custom-indicator{
          width: r(78);
          height: r(43);
          background:#5e5e61;
          border-radius: r(10);
          text-align: center;
          line-height: r(43);
          color: #eaeaea;
          position: absolute;
          right:r(30);
          bottom: r(11);
        }
      }
      @at-root .commodity_goodNews_box{
        background: #fff;
        margin-bottom: r(11);
         @at-root .superBag{
            /*height: r(175);*/
            border-bottom: 1px solid #f1f1f1;
            box-sizing: border-box;
            padding-top: r(33);
            .superBag_title{
              font-size: r(28);
              letter-spacing: 1px;
              margin-left: r(50);
            }
            .superBag_discountCoupon{
             color:#ff8986;
             margin-left: r(48);
             margin-top: r(17);
             font-size: r(22);
             letter-spacing: 1px;
           }
            .price{
                margin-top: r(29);
                margin-left: r(46);
                font-size: r(26);
                color:#6b6b6b;
                display: inline-block;
                margin-bottom: r(22);
            }
         }
         @at-root .quality_safeguard{
            line-height: r(79);
            border-bottom: 1px solid #f1f1f1;
            box-sizing: border-box;
           .quality_safeguard_logo{
             width: r(29);
             height: r(29);
             background: red;
             display: inline-block;
             margin-left: r(25);
           }
          .quality_safeguard_title{
              font-size: r(23);
              margin-left: r(20);
              color: #676767;
              letter-spacing: 1px;
          }
         }
         @at-root .address{
           height: r(145);
           border-bottom: 1px solid #f1f1f1;
           position: relative;
           @at-root .address_box{
             margin-left: r(32);
             letter-spacing: 1px;
             line-height: r(75);
             padding-top: r(10);
              .delivery{
                color: #676767;
                margin-right: r(34);
                font-size: r(23);
              }
              .address_title{
                 color: #343434;
                font-size: r(23);
             }
             .right_angle{
               display: inline-block;
               vertical-align: middle;
                position: absolute;
                right: r(36);
               color: #b2b2b2;
             }

           }
           @at-root .hasGoods{
              width: r(88);
             height: r(40);
             border: 1px solid #da9f72;
             color: #eda16a;
             line-height: r(40);
             text-align: center;
             letter-spacing: 2px;
             display: inline-block;
             border-radius: r(10);
             font-size: r(28);
             position: absolute;
             left:r(155);
           }
         }
         @at-root .choosed_goods_box{
            line-height: r(83);
            color:#9b9b9b;
            letter-spacing: 1px;
            font-size: r(20);
            position: relative;
           .choosed_title{
                 margin-left: r(33);
             margin-right: r(66);
           }
           .right_angle{
             display: inline-block;
             vertical-align: middle;
             position: absolute;
             right: r(35);
             color: #b2b2b2;
             /*font-size: 3.5em;*/
           }
         }
      }
      @at-root .commodityDetails_Details_container{
        background: #fff;
        margin-bottom: 9vh;
         @at-root .details_box{
            line-height: r(95);
           height: r(95);
             .left_logo{
                width: r(5);
                 height: r(30);
               display: inline-block;
               background: #339fff;
               margin-left: r(30);
               margin-right: r(21);
                /*vertical-align: middle          */
             }
            .goods_Details{
                font-size: r(30);
              letter-spacing: 1px;
            }
         }
        .img_logo{
          height:460px;
          width: 100vw;
          margin-bottom: 1px;
        }
      }
      @at-root .commodityDetails_container_footer{
          line-height: r(105);
          height: r(105);
          position: fixed;
          bottom: 0;
          left: 0;
          right: 0;
          background: #fff;
        @at-root .shoppingCar{
          font-size: r(45);
          margin-left:r(73);
        }
        @at-root .btn_box{
          width: r(519);
          height: r(76);
          border-radius: r(50);
          overflow: hidden;
          font-size: 0;
          line-height: r(76);
          position: absolute;
          top:r(13);
          right:r(30);
          .shoppingCar_btn,.immediately_buy_btn{
            width: 50%;
            display: inline-block;
            font-size: r(30);
            text-align: center;
            height: r(76);
            letter-spacing: 2px;
          }
          .shoppingCar_btn{
            background: #f97b2e;
            color: #ffffef;
          }
          .immediately_buy_btn{
            background: #3c9dfc;
            color: #f7faff;
          }
        }
      }
      @at-root .mask{
        width: 100vw;
        height: 100vh;
        position: absolute;
        background: #4c4c4c;
        z-index: 999;
        top:0;
        opacity: .8;
      }
     @at-root .mask_news{
       width: 100vw;
       height: r(960);
       background-color: #fff;
       position: fixed;
       z-index: 9991;
       bottom: 0;
        @at-root .mask_news_container{
            height: r(197);
          @at-root .mask_logoImg{
            width: r(221);
            height: r(221);
            border: 1px solid #f2f2f2;
            position: absolute;
            left: r(30);
            top: r(-66);
            border-radius: r(10);
            .skillImg_logo{
              width: r(221);
              height: r(221);
            }
          }
          .price_title{
             color: #ff3000;
             font-size: r(27);
            position: absolute;
            left: r(272);
            top: r(38);
          }
          .goodsCode{
            font-size: r(27);
            color: #333333;
            position: absolute;
            left: r(272);
            top: r(80);
          }
        }
        @at-root .line{
          height: 1px;
          background: #dddddd;
          margin: 0 r(30);
        }
         @at-root .title_score{
             line-height: r(112);
           padding-left: r(32);
           font-size: r(30);
           color:#333333;
           letter-spacing: 1px;
           margin-top: r(10);
           @at-root .allBtn{
             width: r(200);
             height: r(60);
             display: inline-block;
             border: 1px solid #bbbbbb;
             line-height: r(60);
             border-radius: r(10);
             box-sizing: border-box;
             margin-left: r(33);
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
         }
       @at-root .footer_btn{
         position: fixed;
         left: 0;
         right: 0;
         bottom: 0;
         text-align: center;
         line-height: r(90);
         background: #3d9dfd;
         font-size: r(33);
         color: #feffff;
         letter-spacing: 3px;
       }
     }
  }
</style>

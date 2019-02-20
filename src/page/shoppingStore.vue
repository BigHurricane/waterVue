<template>
  <div class="myMall">
    <!--<div class="myMall-header">
      <div class="selectCont">
        <i class="iconfont icon-kefu orderIcon relService"></i>
        <img class="searchIcon" src="../assets/search.png" />
        <input class="searchMall" type="text" placeholder="保暖内衣">
        &lt;!&ndash;<i class="iconfont icon-cart_icon shoppingCart"></i>&ndash;&gt;
      </div>
      <van-tabs color="#2864d9" @click="chooseTitle" >
        <van-tab v-for="item in tabTitle" :title="item" color="#2864d9"></van-tab>
      </van-tabs>
    </div>-->
    <commodity-header></commodity-header>
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
      <div class="MyMall_bodyer">
        <div class="swiper">
          <van-swipe :autoplay="3000">
            <van-swipe-item v-for="(item, key) in userInfo.images" :key="key">
              <img :src="item.bannerUrl" class='swipe_img'>
            </van-swipe-item>
          </van-swipe>
        </div>
        <div class="choose_nav">
          <ul class="choose_nav_box">
            <li class="choose_nav_item">
              <i class="iconfont icon-zuichun first_logo size"></i>
              <span>美妆护肤</span>
            </li>
            <li class="choose_nav_item">
              <i class="iconfont icon-shoubiao  second_logo size"></i>
              <span>名品腕表</span>
            </li>
            <li class="choose_nav_item">
              <i class="iconfont icon-jiajujiafang  third_logo size"></i>
              <span>超值家纺</span>
            </li>
            <li class="choose_nav_item">
              <i class="iconfont icon-lv_zuanshi  four_logo size"></i>
              <span>潮流饰品</span>
            </li>
            <li class="choose_nav_item">
              <i class="iconfont icon-gouwuche  five_logo size"></i>
              <span>时尚箱包</span>
            </li>
          </ul>
        </div>
        <div class="immediately_Rush">
          <div class="immediately_Rush_left">
            <img src="../assets/bbb.png" alt="" style="width: 45vw;height: 14vh;">
          </div>
          <div class="immediately_Rush_right">
            <img src="../assets/aaa.png" alt="" style="width: 45vw;height: 14vh;">
          </div>
        </div>
        <div class="limit_seckill">
          <span class="limit_time">限时秒杀</span>
          <span class="timeout">距结束还有</span>
          <div class="countDown">
            <span>{{h}}</span>:<span>{{m}}</span>:<span>{{s}}</span>
          </div>
          <div class="limit_seckill_bodyer">
            <ul class="limit_seckill_bodyer_box">
              <li v-for="(item,key) in userInfo.secKillArr.secKillImgsArr" :key="key" class="limit_seckill_bodyer_item">
                <img :src="item.prodImage[0]" alt="" class="imgSize" @click="secKill(key)">
                <span class="after_sales_price">券后价</span>
              </li>
            </ul>
          </div>
        </div>

        <div class="siftActivity_container">
          <p class="siftActivity_title">精选活动</p>
          <div class="siftActivity_container_box" v-for="(item,key) in userInfo.imgArr">
            <div class="siftActivity_container_sort">
              <div class="siftActivity_container_sort-header"></div>
              <ul class="siftActivity_container_sort-bodyer">
                <li v-for="(items,index) in item" class="siftActivity_container_sort-bodyer_item">
                  <img :src="items.prodImage[0]" alt="" class="logo_img-size" @click="siftActivity(item,index)">
                  <span class="after_sales_price">券后价</span>
                  <p class="price_title">
                    <span>￥33</span>
                    <del class="after_price">￥63</del>
                  </p>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div class="siftActivity_container-recommend">
          <span class="recommend_title">为你推荐</span>
          <div class="recommend_box" v-for="(item,key) in getRecommend">
            <div class="recommend_left">
              <img :src="item.prodImage[0]" alt="" class="recommend_img_size" @click="tocommodityDetails(key)">
            </div>
            <div class="recommend_right">
              <p class="title">{{item.prodSubTitle}}</p>
              <p class="recommend_right_box">
                <span class="after_sales_prices">券后价</span>
                <span class="after_sale_price">￥{{item.currentPrice}}</span>
              </p>
              <p class="originalPrice">原价: ￥{{item.originPrice}}</p>
            </div>
          </div>
        </div>
      </div>
    </van-pull-refresh>
    <footer-nav></footer-nav>
  </div>

</template>

<script>
  export default {
    name: 'shoppingStore',
    data() {
      return{
        isLoading: false,
        isRefeshed:true,
        siftActivityLogo: 3,
        recommendLogo:5,
        getRecommend: [],
        userInfo: {
          images: [],
          secKillArr: {
            secKillImgsArr:[],
            secKillImgsArrItem: []
          },
          imgArr: {
            beautyArr:[],
            departmentArr: [],
            watches: [],
            electrical:[],
            phone:[],
            parts:[]
          },
        },
        h:'',
        m:'',
        s:'',
        times : 0,
        objTmr :null,
      }
    },
    methods:{
      //点击推荐图片跳转详情页
      tocommodityDetails(key){
        this.$router.push({path:'/commodityDetails',query:{dataImg:this.getRecommend[key]}});
      },
      onRefresh() {
        setTimeout(() => {
          this.$toast('刷新成功');
          this.isLoading = false;
          this.count++;
        }, 2000);
      },
      siftActivity(item,index){
        this.$router.push({path:'/commodityDetails',query:{dataImg:item[index]}});

      },
      secKill(index){
        this.userInfo.secKillArr.secKillImgsArrItem = this.userInfo.secKillArr.secKillImgsArr[index];
        console.log(this.userInfo.secKillArr.secKillImgsArrItem);
        this.$router.push({path:'/commodityDetails',query:{dataImg:this.userInfo.secKillArr.secKillImgsArrItem}});
      },
      myShowTime(){
        //20分钟对应的秒
        //取出分和秒
        let h = parseInt(this.times/60/60);	//时
        let m = parseInt(this.times/60)%60;	//分
        let s = this.times%60;				//秒
        //显示
        h < 10 ? (this.h = '0' + h):(this.h = h);
        m < 10 ? (this.m = '0' + m):(this.m = m);
        s < 10 ? (this.s = '0' + s):(this.s = s);
        //时间倒计时（减）
        this.times--;
      },
    },
    created() {
      let cosmetics = {prodCategory:'beauty',prodSubClass:'cosmetics', startIndex: 0, count: 3};
      let freePost = {prodCategory:'department',prodSubClass:'waterCup', startIndex: 0, count: 3};
      let popWatches = {prodCategory:'watches',prodSubClass:'popWatches', startIndex: 0, count: 3};
      let flyco = {prodCategory:'electrical',prodSubClass:'flyco', startIndex: 0, count: 3};
      let mi = {prodCategory:'phone',prodSubClass:'mi', startIndex: 0, count: 3};
      let smartWatch = {prodCategory:'parts',prodSubClass:'smartWatch', startIndex: 0, count: 3};
      this.$http.all([
        this.$request.getCommodity(cosmetics),
        this.$request.getCommodity(freePost),
        this.$request.getCommodity(popWatches),
        this.$request.getCommodity(flyco),
        this.$request.getCommodity(mi),
        this.$request.getCommodity(smartWatch),
        this.$request.getBanner(),
        this.$request.secKillGoods({count:5}),
        this.$request.getRecommend()
      ])
        .then(this.$http.spread((beauty,department,watches,electrical,phone,parts,acct, prems,getRecommend)=>{
          if(beauty.data.code === 10100){
            this.userInfo.imgArr.beautyArr = beauty.data.data;
            console.log(beauty.data.data);
            console.log(this.userInfo.imgArr.beautyArr);
          }
          console.log(department);
          if(department.data.code === 10100){
            this.userInfo.imgArr.departmentArr = department.data.data;
            console.log(department.data.data);
            console.log(this.userInfo.imgArr.departmentArr);
          }
          if(watches.data.code === 10100){
            this.userInfo.imgArr.watches = watches.data.data;
            console.log(this.userInfo.imgArr.watches);
          }
          if(electrical.data.code === 10100){
            this.userInfo.imgArr.electrical = electrical.data.data;
            console.log(this.userInfo.imgArr.departmentArr);
          }
          if(phone.data.code === 10100){
            this.userInfo.imgArr.phone = phone.data.data;
            console.log(this.userInfo.imgArr.phone);
          }
          if(parts.data.code === 10100){
            this.userInfo.imgArr.parts = parts.data.data;
            console.log(this.userInfo.imgArr.parts);
          }
          if(getRecommend.data.code === 1){
              this.getRecommend = getRecommend.data.data;
            console.log(this.getRecommend);
          }
          console.log(getRecommend);
          if(acct.data.code === 10020){
             this.userInfo.images = acct.data.data;
          }
           if(prems.data.code === 10040){
             console.log(prems.data.data);
             this.userInfo.secKillArr.secKillImgsArr = prems.data.data;
            }
        }));
      console.log(this.userInfo.imgArr);
      let data = new Date();
      let hours = data.getHours();
      let minutes = data.getMinutes();
      let seconds = data.getSeconds();
      hours = 24 - hours - 1;
      minutes = 60 - minutes ;
      seconds = 60 - seconds;
      this.times = (hours * 60 + minutes) * 60;
      if (this.objTmr === null) {	//防止连点出BUG
        this.objTmr = setInterval(this.myShowTime, 1000);
       }
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
  @at-root .myMall{
    width: 100vw;
    height: 100vh;
    background: #f3f3f3;
    overflow-y: auto;
    &::-webkit-scrollbar{         //清除滚动条
      display: none;
    }
  }
  .MyMall_bodyer {
    width: 100vw;
    background: #f3f3f3;
    overflow: hidden;
    margin-top: 2.5rem;
  }
  .swiper{
    width: 100vw;
  }
  .swipe_img{
    width: inherit;
  }
 .choose_nav{
   height: r(180);
   background: #fff;
   margin-top: r(-2);
 }
 .choose_nav_box{
  /* padding-top: r(20);
   padding-left: r(28);*/
   display: flex;
   justify-content: space-around;
 }
  .choose_nav_item{
     /*width: 20%;
     float: left;
     box-sizing: border-box;*/
    display: inline-block;
    margin-top: 0.22333rem;
    text-align: right;
  }
  .choose_nav_item>i{
    width: r(93);
    height: r(93);
    border-radius: 50%;
    display: block;
    margin-left: r(10);
    text-align: center;
    line-height: r(93);
  }
  .size{
    font-size: r(65);
    line-height: r(93);
    color:#fff;
  }
  .choose_nav_item > .first_logo{
      background: linear-gradient(left bottom,#ee929a,#d661e9);
      line-height: r(100);
      font-size: r(75);
    }
  .choose_nav_item > .second_logo{
    background: linear-gradient(left bottom,#f3b67b,#ef9255);
    transform: rotate(30deg);
  }
  .choose_nav_item > .third_logo{
    background: linear-gradient(left bottom,#f09686,#ec654f);
  }
  .choose_nav_item > .four_logo{
    background: linear-gradient(left bottom,#837ef5,#5753f3);
  }
  .choose_nav_item > .five_logo{
    background: linear-gradient(left bottom,#967df7,#a056f1);
  }
  .choose_nav_item>span{
      letter-spacing: r(6);
      margin-top: r(17);
      display: inline-block;
  }
  .immediately_Rush{
     font-size: 0;
     padding: 0 r(20);
     background: #fff;
     width: 100vw;
     box-sizing: border-box;
     height: 18vh;
  }
  .immediately_Rush_left{
      width: 45vw;
    height: 14vh;
      background: pink;
      border-radius: r(20);
      float: left;
  }
  .immediately_Rush_right{
    width: 45vw;
    height: 14vh;
    background: pink;
    border-radius: r(20);
    float: right;
  }
  @at-root .limit_seckill{
    background: #fff;
    position: relative;
    margin-top: r(14);
    height: 24.8vh;
    @at-root .limit_time{
      position: absolute;
      left: r(28);
      top:r(41);
      font-size: r(28);
    }
    @at-root .timeout{
      position: absolute;
      right: r(177);
      top:r(44);
      font-size: r(21);
    }
    @at-root .countDown{
      /*width: r(111);*/
      height: r(35);
      position: absolute;
      box-sizing: border-box;
      text-align: center;
      top:r(40);
      right:r(20);
      span{
        width: r(35);
        height: r(35);
        background: #428ef6;
        border-radius: r(8);
        display: inline-block;
        margin: 0 3px 0 3px;
        color:#fff;
        line-height: r(35);
        text-align: center;
      }
    }
    @at-root .limit_seckill_bodyer{
         padding: r(10) r(20);
         overflow: hidden;
         overflow-x: auto;
      &::-webkit-scrollbar{         //清除滚动条
          display: none;
      }
      @at-root .limit_seckill_bodyer_box{
        margin-top: 7vh;
        display: flex;
        @at-root .limit_seckill_bodyer_item{
          width: r(183);
          height: r(225);
          float: left;
          border-radius: r(10);
          margin-right: r(18);
          box-sizing: border-box;
          position: relative;
          box-shadow: #cfcfcf 0 0 10px;
          .imgSize{
            width: r(183);
            height: r(183);
          }
          .after_sales_price{
              width: r(77);
            height: r(30);
            border-radius: r(20);
            background: #458df7;
            color:#fff;
            font-size: r(10);
            position: absolute;
            left: r(23);
            bottom: 0;
            line-height: r(30);
            text-align: center;
            min-width: 1.16rem;
          }
        }
      }
    }
  }
  @at-root .siftActivity_container{
    margin-top: r(17);
    background: #fff;
    padding-top: r(40);
    padding-left: r(28);
    padding-right: r(28);
    @at-root .siftActivity_title{
      font-size: r(30);
    }
    @at-root .siftActivity_container_box{
      /*display: flex;
      justify-content: center;*/
      margin-top: r(43);
      @at-root .siftActivity_container_sort{
        /*width: r(698);*/
        height: r(430);
        box-sizing: border-box;
        .siftActivity_container_sort-header{
          height: r(127);
          border: 1px solid pink;
          margin-bottom: r(30);
        }
        @at-root .siftActivity_container_sort-bodyer{
          padding-left: 12px;
           @at-root .siftActivity_container_sort-bodyer_item{
             float: left;
             width: r(200);
             height: r(280);
             border: 1px solid #55a532;
             margin-right: r(18);
             position: relative;
             @at-root .logo_img-size{
               width: 100px;
             }
             @at-root .after_sales_price{
                width: r(86);
                height: r(30);
               border-radius: r(20);
               background: #458df7;
               color:#fff;
               font-size: r(10);
               position: absolute;
               text-align: center;
               line-height:r(30);
               bottom:r(40);
             }
             @at-root .price_title{
               position: absolute;
               bottom: 0;
               .after_price{
                 color:#b3b3b3;
               }
             }
           }
        }
      }
    }
  }
  @at-root .siftActivity_container-recommend{
    background: #fff;
    margin-top: r(15);
    padding-top: r(42);
    /*overflow: hidden;*/
    margin-bottom: 60px;
    .recommend_title{
      padding-left: r(29);
      margin-bottom: r(50);
      display: inline-block;
    }
    @at-root .recommend_box{
      padding: 0 r(22);
      height: r(201);
      width: 100vw;
      margin-bottom: 30px;
      .recommend_left{
        width: r(201);
        height: r(201);
        border: 1px solid #9a6e3a;
        display: inline-block;
        .recommend_img_size{
          width: r(201);
          height: r(201);
         }
      }
      .recommend_right{
        display: inline-block;
        width: r(485);
        height: r(55);
        margin-left: 5px;
        position: relative;
        top: r(-13);
        .title{
          margin-bottom: 24px;
        }
        .recommend_right_box{

        }
        .after_sales_prices{
          width: r(94);
          height: r(33);
          border-radius: r(20);
          background: #458df7;
          color:#fff;
          font-size: r(10);
          line-height: r(33);
          text-align: center;
          display: inline-block;
        }
        .after_sale_price{
          color:#5c9cf8;
        }
        .originalPrice{
          color: #919191;
          margin-top: r(13);
          font-size: r(21);
        }
      }
    }
  }


</style>

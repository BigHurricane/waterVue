<template>
    <div class="searchCommodity_container">
      <div class="searchCommodity_header">
        <div class="selectCont">
          <i class="fa fa-2x fa-angle-left left_angle"></i>
          <img class="searchIcon" src="../assets/search.png" />
          <input class="searchMall" type="text" placeholder="保暖内衣">
          <span class="search_word">搜索</span>
        </div>
      </div>
      <div class="hotSearch_box">
         <span class="hotSearch_word">热搜</span>
         <div class="hotSearch_category">
             <ul class="first_hotSearch">
               <li class="hotSearch_item">保暖内衣</li>
               <li class="hotSearch_item">面膜</li>
               <li class="hotSearch_item">口红</li>
               <li class="hotSearch_item">手表</li>
               <li class="hotSearch_item">保温杯</li>
               <li class="hotSearch_item">洗衣液</li>
               <li class="hotSearch_item">超值大礼包</li>
               <li class="hotSearch_item">华为</li>
               <li class="hotSearch_item">耳机</li>
             </ul>
         </div>
      </div>
      <div class="historySearch_box">
         <div class="historySearch_word">
           <span>历史搜索</span>
           <img src="../assets/delete.png" alt="" class="delete_img">
         </div>

         <div class="historySearch_title" v-for="(item,key) in 3" :key="key"><span>{{item}}</span></div>
      </div>
    </div>
</template>

<script>
  export default {
    name: 'searchCommodity'
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
  @at-root .searchCommodity_container{
       height: 100vh;
       overflow: hidden;
    background: #fff;
      @at-root .searchCommodity_header{
      background: #fff;
      position: relative;
      height: r(86);
      .selectCont{
        height: r(86);
        width: 100vw;
        border-bottom: 1px solid #f3f3f3;
      }
      .left_angle{
         position: absolute;
         color: #383838;
        top:r(20);
        left: r(42);
      }
      .searchIcon{
          position: absolute;
          width: r(27);
          height: r(27);
          left: r(100);
          z-index: 999;
          top:r(35);
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
    .search_word{
        font-size: r(29);
        position: absolute;
      right: r(43);
      top: r(33);
      color: #cacaca;
    }
    }
      @at-root .hotSearch_box{
         padding-left: r(27);
          margin-top: 1px;
        padding-top: r(33);
        background: #fff;
        margin-bottom: r(12);
         .hotSearch_word{
           color: #030217;
           font-size: r(25);
         }
         @at-root .hotSearch_category{
           margin-top: r(33);
           .hotSearch_item{
             display: inline-block;
             padding: r(13) r(28);
             border: 1px solid #dadada;
             border-radius: r(10);
             font-size: r(25);
             color: #616161;
             margin-right: r(32);
             letter-spacing: 1px;
             margin-bottom: r(29);
           }
           .first_hotSearch{
              font-size: 0;
           }

         }
      }
      @at-root .historySearch_box{
          background: #fff;
          font-size: r(24);
          border-top: r(12) solid #f2f2f2;
         @at-root .historySearch_word{
             line-height: r(94);
             letter-spacing: 1px;
            position: relative;
             border-bottom: 1px solid #f7f7f7;
             span{
               margin-left: r(28);
             }
           .delete_img{
             position: absolute;
             width: r(31);
             height: r(31);
             right: r(30);
             top: r(33);
           }
          }
         @at-root .historySearch_title{
           line-height: r(92);
           border-bottom: 1px solid #f7f7f7;
           span{
             margin-left: r(28);
             color: #626262;
           }
         }
      }
  }
</style>

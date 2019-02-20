<template>
  <div class="app--container">
    <!--<router-link to="/edit"><app-header>{{title}}</app-header></router-link>-->
    <van-nav-bar title="收货地址"
                               left-arrow
                               left-text="返回"
                               right-text="next"
                               @click-left="onClickLeft"
                               @click-right="onClickRight"
  >
  </van-nav-bar>
    <app-no-address v-if="(recieveInfo.length===0)"></app-no-address>
    <ul class="content">
      <li class="content-item" v-for="(item,key) in recieveInfo" :key="key">
        <div class="list-item__left"><img class="item-top__left" src="../assets/position.png" alt="#"></div>
        <div class=list-item__right>
          <span class="title">{{item.receiver}}</span>
          <span class="time">{{item.phoneNumber}}</span>
          <p>{{item.location}}  {{item.details}}</p>
        </div>
        <div class="content-item_bottom">
          <div class="default-con">
            <img src="../assets/no-default.png" alt="" class="default" v-if="!item.isDefault" @click="circleClick(key)">
            <img class="default-img" v-if="item.isDefault"  src="../assets/default.png" alt="#">
            <span class="default-text">设为默认</span>
          </div>
          <div class="modify-con" @click="alter(key)">
            <img class="modify-img" src="../assets/update.png" alt="#">
            <span class="modify">修改</span>
          </div>
          <div class="del-con">
            <img class="del-img" src="../assets/delete.png" alt="#">
            <span class="del" @click="del(key)">删除</span>
          </div>
        </div>
      </li>
    </ul>
    <router-link to="/edit"><app-button>{{btnText}}</app-button></router-link>
  </div>
</template>

<script>
  import AppHeader from '../components/app-header';
  import AppButton from '../components/app-button';
  import AppNoAddress from '../components/app-no-address';

  var arrs=[];
  export default {
    name: 'addAddress',
    data() {
      return {
        title: '收货地址',
        btnText: '新增地址',
        recieveInfo: [],
        reciveAll:{},
        show: false
      };
    },
    methods: {
      alter(key) {
        console.log(this.recieveInfo);
        this.$router.push({path: '/alter',query:{Data:this.recieveInfo[key]}});
      },
      onClickLeft() {
        this.$router.go(-1);
      },
      onClickRight() {
        this.$router.go(1);
      },
      del(index) {
        this.show = true;
        this.$request.delAddr({addrid:this.recieveInfo[index]._id})
          .then((data) => {
            console.log(data);
            if(data.data.code === 1){
                this.$notify({
                  message: '删除成功',
                  duration: 800,
                  background: '#1989fa'
                });
              this.recieveInfo.splice(index,1);
            }
          }).catch((error) => console.log(error));
      },
      circleClick(key){
           this.recieveInfo[key].addrid = this.recieveInfo[key]._id;
           this.$request.defaultAddr(this.recieveInfo[key])
             .then((data) => {
               console.log(data);
               if(data.data.code === '10001') {
                 for(let prop in this.recieveInfo){
                   this.recieveInfo[prop].isDefault = false;
                 }
                 this.recieveInfo[key].isDefault = true;
               }
             })
             .catch( err => console.log(err));
      },
    },

    created() {
      this.$request.addr()
        .then(data=> {
          this.recieveInfo = data.data.data;
          console.log(this.recieveInfo);
          }
        )
        .catch(error=>console.log(error));
    },
    components: { AppNoAddress, AppButton, AppHeader },
  };
</script>

<style scoped lang="scss">
  @import "../stylus/common.css";
  @function r($px, $unit:75) {
    @return $px/$unit#{rem}
    }
  .app--container{
   overflow: hidden;
  .content{
    .content-item{
      position: relative;
      height: r(198);
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
        .item-top__left{
          width: .48rem;
          height: .48rem;
          display: inline-block;
        }

      }

      @at-root .list-item__right {
        width: 7.9333333333rem;
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
          right: 0;

        }
        @at-root p {
          color: #999999;
          font-size: .3333333rem;
          position: absolute;
          bottom: .133333333rem;
        }
      }
      @at-root .content-item_bottom{
        width: 100vw;
        height: r(80);
        line-height: r(80);
        left: r(10);
        position: absolute;
        top: r(118);
        border-top: 1px solid #ccc;
        /*border-bottom: 1px solid #ccc;*/
        img{
          width: .48rem;
          height: .48rem;
          display: inline-block;
        }
        .default-con{
          display: inline-block;
          .default{
            position: absolute;
            left: r(20);
            display: inline-block;
            width: .38rem;
            height: .38rem;
            top: r(28);
            border-radius: 50%;
            border: 1px solid #cdcdcd;
            vertical-align: middle;
            overflow: hidden;
          }
          .default-img{
            position: absolute;
            left: r(20);
            top: r(28);
          }
          .default-text{
            position: absolute;
            left: .8999999999999rem;
            font-size: 0.37333333333rem;
            color: #363636;
            top: r(4);
          }
        }
        .modify-con{
          display: inline-block;
          position: absolute;
          right: 2.2rem;
          .modify-img{
            vertical-align: middle;
          }
          .modify{
            vertical-align: middle;
          }
        }
        .del-con{
          display: inline-block;
          position: absolute;
          right: .8rem;
          .del-img{
            vertical-align: middle;
          }
          .del{
            vertical-align: middle;
          }
        }
      }
    }

  }
  }
</style>

<template>
  <div class="container">
    <div class="shoppingCart-header">
      <router-link to="/mall">
      <span class="back--key"><i class="fa fa-2x fa-angle-left"></i></span>
      </router-link>
      <span class="content">购物车</span>
      <span class="right--key" @click="compileToDel">{{ this.compileText }}</span>
    </div>
    <!--自营--全选-->
    <div class="is-selfSupport">
      <div class="default-con">
        <input type="checkbox" id="self" class="isDefault" @click="allSelect()"/>
        <label for="self"
               :class="['label-selfSupport',
               {'selfSupportActive': this.selectAll}]">
        </label>
      </div>
      <span class="is-selfSupport-text">快捷商城自营</span>
    </div>
    <!--购物车商品-->
    <div class="shoppingCart-product">
      <ul class="product-wrap">
        <li class="product-wrap-item" v-for="(item, key) in prodArr" :key="key">
          <div class="product-wrap-item_left">
            <div class="default-con">
              <input type="checkbox"
                     :id="key" class="isDefault" :value="item._id"
                     v-model="selectedCartIdsToDel" @click="selected(key)"/>
              <label :for="key"
                     :class="['label-isDefault',{'defaultActive': item.checked}]">
              </label>
            </div>
            <span class="item-img">
              <img :src="item.prod.prodImage[0]" class="item-product-img"/>
            </span>
          </div>
          <div class="product-wrap-item_right">
            <p class="item-product-info">{{item.prod.prodSupTitle}}</p>
            <span class="item-product-price">{{item.prod.currentPrice}}</span>
            <div class="item-product-count">
              <span class="reduce" @click="reduceCount(key)">-</span>
              <span class="count">{{item.num}}</span>
              <span class="add" @click="addCount(key)">+</span>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <!--测试id-->
    <!--<span>Checked names: {{ selectedCartIdsToDel }}</span>-->
    <!--结算-->
    <div class="balance">
      <div class="total" v-if="isBalance">
        <div class="default-con">
          <input type="checkbox" id="total" class="isDefault"/>
          <label for="total"
                 :class="['balance-isDefault',
                 {'balanceActive': this.prodArr.some(value => value.checked)}]">
          </label>
        </div>
        <span class="total-money">合计：
          <span class="money">￥{{this.totalPrice}} <span class="fare">不含运费</span></span></span>
        <span class="onSale">已优惠金额：￥0</span>
        <span class="finished"
              @click="finish">结算({{this.prodArr.filter(value => value.checked).length}})</span>
      </div>
      <span class="toDelete" @click="toDeleteProd" v-if="isDeleteProd">删除</span>
    </div>
  </div>
</template>

<script>

export default {
  name: 'shoppingCart',
  data() {
    return {
      prodArr: [],
      totalPrice: 0,
      selectAll: false,
      selectedCartIdsToDel: [],
      compileText: '编辑',
      isDeleteProd: false,
      isBalance: true,
      saveIndex: [],
      wantToBuyProd: [],
    };
  },
  methods: {
    // 全选
    allSelect() {
      this.selectAll = !this.selectAll;
      if (this.selectAll) {
        this.prodArr.map((value) => {
          if (!(value.checked)) {
            value.checked = !value.checked;
            this.selectedCartIdsToDel.push(value._id);
          }
        });
        this.balance(this.prodArr);
      } else {
        this.selectedCartIdsToDel = [];
        this.prodArr.map((value) => {
          if (value.checked) {
            value.checked = !value.checked;
          }
        });
        this.totalPrice = 0;
      }
    },
    // 单选
    selected(index) {
      console.log(this.prodArr);
      this.prodArr[index].checked = !this.prodArr[index].checked;
      this.prodArr.every(value => value.checked) ? this.selectAll = true : this.selectAll = false;
      this.saveIndex.push(index);
      this.wantToBuyProd = this.prodArr.filter(value => value.checked);
      this.prodArr.some(value => value.checked) ? this.balance(this.wantToBuyProd) : this.totalPrice = 0;
      this.$request.updateCart({
        cartid: this.prodArr[index]._id,
        num: this.prodArr[index].num,
        checked: this.prodArr[index].checked,
      }).then((data) => {
        console.log(data);
        this.balance(this.wantToBuyProd);
      })
        .catch(error => console.log(error));
    },
    // 减少按钮
    reduceCount(index) {
      this.prodArr[index].num--;
      this.$request.updateCart({
        cartid: this.prodArr[index]._id,
        num: this.prodArr[index].num,
      })
        .then((data) => {
          console.log(data);
          this.balance(this.wantToBuyProd);
        })
        .catch(error => console.log(error));
    },
    // 增加按钮
    addCount(index) {
      this.prodArr[index].num++;
      this.$request.updateCart({
        cartid: this.prodArr[index]._id,
        num: this.prodArr[index].num,
      })
        .then((data) => {
          console.log(data);
          this.balance(this.wantToBuyProd);
        })
        .catch(error => console.log(error));
    },
    // 结算
    finish() {
      this.$router.push({ name: 'affirmOrder',
        params: {
          orderProd: this.wantToBuyProd,
          totalPrice: this.totalPrice,
          cartsId: this.selectedCartIdsToDel,
        } });
    },
    // 计算金额方法(reduce)
    balance(item) {
      return item.reduce((prev, currentValue) => {
        this.totalPrice = Math.floor(
          (prev + ((+currentValue.num) * (+currentValue.prod.currentPrice))) * 100) / 100;
        return this.totalPrice;
      }, 0);
    },
    // 编辑删除
    compileToDel() {
      this.isDeleteProd = !this.isDeleteProd;
      this.isBalance = !this.isBalance;
      this.isDeleteProd ? this.compileText = '完成' : this.compileText = '编辑';
    },
    // 点击删除
    toDeleteProd() {
      console.log(this.saveIndex);
      this.$request.deleteCart({ cartids: this.selectedCartIdsToDel })
        .then((data) => {
          console.log(data);
          if (data.data.code === 1) {
            this.saveIndex.map(value => this.prodArr.splice(value, 1));
            this.totalPrice = 0;
          }
        })
        .catch(error => console.log(error));
    },
  },
  created() {
    this.$request.getCart()
      .then((data) => {
        console.log(data);
        this.prodArr = data.data.data;
        console.log(this.prodArr);
      },
      )
      .catch(error => console.log(error));
  },
};
</script>

<style scoped lang="scss">
  @function r($px, $unit:75) {
    @return $px/$unit#{rem}
    }
  .container{
    width: 100vw;
    height: 100vh;
    background: #f6f6f6;
    @at-root .shoppingCart-header{
    width: 100vw;
    height: r(117);
    position: fixed;
    right: 0;
    left: 0;
    top: 0;
    background: #fff;
    color: #3c3c3c;
    font-size: 14px;
    border-bottom: 1px solid #c2c2c2;
    @at-root .back--key{
      position: absolute;
      left: r(43);
      top: r(50);
    }
    @at-root .content{
      display: inline-block;
      text-align: center;
      position: absolute;
      left: 0;
      right: 0;
      top: r(61);
      font-size: r(30);
      color: #2a2a2a;
    }
    @at-root  .right--key{
      display: inline-block;
      position: absolute;
      right: r(46);
      font-size: r(27);
      color: #555555;
      top: r(63);
    }
  }
    @at-root .is-selfSupport{
      margin-top: r(117);
      width: 100vw;
      height: r(83);
      line-height: r(83);
      display: inline-block;
      background: #fff;
      border-top: 1px solid #f1f1f1;
      position: relative;
      @at-root .label-selfSupport{
        position: absolute;
        left: r(28);
        display: inline-block;
        width: .48rem;
        height: .48rem;
        top: r(24);
        border-radius: 50%;
        border: 1px solid #cdcdcd;
        background: #fff;
      }
      @at-root .selfSupportActive {
        position: absolute;
        border: none;
        background-image: url("../assets/default.png");
        background-size: .50rem;
        z-index: 99999;
      }
      .is-selfSupport-text{
        position: absolute;
        font-size: r(26);
        color: #242424;
        left: r(75);
      }
    }
    @at-root .shoppingCart-product{
      width: 100vw;
      background: #fff;
      margin-top: r(-2);
      @at-root .product-wrap{
        @at-root .product-wrap-item{
          border-top: 1px solid #f1f1f1;
          height: r(228);
          width: 100vw;
          position: relative;
          @at-root .product-wrap-item_left{
            display: inline-block;
            height: inherit;
            width: r(238);
            @at-root .default-con{
              display: inline-block;
              .isDefault{
                display: none;
              }
              .label-isDefault{
                position: absolute;
                left: r(28);
                display: inline-block;
                width: .48rem;
                height: .48rem;
                top: r(100);
                border-radius: 50%;
                border: 1px solid #cdcdcd;
                background: #fff;
              }
              .defaultActive{
                position: absolute;
                border: none;
                background-image: url("../assets/default.png");
                background-size: .50rem;
                z-index: 99999;
              }
              .default{
                position: absolute;
                left: r(28);
                display: inline-block;
                width: .38rem;
                height: .38rem;
                top: r(100);
                border-radius: 50%;
                border: 1px solid #cdcdcd;
                vertical-align: middle;
                overflow: hidden;
              }
              .default-img{
                position: absolute;
                left: r(28);
                top: r(100);
              }
            }
            @at-root .item-img{
              width: r(144);
              position: absolute;
              left: r(83);
              top: r(43);
              @at-root .item-product-img{
                width: r(144);
                height: r(144);
                /*background: pink;*/
              }
            }
          }
          @at-root .product-wrap-item_right{
            display: inline-block;
            height: inherit;
            width: r(512);
            @at-root .item-product-info{
              position: absolute;
              left: r(246);
              top: r(47);
              font-size: r(26);
              color: #1c1c1c;
            }
            @at-root .item-product-price{
              position: absolute;
              left: r(246);
              bottom: r(45);
              font-size: r(23);
              color: #ed5837;
            }
            @at-root .item-product-count{
              display: inline-block;
              @at-root .reduce{
                position: absolute;
                right: r(143);
                bottom: r(20);
                width: r(60);
                height: r(60);
                text-align: center;
                line-height: r(60);
                border: 1px solid #bbb;
                border-radius: r(10) 0 0 r(10);
              }
              @at-root .count{
                position: absolute;
                right: r(70);
                bottom: r(20);
                width: r(80);
                height: r(60);
                text-align: center;
                line-height: r(60);
                border-top: 1px solid #bbb;
                border-bottom: 1px solid #bbb;
              }
              @at-root .add{
                position: absolute;
                right: r(16);
                bottom: r(20);
                width: r(60);
                height: r(60);
                text-align: center;
                line-height: r(60);
                border: 1px solid #bbb;
                border-radius: 0 r(10) r(10) 0;
              }
            }
          }
        }
      }
    }
    @at-root .balance{
      height: r(94);
      width: 100vw;
      background: #fff;
      position: fixed;
      bottom: 0;
      @at-root .total{
        display: inline-block;
        @at-root .default-con{
          display: inline-block;
          .isDefault{
            display: none;
          }
          .balance-isDefault{
            position: absolute;
            left: r(45);
            display: inline-block;
            width: .48rem;
            height: .48rem;
            bottom: r(30);
            border-radius: 50%;
            border: 1px solid #cdcdcd;
            background: #fff;
          }
          .balanceActive{
            position: absolute;
            border: none;
            background-image: url("../assets/default.png");
            background-size: .50rem;
            z-index: 99999;
          }
          .default{
            position: absolute;
            left: r(45);
            display: inline-block;
            width: .38rem;
            height: .38rem;
            bottom: r(30);
            border-radius: 50%;
            border: 1px solid #cdcdcd;
            vertical-align: middle;
            overflow: hidden;
          }
          .default-img{
            position: absolute;
            left: r(45);
            bottom: r(30);
          }
        }
        @at-root .total-money{
          position: absolute;
          left: r(112);
          font-size: r(25);
          bottom: r(52);
          display: inline-block;
          @at-root .money{
            color: #ff4000;
          }
        }
        @at-root .fare{
          display: inline-block;
          font-size: r(18);
          color: #9d9d9d;
        }
        @at-root .onSale{
          position: absolute;
          bottom: r(18);
          left: r(112);
          font-size: r(19);
        }
        @at-root .finished{
          display: inline-block;
          width: r(220);
          height: r(94);
          line-height: r(94);
          background: #458df7;
          text-align: center;
          color: #fff;
          position: absolute;
          right: 0;
          top: 0;
        }
      }
      @at-root .toDelete{
        display: inline-block;
        width: r(220);
        height: r(94);
        line-height: r(94);
        background: #ff4000;
        text-align: center;
        color: #fff;
        position: absolute;
        right: 0;
      }
    }
  }
</style>

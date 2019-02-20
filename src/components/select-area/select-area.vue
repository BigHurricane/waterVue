<template>
  <transition name="slide">
    <div class="address-selector" v-show="isShow">
      <div class="select-area-panel">
        <span class="select-area-panel__item"
              v-for="(item, key) in areaCollect"
              :key="areaCollect.code"
              @click="stepBack(key)"
        >
          {{item.name}}
          <i v-if="key === areaCollect.length - 1" class="active-line"></i>
        </span>
        <i class="close-btn" @click="hide"></i>
      </div>
      <better-scroll height="50vh" :refreshed.sync="isRefeshed">
      <ul class="area-toggle-container">
        <li class="area-toggle-item"
            v-for="(item, key) in areaData"
            v-if="item.name !== '市辖区'"
            :key="key"
            @click="selectArea(key)"
        >
          {{item.name}}
        </li>
      </ul>
      </better-scroll>
    </div>
  </transition>
</template>

<script>
  import area from './data';

  export default {
    name: "select-area",
    data() {
      return {
        isRefeshed: true,
        areaData: area,
        areaCollect: [{name: '请选择'}]
      }
    },
    computed: {},
    created() {

    },
    methods: {
      selectArea(index) {
        let currentArea = this.areaData[index];
        this.areaCollect.splice(-1, 0, {name: currentArea.name, code: currentArea.code});
        if(currentArea.pchilds && currentArea.pchilds.length === 1){
          this.areaData = currentArea.pchilds[0].cchilds;
        }else{
          this.areaData = currentArea.pchilds || currentArea.cchilds || this.selected();
        }
      },
      hide() { this.$emit('update:isShow', false) },
      selected() {
        this.hide();
         let res = (this.areaCollect.reduce(function (prev,current,key,arr) {
           if(key<arr.length-1){
             prev.name += current.name + ' ';
             return prev;
           }else {
             return prev.name.slice(0,-1);
           }

         },{name: ''}));
        // console.log(this.areaCollect.reduce(((previousValue, currentValue) => previousValue.name + currentValue.name), '').slice(0, -3));
        this.$emit('input', res);//触发组件v-model指令的input事件
        this.areaCollect = [{name: '请选择'}];
        return area;

      },
      stepBack(index) {
        let self = this;
        // this.areaCollect.splice().concat(this.areaCollect.slice(index,-1));
        this.areaCollect.splice(index);
        this.areaCollect.push({name: '请选择'});
        function getValue(arr, i) {
          if (i === index) {
            return arr;
          }else{
            return getValue(arr.filter(value => value.code === self.areaCollect[i].code)[0].pchilds, ++i)
          }
        }
        this.areaData = getValue(area, 0);
      }
    },
    props: {
      isShow: {
        type: Boolean,
        default: false
      }
    }
  }
</script>

<style lang="scss" scoped>
  *{
    margin: 0;
    padding: 0;
  }
  .address-selector{
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    border-top: 1px solid #ccc;
    color: #999;
    background: #fff;
    z-index: 9999999;
    .select-area-panel{
      height: 40px;
      line-height: 40px;
      font-size: 0;
      color: #353535;
      .select-area-panel__item{
        display: inline-block;
        font-size: 15px;
        text-align: center;
        margin: 0 12px;
        box-sizing: border-box;
        position: relative;
        transition: all .2s ease-in-out;
        .active-line{
          width: 100%;
          height: 2px;
          background: orangered;
          position: absolute;
          left: 0;
          bottom: -1px;
        }
      }
      .close-btn{
        position: absolute;
        top: 4px;
        right: 4px;
        display: inline-block;
        width: 32px;
        height: 32px;
        background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAB3ElEQVRYR+3Wv2vbQBTA8fd0nkyn0OApW4ZSkSU4SwbJT5CU0KWQX+Rfy1LoEEgIBEKMIYNPusGQFkqhFDxk8NBO7Rxw0OkFgQRFWNKdFHCGeLXuvh+fnrAQlvzBJffhFfByT0BK+ZaI/j3HjFTttfAEpJRvAOArMx8GQfCrDSIMwy1mPgWALSKKi3uV3gIp5ToAXLdBZPEvALBDRL8X/ZDKGWiDyOJnWXxWdoq1Q9gEkcXPAWCXiO6rbmEtIF2cIph5iIjHRPSjasM0niTJJSJ+IKJp3fwYATLEO2a+QcSDMkQURdta6wshxJ7v+z/r4un3xoA6RBa/6nQ6e57nfTeJWwPKEMzshGH4h5k/BUFwZxpvBKg7CZt4Y0COAIARIh4NBoNvtuH8eqsZKEaiKNrQWt84jnPQFNEIoJR63+12Z/1+/6EtwhowHo8/IuJnIYTred7f9FTaIKwAeZyZqfgnlSOEECe+709MZ8IYUBXPYykiSZJbx3H2TRFGAJN4jlBKbWqth6aIWoBNvAmiEtAkbosoBbSJFxEAcEJEofELyWQyWZnP59NF02463f8j4jge9Xq9Ndd1H4vrS09AKbWaP+e20eL11i+lbYM262ufApvNmlz7Clj6CTwBudA1MKjZg/oAAAAASUVORK5CYII=");
      }
    }
    .area-toggle-container{
      /*height: 50vh;*/
      list-style: none;
      /*overflow: auto;*/
      .area-toggle-item{
        line-height: 36px;
        border-bottom: 1px solid #ccc;
        padding-left: 12px;
        box-sizing: border-box;
        font-size: 14px;
      }
    }
  }
  .slide-enter{
    bottom: -60vh;
  }
  .slide-enter-active{
    transition: all .2s ease-in-out;
  }
  .slide-enter-to{
    bottom: 0;
  }
  .slide-leave{
    bottom: 0;
  }
  .slide-leave-active{
    transition: all .2s ease-in-out;
  }
  .slide-leave-to{
    bottom: -60vh;
  }
</style>


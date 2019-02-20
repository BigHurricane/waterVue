<template>
  <div class="app--container">
  <app-header></app-header>
  <img src="../assets/k.png"/>
  <div class="content-key">
    <router-link to="login" tag="span">登录</router-link>
    <router-link to="register" tag="span">注册</router-link>
  </div>
    <router-view></router-view>
  </div>
</template>

<script>
import AppHeader from '../components/app-header';
// import Message from '../components/message';

export default {
  name: 'auth',
  data() {
    return {
    };
  },
  components: { AppHeader },
};
</script>

<style scoped>
img{
  width: 50px;
  padding-top: 60px;
  display: block;
  margin: 30px auto;
}
.content-key{
  color: #3c3c3c;
  font-size: 16px;
  text-align: center;
}
.content-key>span{
  cursor: pointer;
  /*padding: 0 5px;*/
  margin: 0 35px;
  letter-spacing: 2px;
  padding-bottom: 10px;
}
  .content-key>span:first-child::before{
    content: '';
    position: absolute;
    width: 2px;
    height: 22px;
    left: 50%;
    right: 0;
    background: #dfdfdf;
  }
  .router-link-active{
    color: #3399cc;
    display: inline-block;
    border-bottom: 3px solid #3c9dfc;
  }
</style>

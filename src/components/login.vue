<template>
<div class="login-inputs">
  <input type="tel" placeholder="请输入11位手机号" v-model="userInfo.phoneNumber"/>
  <input type="password" placeholder="请输入6-12位密码" v-model="userInfo.password"/>
  <p class="find_account">
    <span class="has_account">已有账号，</span>
    <a href="#">忘记密码?</a>
  </p>
  <span class="login" @click="loginDone">登录</span>
</div>
</template>

<script>
export default {
  name: 'login',
  data() {
    return {
      userInfo: {
        phoneNumber: '',
        userPwd: '',
        logined: '已登录',
      },
    };
  },
  methods: {
   /* check_phone() {
      if(!(/^1[3-8]\d{9}$/.test(this.userInfo.phoneNumber))){
        this.$notify({
          message: '请输入正确的号码！',
          duration: 800,
          background: '#1989fa'
        })
      }
    },*/
    loginDone() {
      this.$request.login(this.userInfo)
        .then((data) => {
          if(this.userInfo.phoneNumber === '' || this.userInfo.password === ''){
            this.$notify({
              message: '请输入相关信息！',
              duration: 800,
              background: '#1989fa'
            })
          }else if(data.data.code === 3003 || data.data.code === 3002){
            this.$notify({
              message: data.data.msg,
              duration: 800,
              background: '#1989fa'
            })
          }else{
            this.$router.push({path:'/shoppingMall',query:{Data: this.userInfo.logined}});
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>

<style scoped>
.login-inputs{
  color: #3c3c3c;
  text-align: center;
  margin-top: 60px;
}
input{
  margin: 25px auto;
  display: block;
  outline: none;
  border-radius: 3px;
  border:none;
  border-bottom: 1px solid #dddddd;
  width: 290px;
  padding-left: 30px;
  padding-bottom: 15px;
}
.find_account{
  text-align: right;
  margin-right: 1rem;
  font-size: 13px;
}
.has_account{
  color:#333333;
}
.find_account a{
  text-decoration: none;
  color:#1f72e3;
}
.login{
  text-align: center;
  padding: 15px 130px;
  border-radius: 20px;
  background: #196fe3;
  display: inline-block;
  margin-top: 50px;
  color:#e8f2fa;
  font-size: 16px;
}
</style>

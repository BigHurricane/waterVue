<!--
<template>
  <div class="login-inputs">
    <input type="tel" placeholder="请输入11位手机号" v-model="userInfo.phoneNumber"/>
    <input type="tel" placeholder="请输入验证码" v-model="userInfo.validCode"/><button @click="getValidCode">获取验证码</button>
    <input type="password" placeholder="请输入6-12位密码" v-model="userInfo.password"/>
    <div class="agreeDocument">
    <input type="checkbox" id="agree" v-model="userInfo.isAgree"/><label for="agree">我已同意该条款</label>
    </div>
    <span class="login" @click="register">注册</span>
  </div>
</template>

<script>
export default {
  name: 'register',
  data() {
    return {
      userInfo: {
        phoneNumber: '',
        validCode: '',
        password: '',
        isAgree: true,
      },
    };
  },
  methods: {
    getValidCode(){
      this.$request.validCode()
        .then(res => console.log(res))
        .catch(err => console.log(err))
    },
    register() {
      this.$request.register(this.userInfo)
        .then(res => console.log(res))
        .catch(err => console.log(err));
    },
  },
};
</script>

<style scoped>
  .login-inputs{
    color: #3c3c3c;
    text-align: center;
  }
  input{
    margin: 25px auto;
    display: block;
    outline: none;
    border-radius: 3px;
  }
  .agreeDocument{
    margin-top: -30px;
  }
  #agree{
    display: inline-block;
  }
  .login{
    margin-top: 20px;
    text-align: center;
    padding: 5px 60px;
    background: #3399cc;
    border-radius: 3px;
  }
</style>

-->
<template>
  <div class="register-container">
    <input type="tel" class="inputmsg" v-model="userInfo.phoneNumber" placeholder="请输入手机号">
    <p>
      <input type="tel" class="inputmsg" v-model="userInfo.validCode" placeholder="请输入6位短信验证码">
      <span class="verificationcode" @click="getValidCode">{{userInfo.getCode}}</span>
      <!--<span class="titleCode" v-if="isshow">s后重新获取</span>-->
    </p>
    <input type="password" class="inputmsg" v-model="userInfo.password" placeholder="请输入6-12位密码">
    <div class="agreeDocument">
      <i class="fa fa-2x fa-check-circle default_logo" @click="changDefault"></i>
      <label>我已阅读并同意 <span>《商城销售合同》</span></label>
    </div>
    <button @click="register">注册</button>
  </div>
</template>

<script>
  /* eslint-disable */
  export default {
    name: 'register',
    data() {
      return {
        userInfo: {
          phoneNumber: '',
          validCode: '',
          password: '',
          isAgree: true,
          isDefalult: false,
          getCode: '获取验证码',
          time: 10,
          isCode:false,
        },
      };
    },
    methods: {
      getValidCode(){
        this.$request.validCode()
          .then(res => {
            if(!this.userInfo.isCode){
              this.userInfo.isCode = !this.userInfo.isCode;
              let timer;
              this.userInfo.getCode = this.userInfo.time;
              timer = setInterval(() => {
                this.userInfo.getCode --;
                if(this.userInfo.getCode < 0){
                  this.userInfo.getCode = '获取验证码';
                  this.userInfo.isCode = !this.userInfo.isCode;
                  clearInterval(timer);
                }
              },1000);
              this.$notify({
                message: '验证码:'+ res.data.data,
                duration: 3000,
                background: '#1989fa'
              })
            }
            }
          )
          .catch(err => console.log(err))
      },
      register() {
        this.$request.register(this.userInfo)
          .then(res => {
              console.log(res);
              if(this.userInfo.phoneNumber === '' && this.userInfo.validCode === '' && this.userInfo.password === ''){
                this.$notify({
                  message: '请输入相关信息',
                  duration: 3000,
                  background: '#1989fa'
                })
              } else if(!/^1[3-578]\d{9}/.test(this.userInfo.phoneNumber)){
                this.$notify({
                  message: '手机号不合法',
                  duration: 3000,
                  background: '#1989fa'
                })
              }else if(res.data.code === 2003){
                this.$notify({
                  message: res.data.msg,
                  duration: 3000,
                  background: '#1989fa'
                })
              }else if(!/^\w{6,12}$/.test(this.userInfo.password)){
                this.$notify({
                  message: '密码不正确',
                  duration: 3000,
                  background: '#1989fa'
                })
              }else{
                this.$router.push('/auth/login');
              }
          })
          .catch(err => console.log(err));
      },
      changDefault() {
        if(!this.isDefalult){
          console.log(event.srcElement);
          event.srcElement.style.color = '#ccc';
          this.isDefalult = !this.isDefalult;
        }else{
          event.srcElement.style.color = '#41a9ff';
          this.isDefalult = !this.isDefalult;
        }
      }
    },
  };
</script>

<style lang="scss" scoped>
  @function rem($px,$unit:75){
    @return $px/$unit#{rem};
  }
  .register-container{
    padding: 0 rem(50) 0 rem(66);
    box-sizing: border-box;
    text-align: center;
    margin-top: 50px;
  }
  .register-container>p{
    position: relative;
    width: rem(634);
    font-size: rem(28);
    margin: auto;
  }
  .inputmsg{
    width: rem(634);
    line-height: rem(87);
    font-size: rem(28);
    padding: 0 rem(32);
    box-sizing: border-box;
    display: block;
    margin: auto;
    border: none;
    outline: none;
    border-bottom: solid 1px #c8c8cd;
  }
  .verificationcode{
    display: inline-block;
    color: #3c9dfc;
    position: absolute;
    right: rem(15);
    top: rem(30);
    background: #f6fdff;
    width: 80px;
    text-align: left;
  }
  .titleCode{
    display: inline-block;
    position: absolute;

  }
  .agreeDocument{
    width: rem(634);
    margin: auto;
    line-height: rem(108);
    text-align: left;
  }
  .agreeDocument>input{
    width: rem(36);
    height: rem(36);
    vertical-align: middle;
  }
  .agreeDocument>label{
    color: #c8c8cd;
    padding-left: rem(30);
    box-sizing: border-box;
    font-size: rem(26);
    vertical-align: middle;
  }
  .agreeDocument>label>span{
    color: #3c9dfc;
  }
  .default_logo{
    width: 7%;
    display: inline-block;
    vertical-align: middle;
    color:#41a9ff;
  }
  button{
    width: rem(572);
    line-height: rem(82);
    background: #3c9dfc;
    text-align: center;
    color: white;
    border-radius: rem(42);
    border: none;
    outline: none;
    font-size: rem(30);
    /*margin-left: rem(30);*/
    margin-top: rem(58);
  }

</style>


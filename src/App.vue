<template>
 <router-view></router-view>
</template>

<script>
/*  eslint-disable  */

export default {
  name: 'container',
  data() {
    return {
      isShow:false,
      province:'',
      city:'',
      p:0,
      c:1,
      type:'',
      code:0,
      pname:'',
      arr:[],
    }
  },
  components: {
  },

  methods: {

  },
  mounted() {

  },
};
</script>

<style>
  *{
    margin: 0;
    padding: 0;
    user-select: none;
    -webkit-tap-highlight-color: rgba(0,0,0,0);
  }
  #container{
    width: 100vw;
    height: 100vh;
  }
</style>

<template>
    <div>
      <h1>{{title}}</h1>
      <button @click="success">成功</button>
      <button @click="fail">取消</button>
    </div>
</template>

<script>
export default {
  name: 'a-dialog',
  data() {
    return {
      msg: 'dialog',
    };
  },
  props: ['title', 'success', 'fail'],
};
</script>

<style scoped>

</style>

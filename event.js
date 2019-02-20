const bus = {
  $event: {},
  $emit: function (eventName, eventData) {
    if (this.$event[eventName]) {
      this.$event[eventName].forEach(function (v) {
        v(eventData);
      })
    }
  },
  $on: function (eventName, eventHandle) {
    if (this.$event[eventName]){
      this.$event[eventName].push(eventHandle)
    } else {
      this.$event[eventName] = [];
      this.$event[eventName].push(eventHandle);
    }
  }
};
bus.$on('a', function (data) {
  console.log(data);
});

setTimeout(function () {
  bus.$emit('a','hello');
},5000);

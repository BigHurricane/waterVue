/*  eslint-disable */
import dialog from './dialog';

export default {
  install(Vue) {
    Vue.component('aDialog', dialog);
  },
}

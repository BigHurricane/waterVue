/*
* created by Administrator on 2018/12/19
* 好的代码像粥一样,是得用时间和精力熬的。
*/
/* eslint-disable */
import {login,register,validCode, addr,
  addAddr, delAddr,alterAddr,defaultAddr,
  getCommodity,getBanner,secKillGoods,
  addCart,deleteCart,updateCart,getCart,
  getCartCount,getRecommend,affirmOrder,
  payInterface
} from "./api";
export default {
  install(Vue) {
    Vue.prototype.$request ={login,register,validCode, addr, addAddr,
      delAddr,alterAddr,defaultAddr,getCommodity,getBanner,secKillGoods,
      addCart,deleteCart,updateCart,getCart,getCartCount,getRecommend,affirmOrder,
      payInterface
    };
  }
};

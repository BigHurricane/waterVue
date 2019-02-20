/* eslint-disable */
import {request} from './request';

// 获取验证码
export const validCode = () => request.get('/validCode');

// 登录
export const login = (data) => {
  return request.post('./login', data);
};

// 注册
export const register = (data) => {
  return request.put('./register', data);
};

//查询地址

export const addr = () => request.get('./addr');

//添加收货地址
export const addAddr = (data) => request.put('./addr',data);

//删除地址
export const delAddr = (data) => request.delete('./addr',{params:data});

//修改地址
export const  alterAddr = (data) => request.post('./addr', data);

//设置默认地址

export const defaultAddr = (data) => request.post('./defaultAddr',data);

//获取商品

export const getCommodity = (data) => request.get('./prod',{params:data});
// export const getCommodity = (data) => request.get('./prod',data);

//获取轮播图
export const getBanner = () => request.get('./banner');

//获取秒杀商品
export const secKillGoods = (data) => request.get('./secKill',{params:data});

//获取推荐商品

export const getRecommend = () => request.get('./recommend');

//添加商品到购物车
export const addCart = (data) => request.put('/cart',data);

//删除购物车的商品
export const deleteCart = (data) => request.post('/delcart ',data);

//更新购物车的商品数量
export const updateCart = (data) => request.post('/cart',data);

//获取购物车的商品
export const getCart = () => request.get('/cart');

//获取购物车的商品数量
export const getCartCount = () => request.get('/cartCount');

//确认订单
export const affirmOrder = (data) => request.put('/order',data);

//支付接口
export const payInterface = (data) => request.post('/pay',data);




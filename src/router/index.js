import Router from 'vue-router';

import auth from '../page/addAddress';
import edit from '../page/edit';
import authdone from '../page/authdone';
const routes = [
  {
    path: '/',
    redirect: { name: 'auth' },
  },
  {
    path: '/auth',
    name: 'auth',
    component: auth,
  },
  {
    path: '/edit',
    name: 'edit',
    component: edit,
  },
  {
    path: '/authdone',
    name: 'authdone',
    component: authdone,
  },
];
export const b = new Router({
  routes,
  mode: 'history',
});

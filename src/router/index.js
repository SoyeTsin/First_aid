import Vue from 'vue';
import Router from 'vue-router';
import Home from '../views/Home.vue';

Vue.use(Router);
const About = () => import('../views/About.vue');
const Panorama = () => import('../views/Panorama.vue');
const ResourceMap = () => import('../views/ResourceMap.vue');

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/about',
      name: 'about',
      component: About,
    },
    {
      path: '/panorama',
      name: 'panorama',
      component: Panorama,
    },
    {
      path: '/ResourceMap',
      name: 'ResourceMap',
      component: ResourceMap,
    },
  ],
});

import Vue from 'vue'
import VueRouter from 'vue-router'
import SignIn from '../views/SignIn.vue'
import Profile from '../views/Profile.vue'

Vue.use(VueRouter)

let routes = [
  {
    path: '/signin',
    name: 'Signin',
    component: SignIn
  },
  {
    path: '/profile',
    name: 'Profile',
    layout: "dashboard",
    component: Profile
  },
  {
    path: '/',
    name: 'Home',
    layout: "dashboard",
    component: () => import('../views/Layout.vue'),
  },
]

function addLayoutToRoute( route, parentLayout = "default" )
{
  route.meta = route.meta || {} ;
  route.meta.layout = route.layout || parentLayout ;

  if( route.children )
  {
    route.children = route.children.map( ( childRoute ) => addLayoutToRoute( childRoute, route.meta.layout ) ) ;
  }
  return route ;
}

routes = routes.map( ( route ) => addLayoutToRoute( route ) ) ;

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

import store from '@/store';

const safeGetRoles = function() {
  try {
    let roles = store.getters.me.roles;
    if (roles === null || roles === undefined) {
      roles = {};
    }
    return roles;
  } catch (err) {
    console.log(err);
    return {};
  }
}

router.beforeEach((to, from, next) => {
  if (Object.prototype.hasOwnProperty.call(to.meta, 'access')) {
    const roles = safeGetRoles();
    if (!Object.prototype.hasOwnProperty.call(roles, 'SuperAdmins')) {
      let has = false;
      for (const acc of to.meta.access) {
        if (Object.prototype.hasOwnProperty.call(roles, acc)) {
          has = true;
          break;
        }
      }
      if (!has) {
        next('/protected?from=' + encodeURI(to.path));
        return;
      }
    }
  }
  next();
});

export default router
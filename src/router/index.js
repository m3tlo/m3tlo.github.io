import Vue from "vue";
import VueRouter from "vue-router";
// import firebase from "firebase/app";

Vue.use(VueRouter);


const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    
    {
      path: '/login',
      name: 'login',
      meta: {layout: 'empty'},
      component: () => import("@/views/UserLogin.vue")
    },
    {
      path: '/register',
      name: 'register',
      meta: {layout: 'empty'},
      component: () => import("@/views/UserRegister.vue")
    },
    {
      path: "/",
      name: "home",
      meta: {layout: 'main', auth: true},
      component: () => import('@/views/HomePage.vue'),
    },
    
    {
      path: '/categories',
      name: 'categories',
      meta: {layout: 'main', auth: true},
      component: () => import("@/views/MyCategories.vue")
    },
    {
      path: '/record',
      name: 'record',
      meta: {layout: 'main', auth: true},
      component: () => import("@/views/MyRecord.vue")
    },
    {
      path: '/detail/:id',
      name: 'detail',
      meta: {layout: 'main', auth: true},
      component: () => import("@/views/DetailRecord.vue")
    },
    {
      path: '/history',
      name: 'history',
      meta: {layout: 'main', auth: true},
      component: () => import("@/views/MyHistory.vue")
    },
    {
      path: '/planning',
      name: 'planning',
      meta: {layout: 'main', auth: true},
      component: () => import("@/views/MyPlanning.vue")
    },
    {
      path: '/profile',
      name: 'profile',
      meta: {layout: 'main', auth: true},
      component: () => import("@/views/UserProfile.vue")
    },
  ]
});
// router.beforeEach((to, from, next) => {
//   const currentUser = firebase.auth().currentUser
//   const requireAuth = to.matched.some(record => record.meta.auth)
  
//   if(requireAuth && !currentUser) {
//     next('/login?message=login')
//   } else {
//     next()
//   }
// })

export default router



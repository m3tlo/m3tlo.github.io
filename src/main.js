import Vue from 'vue';
import Vuelidate from 'vuelidate';
import App from './App.vue';
import router from './router';
import store from './store';
import messagePlugin from './utils/message.plugin';
import dateFilter from './filters/date.filter';
import currencyFilter from './filters/currency.filter';
import tooltipDirective from './directives/tooltip.directive';
import MyLoader from './components/app/MyLoader';
import './registerServiceWorker';
import 'materialize-css/dist/js/materialize.min';
import MyPaginate from 'vuejs-paginate';

import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'


Vue.config.productionTip = false;

Vue
.use(messagePlugin)
.use(Vuelidate);


Vue.filter('date', dateFilter)
Vue.filter('currency', currencyFilter);
Vue.directive('tooltip', tooltipDirective)
Vue.component('MyLoader', MyLoader)
Vue.component('MyPaginate', MyPaginate)


firebase.initializeApp({
  apiKey: 'AIzaSyBtFNJ6Jie_htCxV_MfNEgX4a4SRs155u4',
  authDomain: 'vue-project-5e398.firebaseapp.com',
  projectId: 'vue-project-5e398',
  storageBucket: 'vue-project-5e398.appspot.com',
  messagingSenderId: '818294300947',
  appId: '1:818294300947:web:ef738af6ccdb750da3ae6',
  measurementId: 'G-S0BXN6BZCP',
});

let app

 (async function() {await this.$store.dispatch('fetchInfo')}());

firebase.auth().onAuthStateChanged(() => {
  if(!app) {
  app = new Vue({
    router,
    store,
    render: (h) => h(App),
  }).$mount('#app');
  }
})




import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
import VueI18n from 'vue-i18n';
import Ajax from '@/utils/Ajax.js';

// import DefaultLayout from './layouts/Default.vue'
import DashboardLayout from './layouts/Dashboard.vue'
//import DashboardRTLLayout from './layouts/DashboardRTL.vue'

import './scss/app.scss';

Vue.use(Antd);
Vue.use(VueI18n);

Ajax.init(router, (...args) => {
  console.log(args)
});

const i18n = new VueI18n({
  locale: 'en',
  fallbackLocale: 'en'
});
Vue.config.productionTip = false

//Vue.component("layout-default", DefaultLayout);
// Vue.component("layout-default", DefaultLayout);
Vue.component("layout-dashboard", DashboardLayout);
//Vue.component("layout-dashboard-rtl", DashboardRTLLayout);

new Vue({
  router,
  i18n,
  store,
  render: h => h(App)
}).$mount('#app')

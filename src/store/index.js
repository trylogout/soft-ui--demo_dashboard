import Vue from 'vue';
import Vuex from 'vuex';

import VuexPersistence from 'vuex-persist';

Vue.use(Vuex);

const vuexLocal = new VuexPersistence({
  storage: window.localStorage
});

const DEFAULT = {
  title: 'Loading...',
  globalLoading: false,
  token:   null,
  refresh: null,
  locale:  null,
  constants: {},
  showDrawer: true,
  me: {
    id: null,
    username: 'Loading...',
    email: 'Loading...',
    roles: {}
  },
  collapse: {
    resources: false
  }
};

export default new Vuex.Store({
  state: {
    ...DEFAULT
  },
  mutations: {
    clear (state) {
      Object.assign(state, DEFAULT);
    },
    setCollapse (state, payload) {
      state.collapse[payload.name] = payload.value;
    },
    setShowDrawer (state, showDrawer) {
      state.showDrawer = showDrawer;
    },
    setMe (state, me) {
      state.me = me;
    },
    title (state, title) {
      state.title = title;
    },
    setSession (state, { token, refresh }) {
      state.token   = token;
      state.refresh = refresh;
    },
    setLocale (state, value) {
      state.locale = value;
    },
    setConstants (state, value) {
      state.constants = value;
    },
    setGlobalLoading (state, val) {
      state.globalLoading = val
    }
  },
  getters: {
    collapse: state => {
      return state.collapse;
    },
    me: state => {
      return state.me;
    },
    title: state => {
      return state.title;
    },
    showDrawer: state => {
      return state.showDrawer;
    },
    session: state => {
      return {
        token:   state.token,
        refresh: state.refresh
      };
    },
    locale: state => {
      return state.locale;
    },
    constants: state => {
      return state.constants;
    },
    globalLoading: state => {
      return state.globalLoading;
    }
  },
  actions: {
    clear (context) {
      context.commit('clear');
    },
    setCollapse (context, payload) {
      context.commit('setCollapse', payload);
    },
    setMe (context, me) {
      context.commit('setMe', me);
    },
    setShowDrawer (context, showDrawer) {
      context.commit('setShowDrawer', showDrawer);
    },
    setSession (context, { refresh, token }) {
      context.commit('setSession', { refresh, token });
    },
    clearSession (context) {
      context.commit('clearSession');
    },
    setLocale (context, locale) {
      context.commit('setLocale', locale);
    },
    setConstants (context, cs) {
      context.commit('setConstants', cs);
    },
    setGlobalLoading (context, val) {
      context.commit('setGlobalLoading', val);
    }
  },
  modules: {
  },
  plugins: [vuexLocal.plugin]
})
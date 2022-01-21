<template>
  <div id="app">
    <component :is="layout">
      <router-view />
    </component>
  </div>
</template>

<script>
import Ajax from "@/utils/Ajax";

export default ({
  data: () => ({
    loading: true,
  }),
  computed: {
    layout() {
      return "layout-" + ( this.$route.meta.layout || "default" ).toLowerCase() ;
    },
    me: {
      get () {
        return this.$store.getters.me;
      },
      set (val) {
        this.$store.dispatch('setMe', val);
        return null;
      }
    },
    globalLoading: {
      get () {
        return !!this.$store.getters.globalLoading;
      },
      set (val) {
        this.$store.dispatch('setGlobalLoading', !!val);
        return null;
      }
    }
  },
  async created () {
    this.globalLoading = false;
    let [err, data] = await Ajax.snop();
    if (err || data.code !== 200) {
      return;
    }
    [err, data] = await Ajax.me();
    this.me = data.body;
    this.loading = false;
  },
})
</script>

<style lang="scss">
</style>

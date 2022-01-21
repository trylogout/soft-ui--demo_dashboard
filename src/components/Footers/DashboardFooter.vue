<template>
	
	<!-- Layout Footer -->
	<a-layout-footer>
		<a-row type="flex" style="justify-content: flex-end">
      <a-col :span="24" :md="12"  class="footer-control">
        <a-menu mode="horizontal">
          <a-menu-item class="footer-text">About Us</a-menu-item>
          <a-menu-item class="footer-text">Menu Second Footer</a-menu-item>
          <a-menu-item class="footer-text">Contact Us</a-menu-item>
          <a-menu-item class="footer-text">Menu Footer</a-menu-item>
        </a-menu>
        <!-- / Footer Navigation Menu -->
      </a-col>
		</a-row>
	</a-layout-footer>
	<!-- / Layout Footer -->

</template>

<script>

	export default ({
		data() {
			return {
			}
		},
	})

</script>

<style lang="scss">
.footer-text{
  letter-spacing: -0.022em !important;
  font-style: normal !important;
  font-size: 13px !important;
  line-height: 1.47059 !important;
  font-weight: 400 !important;
}
</style>
<template>
	<div class="mb-24">
		<div class="bg-white border-gray-3" style="background-color:#f7fafc; height: calc(100vh - 89px);">
        <ProfileCard/>
		</div>
	</div>
</template>

<script>
// import Ajax from '@/utils/Ajax.js';
import ProfileCard from '@/components/Profile/ProfileCard.vue';

	export default ({
    name: "Profile",
		data() {
			return {
			}
		},
    components:{
      ProfileCard
    }
	})

</script>

<style lang="scss">
img.center {
  display: block;
  margin: 10% auto;
}
</style>
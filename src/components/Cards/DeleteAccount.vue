<template>
  <a-card :bordered="false" class="header-solid h-full change-password" :bodyStyle="{paddingTop: 0, paddingBottom: '16px' }" :headStyle="{paddingRight: 0,}" >
    <template #title>
      <h6 class="font-bold m-0 nameCard">Delete Account</h6>
      <p>Once you delete your account, there is no going back. Please be certain.</p>
    </template>
    <v-row>
      <a-col class="ant-col-md-2">
        <a-switch v-model="confirm_delete_acc" />
      </a-col>
      <a-col class="ant-col-md-12">
        <h6 class="font-semibold"> Confirm</h6>
        <p> I want to delete my account</p>
      </a-col>
      <a-col class="ant-col-3 ant-col-offset-1">
        <a-button> Deactivate </a-button>
      </a-col>
      <a-col class="ant-col-3 ant-col-offset-1">
        <a-button type="primary"> Delete Account </a-button>
      </a-col>
    </v-row>
  </a-card>
</template>

<script>
export default {
  data() {
    return {
      confirm_delete_acc: false,
    }
  },
  name: "DeleteAccount"
}
</script>

<style scoped>
  .nameCard {
    font-size: 1.1em;
  }
</style>
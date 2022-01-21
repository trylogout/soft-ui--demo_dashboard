<template>
  <a-card :bordered="false" class="header-solid h-full change-password" :bodyStyle="{paddingTop: 0, paddingBottom: '16px' }" :headStyle="{paddingRight: 0,}" >
    <template #title>
      <h6 class="font-bold m-0 cardName">Change Password</h6>
    </template>
    <a-row style="padding-bottom:2%">
      <a-col class="ant-col-md-24">
        <p class="name-input-profile"> Current Password</p>
        <a-input-password class="input-profile ant-col-md-24" placeholder="Current Password"></a-input-password>
      </a-col>
    </a-row>
    <a-row style="padding-bottom:2%">
      <a-col class="ant-col-md-24">
        <p class="name-input-profile"> New Password</p>
        <a-input-password class="input-profile ant-col-md-24" placeholder="New Password"></a-input-password>
      </a-col>
    </a-row>
    <a-row style="padding-bottom:2%">
      <a-col class="ant-col-md-24">
        <p class="name-input-profile"> Confirm New Password</p>
        <a-input-password class="input-profile ant-col-md-24" placeholder="Confirm New Password"></a-input-password>
      </a-col>
    </a-row>
    <a-row>
      <h6 class="font-bold m-0">Password Requirements</h6>
    </a-row>
    <a-row>
      <p> Please follow this guide for a strong password. </p>
    </a-row>
    <a-row>
      <a-col class="ant-col-md-19">
        <ul>
          <li>
            One special characters
          </li>
          <li>
            Min 6 characters
          </li>
          <li>
            One number (2 are recommended)
          </li>
          <li>
            Change it often
          </li>
        </ul>
      </a-col>
      <a-col class="ant-col-md-5">
        <a-button type="primary"> Update Password</a-button>
      </a-col>
    </a-row>
  </a-card>
</template>

<script>
export default {
  name: "changePassword"
}
</script>

<style scoped>

</style>
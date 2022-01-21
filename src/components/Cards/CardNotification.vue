<template>
  <a-card :bordered="false" class="header-solid h-full change-password" :bodyStyle="{paddingTop: 0, paddingBottom: '16px' }" :headStyle="{paddingRight: 0,}" >
    <template #title>
      <h6 class="font-bold m-0 nameCard"> Notifications</h6>
      <p> Choose how you receive notifications. These notification settings apply to the things you’re watching. </p>
    </template>
    <a-row>
      <a-col class="ant-col-md-14">
      <h6> Activity</h6>
      </a-col>
      <a-col class="ant-col-md-10">
        <a-col class="ant-col-md-8">
          <h6>Email</h6>
        </a-col>
        <a-col class="ant-col-md-8">
          <h6>Push</h6>
        </a-col>
        <a-col class="ant-col-md-8">
          <h6>SMS</h6>
        </a-col>
      </a-col>
    </a-row>
    <hr>
    <a-row>
      <a-col class="ant-col-md-14">
        <h6 class="font-semibold m-0">Mentions</h6>
        <p> Notify when another user mentions you in a comment </p>
      </a-col>
      <a-col class="ant-col-md-10">
        <a-col class="ant-col-md-8">
          <a-switch v-model="mentions_email" />
        </a-col>
        <a-col class="ant-col-md-8">
          <a-switch v-model="mentions_push" />
        </a-col>
        <a-col class="ant-col-md-8">
          <a-switch v-model="mentions_sms" />
        </a-col>
      </a-col>
    </a-row>
    <hr>
    <a-row>
      <a-col class="ant-col-md-14">
        <h6 class="font-semibold m-0">Comments</h6>
        <p> Notify when another user comments your item.</p>
      </a-col>
      <a-col class="ant-col-md-10">
        <a-col class="ant-col-md-8">
          <a-switch v-model="comments_email" />
        </a-col>
        <a-col class="ant-col-md-8">
          <a-switch v-model="comments_push" />
        </a-col>
        <a-col class="ant-col-md-8">
          <a-switch v-model="comments_sms" />
        </a-col>
      </a-col>
    </a-row>
    <hr>
    <a-row>
      <a-col class="ant-col-md-14">
        <h6 class="font-semibold m-0">Follows</h6>
        <p> Notify when another user follows you. </p>
      </a-col>
      <a-col class="ant-col-md-10">
        <a-col class="ant-col-md-8">
          <a-switch v-model="follows_email" />
        </a-col>
        <a-col class="ant-col-md-8">
          <a-switch v-model="follows_push" />
        </a-col>
        <a-col class="ant-col-md-8">
          <a-switch v-model="follows_sms" />
        </a-col>
      </a-col>
    </a-row>
    <hr>
    <a-row>
      <a-col class="ant-col-md-14">
        <p> Log in from a new device </p>
      </a-col>
      <a-col class="ant-col-md-10">
        <a-col class="ant-col-md-8">
          <a-switch v-model="logInNewDevices_email" />
        </a-col>
        <a-col class="ant-col-md-8">
          <a-switch v-model="logInNewDevices_push" />
        </a-col>
        <a-col class="ant-col-md-8">
          <a-switch v-model="logInNewDevices_sms" />
        </a-col>
      </a-col>
    </a-row>
    <hr>
  </a-card>
</template>

<script>
export default {
  data () {
    return {
      mentions_email:true,
      mentions_push:false,
      mentions_sms:false,
      comments_email:true,
      comments_push:false,
      comments_sms:true,
      follows_email:false,
      follows_push:false,
      follows_sms:false,
      logInNewDevices_email:true,
      logInNewDevices_push:false,
      logInNewDevices_sms:true,
    }
  },
  name: "CardNotification"
}

</script>

<style scoped>
  .nameCard {
    font-size: 1.1em;
  }
</style>
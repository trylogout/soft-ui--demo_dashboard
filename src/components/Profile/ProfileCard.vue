<template>
  <div>

    <a-row type="flex" :gutter="24">

      <a-col :span="24" :md="6" class="mb-24">
        <a-card :bordered="false" class="header-solid h-full card-profile-information" style="    position: fixed;
    height: 61%;
    width: 19%;" :bodyStyle="{paddingTop: 0, paddingBottom: '16px' }" :headStyle="{paddingRight: 0,}">
        <a-anchor style="align-items: center;display: flex; flex: 1;">
          <a-anchor-link href="#components-anchor-demo-basic" title="Profile" />
          <a-anchor-link href="#components-anchor-demo-static" title="Profile Info" />
          <a-anchor-link href="#components-anchor-demo-static" title="Change Password" />
          <a-anchor-link href="#components-anchor-demo-static" title="Sessions" />
          <a-anchor-link href="#components-anchor-demo-static" title="Delete Profile" />
        </a-anchor>
        </a-card>
      </a-col>

      <!-- Profile Information Column -->
      <a-col :span="24" :md="18" class="mb-24">

        <a-row>
          <a-card :bordered="false" class="header-solid h-full mb-24" :bodyStyle="{paddingTop: '14px'}">
            <template #title>
              <a-row type="flex" align="middle">
                <a-col :span="24" :md="4" class="col-info">
                  <a-avatar :size="74" shape="square" src="images/avatar-3.png" />
                </a-col>
                <a-col :span="24" :md="8" style="display: flex; align-items: center; justify-content: flex-start">
                  <div class="avatar-info">
                    <h4 class="font-semibold m-0">John Doe</h4>
                    <p>johndoe@test.com</p>
                  </div>
                </a-col>
              </a-row>
            </template>
          </a-card>
        </a-row>

        <a-row>
          <CardProfileInfo></CardProfileInfo>
        </a-row>

        <a-row>
          <changePassword></changePassword>
        </a-row>

        <a-row>
          <CardNotification></CardNotification>
        </a-row>

        <a-row>
          <a-card>
            Sessions [WIP]
          </a-card>
        </a-row>

        <a-row>
          <DeleteAccount></DeleteAccount>
        </a-row>


      </a-col>


    </a-row>

  </div>
</template>

<script>
import CardProfileInfo from "@/components/Cards/CardProfileInfo";
import changePassword from "@/components/Cards/changePassword";
import CardNotification from "@/components/Cards/CardNotification";
import DeleteAccount from "@/components/Cards/DeleteAccount";

export default {
  name: "ProfileCard",
  components: {
    CardProfileInfo,
    changePassword,
    CardNotification,
    DeleteAccount
  },
}
</script>

<style>
.ant-anchor{
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  color: rgba(0,0,0,.65);
  font-size: 14px;
  line-height: 1.5;
  list-style: none;
  position: relative;
  padding-left: 2px;
}

.ant-anchor-ink{
  display: none;
}

.ant-anchor-link-title {
  position: relative;
  display: block;
  margin-bottom: 6px;
  overflow: hidden;
  color: rgba(0,0,0,.65);
  white-space: nowrap;
  text-overflow: ellipsis;
  transition: all .3s;
}

.ant-row{
  padding-bottom: 15px;
}
</style>
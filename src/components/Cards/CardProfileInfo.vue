<template>
  <a-card :bordered="false" class="header-solid h-full card-profile-info" :bodyStyle="{paddingTop: 0, paddingBottom: '16px' }" :headStyle="{paddingRight: 0,}" >
    <template #title>
      <h6 class="font-bold nameCard">Basic Info</h6>
    </template>
    <a-row style="padding-bottom:2%" >
      <a-col class="ant-col-md-11">
        <p class="name-input-profile">First Name</p>
        <a-input class="input-profile ant-col-md-23" placeholder="eg. John"></a-input>
      </a-col>
      <a-col class="ant-col-md-12">
        <p class="name-input-profile ant-col-offset-1"> Last Name</p>
        <a-input class="input-profile ant-col-md-23 ant-col-offset-1" placeholder="eg. Doe"></a-input>
      </a-col>
    </a-row>
    <a-row style="padding-bottom:2%">
      <a-col class="ant-col-md-7">
        <p class="name-input-profile"> I'm </p>
        <a-dropdown-button class="ant-col-md-23">Male</a-dropdown-button>
      </a-col>
      <a-col class="ant-col-md-16 ant-col-md-offset-1">
        <p class="name-input-profile">Birth date</p>
        <row>
          <a-dropdown-button class="ant-col-md-6">January</a-dropdown-button>
          <a-dropdown-button class="ant-col-md-6">1</a-dropdown-button>
          <a-dropdown-button class="ant-col-md-6">1990</a-dropdown-button>
        </row>
        <row>
          <a-input class="ant-col-md-6 input-profile" placeholder="January"></a-input>
          <a-input class="ant-col-md-6 input-profile" placeholder="1"></a-input>
          <a-input class="ant-col-md-6 input-profile" placeholder="1990"></a-input>
        </row>

      </a-col>
    </a-row>
    <a-row style="padding-bottom:2%">
      <a-col class="ant-col-md-12">
        <p class="name-input-profile">Email Address </p>
        <a-input class="input-profile ant-col-md-23" placeholder="eg. username@adress.com"></a-input>
      </a-col>
      <a-col class="ant-col-md-12">
        <p class="name-input-profile ant-col-offset-1"> Confirmation Email </p>
        <a-input class="input-profile ant-col-md-23 ant-col-offset-1" placeholder="eg. username@adress.com"></a-input>
      </a-col>
    </a-row>
    <a-row style="padding-bottom:2%">
      <a-col class="ant-col-md-12">
        <p class="name-input-profile"> Your Location</p>
        <a-input class="input-profile ant-col-md-23" placeholder="eg. New York"></a-input>
      </a-col>
      <a-col class="ant-col-md-12">
        <p class="name-input-profile ant-col-offset-1"> Phone Number</p>
        <a-input class="input-profile ant-col-md-23 ant-col-offset-1" placeholder="eg. +40 941 353 292"></a-input>
      </a-col>
    </a-row>
    <a-row style="padding-bottom:2%">
      <a-col class="ant-col-md-12">
        <p class="name-input-profile"> Language </p>
        <a-dropdown-button class="ant-col-md-23">English</a-dropdown-button>
        <a-input class="ant-col-md-23 input-profile" placeholder="English"></a-input>


      </a-col>
    </a-row>
  </a-card>
</template>

<script>
export default {
  name: "CardProfileInfo"
}
</script>


<style scoped>
  .input-profile {
    padding: 2%;
  }
  .nameCard {
    font-size: 1.1em;
  }
</style>
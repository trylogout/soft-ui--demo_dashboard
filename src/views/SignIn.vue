<template>
  <div class="sign-in">

    <a-row type="flex" :gutter="[24,24]" justify="space-around" align="middle">

      <!-- Sign In Form Column -->
      <a-col :span="24" :md="12" :lg="{span: 12, offset: 0}" :xl="{span: 6, offset: 2}" class="col-form">
        <h1 class="mb-15">Sign In</h1>
        <h5 class="font-regular text-muted">Enter your email and password to sign in</h5>

        <!-- Sign In Form -->
        <a-form
            id="components-form-demo-normal-login"
            :form="form"
            class="login-form"
            @submit="handleSubmit"
            :hideRequiredMark="true"
        >
          <a-form-item class="mb-10" label="Email" :colon="false">
            <a-input
                v-decorator="[
						'email',
						{ rules: [{ required: true, message: 'Please input your email!' }] },
						]" placeholder="Email" />
          </a-form-item>
          <a-form-item class="mb-5" label="Password" :colon="false">
            <a-input
                v-decorator="[
						'password',
						{ rules: [{ required: true, message: 'Please input your password!' }] },
						]" type="password" placeholder="Password" />
          </a-form-item>

          <a-form-item>
            <a-button type="primary" block html-type="submit" class="login-form-button">
              SIGN IN
            </a-button>
          </a-form-item>
        </a-form>
        <!-- / Sign In Form -->

        <p class="font-regular text-muted">Don't have an account? <router-link to="/signin" class="font-bold text-dark">Sign Up</router-link></p>
      </a-col>
      <!-- / Sign In Form Column -->

      <!-- Sign In Image Column -->
      <a-col :span="24" :md="12" :lg="12" :xl="12" class="col-img">
        <img src="images/img-signin.png" alt="">
      </a-col>
      <!-- Sign In Image Column -->

    </a-row>

  </div>
</template>

<script>
import Ajax from '@/utils/Ajax.js';

export default {
  name: "SignIn",
  beforeCreate() {
    // Creates the form and adds to it component's "form" property.
    this.form = this.$form.createForm(this, { name: 'normal_login' });
  },
  methods: {
    // Handles input validation after submission.
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if ( !err ) {
          this.loading = true;
          this.login(values);
        }
      });
    },
    async login (values) {
      const [err, data] = await Ajax.login(values);
      this.loading = false;
      if (err || data.code === 500) {
        this.error = this.$t('Sign.error.internal');
        return;
      }
      if (data.code === 401 || data.code === 403) {
        this.error = this.$t('Sign.error.wrong');
        return;
      }
      if (data.code === 200) {
        this.error = null;
        const token = data.body.token;
        const refresh = data.body.refresh;
        this.$store.dispatch('setSession', { token, refresh });

        let [errSave, dataSave] = await Ajax.snop();
        if (errSave || dataSave.code !== 200) {
          return;
        }
        [errSave, dataSave] = await Ajax.me();
        this.me = dataSave.body;

        this.$nextTick(() => {
          const fp = this.$route.query.from;
          if (fp) {
            let from = decodeURI(fp);
            this.$router.push(from);
          } else {
            this.$router.push({ name: 'Home' });
          }
        });
      }
    }
  },
  computed:{
    me: {
      get () {
        return this.$store.getters.me;
      },
      set (val) {
        this.$store.dispatch('setMe', val);
        return null;
      }
    },
  }
}
</script>

<style lang="scss">
.sign-in{
  margin-top: 15vh
}
body {
  background-color: #ffffff !important;
}
</style>
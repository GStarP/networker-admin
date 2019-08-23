<template>
  <!--背景图片-->
  <v-img
    src="../assets/images/bg-navigator.jpg"
    height="100%"
  >
    <v-container justify-center class="login-box">
      <v-card>
        <v-container col="12" md="4">
          <h2>管理员登录</h2>
          <v-form
            ref="form"
            v-model="valid"
          >
            <v-text-field
              v-model="name"
              :rules="nameRules"
              label="账户名"
              required
            ></v-text-field>

            <v-text-field
              v-model="password"
              :rules="passwordRules"
              label="密码"
              type="password"
              required
            ></v-text-field>

            <v-btn
              :disabled="!valid"
              color="success"
              class="mr-4"
              @click="login"
            >
              登录
            </v-btn>

            <v-btn
              color="error"
              class="mr-4"
              @click="reset"
            >
              清空
            </v-btn>
          </v-form>
        </v-container>
      </v-card>
    </v-container>
  </v-img>
</template>

<script>
export default {
  name: 'Login',
  data: () => ({
    valid: true,
    name: '',
    nameRules: [
      v => !!v || 'Name is required'
    ],
    password: '',
    passwordRules: [
      v => !!v || 'Name is required'
    ]
  }),

  methods: {
    login () {
      if (this.$refs.form.validate()) {
        if (this.name === '围巾女朋友紫宁' && this.password === '123123') {
          // todo:存Cookies还是LocalStorage
          this.$router.push('/');
        } else {
          alert('密码错误啊喂！');
        }
      }
    },
    reset () {
      this.$refs.form.reset();
    }
  }
};
</script>

<style lang="scss" scoped>
.login-box{
  width: 50%;
}
</style>

<template>
  <v-container fluid style="height: max-content;padding: 0 !important;">
    <!--背景图片-->
    <v-img
        justify-center
        :src="this.isPhone ? require('../assets/images/bg-navigator.jpg'): require('../assets/images/bg-login.jpg')"
        height="100%"
    >
      <v-container justify-center :class="{ 'login-box-pc': !isPhone, 'login-box-phone': isPhone }">
        <v-card>
          <v-container>
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
                  id="confirm"
                  :disabled="!valid"
                  color="info"
                  @click="login"
              >
                登录
              </v-btn>

              <v-btn
                  id="reset"
                  color="error"
                  @click="reset"
              >
                清空
              </v-btn>
            </v-form>
          </v-container>
        </v-card>
      </v-container>
    </v-img>
  </v-container>
</template>

<script>
export default {
  name: 'Login',
  data: () => ({
    isPhone: false,
    valid: true,
    name: '',
    nameRules: [
      v => !!v || '账号不能为空！'
    ],
    password: '',
    passwordRules: [
      v => !!v || '密码不能为空！'
    ]
  }),
  mounted () {
    // 先根据屏幕宽度判断设备类型
    this.onWidthChange();
    window.addEventListener('resize', this.onWidthChange);
  },
  methods: {
    onWidthChange () {
      // 根据宽度判断设备是否为手机
      this.isPhone = window.innerWidth <= 500;
    },
    login () {
      if (this.$refs.form.validate()) {
        if (this.name === 'networker' && this.password === '123') {
          // todo:存Cookies还是LocalStorage
          this.$router.push('/home');
        } else {
          alert('账号或密码错误啊喂！');
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
  .login-box-pc{
    width: 40%;
    margin-top: 10%;
    border-radius: 10px;
  }
  .login-box-phone{
    width: 65%;
    margin-top: 50%;
    border-radius: 10px;
  }
  #confirm{
    background-color: #2196f3;
    width: 10% !important;
    margin-right: 7px;
  }
  #reset{
    background-color: #ff5252;
    width: 10% !important;
    margin-left: 7px;
  }
  h2{
    text-align: center;
  }
</style>

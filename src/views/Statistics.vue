<template>
  <v-container justify-center text-center>
    <v-card :class="{ 'user-box-pc': !isPhone, 'user-box-phone': isPhone }">
      <v-card class="normal-box">
        <div>
          <div><i>当前已有普通用户：</i></div>
          <b><div><div v-html="normalUserNumber"></div>&nbsp;<div>↑</div></div></b>
          <div><i>位</i></div>
        </div>
      </v-card>
      <v-card class="pledge-box">
        <div>
          <div><i>当前已有质权方用户：</i></div>
          <b><div><div v-html="pledgeUserNumber"></div>&nbsp;<div>↑</div></div></b>
          <div><i>位</i></div>
        </div>
      </v-card>
    </v-card>
    <!-- 顶部居中的提示框 -->
    <v-snackbar
        v-model="snackbarShow"
        :color="snackBarColor"
        :timeout="2000"
        top
    >
      <v-icon color="white" class="mr-3">{{ snackbarIcon }}</v-icon>
      <div>{{ snackBarText }}</div>
      <v-icon @click="snackbarShow = false">mdi-close-circle</v-icon>
    </v-snackbar>
  </v-container>
</template>

<script>
import IStatistics from '../api/IStatistics';
export default {
  data () {
    return {
      isPhone: false,
      normalUserNumber: 0,
      pledgeUserNumber: 0,
      snackbarShow: false, // 是否显示提示框
      snackbarIcon: undefined, // 提示框中图标
      snackBarText: undefined, // 提示框中文字
      snackBarColor: undefined // 提示框主题颜色
    };
  },
  mounted () {
    // 先根据屏幕宽度判断设备类型
    this.onWidthChange();
    window.addEventListener('resize', this.onWidthChange);
    // 获取用户数据
    IStatistics.getNormalUserNumber().then(res => {
      if (res.code === 200) {
        this.normalUserNumber = res.data;
      } else {
        this.showErrorSnackbar('获取普通用户数失败！');
      }
    });
    IStatistics.getPledgeUserNumber().then(res => {
      if (res.code === 200) {
        this.pledgeUserNumber = res.data;
      } else {
        this.showErrorSnackbar('获取质权方用户数失败！');
      }
    });
  },
  methods: {
    onWidthChange () {
      // 根据宽度判断设备是否为手机
      this.isPhone = window.innerWidth <= 500;
    },
    /**
     * @author hxw
     * @des 展示指定样式的提示
     * @param {string} icon 'mdi-xxx'
     * @param {string} text 'hxwnb'
     * @param {string} color 'success'
     */
    showSnackbar (icon, text, color) {
      this.snackbarIcon = icon;
      this.snackBarText = text;
      this.snackBarColor = color;
      this.snackbarShow = true;
    },
    showSuccessSnackbar (text) {
      this.showSnackbar('mdi-checkbox-marked-circle', text, 'success');
    },
    showErrorSnackbar (text) {
      this.showSnackbar('mdi-alert', text, 'error');
    }
  }
};
</script>

<style lang="scss" scoped>
.user-box-pc{
  @include allCenter;
  min-height: $comInfoListHeight / 1.25;
  background-color: rgb(238, 238, 238);
  box-shadow: none;
  >.normal-box{
    @include allCenter;
    height: $comInfoListHeight / 2;
    width: 35%;
    margin-right: 5%;
    b{
      color: #ff5252;
      font-size: 70px;
      div{
        @include allCenter;
      }
    }
  }
  >.pledge-box{
    @include allCenter;
    height: $comInfoListHeight / 2;
    width: 35%;
    margin-left: 5%;
    b{
      color: #ff5252;
      font-size: 70px;
      div{
        @include allCenter;
      }
    }
  }
}
.user-box-phone{
  @include allCenter;
  display: block;
  min-height: $comInfoListHeight;
  background-color: rgb(238, 238, 238);
  box-shadow: none;
  >.normal-box{
    @include allCenter;
    height: $comInfoListHeight / 2;
    width: 100%;
    margin-bottom: 5%;
    b{
      color: #ff5252;
      font-size: 70px;
      div{
        @include allCenter;
      }
    }
  }
  >.pledge-box{
    @include allCenter;
    height: $comInfoListHeight / 2;
    width: 100%;
    margin-top: 5%;
    b{
      color: #ff5252;
      font-size: 70px;
      div{
        @include allCenter;
      }
    }
  }
}
</style>

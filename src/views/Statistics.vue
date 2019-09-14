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
  </v-container>
</template>

<script>
import IStatistics from '../api/IStatistics';
export default {
  data () {
    return {
      isPhone: false,
      normalUserNumber: 0,
      pledgeUserNumber: 0
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
        alert('获取用户数失败……');
      }
    });
    IStatistics.getPledgeUserNumber().then(res => {
      if (res.code === 200) {
        this.pledgeUserNumber = res.data;
      } else {
        alert('获取用户数失败……');
      }
    });
  },
  methods: {
    onWidthChange () {
      // 根据宽度判断设备是否为手机
      this.isPhone = window.innerWidth <= 500;
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

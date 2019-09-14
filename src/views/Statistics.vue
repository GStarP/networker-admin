<template>
  <v-container justify-center text-center>
    <v-card class="user-box">
      <v-card class="normal-box">
        <p>当前已有普通用户：</p>
        <b><div v-html="normalUserNumber"></div></b>
        <p>人</p>
      </v-card>
      <v-card class="pledge-box">
        <p>当前已有质权方用户：</p>
        <br>
        <b>{{pledgeUserNumber}}</b>
        <br>
        <p>人</p>
      </v-card>
    </v-card>
  </v-container>
</template>

<script>
import IStatistics from '../api/IStatistics';
export default {
  data () {
    return {
      normalUserNumber: 0,
      pledgeUserNumber: 0
    };
  },
  mounted () {
    IStatistics.getNormalUserNumber().then(res => {
      if (res.code === 200) {
        this.normalUserNumber = res.data;
      } else {
        console.log('获取失败……');
      }
      console.log(this.normalUserNumber);
    });
    IStatistics.getPledgeUserNumber().then(res => {
      if (res.code === 200) {
        this.pledgeUserNumber = res.data;
      } else {
        console.log('获取失败……');
      }
      console.log(this.pledgeUserNumber);
    });
  }
};
</script>

<style lang="scss" scoped>
.user-box{
  @include allCenter;
  min-height: $comInfoListHeight;
  >.normal-box{
    @include allCenter;
    height: $comInfoListHeight;
    width: 40%;
  }
  >.pledge-box{
    @include allCenter;
    height: $comInfoListHeight;
    width: 40%;
  }
}
</style>

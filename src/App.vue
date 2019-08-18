<template>
  <v-app>
    <v-content>
      <!-- 侧边栏 -->
      <v-navigation-drawer
        id="navigator"
        mobile-break-point="960"
        width="260"
        app
        dark
        fixed
        floating
      >
        <div class="navigator-bg"></div>
        <v-list-item class="navigator-top-container">
          <v-list-item-avatar size="55px">
            <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1566056260480&di=e2d40fa70fea3c96bf76c0da92ed7ca9&imgtype=0&src=http%3A%2F%2Fwx1.sinaimg.cn%2Forj360%2F006TKNNEgy1g05bvn7nrgj30m80m849o.jpg">
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title>hxw3274743</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-divider class="navigator-divider"/>
        <v-list>
          <v-list-item-group id="navigatorGroup" v-model="navigatorActive" mandatory>
            <v-list-item
              v-for="(item, i) of navigatorList"
              :key="i"
              @click="navigatorTo(item.to)"
            >
              <v-list-item-icon>
                <v-icon>mdi-{{ item.icon }}</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                  <v-list-item-title>{{ item.name }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </v-list>
        <v-btn
          id="logOut"
          color="blue lighten-3"
          :elevation="4"
          @click="logout()"
          rounded
          outlined
        >登出</v-btn>
      </v-navigation-drawer>
      <!-- 主内容模块 -->
      <!-- 只能用 style 覆盖模板样式 -->
      <v-content style="padding: 0;">
        <router-view></router-view>
      </v-content>
    </v-content>
  </v-app>
</template>

<script>
export default {
  data () {
    return {
      navigatorList: [
        {
          name: '统计数据',
          icon: 'equalizer',
          to: 'statistics'
        },
        {
          name: '公司信息',
          icon: 'home-city',
          to: 'company-info'
        },
        {
          name: '申请处理',
          icon: 'checkbox-marked',
          to: 'request-handle'
        }
      ],
      navigatorActive: 0 // 处于激活状态的导航的索引
    };
  },
  methods: {
    navigatorTo (to) {
      let p = this.$router.push({ path: to });
      p.catch(e => {
        // 捕获重复路由的异常，不打印到控制台(暂时没有别的方法解决)
      });
    },
    logout () {
      alert('登出成功!');
    }
  }
};
</script>

<style lang="scss" scoped>
.navigator-top-container {
  margin: $navigatorAvatarSpace 0;
}
.navigator-divider {
  margin: 0 $navigatorDividerSpace;
}
.navigator-bg {
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: -1;
  background-image: linear-gradient(rgba(27, 27, 27, 0.74), rgba(27, 27, 27, 0.74)), url("./assets/images/bg-navigator.jpg");
  background-position: center center;
  background-size: cover;
}
#navigatorGroup {
  >div {
    margin-top: $navigatorItemMarginTop;
  }
}
#logOut {
  // 被迫使用 absolute 实现底部固定
  width: 100px;
  position: absolute;
  left: ($navigatorWidth - $logOutWidth) / 2;
  bottom: $logOutMarginBtm;
}
</style>

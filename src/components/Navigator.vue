<template>
  <v-navigation-drawer
    id="navigator"
    v-model="navigatorShow"
    mobile-break-point="1025"
    width="260"
    app
    dark
    floating
    persistent
  >
    <!-- 背景图片 -->
    <v-img
      src="../assets/images/bg-navigator.jpg"
      :gradient="navigatorGradient"
      height="100%"
    >
      <!-- 头像&用户名 -->
      <v-list-item class="navigator-top-container">
        <v-list-item-avatar size="55px">
          <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1568468973789&di=4492ab063cb9465937fc2da2da210867&imgtype=0&src=http%3A%2F%2Fbpic.588ku.com%2Felement_origin_min_pic%2F17%2F07%2F05%2F247f529bb1bf688b9d8dc21149f449e0.jpg">
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title>Admin</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-divider class="navigator-divider"/>
      <!-- 导航列表 -->
      <v-list>
        <v-list-item-group id="navigatorGroup" v-model="navigatorActive" mandatory>
          <v-list-item
            v-for="(item, i) of navigatorList"
            :key="i"
            @click="navigatorTo(item.to, item.name)"
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
      <!-- 登出按钮 -->
      <v-btn
        id="logOut"
        color="blue lighten-3"
        :elevation="4"
        @click="logout()"
        rounded
        outlined
      >登出</v-btn>
    </v-img>
  </v-navigation-drawer>
</template>

<script>
import { mapMutations } from 'vuex';

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
      navigatorActive: 0, // 处于激活状态的导航的索引
      navigatorGradient: 'rgba(27, 27, 27, 0.7), rgba(27, 27, 27, 0.7)' // 导航栏背景图片的渐变效果
    };
  },
  computed: {
    navigatorShow: {
      get () {
        return this.$store.state.navigatorShow;
      },
      set (val) {
        this.setNavigatorShow(val);
      }
    }
  },
  mounted () {
    this.keepNavigator();
    this.keepTopBarTitle();
  },
  methods: {
    ...mapMutations([
      'setTopBarTitle',
      'setNavigatorShow'
    ]),
    navigatorTo (to, name) {
      this.setTopBarTitle(name);
      let p = this.$router.push({ path: to });
      p.catch(e => {
        // 捕获重复路由的异常，不打印到控制台
        // TODO: 暂时没有别的方法解决
      });
    },
    logout () {
      // TODO:删除Cookies
      this.$router.push('/login');
    },
    // 防止刷新后丢失当前激活的导航状态
    keepNavigator () {
      let cur = 0;
      for (let i = 0; i < this.navigatorList.length; i++) {
        if (this.$route.path.split('/')[2] === this.navigatorList[i].to) {
          cur = i;
          break;
        }
      }
      this.navigatorActive = cur;
    },
    // 防止刷新后丢失当前的顶部栏标题
    keepTopBarTitle () {
      let cur = '';
      // TODO: 暂时使用 switch
      switch (this.$route.path.split('/')[2]) {
        case 'statistics':
          cur = '统计数据';
          break;
        case 'company-info':
          cur = '公司信息';
          break;
        case 'request-handle':
          cur = '申请处理';
          break;
      }
      this.setTopBarTitle(cur);
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
#navigatorGroup {
  >div {
    margin-top: $navigatorItemMarginTop;
  }
}
#logOut {
  // 被迫使用 absolute 实现底部固定
  width: $logOutWidth;
  position: absolute;
  left: ($navigatorWidth - $logOutWidth) / 2;
  bottom: $logOutMarginBtm;
}
</style>

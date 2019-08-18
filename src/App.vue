<template>
  <v-app>
    <!-- 顶部栏 -->
    <v-app-bar app>
      <v-toolbar-title>管理员操作系统</v-toolbar-title>
      <v-spacer></v-spacer>
      <!-- 头像 -->
      <v-avatar>
        <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1566056260480&di=e2d40fa70fea3c96bf76c0da92ed7ca9&imgtype=0&src=http%3A%2F%2Fwx1.sinaimg.cn%2Forj360%2F006TKNNEgy1g05bvn7nrgj30m80m849o.jpg">
      </v-avatar>
      <!-- 下拉菜单 -->
      <v-menu offset-y>
        <template v-slot:activator="{ on }">
          <v-icon v-on="on">mdi-dots-vertical</v-icon>
        </template>
        <v-list>
          <v-list-item
            v-for="(item, i) of operateList"
            :key="i"
            @click="item.onClick"
          >
            <v-list-item-title class="list-item-operate-menu">{{ item.name }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>
    <v-content>
      <!-- 侧边栏 -->
      <v-navigation-drawer permanent absolute>
        <v-list>
          <v-list-item-group v-model="navigatorActive" color="primary" mandatory>
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
      </v-navigation-drawer>
      <!-- 主内容模块 -->
      <!-- 只能用 style 覆盖模板样式 -->
      <v-content style="padding: 0 0 0 256px;">
        <router-view></router-view>
      </v-content>
    </v-content>
  </v-app>
</template>

<script>
export default {
  data () {
    return {
      operateList: [
        {
          name: '操作1',
          onClick: ''
        },
        {
          name: '操作2',
          onClick: ''
        },
        {
          name: '登出',
          onClick: ''
        }
      ],
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
    }
  }
};
</script>

<style lang="scss" scoped>
.list-item-operate-menu {
  width: $adminOperateMenuWidth;
  text-align: center;
}
</style>

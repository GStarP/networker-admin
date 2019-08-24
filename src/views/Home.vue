<template>
  <v-app>
    <!-- 顶部栏 -->
    <ad-top-bar></ad-top-bar>
    <!-- 导航栏 -->
    <ad-navigator></ad-navigator>
    <!-- 主内容模块 -->
    <v-content>
      <div id="mainContainer">
        <v-fade-transition mode="out-in">
          <router-view />
        </v-fade-transition>
      </div>
    </v-content>
  </v-app>
</template>

<script>
export default {
  components: {
    'ad-navigator': () => import('../components/Navigator'),
    'ad-top-bar': () => import('../components/TopBar')
  }
};
</script>

<style lang="scss" scoped>
#mainContainer {
  padding-bottom: $mainContainerMarginBtm;
  background-color: $topBarBGColor;
  min-height: 100%;
}
</style>

<template>
  <v-app-bar
    id="topBar"
    :class="{ 'beside-navigator': navigatorShow }"
    flat
  >
    <!-- 页面标题 -->
    <v-toolbar-title>
      <!-- 用于在导航栏由于屏幕宽度被收起时将其展开 的按钮 -->
      <v-btn
        id="showNaviBtn"
        v-if="navigatorMini"
        @click.stop="showNavigator"
        icon
      >
        <v-icon>mdi-view-list</v-icon>
      </v-btn>
      {{ topBarTitle }}
    </v-toolbar-title>
  </v-app-bar>
</template>

<script>
import { mapState, mapMutations } from 'vuex';

export default {
  data () {
    return {
      navigatorMini: false // 导航栏是否被收起(宽度小于 break-point)
    };
  },
  computed: {
    ...mapState(['navigatorShow', 'topBarTitle'])
  },
  mounted () {
    this.onWidthChange();
    window.addEventListener('resize', this.onWidthChange);
  },
  beforeDestroy () {
    window.removeEventListener('resize', this.onWidthChange);
  },
  methods: {
    ...mapMutations(['toggleNavigatorShow']),
    onWidthChange () {
      if (window.innerWidth <= 960) {
        this.navigatorMini = true;
      } else {
        this.navigatorMini = false;
      }
    },
    // 在导航栏被收起的情况下将其展开
    showNavigator () {
      this.toggleNavigatorShow();
    }
  }
};
</script>

<style lang="scss" scoped>
.v-toolbar {
  flex: 0; // 覆盖原有样式
  min-height: $topBarMinHeight;
  padding-bottom: $topBarPaddingBtm;
}
#topBar {
  background-color: $topBarBGColor;
}
.beside-navigator {
  padding-left: $navigatorWidth;
}
</style>

<template>
  <v-app-bar
    id="topBar"
    flat
  >
    <v-toolbar-title>{{ topBarTitle }}</v-toolbar-title>
  </v-app-bar>
</template>

<script>
import { mapState } from 'vuex';

export default {
  computed: {
    ...mapState(['topBarTitle'])
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
  margin-left: $navigatorWidth;
  background-color: $topBarBGColor;
}
</style>

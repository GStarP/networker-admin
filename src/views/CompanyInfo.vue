<template>
  <v-container fluid>
    <v-layout justify-center wrap>
      <!-- 适配不同尺寸的设备 -->
      <v-flex xs12 sm10 md10 lg8>
        <!-- 搜索框 -->
        <v-text-field
          id="search-company-info"
          label="搜索..."
          append-icon="mdi-magnify"
          v-model="keyword"
          @click:append="search"
          solo
          rounded
          clearable
          autofocus
        ></v-text-field>
      </v-flex>
      <v-flex xs12 sm12 md10 lg10>
        <v-card class="card-company-info">
          <!-- 公司信息未获取完毕时的进度条 -->
          <v-progress-circular
            class="loading-company-info"
            v-if="compInfoLoading"
            color="primary"
            :size="60"
            indeterminate
          ></v-progress-circular>
          <!-- TODO: 公司信息列表 -->
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapState, mapMutations } from 'vuex';

export default {
  data () {
    return {
      keyword: '' // 搜索关键词
    };
  },
  computed: {
    ...mapState(['compInfoLoading'])
  },
  methods: {
    ...mapMutations(['toggleCompInfoLoading']),
    search () {
      // TODO
      alert(this.keyword);
    }
  }
};
</script>

<style lang="scss" scoped>
.card-company-info {
  min-height: $comInfoCardHeight;
}
.loading-company-info {
  @include absoluteCenter;
  margin-top: - $comInfoLoadingRadius;
  margin-left: - $comInfoLoadingRadius;
}
</style>

<template>
  <v-container fluid>
    <v-layout justify-center wrap>
      <v-flex xs12 md8>
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
      <v-flex xs12 md10>
        <v-card class="card-company-info">
          <v-progress-circular
            class="loading-company-info"
            v-if="compInfoLoading"
            color="primary"
            :size="60"
            indeterminate
          ></v-progress-circular>
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
  height: $comInfoCardHeight;
}
.loading-company-info {
  @include absoluteCenter;
  margin-top: - $comInfoLoadingRadius;
  margin-left: - $comInfoLoadingRadius;
}
</style>

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
          <!-- 公司信息列表 -->
          <v-list>
            <template
              v-for="(item, i) of companyInfoList"
            >
              <v-list-item
                class="company-info-item"
                :key="item.id"
              >

              </v-list-item>
              <v-divider :key="`divider-${i}`" v-if="i != (companyInfoList.length - 1)"></v-divider>
            </template>
          </v-list>
          <!-- 分页 -->
          <!-- 用一个 div 包裹防止其无视边距的限制而不适配手机端 -->
          <div class="company-info-pagination-container">
            <v-pagination
              v-if="showPagination"
              v-model="pageNum"
              :length="totalPages"
              :total-visible="totalPages"
              @input="fetchCompanyInfoPage()"
          ></v-pagination>
          </div>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
import { requirePagination } from '../utils/common';
import ICompanyInfo from '../api/ICompanyInfo';

export default {
  data () {
    return {
      pageNum: 1, // 当前页码
      pageSize: 5, // 页大小
      totalPages: 20, // 总页数
      keyword: '', // 搜索关键词
      // 当前页的公司信息列表
      companyInfoList: undefined
    };
  },
  computed: {
    ...mapState(['compInfoLoading']),
    // 是否需要显示分页
    showPagination () {
      return requirePagination(this.companyInfoList, this.pageSize, this.totalPages);
    }
  },
  mounted () {
    this.fetchCompanyInfoPage();
  },
  methods: {
    ...mapMutations(['setCompInfoLoading']),
    search () {
      // TODO
      alert(this.keyword);
    },
    // 请求并渲染分页后的公司信息
    fetchCompanyInfoPage () {
      window.scrollTo(0, 0);
      this.setCompInfoLoading(true);
      ICompanyInfo.getCompanyInfoList(this.pageNum, this.pageSize).then((res) => {
        if (res.code === 200) {
          this.totalPages = res.data.totalPages;
          this.companyInfoList = res.data.companyInfoList;
        } else {
          alert(res.msg);
        }
        this.setCompInfoLoading(false);
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.card-company-info {
  padding: $comInfoListPadding;
  min-height: $comInfoListHeight;
}
.company-info-item {
  min-height: $comInfoItemMinHeight;
}
.company-info-pagination-container {
  margin: 0;
}
.loading-company-info {
  @include absoluteCenter;
  margin-top: - $comInfoLoadingRadius;
  margin-left: - $comInfoLoadingRadius;
}
</style>

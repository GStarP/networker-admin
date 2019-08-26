<template>
  <v-container fluid>
    <v-layout justify-center wrap>
      <!-- 适配不同尺寸的设备 -->
      <v-flex xs12 sm12 md10 lg9>
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
      <v-flex xs12 sm12 md12 lg11>
        <v-card class="card-company-info">
          <!-- 公司信息未获取完毕时的进度条 -->
          <div
            class="loading-company-info"
            v-if="compInfoLoading"
          >
            <v-progress-circular
              color="primary"
              :size="60"
              indeterminate
            ></v-progress-circular>
            <div class="loading-text mt-2">加载中...</div>
          </div>
          <!-- 公司信息列表 -->
          <v-list>
            <template
              v-for="(item, i) of companyInfoList"
            >
              <!-- TODO: 手机端的适配 -->
              <v-list-item
                class="company-info-item-pc"
                :key="item.id"
              >
                <div class="company-identity">
                  <div class="company-name">{{ item.name }}</div>
                  <div class="company-symbol">{{ item.symbol }}</div>
                </div>
                <div class="company-attrs">
                  <div class="company-amount">
                    <div class="company-attr-name">成交额(亿)</div>
                    <div>{{ item.amount }}</div>
                  </div>
                  <div class="company-amplitude">
                    <div class="company-attr-name">振幅(%)</div>
                    <div>{{ item.amplitude }}</div>
                  </div>
                  <div class="company-change">
                    <div class="company-attr-name">涨跌额</div>
                    <div>{{ item.change }}</div>
                  </div>
                  <div class="company-close">
                    <div class="company-attr-name">收盘价</div>
                    <div>{{ item.close }}</div>
                  </div>
                  <div class="highest">
                    <div class="company-attr-name">最高价</div>
                    <div>{{ item.highest }}</div>
                  </div>
                  <div class="company-list_age">
                    <div class="company-attr-name">市龄</div>
                    <div>{{ item.list_age }}</div>
                  </div>
                  <div class="company-lowest">
                    <div class="company-attr-name">最低价</div>
                    <div>{{ item.lowest }}</div>
                  </div>
                  <div class="company-open">
                    <div class="company-attr-name">开盘价</div>
                    <div>{{ item.open }}</div>
                  </div>
                  <div class="company-pb">
                    <div class="company-attr-name">市净率</div>
                    <div>{{ item.pb }}</div>
                  </div>
                  <div class="company-pct_chg">
                    <div class="company-attr-name">涨跌幅(%)</div>
                    <div>{{ item.pct_chg }}</div>
                  </div>
                  <div class="company-pe">
                    <div class="company-attr-name">市盈率</div>
                    <div>{{ item.pe }}</div>
                  </div>
                  <div class="company-pre_close">
                    <div class="company-attr-name">昨日收盘价</div>
                    <div>{{ item.pre_close }}</div>
                  </div>
                  <div class="company-turnover_rate">
                    <div class="company-attr-name">换手率(%)</div>
                    <div>{{ item.turnover_rate }}</div>
                  </div>
                  <div class="company-vol">
                    <div class="company-attr-name">成交量(万)</div>
                    <div>{{ item.vol }}</div>
                  </div>
                </div>
                <div class="company-action">
                  <v-icon @click="editCompanyInfo()" large>mdi-pencil-box</v-icon>
                  <v-icon class="ml-2" @click="deleteCompanyInfo()" large>mdi-delete</v-icon>
                </div>
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
      companyInfoList: undefined, // 当前页的公司信息列表
      curCompanyInfo: undefined // 当前正在操作的公司信息
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
      this.companyInfoList = undefined;
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
    },
    // TODO: 编辑公司信息
    editCompanyInfo () {

    },
    // TODO: 删除公司信息
    deleteCompanyInfo () {

    }
  }
};
</script>

<style lang="scss" scoped>
.card-company-info {
  padding: 0 $comInfoListPadding $comInfoListPadding $comInfoListPadding;
  min-height: $comInfoListHeight;
}
.company-info-item-pc {
  min-height: $comInfoItemMinHeight;
  @include flexRow;
  &:hover {
    background-color: #EEE;
  }
  .company-identity {
    @include allCenter;
    flex-direction: column;
    .company-name {
      font-size: 18px;
      font-weight: bold;
    }
    .company-symbol {
      font-size: 16px;
      color: #666;
    }
  }
  .company-attrs {
    @include allCenter;
    flex-direction: column;
    flex-wrap: wrap;
    height: 120px;
    flex: 1;
    margin-bottom: 10px;
    >div {
      @include allCenter;
      flex-direction: column;
      height: 45px;
      margin-top: 10px;
      .company-attr-name {
        font-size: 12px;
        color: #888;
      }
    }
  }
  .company-action {
    >i {
      color: #888;
      &:hover {
        color: #444;
      }
    }
  }
}
.company-info-pagination-container {
  margin: 0;
}
.loading-company-info {
  @include absoluteCenter;
  margin-top: - $comInfoLoadingRadius;
  margin-left: - $comInfoLoadingRadius;
  .loading-text {
    color: #1976D2; // primary
  }
}
</style>

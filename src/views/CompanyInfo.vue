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
                :class="{ 'company-info-item-pc': !isPhone, 'company-info-item-phone': isPhone }"
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
                  <v-icon :class="{ 'ml-2': !isPhone }" @click="deleteCompanyInfo(item.id)" large>mdi-delete</v-icon>
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
    <!-- 确认操作的弹窗 -->
    <v-dialog
      v-model="dialogShow"
      max-width="280"
      persistent
    >
      <v-card>
        <v-card-title>提示</v-card-title>
        <v-card-text class="action-dialog-text">
          确定要 <b>删除</b> 这条信息吗？<br/>操作一经确认无法撤销！
        </v-card-text>
        <v-card-actions>
          <div class="flex-grow-1"></div>
          <v-btn
            color="green"
            @click="submitDelete()"
            text
          >
            <b>确认</b>
          </v-btn>
          <v-btn
            color="error"
            @click="dialogShow = false"
            text
          >
            <b>取消</b>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!-- 顶部居中的提示框 -->
    <v-snackbar
      v-model="snackbarShow"
      :color="snackBarColor"
      :timeout="2000"
      top
    >
      <v-icon color="white" class="mr-3">{{ snackbarIcon }}</v-icon>
      <div>{{ snackBarText }}</div>
      <v-icon @click="snackbarShow = false">mdi-close-circle</v-icon>
    </v-snackbar>
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
      curCompanyInfo: undefined, // 当前正在操作的公司信息
      isPhone: false, // 是否正在手机上运行
      dialogShow: false, // 是否显示提示框
      snackbarShow: false, // 是否显示提示框
      snackbarIcon: undefined, // 提示框中图标
      snackBarText: undefined, // 提示框中文字
      snackBarColor: undefined // 提示框主题颜色
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
    // 先根据屏幕宽度判断设备类型
    this.onWidthChange();
    window.addEventListener('resize', this.onWidthChange);
    // 获取分页数据
    this.fetchCompanyInfoPage();
  },
  beforeDestroy () {
    window.removeEventListener('resize', this.onWidthChange);
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
    deleteCompanyInfo (id) {
      this.curCompanyInfo = id;
      this.dialogShow = true;
    },
    submitDelete () {
      this.dialogShow = false;
      let id = this.curCompanyInfo;
      ICompanyInfo.deleteCompanyInfo(id).then((res) => {
        if (res.code === 200) {
          this.showSuccessSnackbar('删除成功！');
        } else {
          this.showErrorSnackbar('删除失败！');
        }
      });
    },
    // 根据宽度判断设备是否为手机
    onWidthChange () {
      if (window.innerWidth <= 500) {
        this.isPhone = true;
      } else {
        this.isPhone = false;
      }
    },
    /**
     * @author hxw
     * @des 展示指定样式的提示
     * @param {string} icon 'mdi-xxx'
     * @param {string} text 'hxwnb'
     * @param {string} color 'success'
     */
    showSnackbar (icon, text, color) {
      this.snackbarIcon = icon;
      this.snackBarText = text;
      this.snackBarColor = color;
      this.snackbarShow = true;
    },
    showSuccessSnackbar (text) {
      this.showSnackbar('mdi-checkbox-marked-circle', text, 'success');
    },
    showErrorSnackbar (text) {
      this.showSnackbar('mdi-alert', text, 'error');
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
      font-size: $comNameSize;
      font-weight: bold;
    }
    .company-symbol {
      font-size: $comSymbolSize;
      color: $grey-6;
    }
  }
  .company-attrs {
    @include allCenter;
    flex-direction: column;
    flex-wrap: wrap;
    height: $comInfoItemMinHeight;
    flex: 1;
    margin-bottom: $comAttrMarginVertical;
    >div {
      @include allCenter;
      flex-direction: column;
      height: $comAttrHeight;
      margin-top: $comAttrMarginVertical;
      .company-attr-name {
        font-size: $comAttrSize;
        color: $grey-8;
      }
    }
  }
  .company-action {
    >i {
      color: $grey-8;
      &:hover {
        color: $grey-3;
      }
    }
  }
}
.company-info-item-phone {
  @include allCenter;
  flex-direction: column;
  margin: $comAttrMarginVertical 0;
  &:hover {
    background-color: #EEE;
  }
  .company-identity {
    @include allCenter;
    flex-direction: column;
    width: 100%;
    .company-name {
      font-size: $comNameSize;
      font-weight: bold;
    }
    .company-symbol {
      font-size: $comSymbolSize;
      color: $grey-6;
    }
  }
  .company-attrs {
    @include allCenter;
    flex-direction: row;
    flex-wrap: wrap;
    width: 100%;
    >div {
      @include allCenter;
      flex-direction: column;
      height: $comAttrHeight;
      width: 25%;
      margin-top: $comAttrMarginVertical;
      .company-attr-name {
        font-size: $comAttrSize;
        color: $grey-8;
      }
    }
  }
  .company-action {
    margin-top: $comAttrMarginVertical * 2;
    width: 100%;
    @include flexRow;
    justify-content: space-evenly;
    >i {
      color: $grey-8;
      &:hover {
        color: $grey-3;
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
    color: $primary-blue; // primary
  }
}
</style>

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
          <!-- 公司信息为空时的提示文字 -->
          <div class="company-info-none" v-if="showNoneInfoTxt">暂无公司信息</div>
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
                  <div class="company-name">{{ item.market.name }}</div>
                  <div class="company-symbol">{{ item.ts_code }}</div>
                </div>
                <div class="company-attrs">
                  <div class="company-amount">
                    <div class="company-attr-name">成交额(亿)</div>
                    <div>{{ item.market.amount }}</div>
                  </div>
                  <div class="company-amplitude">
                    <div class="company-attr-name">振幅(%)</div>
                    <div>{{ item.market.amplitude }}</div>
                  </div>
                  <div class="company-change">
                    <div class="company-attr-name">涨跌额</div>
                    <div>{{ item.market.change }}</div>
                  </div>
                  <div class="company-close">
                    <div class="company-attr-name">收盘价</div>
                    <div>{{ item.market.close }}</div>
                  </div>
                  <div class="highest">
                    <div class="company-attr-name">最高价</div>
                    <div>{{ item.market.highest }}</div>
                  </div>
                  <div class="company-list_age">
                    <div class="company-attr-name">市龄</div>
                    <div>{{ item.market.list_age }}</div>
                  </div>
                  <div class="company-lowest">
                    <div class="company-attr-name">最低价</div>
                    <div>{{ item.market.lowest }}</div>
                  </div>
                  <div class="company-open">
                    <div class="company-attr-name">开盘价</div>
                    <div>{{ item.market.open }}</div>
                  </div>
                  <div class="company-pb">
                    <div class="company-attr-name">市净率</div>
                    <div>{{ item.market.pb }}</div>
                  </div>
                  <div class="company-pct_chg">
                    <div class="company-attr-name">涨跌幅(%)</div>
                    <div>{{ item.market.pct_chg }}</div>
                  </div>
                  <div class="company-pe">
                    <div class="company-attr-name">市盈率</div>
                    <div>{{ item.market.pe }}</div>
                  </div>
                  <div class="company-pre_close">
                    <div class="company-attr-name">昨日收盘价</div>
                    <div>{{ item.market.pre_close }}</div>
                  </div>
                  <div class="company-turnover_rate">
                    <div class="company-attr-name">换手率(%)</div>
                    <div>{{ item.market.turnover_rate }}</div>
                  </div>
                  <div class="company-vol">
                    <div class="company-attr-name">成交量(万)</div>
                    <div>{{ item.market.vol }}</div>
                  </div>
                </div>
                <div class="company-action">
                  <v-icon @click="editCompanyInfo(item)" large>mdi-pencil-box</v-icon>
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
              @input="swiftPage()"
          ></v-pagination>
          </div>
        </v-card>
      </v-flex>
    </v-layout>
    <!-- 修改信息的弹窗 -->
    <v-dialog
      v-model="editDialogShow"
      max-width="80%"
      persistent
    >
      <v-card>
        <v-card-title>修改信息</v-card-title>
        <v-form
          id="companyInfoForm"
          ref="comInfoForm"
          v-model="valid"
        >
          <v-text-field
            v-model="curCompanyInfo.market.name"
            :class="{ 'company-info-textfield-pc': !isPhone }"
            :rules="comInfoRules.name"
            label="名称"
          ></v-text-field>
          <v-text-field
            v-model="curCompanyInfo.ts_code"
            :class="{ 'company-info-textfield-pc': !isPhone }"
            :rules="comInfoRules.symbol"
            label="代码">
          </v-text-field>
          <v-text-field
            v-model="curCompanyInfo.market.amount"
            :class="{ 'company-info-textfield-pc': !isPhone }"
            :rules="comInfoRules.amount"
            label="成交额(亿)"
          ></v-text-field>
          <v-text-field
            v-model="curCompanyInfo.market.amplitude"
            :class="{ 'company-info-textfield-pc': !isPhone }"
            :rules="comInfoRules.amplitude"
            label="振幅(%)"
          ></v-text-field>
          <v-text-field
            v-model="curCompanyInfo.market.change"
            :class="{ 'company-info-textfield-pc': !isPhone }"
            :rules="comInfoRules.change"
            label="涨跌额"
          ></v-text-field>
          <v-text-field
            v-model="curCompanyInfo.market.close"
            :class="{ 'company-info-textfield-pc': !isPhone }"
            :rules="comInfoRules.close"
            label="收盘价"
          ></v-text-field>
          <v-text-field
            v-model="curCompanyInfo.market.highest"
            :class="{ 'company-info-textfield-pc': !isPhone }"
            :rules="comInfoRules.highest"
            label="最高价"
          ></v-text-field>
          <v-text-field
            v-model="curCompanyInfo.market.list_age"
            :class="{ 'company-info-textfield-pc': !isPhone }"
            :rules="comInfoRules.list_age"
            label="市龄"
          ></v-text-field>
          <v-text-field
            v-model="curCompanyInfo.market.lowest"
            :class="{ 'company-info-textfield-pc': !isPhone }"
            :rules="comInfoRules.lowest"
            label="最低价"
          ></v-text-field>
          <v-text-field
            v-model="curCompanyInfo.market.open"
            :class="{ 'company-info-textfield-pc': !isPhone }"
            :rules="comInfoRules.open"
            label="开盘价"
          ></v-text-field>
          <v-text-field
            v-model="curCompanyInfo.market.pb"
            :class="{ 'company-info-textfield-pc': !isPhone }"
            :rules="comInfoRules.pb"
            label="市净率"
          ></v-text-field>
          <v-text-field
            v-model="curCompanyInfo.market.pct_chg"
            :class="{ 'company-info-textfield-pc': !isPhone }"
            :rules="comInfoRules.pct_chg"
            label="涨跌幅(%)"
          ></v-text-field>
          <v-text-field
            v-model="curCompanyInfo.market.pe"
            :class="{ 'company-info-textfield-pc': !isPhone }"
            :rules="comInfoRules.pe"
            label="市盈率"
          ></v-text-field>
          <v-text-field
            v-model="curCompanyInfo.market.pre_close"
            :class="{ 'company-info-textfield-pc': !isPhone }"
            :rules="comInfoRules.pre_close"
            label="昨日收盘价"
          ></v-text-field>
          <v-text-field
            v-model="curCompanyInfo.market.turnover_rate"
            :class="{ 'company-info-textfield-pc': !isPhone }"
            :rules="comInfoRules.turnover_rate"
            label="换手率(%)"
          ></v-text-field>
          <v-text-field
            v-model="curCompanyInfo.market.vol"
            :class="{ 'company-info-textfield-pc': !isPhone }"
            :rules="comInfoRules.vol"
            label="成交量(万)"
          ></v-text-field>
        </v-form>
        <div class="edit-btn-container">
          <v-btn
            color="success"
            :elevation="2"
            :disabled="!valid"
            @click="submitEdit()"
          >
            提交
          </v-btn>
          <v-btn
            color="warning"
            :elevation="2"
            @click="$refs.comInfoForm.reset()"
          >
            清空
          </v-btn>
          <v-btn
            color="error"
            :elevation="2"
            @click="editDialogShow = false"
          >
            取消
          </v-btn>
        </div>
      </v-card>
    </v-dialog>
    <!-- 确认删除的弹窗 -->
    <v-dialog
      v-model="delDialogShow"
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
            class="tip-btn"
            color="green"
            @click="submitDelete()"
            text
          >
            确认
          </v-btn>
          <v-btn
            class="tip-btn"
            color="error"
            @click="delDialogShow = false"
            text
          >
            取消
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
      // 当前正在修改的公司信息
      curCompanyInfo: {
        id: 0,
        ts_code: '',
        market: {
          amount: 0,
          amplitude: 0,
          change: 0,
          close: 0,
          highest: 0,
          list_age: 0,
          lowest: 0,
          name: '',
          open: 0,
          pb: 0,
          pct_chg: 0,
          pe: 0,
          pre_close: 0,
          turnover_rate: 0,
          vol: 0
        }
      },
      // 修改公司信息表单的验证规则
      comInfoRules: {
        amount: [
          v => !!v || '此项不能为空'
        ],
        amplitude: [
          v => !!v || '此项不能为空'
        ],
        change: [
          v => !!v || '此项不能为空'
        ],
        close: [
          v => !!v || '此项不能为空'
        ],
        highest: [
          v => !!v || '此项不能为空'
        ],
        list_age: [
          v => !!v || '此项不能为空'
        ],
        lowest: [
          v => !!v || '此项不能为空'
        ],
        name: [
          v => !!v || '此项不能为空',
          v => (v && v.length <= 10) || '不能超过10位'
        ],
        open: [
          v => !!v || '此项不能为空'
        ],
        pb: [
          v => !!v || '此项不能为空'
        ],
        pct_chg: [
          v => !!v || '此项不能为空'
        ],
        pe: [
          v => !!v || '此项不能为空'
        ],
        pre_close: [
          v => !!v || '此项不能为空'
        ],
        symbol: [
          v => !!v || '此项不能为空',
          v => (v && v.length <= 10) || '不能超过10位'
        ],
        turnover_rate: [
          v => !!v || '此项不能为空'
        ],
        vol: [
          v => !!v || '此项不能为空'
        ]
      },
      valid: false, // 修改公司信息表单是否合格
      delCompanyInfoId: undefined, // 当前正在删除的公司信息id
      isPhone: false, // 是否正在手机上运行
      editDialogShow: false, // 是否显示编辑信息提示
      delDialogShow: false, // 是否显示删除信息提示
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
    },
    // 是否显示暂无公司信息的文字
    showNoneInfoTxt () {
      return (!this.companyInfoList || this.companyInfoList.length === 0) && (!this.compInfoLoading);
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
    // 换页: 根据 keyword 判断是否需要进行搜索
    swiftPage () {
      this.companyInfoList = undefined;
      window.scrollTo(0, 0);
      this.setCompInfoLoading(true);
      if (!this.keyword || this.keyword === '') {
        this.fetchCompanyInfoPage();
      } else {
        this.search();
      }
    },
    // 搜索公司信息
    search () {
      ICompanyInfo.getSearchInfoList(this.keyword, this.pageNum, this.pageSize).then(res => {
        if (res.code === 200) {
          // TODO:this.totalPages = res.data.totalPages;
          this.companyInfoList = res.data;
        } else {
          this.showErrorSnackbar('获取公司信息失败！');
        }
        this.setCompInfoLoading(false);
      });
    },
    // 请求并渲染分页后的公司信息
    fetchCompanyInfoPage () {
      ICompanyInfo.IgetCompanyInfoList(this.pageNum, this.pageSize).then((res) => {
        if (res.code === 200) {
          // TODO:this.totalPages = res.data.totalPages;
          this.companyInfoList = res.data;
        } else {
          this.showErrorSnackbar('获取公司信息失败！');
        }
        this.setCompInfoLoading(false);
      });
    },
    // 请求编辑公司信息
    editCompanyInfo (infoItem) {
      // 不使用深拷贝的话会在编辑时影响列表中的信息
      this.curCompanyInfo = JSON.parse(JSON.stringify(infoItem));
      this.editDialogShow = true;
    },
    // 提交修改后的公司信息
    submitEdit () {
      this.editDialogShow = false;
      alert(JSON.stringify(this.curCompanyInfo));
      ICompanyInfo.editCompanyInfo(this.curCompanyInfo).then((res) => {
        if (res.code === 200) {
          this.showSuccessSnackbar('修改成功！');
        } else {
          this.showErrorSnackbar('修改失败！');
        }
      });
      this.swiftPage(); // 刷新信息列表
    },
    // 请求删除公司信息
    deleteCompanyInfo (id) {
      this.delCompanyInfoId = id;
      this.delDialogShow = true;
    },
    // 确认删除公司信息
    submitDelete () {
      this.delDialogShow = false;
      ICompanyInfo.deleteCompanyInfo(this.delCompanyInfoId).then((res) => {
        if (res.code === 200) {
          this.showSuccessSnackbar('删除成功！');
        } else {
          this.showErrorSnackbar('删除失败！');
        }
      });
      this.swiftPage();
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
  .company-info-none {
    width: 100%;
    height: 100px;
    position: absolute;
    top: 50%;
    margin-top: -50px;
    line-height: 100px;
    text-align: center;
    color: $grey-8;
    font-size: 36px;
  }
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
#companyInfoForm {
  margin: 0 $comInfoFormMargin $comInfoFormMargin $comInfoFormMargin;
  @include flexRow;
}
.company-info-textfield-pc {
  width: $comInfoTextFieldWidth;
  margin-left: $comInfoTextFieldMargin;
}
.edit-btn-container {
  display: flex;
  flex-direction: row-reverse;
  padding: 0 $comInfoFormMargin $comInfoFormMargin 0;
  >button {
    width: $editComInfoBtnWidth;
    &:not(:first-child) {
      margin-right: $editComInfoBtnMargin;
    }
  }
}
</style>

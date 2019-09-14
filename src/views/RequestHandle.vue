<template>
  <v-container justify-center>
    <v-card class="request-list-card">
      <!-- 正常渲染的数据表格 -->
      <v-data-table
        :headers="headers"
        :items="requests"
        :loading="requestsLoading"
        loading-text="申请加载中......"
        no-data-text="暂无申请"
        hide-default-footer
      >
        <!-- TODO: 目前只能傻傻地全写一遍 -->
        <template v-slot:header.bankName="{ header }">
          <span class="request-table-header">{{ header.text }}</span>
        </template>
        <template v-slot:header.swiftCode="{ header }">
          <span class="request-table-header">{{ header.text }}</span>
        </template>
        <template v-slot:header.email="{ header }">
          <span class="request-table-header">{{ header.text }}</span>
        </template>
        <template v-slot:header.imgs="{ header }">
          <span class="request-table-header">{{ header.text }}</span>
        </template>
        <template v-slot:header.action="{ header }">
          <span class="request-table-header">{{ header.text }}</span>
        </template>
        <!-- 自定义的 验证图片 列 -->
        <template v-slot:item.imgs="{ item }">
          <!-- 点击弹出显示图片 -->
          <a @click.stop="showImgs(item.avatar, item.avatar)">点此查看</a>
        </template>
        <!-- 自定义的 申请处理 列 -->
        <template v-slot:item.action="{ item }">
          <v-icon
            class="accept-btn mr-2"
            @click="showConfirm(actionEnum.accept, item.id)"
          >mdi-checkbox-marked</v-icon>
          <v-icon
            class="refuse-btn"
            @click="showConfirm(actionEnum.refuse, item.id)"
          >mdi-close-box</v-icon>
        </template>
      </v-data-table>
      <!-- 分页 -->
      <div class="request-pagination-container">
        <v-pagination
          v-if="showPagination"
          v-model="pageNum"
          :length="totalPages"
          :total-visible="totalPages"
          @input="fetchRequestPage()"
        ></v-pagination>
      </div>
    </v-card>
    <!-- 展示验证图片的弹窗 -->
    <!-- width 和 max-width 写在 style 里没用 -->
    <v-dialog
      v-model="imgDialogShow"
      width="80%"
      max-width="960"
    >
      <v-card>
        <v-container class="imgs-container">
          <v-card
            v-for="(item, i) of imgs"
            :key="i"
            class="img-card"
            flat
          >
            <div class="imgs-name">{{ item.name }}</div>
            <v-img
              :src="item.url"
              :aspect-ratio="imgRatio"
              width="100%"
            ></v-img>
          </v-card>
        </v-container>
      </v-card>
    </v-dialog>
    <!-- 确认操作的弹窗 -->
    <v-dialog
      v-model="actionDialogShow"
      max-width="280"
      persistent
    >
      <v-card>
        <v-card-title>提示</v-card-title>
        <v-card-text class="action-dialog-text">
          确定要 <b>{{ currentAction }}</b> 此申请吗？<br/>操作一经确认无法撤销！
        </v-card-text>
        <v-card-actions>
          <div class="flex-grow-1"></div>
          <v-btn
            class="tip-btn"
            color="green"
            @click="submitAction()"
            text
          >
            确认
          </v-btn>
          <v-btn
            class="tip-btn"
            color="error"
            @click="actionDialogShow = false"
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
import IRequestHandle from '../api/IRequestHandle';
import { requirePagination } from '../utils/common';

export default {
  data () {
    return {
      pageNum: 1, // 当前页码
      pageSize: 7, // 页大小
      totalPages: undefined, // 总页数
      // 数据表格表头
      headers: [
        {
          text: '银行名称',
          sortable: false,
          value: 'bankName'
        },
        {
          text: 'Swift Code',
          sortable: false,
          value: 'swiftCode'
        },
        {
          text: '银行公邮',
          sortable: false,
          value: 'email'
        },
        {
          text: '验证图片',
          sortable: false,
          value: 'imgs'
        },
        {
          text: '处理申请',
          sortable: false,
          value: 'action'
        }
      ],
      // 申请列表(没有数据时应为 undefined)
      requests: undefined,
      imgDialogShow: false, // 是否显示图片展示弹窗
      // 当前的验证图片路径
      imgs: [
        {
          name: '申请人',
          url: ''
        },
        {
          name: '营业执照',
          url: ''
        }
      ],
      imgRatio: 7 / 10, // 图片宽高比,
      actionDialogShow: false, // 是否显示操作确认弹窗
      // 同意或拒绝的枚举
      actionEnum: {
        accept: '同意',
        refuse: '拒绝'
      },
      currentAction: undefined, // 当前弹窗中显示的操作
      currentRequestId: undefined, // 当前操作的申请 id
      snackbarShow: false, // 是否显示提示框
      snackbarIcon: undefined, // 提示框中图标
      snackBarText: undefined, // 提示框中文字
      snackBarColor: undefined // 提示框主题颜色
    };
  },
  computed: {
    ...mapState(['requestsLoading']),
    showPagination () {
      return requirePagination(this.requests, this.pageSize, this.totalPages);
    }
  },
  mounted () {
    this.fetchRequestPage();
  },
  methods: {
    ...mapMutations(['setRequestsLoading']),
    // 请求并渲染分页后的申请列表
    fetchRequestPage () {
      // 为了手机端的交互体验, 换页时要回到顶部
      window.scrollTo(0, 0);
      this.setRequestsLoading(true);
      IRequestHandle.getRequestList(this.pageNum, this.pageSize).then((res) => {
        if (res.code === 200) {
          // TODO:this.totalPages = res.data.totalPages;
          this.requests = res.data.requestList;
        } else {
          this.showErrorSnackbar('获取申请列表失败！');
        }
        this.setRequestsLoading(false);
      });
    },
    // 展示指定申请的验证图片
    showImgs (applicant, license) {
      this.imgs[0].url = applicant;
      this.imgs[1].url = license;
      this.imgDialogShow = true;
    },
    // 显示操作确认弹窗
    showConfirm (type, id) {
      this.currentAction = type;
      this.currentRequestId = id;
      this.actionDialogShow = true;
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
    },
    // 点击确认提交对申请的操作
    submitAction () {
      this.actionDialogShow = false;
      if (this.currentAction === this.actionEnum.accept) {
        this.accept(this.currentRequestId);
      } else if (this.currentAction === this.actionEnum.refuse) {
        this.refuse(this.currentRequestId);
      } else {
        alert('操作非法!');
      }
    },
    // 同意申请
    accept (id) {
      IRequestHandle.acceptRequest(id).then((res) => {
        if (res.code === 200) {
          this.showSuccessSnackbar('操作成功！');
        } else {
          this.showErrorSnackbar('操作失败！');
        }
      });
    },
    // 拒绝申请
    refuse (id) {
      IRequestHandle.refuseRequest(id).then((res) => {
        if (res.code === 200) {
          this.showSuccessSnackbar('操作成功！');
        } else {
          this.showErrorSnackbar('操作失败！');
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.request-list-card {
  padding: 10px 20px;
}
.request-pagination-container {
  margin: 10px 0;
}
.request-table-header {
  font-size: 16px;
}
.accept-btn {
  &:hover {
    color: green;
  }
}
.refuse-btn {
  &:hover {
    color: red;
  }
}
.imgs-container {
  @include flexRow;
  justify-content: center;
  padding-bottom: $imgsContainerPaddingVertical;
  >div {
    margin: 0 $imgCardMarginHorizental;
  }
}
.img-card {
  width: $imgCardWidth;
}
.imgs-name {
  font-size: $imgNameFontSize;
  text-align: center;
  margin: $imgNameMarginVertical 0;
}
.action-dialog-text {
  margin-top: $actionDialogTextMarginTop;
  padding-left: $actionDialogTextPaddingLeft;
  font-size: $actionDialogTextFontSize;
}
</style>

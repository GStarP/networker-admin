<template>
  <v-container justify-center>
    <!-- 正常渲染的数据表格 -->
    <v-data-table
      class="elevation-2"
      :headers="headers"
      :items="requests"
      :loading="requestsLoading"
      loading-text="申请加载中......"
      hide-default-footer
    >
      <!-- 自定义的 验证图片 列 -->
      <template v-slot:item.img="{ item }">
        <!-- TODO: 点击弹出显示图片 -->
        <a>点此查看</a>
      </template>
      <!-- 自定义的 申请处理 列 -->
      <template v-slot:item.action="{ item }">
        <v-icon
          class="mr-2"
          @click="accept(item.id)"
        >mdi-checkbox-marked</v-icon>
        <v-icon
          @click="refuse(item.id)"
        >mdi-close-box</v-icon>
      </template>
    </v-data-table>
  </v-container>
</template>

<script>
import { mapState } from 'vuex';

export default {
  data () {
    return {
      // 数据表格表头
      headers: [
        {
          text: '银行名称',
          sortable: false,
          value: 'name'
        },
        {
          text: '银行编号',
          sortable: true,
          value: 'num'
        },
        {
          text: 'Swift Code',
          sortable: false,
          value: 'code'
        },
        {
          text: '银行公邮',
          sortable: false,
          value: 'email'
        },
        {
          text: '验证图片',
          sortable: false,
          value: 'img'
        },
        {
          text: '处理申请',
          sortable: false,
          value: 'action'
        }
      ],
      // 申请列表(没有数据时应为 undefined)
      requests: [
        {
          id: 1,
          name: '郝呆银行',
          num: 123456,
          code: 'HXW123456',
          email: 'hxwnb@qq.com'
        },
        {
          id: 2,
          name: '紫宁银行',
          num: 103091,
          code: 'ZZN103091',
          email: 'lovezzn@163.com'
        },
        {
          id: 3,
          name: '小草银行',
          num: 991004,
          code: 'LXC991004',
          email: 'lxcclchg@126.com'
        },
        {
          id: 4,
          name: '紫婷银行',
          num: 200000,
          code: 'ZZN200000',
          email: 'mimilee@gmail.com'
        },
        {
          id: 5,
          name: '小七银行',
          num: 777777,
          code: 'LMY777777',
          email: 'cjkalmy@sina.com'
        }
      ]
    };
  },
  computed: {
    ...mapState(['requestsLoading'])
  },
  methods: {
    // 同意申请
    accept (id) {
      // TODO
      alert(`同意申请${id}`);
    },
    // 拒绝申请
    refuse (id) {
      // TODO
      alert(`拒绝申请${id}`);
    }
  }
};
</script>

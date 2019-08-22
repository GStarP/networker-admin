<template>
  <v-container justify-center>
    <!-- 正常渲染的数据表格 -->
    <v-data-table
      class="elevation-2"
      :headers="headers"
      :items="requests"
      :loading="requestsLoading"
      loading-text="申请加载中......"
      no-data-text="暂无申请"
      hide-default-footer
    >
      <!-- 自定义的 验证图片 列 -->
      <template v-slot:item.imgs="{ item }">
        <!-- 点击弹出显示图片 -->
        <a @click.stop="showImgs(item.imgs)">点此查看</a>
      </template>
      <!-- 自定义的 申请处理 列 -->
      <template v-slot:item.action="{ item }">
        <v-icon
          class="accept-btn mr-2"
          @click="accept(item.id)"
        >mdi-checkbox-marked</v-icon>
        <v-icon
          class="refuse-btn"
          @click="refuse(item.id)"
        >mdi-close-box</v-icon>
      </template>
    </v-data-table>
    <!-- 展示验证图片的 dialog -->
    <!-- width 和 max-width 写在 style 里没用 -->
    <v-dialog
      v-model="dialogShow"
      width="80%"
      max-width="960"
    >
      <v-card>
        <v-container class="imgs-container">
          <v-card
            v-for="(img, i) of imgs"
            :key="i"
            class="img-card"
            flat
          >
            <div class="imgs-name">照片{{ i + 1 }}</div>
            <v-img
              :src="imgs[i]"
              :aspect-ratio="imgRatio"
              width="100%"
            ></v-img>
          </v-card>
        </v-container>
      </v-card>
    </v-dialog>
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
          value: 'imgs'
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
          email: 'hxwnb@qq.com',
          imgs: [
            'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1566452659496&di=9300a3b95ee88c81063565ca1bbba4a0&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201806%2F29%2F20180629184010_CFA5a.thumb.700_0.jpeg',
            'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1566456326439&di=8ff8ea15c89a1f6d81f5c510222a6cb1&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201807%2F03%2F20180703005315_mvtnw.jpg'
          ]
        },
        {
          id: 2,
          name: '紫宁银行',
          num: 103091,
          code: 'ZZN103091',
          email: 'lovezzn@163.com',
          imgs: [
            'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1566452659496&di=9300a3b95ee88c81063565ca1bbba4a0&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201806%2F29%2F20180629184010_CFA5a.thumb.700_0.jpeg',
            'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1566456326439&di=8ff8ea15c89a1f6d81f5c510222a6cb1&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201807%2F03%2F20180703005315_mvtnw.jpg'
          ]
        },
        {
          id: 3,
          name: '小草银行',
          num: 991004,
          code: 'LXC991004',
          email: 'lxcclchg@126.com',
          imgs: [
            'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1566452659496&di=9300a3b95ee88c81063565ca1bbba4a0&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201806%2F29%2F20180629184010_CFA5a.thumb.700_0.jpeg',
            'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1566456326439&di=8ff8ea15c89a1f6d81f5c510222a6cb1&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201807%2F03%2F20180703005315_mvtnw.jpg'
          ]
        },
        {
          id: 4,
          name: '紫婷银行',
          num: 200000,
          code: 'ZZN200000',
          email: 'mimilee@gmail.com',
          imgs: [
            'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1566452659496&di=9300a3b95ee88c81063565ca1bbba4a0&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201806%2F29%2F20180629184010_CFA5a.thumb.700_0.jpeg',
            'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1566456326439&di=8ff8ea15c89a1f6d81f5c510222a6cb1&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201807%2F03%2F20180703005315_mvtnw.jpg'
          ]
        },
        {
          id: 5,
          name: '小七银行',
          num: 777777,
          code: 'LMY777777',
          email: 'cjkalmy@sina.com',
          imgs: [
            'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1566452659496&di=9300a3b95ee88c81063565ca1bbba4a0&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201806%2F29%2F20180629184010_CFA5a.thumb.700_0.jpeg',
            'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1566456326439&di=8ff8ea15c89a1f6d81f5c510222a6cb1&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201807%2F03%2F20180703005315_mvtnw.jpg'
          ]
        }
      ],
      dialogShow: false, // 是否显示验证图片
      // 当前的验证图片路径
      imgs: [],
      imgRatio: 7 / 10 // 图片宽高比
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
    },
    showImgs (imgs) {
      this.imgs = imgs;
      this.dialogShow = true;
    }
  }
};
</script>

<style lang="scss" scoped>
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
</style>

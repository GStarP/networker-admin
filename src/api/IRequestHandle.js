import axios from '../plugins/axios';

export default {
  /**
   * @author hxw
   * @des 获取分页后的申请列表
   * @param {number} pageNum 页码
   * @param {number} pageSize 页大小
   */
  getRequestList (pageNum, pageSize) {
    let res = {
      code: 200,
      data: {
        totalPages: 10,
        requestList: [
          {
            id: 1,
            name: '郝呆银行',
            no: '123456',
            code: 'HXW123456',
            email: 'hxwnb@qq.com',
            applicant: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1566452659496&di=9300a3b95ee88c81063565ca1bbba4a0&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201806%2F29%2F20180629184010_CFA5a.thumb.700_0.jpeg',
            license: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1566456326439&di=8ff8ea15c89a1f6d81f5c510222a6cb1&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201807%2F03%2F20180703005315_mvtnw.jpg'
          },
          {
            id: 2,
            name: '紫宁银行',
            no: '103091',
            code: 'ZZN103091',
            email: 'lovezzn@163.com',
            applicant: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1566452659496&di=9300a3b95ee88c81063565ca1bbba4a0&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201806%2F29%2F20180629184010_CFA5a.thumb.700_0.jpeg',
            license: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1566456326439&di=8ff8ea15c89a1f6d81f5c510222a6cb1&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201807%2F03%2F20180703005315_mvtnw.jpg'
          },
          {
            id: 3,
            name: '小草银行',
            no: '991004',
            code: 'LXC991004',
            email: 'lxcclchg@126.com',
            applicant: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1566452659496&di=9300a3b95ee88c81063565ca1bbba4a0&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201806%2F29%2F20180629184010_CFA5a.thumb.700_0.jpeg',
            license: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1566456326439&di=8ff8ea15c89a1f6d81f5c510222a6cb1&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201807%2F03%2F20180703005315_mvtnw.jpg'
          },
          {
            id: 4,
            name: '紫婷银行',
            no: '200000',
            code: 'LZT200000',
            email: 'mimilee@gmail.com',
            applicant: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1566452659496&di=9300a3b95ee88c81063565ca1bbba4a0&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201806%2F29%2F20180629184010_CFA5a.thumb.700_0.jpeg',
            license: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1566456326439&di=8ff8ea15c89a1f6d81f5c510222a6cb1&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201807%2F03%2F20180703005315_mvtnw.jpg'
          },
          {
            id: 5,
            name: '小七银行',
            no: '777777',
            code: 'LMY777777',
            email: 'cjkalmy@sina.com',
            applicant: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1566452659496&di=9300a3b95ee88c81063565ca1bbba4a0&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201806%2F29%2F20180629184010_CFA5a.thumb.700_0.jpeg',
            license: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1566456326439&di=8ff8ea15c89a1f6d81f5c510222a6cb1&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201807%2F03%2F20180703005315_mvtnw.jpg'
          }
        ]
      },
      msg: ''
    };
    return new Promise((resolve, reject) => {
      setTimeout(function () {
        resolve(res);
      }, 3000);
    });
  },
  /**
   * @author hxw
   * @des 同意指定申请
   * @param {number} requestId
   */
  acceptRequest (requestId) {
    let res = {
      code: 200,
      data: null,
      msg: ''
    };
    return new Promise((resolve, reject) => {
      setTimeout(function () {
        resolve(res);
      }, 1000);
    });
  },
  /**
   * @author hxw
   * @des 拒绝指定申请
   * @param {number} requestId
   */
  refuseRequest (requestId) {
    let res = {
      code: 200,
      data: null,
      msg: ''
    };
    return new Promise((resolve, reject) => {
      setTimeout(function () {
        resolve(res);
      }, 1000);
    });
  }
};

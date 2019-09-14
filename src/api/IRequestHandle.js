import axios from '../plugins/axios';

export default {
  /**
   * @author hxw
   * @des 获取分页后的申请列表
   * @param {number} pageNum 页码
   * @param {number} pageSize 页大小
   */
  getRequestList (pageNum, pageSize) {
    return axios.post('/users/investor', {
      status: false,
      pageNum,
      pageSize
    })
      .then(res => res.data)
      .catch(() => {
        return {
          code: 404
        };
      });
  },
  // mock data
  IgetRequestList (pageNum, pageSize) {
    let res = {
      code: 200,
      data: {
        totalPages: 10,
        requestList: [
          {
            id: 1,
            bankName: '香港中国银行',
            swiftCode: 'BKCHHKHH',
            email: 'xgzg@bank.com',
            avatar: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1566452659496&di=9300a3b95ee88c81063565ca1bbba4a0&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201806%2F29%2F20180629184010_CFA5a.thumb.700_0.jpeg',
            license: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1566456326439&di=8ff8ea15c89a1f6d81f5c510222a6cb1&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201807%2F03%2F20180703005315_mvtnw.jpg'
          },
          {
            id: 2,
            bankName: '香港招商银行',
            swiftCode: 'CMBCHKHH',
            email: 'xgzs@bank.com',
            avatar: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1566452659496&di=9300a3b95ee88c81063565ca1bbba4a0&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201806%2F29%2F20180629184010_CFA5a.thumb.700_0.jpeg',
            license: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1566456326439&di=8ff8ea15c89a1f6d81f5c510222a6cb1&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201807%2F03%2F20180703005315_mvtnw.jpg'
          },
          {
            id: 3,
            bankName: '香港恒生银行',
            swiftCode: 'HASEHKHH',
            email: 'xghs@bank.com',
            avatar: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1566452659496&di=9300a3b95ee88c81063565ca1bbba4a0&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201806%2F29%2F20180629184010_CFA5a.thumb.700_0.jpeg',
            license: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1566456326439&di=8ff8ea15c89a1f6d81f5c510222a6cb1&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201807%2F03%2F20180703005315_mvtnw.jpg'
          },
          {
            id: 4,
            bankName: '北京中国银行',
            swiftCode: 'BKCHCNBJ110',
            email: 'bjzg@bank.com',
            avatar: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1566452659496&di=9300a3b95ee88c81063565ca1bbba4a0&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201806%2F29%2F20180629184010_CFA5a.thumb.700_0.jpeg',
            license: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1566456326439&di=8ff8ea15c89a1f6d81f5c510222a6cb1&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201807%2F03%2F20180703005315_mvtnw.jpg'
          },
          {
            id: 5,
            bankName: '中国工商银行',
            swiftCode: 'ICBKCNBJ',
            email: 'zggs@bank.com',
            avatar: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1566452659496&di=9300a3b95ee88c81063565ca1bbba4a0&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201806%2F29%2F20180629184010_CFA5a.thumb.700_0.jpeg',
            license: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1566456326439&di=8ff8ea15c89a1f6d81f5c510222a6cb1&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201807%2F03%2F20180703005315_mvtnw.jpg'
          },
          {
            id: 6,
            bankName: '中国农业银行',
            swiftCode: 'ABOCCNBJ',
            email: 'zgny@bank.com',
            avatar: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1566452659496&di=9300a3b95ee88c81063565ca1bbba4a0&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201806%2F29%2F20180629184010_CFA5a.thumb.700_0.jpeg',
            license: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1566456326439&di=8ff8ea15c89a1f6d81f5c510222a6cb1&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201807%2F03%2F20180703005315_mvtnw.jpg'
          },
          {
            id: 7,
            bankName: '中国建设银行',
            swiftCode: 'PCBCCNBJ',
            email: 'zgjs@bank.com',
            avatar: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1566452659496&di=9300a3b95ee88c81063565ca1bbba4a0&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201806%2F29%2F20180629184010_CFA5a.thumb.700_0.jpeg',
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
    return axios.post('/users/check', {
      checkResult: true,
      id: requestId
    })
      .then(res => res.data)
      .catch(() => {
        return {
          code: 404
        };
      });
  },
  /**
   * @author hxw
   * @des 拒绝指定申请
   * @param {number} requestId
   */
  refuseRequest (requestId) {
    return axios.post('/users/check', {
      checkResult: false,
      id: requestId
    })
      .then(res => res.data)
      .catch(() => {
        return {
          code: 404
        };
      });
  }
};

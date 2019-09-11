import axios from '../plugins/axios';

export default {
  /**
   * @author hxw
   * @des 获取分页后的公司信息列表
   * @param {number} pageNum 页码
   * @param {number} pageSize 页大小
   */
  getCompanyInfoList (pageNum, pageSize) {
    return axios.get('/companies/list', {
      params: {
        pageNum,
        pageSize
      }
    }).then(res => res.data);
    // let res = {
    //   code: 200,
    //   data: {
    //     totalPages: 20,
    //     companyInfoList: [
    //       {
    //         id: 1,
    //         amount: 6545,
    //         amplitude: 7575,
    //         change: 1245,
    //         close: 5375,
    //         highest: 4337,
    //         list_age: 7358,
    //         lowest: 3541,
    //         name: '南大证券',
    //         open: 6540,
    //         pb: 8215,
    //         pct_chg: 6841,
    //         pe: 7537,
    //         pre_close: 7783,
    //         symbol: 'NJU1234',
    //         turnover_rate: 2375,
    //         vol: 3548
    //       },
    //       {
    //         id: 2,
    //         amount: 7357,
    //         amplitude: 7575,
    //         change: 1245,
    //         close: 5375,
    //         highest: 4337,
    //         list_age: 7358,
    //         lowest: 5548,
    //         name: '东南证券',
    //         open: 6540,
    //         pb: 8215,
    //         pct_chg: 6841,
    //         pe: 7537,
    //         pre_close: 7783,
    //         symbol: 'SEU1234',
    //         turnover_rate: 2375,
    //         vol: 3548
    //       },
    //       {
    //         id: 3,
    //         amount: 4234,
    //         amplitude: 7575,
    //         change: 1245,
    //         close: 5375,
    //         highest: 4337,
    //         list_age: 7358,
    //         lowest: 8131,
    //         name: '北大证券',
    //         open: 6540,
    //         pb: 8215,
    //         pct_chg: 6841,
    //         pe: 7537,
    //         pre_close: 7783,
    //         symbol: 'PKU1234',
    //         turnover_rate: 2375,
    //         vol: 3548
    //       },
    //       {
    //         id: 4,
    //         amount: 3538,
    //         amplitude: 7575,
    //         change: 1245,
    //         close: 5375,
    //         highest: 4337,
    //         list_age: 7358,
    //         lowest: 8411,
    //         name: '清华证券',
    //         open: 6540,
    //         pb: 8215,
    //         pct_chg: 6841,
    //         pe: 7537,
    //         pre_close: 7783,
    //         symbol: 'THU1234',
    //         turnover_rate: 2375,
    //         vol: 3548
    //       },
    //       {
    //         id: 5,
    //         amount: 9543,
    //         amplitude: 7575,
    //         change: 1245,
    //         close: 5375,
    //         highest: 4337,
    //         list_age: 7358,
    //         lowest: 4795,
    //         name: '复旦证券',
    //         open: 6540,
    //         pb: 8215,
    //         pct_chg: 6841,
    //         pe: 7537,
    //         pre_close: 7783,
    //         symbol: 'FDU1234',
    //         turnover_rate: 2375,
    //         vol: 3548
    //       }
    //     ]
    //   },
    //   msg: ''
    // };
    // return new Promise((resolve, reject) => {
    //   setTimeout(function () {
    //     resolve(res);
    //   }, 3000);
    // });
  },
  /**
   * @author hxw
   * @des 删除指定公司信息
   * @param {number} id 公司信息id
   */
  deleteCompanyInfo (id) {
    axios.delete('/companies', {
      params: {
        id
      }
    }).then(res => res.data);
    // let res = {
    //   code: 200,
    //   data: null,
    //   msg: ''
    // };
    // return new Promise((resolve, reject) => {
    //   setTimeout(function () {
    //     resolve(res);
    //   }, 1000);
    // });
  },
  /**
   * @author hxw
   * @des 修改公司信息
   * @param {CompanyInfo} info 公司信息实体
   */
  editCompanyInfo (info) {
    axios.put('/companies', info).then(res => res.data);
    // let res = {
    //   code: 200,
    //   data: null,
    //   msg: ''
    // };
    // return new Promise((resolve, reject) => {
    //   setTimeout(function () {
    //     resolve(res);
    //   }, 1000);
    // });
  }
};

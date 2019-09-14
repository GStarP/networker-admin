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
  },
  // mock data
  IgetCompanyInfoList (pageNum, pageSize) {
    let res = {
      code: 200,
      msg: 'ok',
      data: [
        {
          id: 1,
          ts_code: '600519.SH',
          market: {
            amount: 44.98,
            amplitude: 4.11,
            change: 29.48,
            close: 1069.52,
            highest: 1109.98,
            list_age: 18,
            lowest: 1066.00,
            name: '贵州茅台',
            open: 1066.00,
            pb: 12.03,
            pct_chg: 2.76,
            pe: 35.05,
            pre_close: 1069.52,
            turnover_rate: 0.33,
            vol: 4.12
          }
        },
        {
          id: 2,
          ts_code: '601318.SH',
          market: {
            amount: 72.31,
            amplitude: 3.07,
            change: 2.78,
            close: 89.56,
            highest: 92.50,
            list_age: 12,
            lowest: 89.75,
            name: '中国平安',
            open: 90.09,
            pb: 2.70,
            pct_chg: 3.10,
            pe: 11.48,
            pre_close: 89.56,
            turnover_rate: 0.73,
            vol: 79.03
          }
        },
        {
          id: 3,
          ts_code: '002194.SZ',
          market: {
            amount: 6.59,
            amplitude: 8.99,
            change: 2.05,
            close: 20.46,
            highest: 22.51,
            list_age: 12,
            lowest: 20.67,
            name: '武汉凡谷',
            open: 20.70,
            pb: 7.59,
            pct_chg: 10.02,
            pe: 38.76,
            pre_close: 20.46,
            turnover_rate: 8,
            vol: 29.73
          }
        },
        {
          id: 4,
          ts_code: '600837.SH',
          market: {
            amount: 37.31,
            amplitude: 6.38,
            change: 0.87,
            close: 15.67,
            highest: 16.59,
            list_age: 25,
            lowest: 15.59,
            name: '海通证券',
            open: 15.80,
            pb: 1.55,
            pct_chg: 5.55,
            pe: 24.68,
            pre_close: 15.67,
            turnover_rate: 2.87,
            vol: 232.00
          }
        },
        {
          id: 5,
          ts_code: '000063.SZ',
          market: {
            amount: 37.70,
            amplitude: 2.06,
            change: 0.28,
            close: 35.46,
            highest: 35.88,
            list_age: 22,
            lowest: 35.15,
            name: '中兴通讯',
            open: 35.83,
            pb: 6.11,
            pct_chg: 0.79,
            pe: 65.21,
            pre_close: 35.46,
            turnover_rate: 3.07,
            vol: 106.03
          }
        }
      ]
    };
    return new Promise((resolve, reject) => {
      resolve(res);
    });
  },
  /**
   * @author hxw
   * @des 模糊搜索并获得分页后的公司信息列表
   * @param {string} key 搜索关键词
   * @param {number} pageNum 页码
   * @param {number} pageSize 页大小
   */
  getSearchInfoList (key, pageNum, pageSize) {
    return axios.get('/companies/query', {
      params: {
        key,
        pageSize,
        pageNum
      }
    }).then(res => res.data);
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
  },
  /**
   * @author hxw
   * @des 修改公司信息
   * @param {CompanyInfo} info 公司信息实体
   */
  editCompanyInfo (info) {
    axios.put('/companies', info).then(res => res.data);
  }
};

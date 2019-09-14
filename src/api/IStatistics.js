import axios from '../plugins/axios';

export default {
  /**
   * @author wj
   * @des 获取普通用户数目
   */
  getNormalUserNumber () {
    let res = {
      code: 200,
      msg: '',
      data: 200
    };
    return new Promise((resolve, reject) => {
      setTimeout(function () {
        resolve(res);
      }, 1000);
    });
  },

  /**
   * @author wj
   * @des 获取质权方用户数目
   */
  getPledgeUserNumber () {
    let res = {
      code: 200,
      msg: '',
      data: 30
    };
    return new Promise((resolve, reject) => {
      setTimeout(function () {
        resolve(res);
      }, 1000);
    });
  }
};

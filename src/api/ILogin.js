import axios from '../plugins/axios';

export default {
  /**
   * @author wj
   * @des 账户登录
   * @param {string} username 用户名
   * @param {string} password 密码
   */
  adminLogin (username, password) {
    if (username === 'networker' && password === 'nb') {
      let res = {
        code: 200,
        msg: 'ok',
        data: null
      };
      return new Promise((resolve, reject) => {
        setTimeout(function () {
          resolve(res);
        }, 0);
      });
    } else {
      let res = {
        code: 200,
        msg: '账号或密码错误！',
        data: null
      };
      return new Promise((resolve, reject) => {
        setTimeout(function () {
          resolve(res);
        }, 0);
      });
    }
  }
};

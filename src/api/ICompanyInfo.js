export default {
  /**
   * @author hxw
   * @des 获取分页后的公司信息列表
   * @param {number} pageNum 页码
   * @param {number} pageSize 页大小
   */
  getCompanyInfoList (pageNum, pageSize) {
    let res = {
      code: 200,
      data: {
        totalPages: 20,
        companyInfoList: [
          {
            id: 1
          },
          {
            id: 2
          },
          {
            id: 3
          },
          {
            id: 4
          },
          {
            id: 5
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
  }
};

/**
  * @author hxw
  * @des 判断是否需要显示分页
  * @param {array} list
  * @param {number} pageSize
  * @param {number} totalPages
  * @returns {boolean}
  */
export const requirePagination = function (list, pageSize, totalPages) {
  if (list === undefined) {
    // 公司信息列表未定义
    return false;
  } else if (list.length < pageSize) {
    // 公司信息不足一页
    return false;
  } else if (totalPages === 1) {
    // 公司信息恰好一页
    return false;
  } else {
    // 其他情况需要显示分页
    return true;
  }
};

/**
 * @author hxw
 * @des 判断输入是否为数字
 * @param {string} input
 * @returns {boolean} 是否为数字
 */
export const isNumber = function (input) {
  if (input === null || input === '') {
    return false;
  }
  if (!isNaN(input)) {
    return true;
  } else {
    return false;
  }
};

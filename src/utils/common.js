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

export const swiftModel = function (companyInfoList) {
  let res = [];
  for (let info of companyInfoList) {
    let temp = {
      id: 0,
      name: '',
      ts_code: '',
      amount: 0,
      change: 0,
      close: 0,
      high: 0,
      low: 0,
      open: 0,
      pct_chg: 0,
      pre_close: 0,
      vol: 0
    };
    temp.id = info.id;
    temp.name = info.name || '';
    temp.ts_code = info.ts_code;
    temp.amount = info.market.amount;
    temp.change = info.market.change;
    temp.close = info.market.close;
    temp.high = info.market.highest;
    temp.low = info.market.lowest;
    temp.open = info.market.open;
    temp.pct_chg = info.market.pct_chg;
    temp.pre_close = info.market.pre_close;
    temp.vol = info.market.vol;
    res.push(temp);
  }
  return res;
};

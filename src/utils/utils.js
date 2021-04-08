import {parse} from 'querystring';
/* eslint no-useless-escape:0 import/prefer-default-export:0 */

const reg = /(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+(?::\d+)?|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/;
export const isUrl = (path) => reg.test(path);
export const isAntDesignPro = () => {
  if (ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION === 'site') {
    return true;
  }

  return window.location.hostname === 'preview.pro.ant.design';
}; // 给官方演示站点用，用于关闭真实开发环境不需要使用的特性

export const isAntDesignProOrDev = () => {
  const {NODE_ENV} = process.env;

  if (NODE_ENV === 'development') {
    return true;
  }

  return isAntDesignPro();
};


export const getPageQuery = () => parse(window.location.href.split('?')[1]);


export const getFilteredProductsList = (srcArr, page, pageSize, searchText = '', categories) => {
  if (Array.isArray(srcArr) && srcArr.length) {
    let changePageToOne = false;
    let outputArr = [...srcArr];
    if (Array.isArray(categories) && categories.length) {
      outputArr = outputArr.filter(item => categories.indexOf(item.category) >= 0)
    }

    if (searchText) {
      outputArr = outputArr.filter(item => item.title && item.title.toLowerCase().includes(searchText.toLowerCase()));
    }
    const total = outputArr.length;
    const beforePaginationArr = [...outputArr]

    outputArr = outputArr.slice((page - 1) * pageSize, Math.min(page * pageSize, srcArr.length));
    if (!outputArr.length) {
      outputArr = beforePaginationArr.slice(0, Math.min(pageSize, srcArr.length));

      if (outputArr && outputArr.length) {
        changePageToOne = true;
      }

    }
    return [outputArr, total, changePageToOne];
  }
  return [];
};

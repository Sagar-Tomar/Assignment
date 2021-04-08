import {stringify} from 'querystring';
import {history} from 'umi';
import {message} from 'antd';
import {setAuthority} from '@/utils/authority';
import {getProductsList} from "@/services/home";
import {getFilteredProductsList} from "@/utils/utils";

const Model = {
  namespace: 'home',
  state: {
    productsList: [],
    productsListFiltered: [],
    filterValuesObj: {
      categories: [],
      searchText: '',
      pageSize: 8,
      page: 1,
      total: 0
    },
    cartDetailsObj: {
    }
  },
  effects: {
    * fetchListOfProducts({payload}, {call, put}) {
      const response = yield call(getProductsList, payload);
      yield put({
        type: 'setProductsList',
        payload: {response},
      });
    },
  },
  reducers: {
    setItemStateAndUpdateData(state, {payload}) {
      const {data} = payload;
      const {filterValuesObj: newFilterValuesObj} = data;
      const {filterValuesObj, productsList} = state;
      const {page, pageSize, searchText, categories,} = {...filterValuesObj, ...newFilterValuesObj};
      const filteredResponse = getFilteredProductsList(productsList, page, pageSize, searchText, categories);
      const [updatedProductsList, total,changePageToOne] = filteredResponse;
      data.filterValuesObj.total = total;
      if(changePageToOne){
        data.filterValuesObj.page = 1;
      }
      return {
        ...state,
        ...data,
        productsListFiltered: [...updatedProductsList]
      };
    },
    updateCartDetailsObj(state, {payload}){
      const { cartDetailsObj } = payload;
      return{
        ...state,
        cartDetailsObj
      }

    },
    setProductsList(state, {payload}) {
      const {response} = payload;
      const {filterValuesObj} = state;
      const {page, pageSize, searchText, categories} = filterValuesObj;
      const newFilteredResponse = {...filterValuesObj, total: Array.isArray(response) && response.length};
      const filteredResponse = getFilteredProductsList(Array.isArray(response) && response, page, pageSize, searchText, categories);
      const [updatedProductsList] = filteredResponse;
      return {
        ...state,
        productsList: Array.isArray(response) && response,
        productsListFiltered: [...updatedProductsList],
        filterValuesObj: {...newFilteredResponse}
      };
    },
  },
};
export default Model;

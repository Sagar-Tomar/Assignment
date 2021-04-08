import request from '@/utils/request';

export async function getProductsList() {
  return request('https://fakestoreapi.com/products', {
    method: 'GET',
  });
};


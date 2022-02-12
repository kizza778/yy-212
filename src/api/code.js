import request from '@/utils/request';
// 扬扬
export function sendCode(params){
  return request({
    url:'/api/anon/getCode',
    method:'get',
    params:params
  })
}

import request from '@/utils/request';
// 做我女朋友好不好
export function sendCode(params){
  return request({
    url:'/api/anon/getCode',
    method:'get',
    params:params
  })
}

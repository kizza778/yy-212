import request from '@/utils/request';
// 扬扬 做我女朋友
export function sendCode(params){
  return request({
    url:'/api/anon/getCode',
    method:'get',
    params:params
  })
}

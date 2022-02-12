import request from '@/utils/request';

export function sendCode(params){
  return request({
    url:'/api/anon/getCode',
    method:'get',
    params:params
  })
}

import request from '@/utils/request';

export function getAllWaitOutApprovalApply(){
  return request({
    url:'/api/travel/getAllWaitOutApprovalApply',
    method:'get'
  })
}

export function getTravelApplyInfoById(params){
  return request({
    url:'/api/travel/getTravelApplyInfoById',
    method:'get',
    params: params
  })
}

export function updateTravelApplyStatus(params){
  return request.post('/api/travel/updateTravelApplyStatus',params)
}

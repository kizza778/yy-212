import request from '@/utils/request';

export function getAllWaitOutApprovalApply(){
  return request({
    url:'/api/travel/getAllWaitOutApprovalApply',
    method:'get'
  })
}

export function getAllWaitBackApprovalApply(){
  return request({
    url:'/api/travel/getAllWaitBackApprovalApply',
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

export function getAllApprovalApplyByStatus(params){
  return request({
    url:'/api/travel/getAllApprovalApplyByStatus',
    method:'get',
    params: params
  })
}

export function getTravelOperate(params){
  return request({
    url:'/api/travel/getTravelOperate',
    method:'get',
    params: params
  })
}

export function getDiseaseInfoByUserId(params){
  return request({
    url:'/api/travel/getDiseaseInfoByUserId',
    method:'get',
    params: params
  })
}

export function updateTravelApplyStatus(params){
  return request.post('/api/travel/updateTravelApplyStatus',params)
}

export function sendMessageToUser(params){
  return request.post('/api/travel/sendMessageToUser',params)
}

import request from "@/utils/request";

export function addTitle(params){
  return request.post('/api/punch/addTitle',params)
}

export function getTitleList(){
  return request({
    url:'/api/punch/getTitleList',
    method:'get',
  })
}

export function getTitleListById(params){
  return request({
    url:'/api/punch/getTitleListById',
    method:'get',
    params: params
  })
}


export function deleteTitleListById(params){
  return request({
    url:'/api/punch/deleteTitleListById',
    method:'get',
    params: params
  })
}

export function getAbnormalBodyTemperature(params){
  return request({
    url:'/api/punch/getAbnormalBodyTemperature',
    method:'get',
    params: params
  })
}

export function getAbnormalDetailsById(params){
  return request({
    url:'/api/punch/getAbnormalDetailsById',
    method:'get',
    params: params
  })
}

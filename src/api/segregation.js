import request from "@/utils/request";

export function addSegregation(params){
  return request.post('/api/query/addSegregation',params)
}

export function deleteSegregationById(params){
  return request.post('/api/query/deleteSegregationById',params)
}

export function getAllSegregation(){
  return request({
    url:'/api/query/getAllSegregation',
    method:'get',
  })
}
export function getSegregationById(params){
  return request({
    url:'/api/query/getSegregationById',
    method:'get',
    params: params
  })
}

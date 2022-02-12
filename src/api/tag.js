import request from '@/utils/request'

export function addTag(params){
  return request.post('/api/tag/addTag',params)
}


export function getAllTag(){
  return request({
    url:'/api/tag/getAllTag',
    method:'get'
  })
}

export function updateTag(params){
  return request.post('/api/tag/updateTagById',params)
}

export function deleteTag(params){
  return request.post('/api/tag/deleteTagById', params)
}

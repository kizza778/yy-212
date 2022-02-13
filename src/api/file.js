import request from "@/utils/request";

export function uploadImg(data){
  return request({
    url: '/api/file/uploadImg',
    method: 'post',
    data: data,
    header: {'Content-Type':'multipart/form-data'}
  })
}

export function deleteFile(params){
  return request.post('/api/file/deleteFile',params)
}

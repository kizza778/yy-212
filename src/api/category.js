import request from "@/utils/request";

export function getAllCategory(){
  return request({
    url: '/api/category/getAllCategory',
    method: 'get'
  })
}

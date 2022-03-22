import request from "@/utils/request";

export function saveArticle(params){
  return request.post('/api/article/addArticle',params)
}

export function getAllArticleList() {
  return request({
    url: '/api/article/getAllArticleList',
    method: 'get'
  })
}

export function getArticleDetail(params){
  return request({
    url: '/api/article/getArticleDetail',
    method: 'get',
    params:params
  })
}

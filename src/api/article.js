import request from "@/utils/request";

export function saveArticle(params){
  return request.post('/api/article/addArticle',params)
}

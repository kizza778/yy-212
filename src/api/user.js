import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/vue-admin-template/user/login',
    method: 'post',
    data
  })
}

export function getInfo() {
  return request({
    url: '/api/user/info',
    method: 'get'
  })
}

export function logout() {
  return request({
    url: '/vue-admin-template/user/logout',
    method: 'post'
  })
}

export function codeLogin(params){
  //发送json数据
  return request.post('/api/anon/login',params);
}

//非空项更新
export function updateUser(params){
  return request.post('/api/user/updateUserInfo',params)
}

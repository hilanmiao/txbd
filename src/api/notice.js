import request from '@/utils/request'

// 获取列表数据
export function getListNotice(params) {
  return request({
    url: 'v1/notice/notices',
    method: 'get',
    params
  })
}

// 创建
export function postModelNotice(data) {
  return request({
    url: 'v1/notice/',
    method: 'post',
    data
  })
}

// 修改
export function putModelNotice(data) {
  return request({
    url: 'v1/notice/',
    method: 'put',
    data
  })
}

// 删除
export function deleteModelNotice(id) {
  return request({
    url: 'v1/notice/' + id,
    method: 'delete'
  })
}

// 获取详情
export function getModelNotice(params) {
  return request({
    url: 'v1/notice/',
    method: 'get',
    params
  })
}

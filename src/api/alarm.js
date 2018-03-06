import request from '@/utils/request'

// 获取一条预警,时间档位阀值查询去api/v1/timeThreshold
export function getWarning() {
  return request({
    url: 'v1/earlywarning',
    method: 'get'
  })
}

// 暂不处理
export function noHandle(id) {
  return request({
    url: 'v1/earlywarning/non/' + id,
    method: 'put'
  })
}

// 打标计
export function doMark(params, id) {
  return request({
    url: 'v1/earlywarning/' + id,
    method: 'put',
    params
  })
}

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

// 运维人员操作历史明细
export function getWarningHistory(params) {
  return request({
    url: 'v1/earlywarning/historys',
    method: 'get',
    params
  })
}

// 运维人员审核统计
export function getWarningReport(params) {
  return request({
    url: 'v1/earlywarning/report',
    method: 'get',
    params
  })
}

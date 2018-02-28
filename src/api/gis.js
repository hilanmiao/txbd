import request from '@/utils/request'

// 获取车辆列表
export function getCars(params) {
  return request({
    url: 'v1/gis/cars',
    method: 'get',
    params
  })
}

// 获取历史轨迹
export function getCarHistory(params) {
  return request({
    url: 'v1/gis/history',
    method: 'get',
    params
  })
}

// 获取车辆基础信息
export function getCarBase(deviceno) {
  return request({
    url: 'v1/gis/carbase/' + deviceno,
    method: 'get'
  })
}

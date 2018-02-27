import request from '@/utils/request'

export function getList(city_id) {
  return request({
    url: 'v1/statistics/todayNotOnlineCar/' + city_id,
    method: 'get'
  })
}

export function getData(id) {
  return request({
    url: 'v1/installInfo/' + id,
    method: 'get'
  })
}

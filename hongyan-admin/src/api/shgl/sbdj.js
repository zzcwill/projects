import request from '@/utils/request'

export function listTerminalMachine(data) {
  return request({
    url: '/api/1.0/base/c211210terminalmachine/list',
    method: 'post',
    data
  })
}

export function infoTerminalMachine(data) {
  return request({
    url: '/api/1.0/base/c211210terminalmachine/info',
    method: 'post',
    data
  })
}

export function addTerminalMachine(data) {
  return request({
    url: '/api/1.0/base/c211210terminalmachine/append',
    method: 'post',
    data
  })
}

export function editTerminalMachine(data) {
  return request({
    url: '/api/1.0/base/c211210terminalmachine/modify',
    method: 'post',
    data
  })
}

export function delTerminalMachine(data) {
  return request({
    url: '/api/1.0/base/c211210terminalmachine/discard',
    method: 'post',
    data
  })
}

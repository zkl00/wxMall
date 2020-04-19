import { baseURL } from './base.js'
export default function request(confing){
  return new Promise((reslove,love)=>{
    wx.request({
      url:baseURL+confing.url,
      data: confing.data || {},
      method:confing.method || 'get',
      success:res=>{
        reslove(res)
      }
    })
  })
}
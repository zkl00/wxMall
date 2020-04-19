// pages/detaill/detaill.js
import request from '../../network/request'
let formdata = require('../../utils/formdata')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    active_info:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    /**从首页获取iid */
    this.setData({
      iid:options.iid
    })
    //
    this.getDetiale()//商品详情信息
    this.hotRecommend()//热门推荐
   
  },
  // 商品详情信息
getDetiale(){
  request({
    url:'/detail',
    method:'get',
    data:{
      iid:this.data.iid
    },
  }).then((res)=>{
    let dataList = res.data
    // 轮播图信息
    let topImge = dataList.result.itemInfo.topImages
    // 获取商品信息
    let goods = {}
    goods.itemInfo = dataList.result.itemInfo
    goods.columns = dataList.result.columns
    goods.services  = dataList.result.shopInfo.services
    // 创建门店信息
    let goodPrams = {}
    goodPrams = dataList.result.shopInfo
    let namwe = dataList.result.shopInfo.cSells
    if(namwe < 10000){
      goodPrams.names = namwe
    }else{
         let count = namwe / 10000
         goodPrams.names = count.toFixed(1)
    }
    // // 保存商品详情
    let detailInfo = {}
     detailInfo = dataList.result.detailInfo
    //  保存尺寸
    let measure = {}
    measure = dataList.result.itemParams
    // 评论信息
    let rateList = {}
    if(dataList.result.rate.cRate != 0){
      rateList = dataList.result.rate.list[0]
      // 转换时间戳
      let time = formdata.js_date_time( dataList.result.rate.list[0].created * 1000)
      rateList.time = time
    }
    this.setData({
      topImge,
      goods,
      goodPrams,
      detailInfo,
      measure,
      rateList
    })
  
  })
},
// 热门推荐
 hotRecommend(){
  request({
    url:'/recommend'//hotRecommend
  }).then((res)=>{
    let hotList = res.data.data.list
    this.setData({
      hotList
    })
  })
},
// 子传亲
listClick(e){
  // console.log(e)
},
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },
  // 回调顶部
  topBlick(){
    wx.pageScrollTo({
      scrollTop:0
    })
  },
//获取动的生命周期
onPageScroll(e){
  // console.log(e)
  let scroll = e.scrollTop>=1000
  if(scroll != this.data.active_info){
    console.log('11')
    this.setData({
      active_info:scroll
    })
  }
},
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
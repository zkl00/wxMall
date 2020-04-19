// pages/fenlei/fenlei.js
import request from '../../network/request'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    activeKey:0
  },
  clickActive(e){
   let index = e === this.data.maitKeyFlse ? this.data.maitKeyFlse : e.target.dataset.maitkey
    request({
      url:'/subcategory',
      data:{
        maitKey:index
      }
    }).then((res)=>{
      // console.log(res.data.data.list)
      let context = res.data.data.list
      this.setData({
        context
      })
    })
   
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getCartList()//获取分类导航栏
  },
  // 获取分类导航栏
getCartList(){
  request({
    url:'/category'
  }).then((res)=>{
    // console.log(res)
    let category = res.data.data.category.list
    this.setData({
      category,
      maitKeyFlse:category[this.data.activeKey].maitKey
    })
    // console.log(category[this.data.activeKey])
    this.clickActive(category[this.data.activeKey].maitKey)
  })
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
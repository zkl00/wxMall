const  types = ['pop','new','sell']
import request from '../../network/request.js'
Page({
  
  /**
   * 页面的初始数据
   */
  data: {
    // 轮播图数据
    banner:[],
    recommend:[],
    lists:['流行','新款','精选'],
    color:'',
    goods:{
      pop:{page:0,list:[]},
      new:{page:0,list:[]},
      sell:{page:'',list:[]}
    },
    proptype: 'pop',
    active_info:false
  },
  myClick(e){
    this.setData({
      color: e.target.dataset.index,
      proptype: types[e.target.dataset.index]
    })
  },
  //回到顶部 
  topBlick(){
    wx.pageScrollTo({
      scrollTop: 0,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.swertShow()
    this._getGood('pop');
    this._getGood('new');
    this._getGood('sell');
  },
  _getGood(type){
    const page = this.data.goods[type].page + 1;
    request({
      url: '/home/data',
      data:{
        type:type,
        page:page
      },
    }).then((res)=>{
      const lsit = res.data.data.list
      // console.log(lsit)
      // 设置type中的list
      var oddList = this.data.goods[type].list
      oddList.push(...lsit)
      ///讲数据放到data中
      const Keydata = `goods.${type}.list`;
      const pageKey = `goods.${type}.page`
      // 跟新数据
      this.setData({
        [Keydata]: oddList,
        [pageKey]: page
      })
      // 停止加载图标
      wx.hideLoading()
    })
  },


  // 调取轮播图数据
  swertShow(){
    request({
      url: '/home/multidata',
    }).then((res)=>{
      const banner = res.data.data.banner.list;
      const recommend = res.data.data.recommend.list
      this.setData({
        banner,
        recommend
      })
    })
  },
  // 跳转到详情页面
  onClikDetaile(e){
    let iid = e.target.dataset.index
    console.log(iid)
    wx.navigateTo({
      url:'../detaill/detaill?iid='+iid
    })
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this._getGood(this.data.proptype)
    wx.showLoading({
      title: '正在加载....',
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  },
  // 滑动生命周期
  onPageScroll(e){
    const sroll = e.scrollTop
    // 判断是否显示active_info属性
    const flag = sroll>=1000;
    if (flag != this.data.active_info){
      this.setData({
        active_info: flag
      })
    }
    
  },
})
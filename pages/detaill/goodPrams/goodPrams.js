// pages/detaill/goodPrams/goodPrams.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    goodlist:{
      type:Object,
      value:{}
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 给父亲传值
    btnClick(){
      let list = "123"
      this.triggerEvent("btn",list)

    }
  }
})

var app = getApp()
const URL = app.globalData.url

Page({

  /**
   * 页面的初始数据
   */
  data: {
    poem: []
  },
  onLoad: function () {
    /*这里是从全局把之前拿到的古诗列表返回*/
    var that = this
    console.log(app.globalData.userInfo.nickName)
    that.setData({
      poem:app.globalData.poems
    })
  },
  // 原来写的代码是真的沙雕，点击跳转到相应的古诗界面
  item_1:function(){
    app.globalData.poem = this.data.poem[0]
    wx.navigateTo({
      url: '../gsInfo/gsInfo',
    })  
  },
  item_2: function () {
    app.globalData.poem = this.data.poem[1]
    console.log(app.globalData.poem)
    wx.navigateTo({
      url: '../gsInfo/gsInfo',
    })
  },
  item_3: function () {
    app.globalData.poem = this.data.poem[2]
    wx.navigateTo({
      url: '../gsInfo/gsInfo',
    })
  },
  item_4: function () {
    app.globalData.poem = this.data.poem[3]
    wx.navigateTo({
      url: '../gsInfo/gsInfo',
    })
  },
  item_5: function () {
    app.globalData.poem = this.data.poem[4]
    wx.navigateTo({
      url: '../gsInfo/gsInfo',
    })
  },
})
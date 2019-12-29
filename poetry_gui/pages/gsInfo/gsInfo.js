// pages/gsInfo/gsInfo.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    poem:[],
    showIndex: 0
  },
  onLoad:function(){
    this.setData({
      poem:app.globalData.poem
    })
  },
  panel: function (e) {
    if (e.currentTarget.dataset.index != this.data.showIndex) {
      this.setData({
        showIndex: e.currentTarget.dataset.index
      })
    } else {
      this.setData({
        showIndex: 0
      })
    }
  },
  switchToIndex: function(){
    wx.reLaunch({
      url: '../index/index',
    })
  }
})
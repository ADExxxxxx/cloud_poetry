// pages/xunshi/xunshi.js
var app = getApp();
const URL = app.globalData.url
Page({

  /**
   * 页面的初始数据
   */
  data: {
    content: "",
    id: "",
    answer: ""
  },

  /**
   * 生命周期函数--监听页面加载
   * 页面加载时响应请求，获取到验证问题的内容及Id
   */
  onShow: function () {
    var that = this
    wx.request({
      url: URL + "question.php",
      success: function (res) {
        console.log(res.data)
        that.setData({
          content: res.data.content,
          id: res.data.id
        })
      }
    })
    //清空之前的输入
    that.setData({
      answer: ""
    })
  },


  listenSubmit: function (e) {
    var that = this
    wx.request({
      url: URL + "judge.php",
      // 监听输入，把答案和题目id上传，在后台进行判断
      data: {
        id: that.data.id,
        answer: e.detail.value.answer
      },
      success: function (res) {
        console.log(res.data)
        if (res.data == 0) {
          wx.showToast({
            title: '答案错误',
            icon: 'fail',
            duration: 2000
          })
          that.setData({
            answer: ""
          })
        }
        if (res.data == 1) {
          wx.showToast({
            title: '答案正确',
            icon: 'success',
            duration: 2000
          })
          wx.navigateTo({
            url: '../gsList/gsList',
          })
        }
      },
      fail: function (res) {
        wx.showToast({
          title: '提交失败',
          icon: "fail",
          duration: 2000
        })
      }
    })

  }
})
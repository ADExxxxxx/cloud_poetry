// pages/login/login.js
const app = getApp()
const URL = app.globalData.url
Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    nickName:"",
    avatarUrl:""
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          console.log(app.globalData),
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  logout:function(){
    if (app.globalData.userInfo) {
      app.globalData.openId="",
      this.setData({
        userInfo: {},
        hasUserInfo: false
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.globalData.openId="",
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: {},
          hasUserInfo: false
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      app.globalData.openId="",
            this.setData({
            userInfo: {},
            hasUserInfo: false
          })
    }
  },
  getUserInfo: function (e) {
    console.log(e)
    var that = this
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
    wx.login({
      success(res) {
        console.log(res.code)
        console.log(that.data.userInfo.nickName)
        if (res.code) {
          //发起网络请求
          wx.showToast({
            title: '登录成功',
            icon: 'sucess',
            duration: 1000
          })
          wx.request({
            url: URL + "login.php",
            data: {
              code: res.code,
              nickName: that.data.userInfo.nickName,
              avatarUrl: that.data.userInfo.avatarUrl
            },
            
            success:function(res1){
              that.setData({
                nickName: that.data.userInfo.nickName,
                avatarUrl: that.data.userInfo.avatarUrl
              })
              console.log(res1.data)
              app.globalData.openId = res1.data
              console.log(that.data.userInfo.nickName)
            },
            fail:function(res2){
              wx.showToast({
                title: '用户信息上传失败',
                icon: 'fail',
                duration: 1000
              }) 
            }
          })
        } else {
          wx.showToast({
            title: '登录失败',
            icon: 'fail',
            duration: 1000
          })
        }
      }
    })
  }
})

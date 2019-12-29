// pages/photo/photo.js
var app = getApp()
const URL = app.globalData.url
Page({
  data: {
    tempFilePath:""
  },

  //该函数实现图片上传功能
  uploadImage:function(){
    var that = this
    
    // 判断是否有登录的openid信息
    if(app.globalData.openId != "")
    {
      wx.chooseImage({
        count:1,
        success: function(res) {
          // 弹出弹框
          wx.showModal({
            title: '上传照片',
            content: '是否上传此照片',
            cancelText:"否",
            confirmText:"是",

            //判断选择情况
            success:function(res1){
              if(res1.cancel){
                wx.showToast({
                  title: '上传取消',
                  duration:2000
                })
              }
              else{
                // 用户点击了“是”
                that.data.tempFilePath = res.tempFilePaths[0]
                console.log(app.globalData.openId)
                wx.uploadFile({
                  url: URL + 'upload.php?nickname=' + app.globalData.userInfo.nickName,
                  filePath: that.data.tempFilePath,
                  name: 'file',
                  header: {
                    'content-type': 'application/json' // 默认值
                  },
                  success(res) {
                    //上传图片，并进行识别，然后将返回的古诗列表返回给全变量
                    console.log(app.globalData.userInfo)
                    console.log("图片上传成功")
                    console.log(res.data)
                    if (app.globalData.userInfo != null) {
                      wx.request({
                        url: URL + 'camera.php',
                        data: {
                          nickname: app.globalData.userInfo.nickName
                        },
                        success: function (res) {
                          console.log(res.data)
                          app.globalData.poems = res.data
                        }
                      })
                    }
                   
                    wx.navigateTo({
                      url: '../question/question',
                    })
                  }
                })
              }
            }
          })
        },
      })
    }

    else{
      wx.showToast({
        title: '请先登录',
        icon:"loading",
        duration:1000
      }),
      setTimeout(function(){wx.switchTab({
        url: '../login/login',
      })},1000)
    }
 },

  onHide:function(){  
  }
})
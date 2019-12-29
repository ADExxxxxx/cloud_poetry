// pages/xunshi/xunshi.js
var app = getApp();
const URL=app.globalData.url
Page({

  /**
   * 页面的初始数据
   */
  data: {
    content: "",
    id: "",
    licensePlate_digital1: [
      "1", "2", "3",
      "4", "5"
    ],
    licensePlate_digital2: [
      "6", "7", "8",
      "9", "0"
    ],
    LicensePlateNumber: '',
    answer:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    var that = this
    wx.request({
      url: URL + "question.php",
      success: function (res1) {
        console.log(res1.data)
        that.setData({
          content: res1.data.content,
          id: res1.data.id
        })
      }
    })
    that.setData({
      answer: ""
    })
  },

/** */
  LicensePlateNumber: function () {
    var that = this;
    var LicensePlateNumber = this.data.LicensePlateNumber;
    var LicensePlateNumberLen = LicensePlateNumber.length;
    console.log(LicensePlateNumber, LicensePlateNumberLen)
  },
  // 删除
  licensePlate_delete: function (e) {
    var LicensePlateNumber = this.data.LicensePlateNumber;
    var LicensePlateNumberLen = LicensePlateNumber.length;
    var LicensePlateNumberDelete = LicensePlateNumber.substr(0, LicensePlateNumber.length-1);
    var NewLicensePlateNumber = LicensePlateNumberDelete;
    this.setData({
      LicensePlateNumber: NewLicensePlateNumber
    })
  },
  // 清空
  licensePlate_empty: function (e) {
    this.setData({
      LicensePlateNumber: '',
    })
  },
 // 点击获取数字
  licensePlate_digital1: function (e) {
    var LicensePlateNumber = this.data.LicensePlateNumber;
    var LicensePlateNumberLen = LicensePlateNumber.length;
    
      this.setData({
        LicensePlateNumber: LicensePlateNumber + e.target.dataset.licenseplateprovinces
      })
      
     
  }, 
  licensePlate_digital2: function (e) {
    var LicensePlateNumber = this.data.LicensePlateNumber;
    var LicensePlateNumberLen = LicensePlateNumber.length;
    
      this.setData({
        LicensePlateNumber: LicensePlateNumber + e.target.dataset.licenseplateprovinces
      })
      

    
  },
/** */
 

  listenSubmit: function (e) {
    var that = this
    wx.request({
      url: URL + "judge.php",
      data: {
        id: that.data.id,
        answer: this.data.LicensePlateNumber
      },
      success: function (res) {
        console.log(res.data)
        if (res.data == 0) {
          wx.showToast({
            title: '答案错误',
            icon: 'fail',
            duration: 1000
          })
          that.setData({
            answer:""
          })
        }
        if (res.data == 1) {
          wx.showToast({
            title: '答案正确',
            icon: 'success',
            duration: 1000
          })
          wx.showModal({
            title: '您查询到的物体是：' + app.globalData.poems[0]['key'],
            content: '是否继续查询',
            cancelText: "否",
            confirmText: "是",
            success: function (res2) {
              if (res2.cancel) {
                wx.showToast({
                  title: '取消查询',
                  duration: 1000,
                })
              }
              else {
                wx.navigateTo({
                  url: '../gsList/gsList',
                })
              }
            }
          })
        }
      },
      fail: function (res) {
        wx.showToast({
          title: '提交失败',
          icon: "fail",
          duration: 1000
        })
      }
    })

  },
})


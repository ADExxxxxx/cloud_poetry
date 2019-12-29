// pages/more/more.js
var app=getApp()
Page({
  data: {
    "picUrl": [{
      "url": "/images/top1.png"
    }, {
      "url": "/images/top2.png"
    }, {
      "url": "/images/top3.png"
    }],
    indicatorDots: true,
    autoplay: true,
    circular: true,
    interval: 5000,
    duration: 1000
  },
})
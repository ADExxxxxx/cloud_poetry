var app = getApp()
Page({

  data: {
    ans: '',
  },
  ansinp: function (e) {
    this.setData({
      ans: e.detail.value
    })
  },
})
Component({

  externalClasses: ['v-panel'],

  properties: {
    buttonBorder: {
      type: String,
      value: "1px solid #ccc"
    },
    backgroundColor: {
      type: String,
      value: "#fff"
    },
  },
  data: {
    keyNumber1: '12345',
    keyNumber2: '67890',
    
 },

  methods: {
    vehicleTap: function (event) {
      let val = event.target.dataset.value;
      switch (val) {
        case 'delete':
          this.triggerEvent('delete');
          this.triggerEvent('inputchange');
          break;
        default:
          this.triggerEvent('inputchange', val);
      }
    },
  }
});

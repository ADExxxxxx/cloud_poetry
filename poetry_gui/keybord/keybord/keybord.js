Component({
  externalClasses: ['v-panel'],
  properties: {
    isShow: {
      type: Boolean,
      value: false,
    },
    buttonBorder: {
      type: String,
      value: "1px solid #ccc"
    },
    backgroundColor: {
      type: String,
      value: "#fff"
    },
    //1为省份键盘，其它为英文键盘
    keyBoardType: {
      type: Number,
      value: 1,
    },
    //true 显示键盘数字部分  
    numBoard: {
      type: Boolean,
      value: false,
    }
  },
  data: {
 
    keyNumber1: '12345',
    keyNumber2: '67890',
  },
  methods: {
    offkr: function () {
      let that = this;
      that.setData({
        isShow: false,
      })
    },
    vehicleTap: function (event) {
      let val = event.target.dataset.value;
      switch (val) {
        case 'delete':
          this.triggerEvent('delete');
          // this.triggerEvent('inputchange');
          break;
        case 'ok':
          this.triggerEvent('ok');
          break;
        default:
          this.triggerEvent('inputchange', val);
      }
    },
  }
});
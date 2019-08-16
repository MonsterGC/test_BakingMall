// pages/address/address.js
Page({
  data: {
    address: [{
      index:1,
      myManname: "陈晓红",
      myMannumber: "18819883504",
      myManaddress: "广东省茂名市茂南区",
      myMandetail: '官渡二路139号 广东石油化工学院',
      checked: "true"
    }, {
      index:2,
      myManname: "李晓明",
      myMannumber: "18819883504",
      myManaddress: "广东省茂名市茂南区",
      myMandetail: '官渡二路139号 广东石油化工学院',
      checked: "false"
    }]

  },

  delItem: function (e) {
    var that = this;
    wx.showModal({
      title: '提示',
      content: '是否删除？',
      success: function (res) {
        if (res.confirm) {
          var index = e.target.dataset.index;
          var list = that.data.address; 
          list.splice(index, 1);
        }
      }
    })
  },
  addDetail:function(e){
    wx.navigateTo({
      url: '../../pages/address_detail/address_detail',
    })
  },
  onLoad: function (options) {

  }

})
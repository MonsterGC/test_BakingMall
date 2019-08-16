const app = getApp()
const util = require('../../utils/util.js')
Page({
  data:{
    myId: '',
    orderDatails:[{
      myManname: "",
      myMannumber: "",
      myManaddress: "",
      myMandetail: '',
      myMessage: "",
      goodList:[{
        ogGoodid:'',
        ogPicture: "",
        goName: "",
        unit_all_price: "",
        ogGoodsum: "",
      }],
      
      myAllpay:'',
      myAllSentpay:'',
      myId:'',
      myCreattime: "",
      myPaytime: "",
      myFinishtime: "",
      myState: '',
      prepayId: '',
    }],
    allPrice: "",
  },
	toProductDetails:function(e){
    var goodList = this.data.orderDatails.goodList;
    var ogGoodid = e.currentTarget.id;
    var img = '';
    for (var key in goodList) {
      if (goodList[key].ogGoodid == ogGoodid) {
        img = goodList[key].ogPicture;
        break;
      }
    }
		 wx.navigateTo({
       url: '../detail/detail?id=' + ogGoodid + '&goImg=' + img
	    })
	},
  tosellerorder:function(){
    wx.navigateTo({
      url: '../seller_order/seller_order',
    })
  },
  //去支付
  topay: function (e) {
    this.checkGoodStockBeforeBuy(e);
  },
  // 确认收货
  tobesure: function (e) {
    var that = this;
    wx.showModal({
      title: '确认收货',
      content: '是否确认收货？',
      success: function (res) {
        if (res.confirm) {
          var thatmyid = e.currentTarget.dataset.id;
          that.setData({ currentmyid: thatmyid });
          that.changeOrderState(2);
        }
      },
    });
  },
  // 去支付判断商品库存量的接口
  checkGoodStockBeforeBuy: function (e) {
    var that = this;
    var goodids = '';
    var num = '';
    for (var i = 0; i < that.data.orderDatails.goodList.length; i++) {
      goodids += that.data.orderDatails.goodList[i].ogGoodid;
          goodids += ';';
          num += that.data.orderDatails.goodList[i].ogGoodsum;
          num += ';';
      }
    goodids = (goodids.substring(goodids.length - 1) == ';') ? goodids.substring(0, goodids.length - 1) : goodids;
    num = (goodids.substring(num.length - 1) == ';') ? num.substring(0, num.length - 1) : num;
    wx.request({
      url: util.getUrl() + '/checkGoodStockBeforeBuy',
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        "goodIds": goodids,
        "buySums": num
      },
      success: function (res) {
        var code = res.data.code;
        if (code == 200) {
          that.sign(that.data.orderDatails.prepayId);
        }
      }
    })
  },
  //签名
  sign: function (prepay_id) {
    var that = this;
    wx.request({
      url: util.getUrl() + '/getSign',
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: { 'repay_id': prepay_id },
      success: function (res) {
        that.requestPayment(res.data);
      }
    })
  },
  //申请支付
  requestPayment: function (obj) {
    var that = this;
    wx.requestPayment({
      'timeStamp': obj.timeStamp,
      'nonceStr': obj.nonceStr,
      'package': obj.package,
      'signType': obj.signType,
      'paySign': obj.paySign,
      'success': function (res) {
        wx.showModal({
          title: '支付后台处理返回信息',
          content: '支付成功',
          showCancel: false,
          success: function () {
            that.changeOrderState(1);
          }
        });
      }
    })
  },
  // 改变订单的状态 （去支付（只有支付成功才处理，不成功没有调用） ，确认收货 ）
  changeOrderState: function (operation) {
    var that = this;
    var myId = that.data.orderDatails.myId;
    wx.request({
      url: util.getUrl() + '/changeOrderState',
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        'myId': myId,
        'operation': operation
      },
      success: function (res) {
        that.getOrderDetails(that.data.myId);
      }
    })

  },
  onLoad:function(e){
    this.getOrderDetails(e.id);
  },
  getOrderDetails:function(id){
    var that = this;
    var id = id;
    that.data.myId = id;
    wx.request({
      url: util.getUrl() + '/getOrderDetails',
      method: 'GET',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        "myId": id
      },
      success: function (res) {
        var orderDatails = res.data.extend.orderDatails;
        var allPrice=0.0;
        var goodList = orderDatails.goodList;
        for(var key in goodList){
          allPrice += goodList[key].unit_all_price * goodList[key].ogGoodsum;
        }
        that.setData({ orderDatails: orderDatails, allPrice: allPrice});
      }
    })
  }
});
const app = getApp()
var util = require('../../utils/util.js')
Page({
  data: {
    isHaveAddress: false,
    isHaveCoupons: false,
    addressInfo: null,
    cartlistShow: true,
    allPrice: 0,//总共需要支付的价格
    selectedAllStatus: false,
    Name: '',
    Phone: '',
    conciseAddress: '',
    Address: '',
    Message: '',
    cartShopList: [
      {
        goId: '',
        caPicture: '',
        goName: '',
        gkPrice: '',
        caGoodsum: '',
        caId: '',
        checked: '',
        txtStyle: "",
        add_red: '',
      }],
    allPrice: 0,
    out_trade_no: '',
    prepay_id: '',
    source: '',
    goId: '',
    goSentpay:'',
  },

  //商品数量减少
  itemCountSub: function (e) {
    var index = e.currentTarget.dataset.index;
    var list = this.data.cartShopList;
    if (list[index].caGoodsum > 1) {
      list[index].add_red = 2;
      list[index].caGoodsum = --list[index].caGoodsum;
      this.setData({
        cartShopList: list,
      });
      this.changeCartGoodSum(e);
    }
    //计算总价格
    this.allShopPrice();

  },
  //商品数量增加
  itemCountAdd: function (e) {
    var index = e.currentTarget.dataset.index;
    var list = this.data.cartShopList;
    list[index].add_red = 1;
    list[index].caGoodsum = ++list[index].caGoodsum;
    this.setData({
      cartShopList: list,
    });
    this.changeCartGoodSum(e);
    //计算总价格
    this.allShopPrice();
  },
  // 改变购物车商品数量接口
  changeCartGoodSum: function (e) {
    var that = this;
    var id = e.currentTarget.dataset.index;
    var list = that.data.cartShopList;
    var caId = list[id].caId;
    var add_red = list[id].add_red;
    wx.request({
      url: util.getUrl() + '/changeCartGoodSum',
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        "cartId": caId,
        "add_red": add_red
      },
      success: function (res) {
      }
    })
  },
  /* 计算总价格*/
  allShopPrice: function () {
    var shopList = this.data.cartShopList;
    var shopPrice = 0.0;
    var goSentpay = 0.0;
    for (var key in shopList) {
      if (shopList[key].checked == true) {
        shopPrice += shopList[key].gkPrice * shopList[key].caGoodsum;
        if (shopList[key].goSentpay > goSentpay){
          goSentpay = shopList[key].goSentpay;
        }
      }
    };
    shopPrice += goSentpay;
    this.setData({
      allPrice: shopPrice,
      goSentpay: goSentpay
    });
  },
  // 数量改变
  valchange: function (e) {
    var index = parseInt(e.target.dataset.index);
    var cartShopList = this.data.cartShopList;
    this.setData({
      cartShopList: cartShopList
    });
    this.allShopPrice();
  },
  //去支付按钮
  pay: function (e) {
    var Name=this.data.Name;
    var Phone = this.data.Phone;
    var conciseAddress = this.data.conciseAddress;
    var address = this.data.address;
    var phonetest = /^1[3|4|5|7|8][0-9]\d{4,8}$/;
    if (Name != '' && phonetest.test(Phone) && conciseAddress != '' && address != ''){
      this.checkGoodStockBeforeBuy(e);
    }else{
      wx.showToast({
        title: "请核对收货信息",
        icon: 'loading',
        duration: 1000
      })
    }
    
  },
  name: function (e) {
    var that = this;
    that.setData({
      Name: e.detail.value
    })
  },
  phone: function (e) {
    var that = this;
    that.setData({
      Phone: e.detail.value
    })
    var Phone = that.data.Phone
    if (!(Phone.length === 11)) {
      wx.showToast({
        icon: 'loading',
        title: '请输入11位数手机号码',
        duration: 2000
      })
    }
  },
  conciseaddress: function (e) {
    var that = this;
    that.setData({
      conciseAddress: e.detail.value
    })
  },
  address: function (e) {
    var that = this;
    that.setData({
      Address: e.detail.value
    })
  },
  message: function (e) {
    var that = this;
    that.setData({
      Message: e.detail.value
    })
  },
  // 立即购买判断商品库存量的接口
  checkGoodStockBeforeBuy: function (e) {
    var that = this;
    var goodids = '';
    var nums = '';
    for (var i = 0; i < that.data.cartShopList.length; i++) {
      goodids += that.data.cartShopList[i].goId;
      goodids += ';';
      nums += that.data.cartShopList[i].caGoodsum;
      nums += ';';
    }
    goodids = (goodids.substring(goodids.length - 1) == ';') ? goodids.substring(0, goodids.length - 1) : goodids;
    nums = (nums.substring(nums.length - 1) == ';') ? nums.substring(0, nums.length - 1) : nums;
    wx.request({
      url: util.getUrl() + '/checkGoodStockBeforeBuy',
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        "goodIds": goodids,
        "buySums": nums
      },
      success: function (res) {
        var code = res.data.code;
        if (code == 200) {
          wx.login({
            success: function (res) {
              that.getOpenId(res.code);
            }
          });
        }

      }
    })
  },
  // 得到openid
  getOpenId: function (code) {
    var that = this;
    wx.request({
      url: util.getUrl() + '/getOpenid',
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: { 'code': code },
      success: function (res) {
        that.xiadan(res.data.extend.map.openid);
      }
    })
  },
  //下单（注意：下单需要前台传来的参数：openid，total_fee（实付款，单位为分），spbill_create_ip（终端ip）,goodId:商品id）
  xiadan: function (openId) {
    var that = this;
    var total_fee = that.data.allPrice * 100;
    var goodids = '';
    for (var i = 0; i < that.data.cartShopList.length; i++) {
      if (that.data.cartShopList[i].checked == true) {
        goodids += that.data.cartShopList[i].goId;
        goodids += ';';
      }
    }
    goodids = (goodids.substring(goodids.length - 1) == ';') ? goodids.substring(0, goodids.length - 1) : goodids;
    wx.request({
      url: util.getUrl() + '/xiaDan',
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        'openid': openId,
        'total_fee': total_fee,
        'spbill_create_ip': app.globalData.spbillCreateIp,
        'goodIds': goodids
      },
      success: function (res) {
        //统一下单后可以获得prepay_id和商户订单号(out_trade_no)
        var prepay_id = res.data.prepay_id;
        that.setData({
          out_trade_no: res.data.out_trade_no,
          prepay_id: prepay_id
        })
        //再由prepay_id进行签名
        that.sign(prepay_id);
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
        //签名完成进行申请支付
        if (that.data.source == 'cart') {
          that.requestPayment(res.data);
        } else if (that.data.source == 'detail') {
          that.buyGoodWithOne(res.data);
        }


      }
    })
  },
  //申请支付（注意：申请支付后无论是支付成功还是失败都要调用订单中的相应接口把数据写入数据库订单表）
  requestPayment: function (obj) {
    var that = this;
    var caId = [];
    for (var i = 0; i < that.data.cartShopList.length; i++) {
      if (that.data.cartShopList[i].checked == true) {
        caId.push(this.data.cartShopList[i].caId);
      }
    }
    wx.requestPayment({
      'timeStamp': obj.timeStamp,
      'nonceStr': obj.nonceStr,
      'package': obj.package,
      'signType': obj.signType,
      'paySign': obj.paySign,
      'success': function (res) {
        wx.request({
          url: util.getUrl() + '/buyGoodWithThese',
          method: 'POST',
          header: {
            'content-type': 'application/x-www-form-urlencoded'
          },
          data: {
            'session_meid': app.globalData.session_meid,//用户id
            'myAllpay': that.data.allPrice,//实付款
            'myState': 2,//订单状态（这里是success回调函数，所以订单状态是2(代表已支付)
            //收货信息
            'myManname': that.data.Name,
            'myMannumber': that.data.Phone,
            'myManaddress': that.data.conciseAddress,
            'myMandetail': that.data.Address,
            'myMessage': that.data.Message,
            "device_info": "",
            'spbillCreateIp': app.globalData.spbillCreateIp,//终端ip
            'transaction_id': that.data.out_trade_no,//商户订单号
            'nonceStr': obj.nonceStr,//随机字符串
            'sign': obj.paySign,//签名数据
            'signType': obj.signType,//签名类型
            'timeStamp': obj.timeStamp,            //时间戳
            'cartId': caId,//购物车id数组
          },
          //支付成功数据写入成功回调函数
          success: function (res) {
            that.handleSuccessResult(res);
          }
        })
      },
      //同理，支付失败回调函数（少了一些必要参数而已）
      'fail': function (res) {
        wx.request({
          url: util.getUrl() + '/buyGoodWithThese',
          method: 'POST',
          header: {
            'content-type': 'application/x-www-form-urlencoded'
          },
          data: {
            'session_meid': app.globalData.session_meid,
            'myAllpay': that.data.allPrice,
            'myState': 1,
            'myManname': that.data.Name,
            'myMannumber': that.data.Phone,
            'myManaddress': that.data.conciseAddress,
            'myMandetail': that.data.Address,
            'myMessage': that.data.Message,
            'cartId': caId,
            'prepayId': that.data.prepay_id
          },
          success: function (res) {
              that.handleSuccessResult(res);
          }
        })
      },
    })
  },
  buyGoodWithOne: function (obj) {
    var that = this;
    var id = that.data.cartShopList[0].goId;
    var num = that.data.cartShopList[0].caGoodsum;
    var ogPicture = that.data.cartShopList[0].caPicture;

    wx.requestPayment({
      'timeStamp': obj.timeStamp,
      'nonceStr': obj.nonceStr,
      'package': obj.package,
      'signType': obj.signType,
      'paySign': obj.paySign,
      'success': function (res) {
        wx.request({
          url: util.getUrl() + '/buyGoodWithOne',
          method: 'POST',
          header: {
            'content-type': 'application/x-www-form-urlencoded'
          },
          data: {
            'session_meid': app.globalData.session_meid,//用户id
            'myAllpay': that.data.allPrice,//实付款
            'myState': 2,//订单状态（这里是success回调函数，所以订单状态是2(代表已支付)）

            //收货信息
            'myManname': that.data.Name,
            'myMannumber': that.data.Phone,
            'myManaddress': that.data.conciseAddress,
            'myMandetail': that.data.Address,
            'myMessage': that.data.Message,

            'spbillCreateIp': app.globalData.spbillCreateIp,//终端ip
            'transactionId': that.data.out_trade_no,//商户订单号
            'nonceStr': obj.nonceStr,//随机字符串
            'sign': obj.paySign,//签名数据
            'signType': obj.signType,//签名类型
            'timeStamp': obj.timeStamp,            //时间戳
            "ogGoodid": id,
            "ogKindname": '',
            "ogGoodsum": num,
            "ogPicture": ogPicture
          },
          //支付成功数据写入成功回调函数
          success: function (res) {
            that.handleSuccessResult(res);
          }
        })
      },
      //同理，支付失败回调函数（少了一些必要参数而已）
      'fail': function (res) {
        wx.request({
          url: util.getUrl() + '/buyGoodWithOne',
          method: 'POST',
          header: {
            'content-type': 'application/x-www-form-urlencoded'
          },
          data: {
            'session_meid': app.globalData.session_meid,
            'myAllpay': that.data.allPrice,
            'myState': 1,

            'myManname': that.data.Name,
            'myMannumber': that.data.Phone,
            'myManaddress': that.data.conciseAddress,
            'myMandetail': that.data.Address,
            'myMessage': that.data.Message,

            "ogGoodid": id,
            "ogKindname": '',
            "ogGoodsum": num,
            "ogPicture": ogPicture,
            'prepayId': that.data.prepay_id
          },
          success: function (res) {
            that.handleSuccessResult(res);
          }
        })
      }
    })
  },
  handleSuccessResult: function (res) {
    var myid = res.data.extend.myid;
    var msg = res.data.extend.pay_msg;
    wx.showModal({
      title: '支付后台处理返回信息',
      content: msg,
      showCancel: false,
      success: function () {
        wx.redirectTo({
          url: '../../pages/order_detail/order_detail?id=' + myid,
        });
      }
    });
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    var cartShopList = options.cartShopList;
    var cartShopList1 = JSON.parse(cartShopList);
    var source = options.source;
    this.setData({
      cartShopList: cartShopList1,
      source: source
    })
  },
  onShow: function () {
    // 页面显示
    var otherAddressInfo = getApp().globalData.otherAddressInfo;
    if (otherAddressInfo == null) {
      var addressList = wx.getStorageSync('address');
      for (var key in addressList) {
        if (addressList[key].isDefult) {
          this.setData({
            addressInfo: addressList[key],
            isHaveAddress: true,
          });
        }
      }
      if (this.data.addressInfo == null && addressList.length > 0) {
        this.setData({
          addressInfo: addressList[0],
          isHaveAddress: true,
        });
      }
    } else {
      this.setData({
        addressInfo: otherAddressInfo,
        isHaveAddress: true,
      });
    }
    //计算总价格
    this.allShopPrice();
  },
  onUnload: function () {
    // 页面关闭
    app.globalData.otherAddressInfo = null;
  }
})
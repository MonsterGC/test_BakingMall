var WxAutoImage = require("../../js/wxAutoImageCal.js");
var app = getApp();

Page({
  data: {
    activeItem:[{
      videoSrc: 'http://wxsnsdy.tc.qq.com/105/20210/snsdyvideodownload?filekey=30280201010421301f0201690402534804102ca905ce620b1241b726bc41dcff44e00204012882540400&bizid=1023&hy=SH&fileparam=302c020101042530230204136ffd93020457e3c4ff02024ef202031e8d7f02030f42400204045a320a0201000400',
      autoplay:'flase',
      videoPoster:'http://119.29.180.220:8068/Image/getImage/06视频封面/01',
      activeGoodsName:'樱花芝士蛋糕DIY教程'
    }, {
      videoSrc: 'http://wxsnsdy.tc.qq.com/105/20210/snsdyvideodownload?filekey=30280201010421301f0201690402534804102ca905ce620b1241b726bc41dcff44e00204012882540400&bizid=1023&hy=SH&fileparam=302c020101042530230204136ffd93020457e3c4ff02024ef202031e8d7f02030f42400204045a320a0201000400',
      autoplay: 'flase',
      videoPoster: 'http://119.29.180.220:8068/Image/getImage/06视频封面/02',
      activeGoodsName: '草莓慕斯蛋糕DIY教程'
    },],
    activeItem1: [{
      videoSrc1: 'http://wxsnsdy.tc.qq.com/105/20210/snsdyvideodownload?filekey=30280201010421301f0201690402534804102ca905ce620b1241b726bc41dcff44e00204012882540400&bizid=1023&hy=SH&fileparam=302c020101042530230204136ffd93020457e3c4ff02024ef202031e8d7f02030f42400204045a320a0201000400',
      autoplay1: 'flase',
      videoPoster1: 'http://119.29.180.220:8068/Image/getImage/06视频封面/03',
      activeGoodsName1: '自制草莓慕斯蛋糕'
    }, {
      videoSrc1: 'http://wxsnsdy.tc.qq.com/105/20210/snsdyvideodownload?filekey=30280201010421301f0201690402534804102ca905ce620b1241b726bc41dcff44e00204012882540400&bizid=1023&hy=SH&fileparam=302c020101042530230204136ffd93020457e3c4ff02024ef202031e8d7f02030f42400204045a320a0201000400',
      autoplay1: 'flase',
      videoPoster1: 'http://119.29.180.220:8068/Image/getImage/06视频封面/04',
      activeGoodsName1: '自制樱花芝士蛋糕'
    },],
    tabArr: {
      curHdIndex: 0,
      curBdIndex: 0,
    }
  },
  tabFun: function (e) {
    //获取触发事件组件的dataset属性 
    var _datasetId = e.target.dataset.id;
    console.log("----" + _datasetId + "----");
    var _obj = {};
    _obj.curHdIndex = _datasetId;
    _obj.curBdIndex = _datasetId;
    this.setData({
      tabArr: _obj
    });
  },
  cusImageLoad: function (e) {
    var that = this;
    that.setData(WxAutoImage.wxAutoImageCal(e));
  },
  playandpause:function(){
    if(this.play){
      var that=this;
      this.setData("activeItem.autoplay","flase");
      that.play
    }
  }
})
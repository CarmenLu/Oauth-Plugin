var plugin = requirePlugin("myPlugin")
import regeneratorRuntime from '../runtime.js'// eslint-disable-line 引用
const app=getApp();
Page({
    data:{
      account:'',
        password:'',
        json:{},
        res:{},
        code:''
    },
    async Load(){
      var that=this;
      let res=await plugin.getOAuthorizeData();
      this.setData({
          res:res
      })
    },
  onLoad: function() {
  var that=this;
  that.Load();
  },
    bindInput(e) {
        console.log(e)
        this.setData({
            [e.currentTarget.dataset.key]: e.detail.value
        })
    },
  getCode:async function(){
        var that=this;
    this.data.code=await plugin.getCode(that.data.account,that.data.password,that.data.res);
    console.log(this.data.code);
  },
    getUserInfo:async function(){
    var that=this;
    let userinfo=await plugin.getinfo(that.data.res,that.data.code);
    console.log(userinfo);
    }
})
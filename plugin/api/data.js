
import {api} from '../utils/config/api'
import regeneratorRuntime from '../utils/third-party/runtime' // eslint-disable-line
import {wxRequest} from "../utils/lib/wxApi"

var data = 'init data'

function getData() {
  return data
}

function setData(value) {
  data = value
}
const getOAuthorizeData=async function(){
    try{
        let parmas={
            method:'post',
            from:'mini'
        }
        let res=await wxRequest({
            url:api.verify,
            data:parmas
        })
        if (res.statusCode == 200) {
            console.log(res);
            return res;
        }
    } catch(e){
        console.log(e);
    }
}
const getCode=async function(account,password,datares){
    var cookieB
   const login=async function(account,password) {
        let res = await wxRequest({
            url: api.login,
            method: 'POST',
            needLogin: false,
            data: {account, password}
        })
        console.log(res);
        if (res.data['code'] == 0) {
            console.log('success');
            console.log(res);
            //获取登陆接口cookie
            let cookieBvalue
            let cookieBkey
            cookieBkey=res.cookies[0].name;
            cookieBvalue=res.cookies[0].value;
            cookieB = {cookieBkey, cookieBvalue}
            console.log('存储cookieB成功');
            console.log(cookieB);
            return cookieB;
        } }
const getAuthorizeCode=async function(){
        console.log(datares);
       var cookieB=await login(account,password);
        let { cookieBkey, cookieBvalue } =cookieB
        let params={
            response_type:'code',
            from:'mini',
            client_id:datares.data['client_id'],
            state:datares.data['client_state'],
            scope:datares.data['client.scope']
        }
        let res1=await wxRequest({
            url:api.authorize,
            data:params,
            header: { cookie: `${cookieBkey}=${cookieBvalue}` },
            needLogin:false
        })
        if(res1.statusCode==200){

            //  console.log(res);
            //  return res;
            return res1.data.authorization_code;
        }

    }
    return await getAuthorizeCode();

}

const getinfo=async function(datares,code) {
    const getSkey = async function (url, code, state,datares) {
        let cookieAKey=datares.cookies[0].name
        let cookieAValue=datares.cookies[0].value
        console.log(cookieAKey,cookieAValue)
        let res = await wxRequest({
            url: url,
            data: {code, state, from: 'mini'},
            method: 'GET',
            header: {cookie: `${cookieAKey}=${cookieAValue}`},
            needLogin: false
        })
        //  console.log(res)
        return res.data.skey;
    }
    const test=async function(skey){
        let res =await wxRequest({
            url:api.test,
            method:'POST',
            header:{skey:skey}

        })
        console.log(res.data.user_info);
        return res.data.user_info;
    }
    let url=datares.data['redirect_uri']
    let state=datares.data['state']
   let skey=await getSkey(url,code,state,datares);
    return await test(skey);

}


module.exports = {
  getData: getData,
  setData: setData,
  getinfo:getinfo,
  getOAuthorizeData:getOAuthorizeData,
  getCode:getCode
}
var data = require('./api/data.js')

module.exports = {
  getData: data.getData,
  setData: data.setData,
  getinfo:data.getinfo,
  getOAuthorizeData: data.getOAuthorizeData,
  getCode:data.getCode
}
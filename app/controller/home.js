'use strict';

const Controller = require('egg').Controller;
var parseString = require('xml2js').parseString;
// const Sha1 = require('sha1')

class HomeController extends Controller {
  // 鉴权
  async index() {
    const { ctx, app } = this;
    let { signature, echostr, timestamp, nonce } = ctx.query;
    console.log('ctx.query',ctx.query)

    const token = app.config.wechat_config.token; // 这个地方就是公众平台上所谓的token 必须一样
    // 将token、timestamp、nonce三个参数进行字典序排序
    const arr = [token, timestamp, nonce];
    arr.sort().join('');
    
    // 将三个参数字符串拼接成一个字符串进行sha1加密
    const str = arr.sort().join('');
    // console.log('sha1(str)',sha1(str))

    // if(sha1(str) === signature){
      ctx.body = echostr;
    // }else {
    //   ctx.body = false;
    // }
    
    

  }
  // 
  async reply () {
    const { ctx, app } = this;
    // console.log('this.',this.ctx.request.body)
    
    var xml = this.ctx.request.body;
    parseString(xml,(err,result) => {
      console.log('result.xml',result.xml)
      const xmlData = result.xml;
        
      const createTime = Date.parse(new Date());
      const msgType = xmlData.MsgType[0]; // 消息类型，event
      const toUserName = xmlData.ToUserName[0]; // 开发人员微信号
      const toFromName = xmlData.FromUserName[0]; // 发送方帐号（一个OpenID）
      const event = xmlData.Event ? xmlData.Event[0] : ''; // 事件类型，subscribe(订阅)、unsubscribe(取消订阅)
      
      console.log(event)
      
      if(msgType == 'event' && event == 'subscribe'){ // 关注后
          ctx.body = `
            <xml>
              <ToUserName><![CDATA[${toFromName}]]></ToUserName>
              <FromUserName><![CDATA[${toUserName}]]></FromUserName>
              <CreateTime>${createTime}</CreateTime>
              <MsgType><![CDATA[text]]></MsgType>
              <Content><![CDATA[欢迎关注秋风渡明月公众号，下面请开始你的表演！]]></Content>
            </xml>`;
      }
      else{// 其他情况
        ctx.body = `
          <xml>
            <ToUserName><![CDATA[${toFromName}]]></ToUserName>
            <FromUserName><![CDATA[${toUserName}]]></FromUserName>
            <CreateTime>${createTime}</CreateTime>
            <MsgType><![CDATA[text]]></MsgType>
            <Content><![CDATA[啊~啊~啊~你在发什么消息？]]></Content>
          </xml>`;
      }   
    })
  }
}

module.exports = HomeController;

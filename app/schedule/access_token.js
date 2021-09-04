const Subscription = require('egg').Subscription;

class UpdateCache extends Subscription {
  static get schedule() {
    return {
      interval: '2h',
      type: 'all',
    };
  }

  async subscribe() {
    const { ctx } = this
    const config = ctx.app.config.wechat_config;
    
    const url = config.getAccessTokenUrl.replace('APPID', config.appid).replace('APPSECRET', config.appSecret);
    console.log('url',url)
    const res = await ctx.curl(url, {
      dataType: 'json',
    });
    console.log('res.data.access_token',res.data.access_token);
    ctx.app.access_token = res.data.access_token;
    
  }
}

module.exports = UpdateCache;


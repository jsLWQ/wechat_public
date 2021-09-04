/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  config.wechat_config = {
    // token: 'wechat_public_number_demo',
    token: 'lq1996',
    appid: 'wx56aba3ce375fa525',
    appSecret:'5889a17cf9f4c395c5ecb234027d01c1',
    encodingAESKey: 'Dodb2OvW8FBNyGMEghJh9lkxeTcghKoxaPCQDYHtk97',
    // 获取access_token
    getAccessTokenUrl: 'https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=APPID&secret=APPSECRET',
    // 自定义菜单
    postCreateMenuUrl: 'https://api.weixin.qq.com/cgi-bin/menu/create?access_token=ACCESS_TOKEN',
  }

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1630399176542_2605';

  // add your middleware config here
  config.middleware = [];

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  // 使用sudo 进行编译
  config.cluster = {
    listen: {
       port: 8089,
       hostname: '10.255.2.93',
      // hostname: '110.42.255.45'
     },
  };

  config.security = {
    csrf: {
      // ignore: '/wechat',
      enable: false,
    },
  };


  // 覆盖egg自带的配置 使支持接收xml参数
  config.bodyParser = {
    enable: true,
    encoding: 'utf8',
    formLimit: '100kb',
    jsonLimit: '100kb',
    strict: true,
    // @see https://github.com/hapijs/qs/blob/master/lib/parse.js#L8 for more options
    queryString: {
      arrayLimit: 100,
      depth: 5,
      parameterLimit: 1000,
    },
    enableTypes: ['json', 'form', 'text'],
    extendTypes: {
      text: ['text/xml', 'application/xml'],
    },
  };

  return {
    ...config,
    ...userConfig,
  };
};

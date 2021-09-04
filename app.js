module.exports = app => {
  // 开始前执行
  app.beforeStart(async () => {
    await app.runSchedule('access_token');

    const menu = {
      button: [
        {
          name: '组一',
          sub_button: [
            {
              type: 'click',
              name: '今日歌曲',
              key: 'V1001_TODAY_MUSIC',
            }
          ],
        },
        {
          name: '组二',
          sub_button: [
            {
              type: 'scancode_waitmsg',
              name: '扫码带提示',
              url: "http://www.soso.com/"
            },
            {
              "type":"miniprogram",
              "name":"wxa",
              "url":"http://mp.weixin.qq.com",
              "appid":"wx286b93c14bbf93aa",
              "pagepath":"pages/lunar/index"
            }
          ],
        },
        {
          type: 'location_select',
          name: '发送位置',
          key: 'location_select',
        },
      ],
    };
    const config = app.config.wechat_config
    const url = config.postCreateMenuUrl.replace('ACCESS_TOKEN',app.access_token)
    // const res = await app.curl(url,{
    //   method: 'POST',
    //   contentType: 'json',
    //   data: menu,
    //   dataType: 'json',
    // })
    // console.log('res.data.errcode',res.data);
  })
  // 准备好执行
  app.ready(async () => {
  })

  // 关闭前执行
  app.beforeClose(async () => {
    
  });
}

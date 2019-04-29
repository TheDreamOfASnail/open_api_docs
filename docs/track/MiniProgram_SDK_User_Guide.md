## 下载 sdk
从DM Hub的设置中心下载，路径为：设置中心->微信设置->小程序设置

在 app.js 第一行加上. 

```
require('./utils/cl_tracker.js');
```

现在在其他 Page 里就可以通过 getApp 来使用Convertlab的追踪了


当拿到对应身份时,设置对应的身份类型(type)和value,  例如：
```
var app = getApp();

app.cl_tracker.push({ 
    identityType: 'wechat', //如果identityValue使用unionid,identityType请设置为"wechat-unionid"
    identityValue: 'oI_M5xC_YlVhrGe5kcYhkzEQM6wM'   // identityValue 是用户的open_id或unionid
});
```
身份设置请参考：http://help.convertlab.com/hc/kb/article/1108635

如果有多个身份: (最多同时支持3个身份)

```
var app = getApp();

app.cl_tracker.push({
    identityType: 'wechat',
    identityValue: 'oI_M5xC_YlVhrGe5kcYhkzEQM6wM',   // identityValue 是用户的open_id
    identityType2: 'wechat-unionid',
    identityValue2: 'o7QvZ1TT5oo1F8rNJvchn1GGv5t8',
    identityType3: 'customer_identity1',
    identityValue3: 'the_customer_identity_value1',
});
```

如果不是同时拿到所有的身份， 可以分别push identityType
```
app.cl_tracker.push({
    identityType: 'wechat',
    identityValue: 'openId_openId_openId',
});

app.cl_tracker.push({
    identityType2: 'wechat-unionid',
    identityValue2: 'unionId_unionId_union_Id',
});
```


注意：同一个identityType应该永远对应一种身份类型。
如果使用
```
app.cl_tracker.push({
    identityType: 'wechat',
    identityValue: 'openId_openId_openId',
});
```
又使用
```
app.cl_tracker.push({
    identityType: 'wechat-unionid',
    identityValue: 'openId_openId_openId',
});
```
结果是第一个identityType: 'wechat' 是无效的。

注意: 请在微信开发设置，服务器域名的 request 合法域名内，
需要把服务器地址加上. 
详情参考https://developers.weixin.qq.com/miniprogram/dev/api/api-network.html

服务器地址通常是cbe.convertlab.com，
如果是私有部署，请询问对接人员

## 标识用户
在没有identityValue之前，事件将一直是匿名的。
当获得用户的openId后，请将它设置在全局参数中

```
cl_tracker.push({
   identityType:'wechat',
   identityValue:'oI_M5xC_YlVhrGe5kcYhkzEQM6wM'
});
```

## 记录事件

```
cl_tracker.track(
    'mini_program_open', 
    {
        targetName:'小程序名称',
        targetId:'xiao_cheng_xu_id',
        ...  // 其他参数
    },
    callback // 事件回调，可以不传
);

或者：
cl_tracker.track(
    'mini_program_open',
    '小程序名称',
    'xiao_cheng_xu_id',
    {}, // 其他参数，可以不传
    callback // 事件回调，可以不传
);
```
埋点使用详情请参考 http://help.convertlab.com/hc/kb/article/159033/

__注意：小程序只能使用javascript来提交事件__

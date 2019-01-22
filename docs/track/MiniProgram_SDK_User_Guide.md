## 下载 sdk
从 github 上下载 微信小程序 sdk https://github.com/xsio/open_api_docs/blob/master/sdk/dmhubsdk-miniprogram/cl_tracker.js

在 app.js 第一行加上. 

```
require('./utils/cl_tracker.js');
```

现在在其他 Page 里就可以通过 getApp 来使用Convertlab的追踪了

埋点使用详情请参考 http://help.convertlab.com/hc/kb/article/159033/

__注意：小程序只能使用javascript来提交事件__

当拿到对应身份时,设置对应的身份类型(type)和value,  例如：
```
var app = getApp();

app.cl_tracker.push({ 
 identityType: 'wechat', //如果identityValue使用unionid,identityType请使用"wechat-unionid"
 identityValue: 'oI_M5xC_YlVhrGe5kcYhkzEQM6wM'   // identityValue 是用户的open_id或unionid
 });
```

如果有多个身份: (最多支持3个身份)
```
var app = getApp();

app.cl_tracker.push({
    identityType: 'wechat',
    identityValue: 'oI_M5xC_YlVhrGe5kcYhkzEQM6wM',   // identityValue 是用户的open_id
    identityType1: 'face_id_type',
    identityValue1: 'faceID',
    identityType2: 'maya_member_type',
    identityValue2: 'maya_member_ID',
});
```

## conf.js 参数配置
可以在与sdk文件同一级目录下创建一个名为conf.js 的文件来修改默认设置, 内容如下
注意： 若没有此文件， 会使用以下默认配置

```
var conf = {
  name: 'cl_tracker',
  tenantId: '',
  domain: 'cbe.convertlab.com',
  maxStringLength: 255,
  autoTrack: false
};

module.exports = conf;
```

- `name`: SDK 使用的一个默认的全局变量,会注册在 App 全局函数内，在 Page 中可以通过 app[name].track 来使用，默认值是 cl_tracker。
- `tenantId`: 您的tenantId hash值
- `domain`: 数据接收地址域名， 默认为cbe.convertlab.com 
	  注意: 请在微信开发设置，服务器域名的 request 合法域名内，把这个地址加上. 详情参考https://developers.weixin.qq.com/miniprogram/dev/api/api-network.html
- `maxStringLength`: 字符串最大长度，防止属性中误传了特别长的字符串，导致请求失败等异常。
- `autoTrack`: 是否自动记录open_page事件， 注意：只能记录页面的路径，如果要显示页面的标题，请主动调用track方法

## 标识用户
在没有identityValue之前，事件将一直是匿名的。
当获得用户的openId后，请将它设置在全局参数中
```
cl_tracker.push({
   identityValue:'oI_M5xC_YlVhrGe5kcYhkzEQM6wM'
});
```

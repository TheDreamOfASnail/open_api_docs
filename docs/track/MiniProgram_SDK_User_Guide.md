## 下载 sdk
从 github 上下载 微信小程序 sdk https://github.com/xsio/collector-entry/blob/master/collector-jsapi/src/main/resources/miniprograme_cl_tracker

在 app.js 第一行加上. 

```
require('./utils/cl_tracker.js');
```

现在在其他 Page 里就可以通过 getApp 来使用Convertlab的追踪了

埋点使用详情请参考 http://help.convertlab.com/hc/kb/article/159033/

__注意：小程序只能使用javascript来提交事件__

例如：
```
var app = getApp();
   
app.cl_tracker.push({ identityValue: ‘oI_M5xC_YlVhrGe5kcYhkzEQM6wM' });
// identityValue 是用户的open_id

app.cl_tracker.track('c_getInfo', info);
```

## conf.js 参数配置
可以在与sdk文件同一级目录下创建一个名为conf.js 的文件来修改默认设置, 内容如下
注意： 若没有此文件， 会使用以下默认配置

```
var conf = {
  name: 'cl_tracker',
  tenantId: '740843171',
  domain: 'cbe.convertlab.com',
  max_string_length: 255,
  register: {
    identityType: 'wechat',
  }
};

module.exports = conf;
```

- `name`: SDK 使用的一个默认的全局变量,会注册在 App 全局函数内，在 Page 中可以通过 app[name].track 来使用，默认值是 cl_tracker。
- `tenantId`: 您的tenantId
- `domain`: 数据接收地址域名， 默认为cbe.convertlab.com 
	  注意: 请在微信开发设置，服务器域名的 request 合法域名内，把这个地址加上（如果数据接收地址有端口号的话，参考本页第九点常见问题）。
- `max_string_length`: 字符串最大长度，防止属性中误传了特别长的字符串，导致请求失败等异常。
- `register`:
  
```
  {
    identityType: 'wechat',
  }
```
  
  默认传给服务器的参数， 其他支持的属性请参考https://github.com/xsio/collector-entry

## 标识用户
在没有identityValue之前，事件将一直是匿名的。
当获得用户的openId后，请将它设置在全局参数中
```
    cl_tracker.push({
        identityValue:'oI_M5xC_YlVhrGe5kcYhkzEQM6wM'
    });
```



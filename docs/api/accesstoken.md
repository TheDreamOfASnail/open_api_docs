

## 获取access_token
通过appid和appsecret获取access token, 并用于其它功能性API的请求。

**调用请求**
```
HTTP请求方式: GET
https://api-zhike.jdcloud.com/security/accesstoken?grant_type=client_credentials&appid={appid}&secret={secret}
```

**参数说明**

|     参数     | 是否必填 |             说明                |
| ------------ | ------- | ------------------------------- |
| grant_type   |  是     | 必须是client_credential          |
| appid        |  是     | 在上一步中创建的应用的appid       |
| secret       |  是     | 在上一步中创建的应用的secret      |

**返回说明**
```
{
    "error_code": 0,
  "access_token": "47c010ea********d30db952ac",
  "expires_in": 7200
}
```
**返回字段说明**

|     字段     |          说明             |
| ------------ | ------------------------ |
| access_token   |  获取到的API调用凭证     |
| expires_in     |  凭证有效时间，单位：秒   |
| error_code     |  错误码，0表示返回正常    |

**注意**: 记住access_token留备后用。

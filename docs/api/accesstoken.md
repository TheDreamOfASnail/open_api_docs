## 获取access_token
通过appid和appsecret获取access token, 并用于其它功能性API的请求。

**调用请求**
```
HTTP请求方式: GET
https://api.convertlab.com/security/accesstoken?grant_type=client_credentials&appid={appid}&secret={secret}
```

**参数说明**

- {appid}用集成应用保存的appid替换
- {secret}用集成应用保存的secret替换

**返回说明**
```

{
  "error_code": 0,
  "access_token": "47c010ea********d30db952ac",
  "expires_in": 7200
}
```
**注意**: 记住access_token留备后用。

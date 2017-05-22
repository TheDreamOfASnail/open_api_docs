## 将客户数据传送给DM Hub
在DM Hub系统中创建客户可以使用/v1/customers API。但是为了避免同一个客户被多次创建，可以使用/v1/customerAndIdentities API，即在提供客户信息的同时，额外提供客户身份信息。这样如果DM Hub中存在相同身份的客户数据，那么并不会有新的客户被创建，而是已存在的客户信息被更新。

**调用请求**
```
HTTP请求方式: POST
https://api.convertlab.com/v1/customerandidentities?access_token={access_token}
POST数据示例:
{
  "customerIdentities": [
    {
       "identityType": "wechat ",
       "identityValue": {openid},
       "identityName": "nickname"
    },
    {
       "identityType": "wechat-unionid",
       "identityValue": {unionid},
       "identityName": "nickname"
    },
	// 以下以淘宝为例，说明自定义身份的写法
    {
       "identityType":"taobao-account", // 自定义的身份类型，请使用小写拼音
       "identityValue":"user123",  // 客户在你系统中的id
       "identityName":"小明", // 客户在你系统中的名字
    }
  ],
  "customer": {
    "email": "string",
    "name": "string",
    "gender": "string",
    "mobile": "string",
	"source": "string",
    "其他customer字段"
  }
}
```  
**参数说明**

- {access_token}用从“获取身份权限”节拿到的access_token替换
- customerIdentities字段可以填写多个客户的身份，当身份是微信的openid时，identityType填写为”wechat”；当身份为微信的unionid时，identityType填为”wechat-unionid”。identityValue则对应的填写为客户的openid或unionid。

**注意事项**: 使用微信openid或unionid作为客户身份之前，请将微信公众号绑定到DM Hub系统，并将微信粉丝导入到DM Hub系统。
- - -

## 查询客户的API
**调用请求**
```
HTTP请求方式: GET
https://api.convertlab.com/v1/customers?access_token={access_token}
```  
**参数说明**

- {access_token}用从“获取身份权限”节拿到的access_token替换
- 除了access_token参数外，该API还支持以下参数来缩小查询结果集:
	- stage 用客户所处的阶段查询，如过查询的阶段为空，请使用stage=_empty
	- source 用客户的来源查询
	- mobile 用客户的手机号查询
	- gender 用客户的性别查询, 1代表男性，2代表女性，0代表未知
	- idList 支持以逗号分开的客户id列表，如idList=1,2,3,4
	- dateCreatedFrom 客户创建的起始时间，时间格式为2016-11-11T11:11:11
	- dateCreatedTo 客户创建的结束时间
	- lastUpdatedFrom 客户更新的其实时间(包含)
	- lastUpdatedTo 客户更新的结束时间(包含)
	- select 返回的字段，多个字段用逗号隔开
- 除了以上查询参数外，该API还支持分页和排序参数
	- rows 每页的记录数
	- page 第几页
	- sidx 排序的字段
	- sord 排序的方式, asc是升序，desc是降序
	
**示例**
```
GET https://api.convertlab.com/v1/customers?access_token={access_token}&gender=1&rows=10
```  
- - -

## 获取单个客户的API
**调用请求**
```
HTTP请求方式: GET
https://api.convertlab.com/v1/customers/{id}?access_token={access_token}
```
**参数说明**

- {id}是要获取客户的id
- {access_token}用从“获取身份权限”节拿到的access_token替换
- - -

**客户的字段信息**

这里仅列出了部分客户字段，更多字段请查看API的返回值。

|参数名|数据类型|是否必须|说明|
|:---|:---|:---|:---|  
|id|number|否|客户id|  
|name|string|是|客户名字, 也可以用客户昵称代替| 
|nickName|string|否|客户昵称|
|birthday|date string|否|客户生日，示例值 "2016-04-01"|
|campaignId|string|否|营销活动的id|
|campaignName|string|否|营销活动的名字|
|city|string|否|客户所在城市|
|company|string|否|客户所在公司|
|country|string|否|客户所在国家|
|email|string|否|客户邮箱|
|emailVerified|bool|否|true代表客户邮箱已经被验证, false反之|
|externalId|string|否|用于区分不同渠道, 但是 id 相同的客户。命名规则为渠道类型 + '-' + 收据 id,比如 "wechat-0212893827"|
|gender|string|否|客户性别|
|homeAddress|string|否|客户住址|
|industry|string|否|客户所在行业|
|mobile|string|是|客户手机号码|
|mobileVerified|bool|否|true代表客户手机号已经被验证, false反之|
|postcode|string|否|客户邮编|
|province|string|否|客户所在省份|
|remark|string|否|备注|
|source|string|是|客户来源, 比如 "线下 - Beacon", "WeChat"|
|street|string|否|客户所在街道|
|lastUpdated|datetime string|否|最后更新时间|


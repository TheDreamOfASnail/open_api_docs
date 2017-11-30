


## 会员模型
DM Hub为**会员**内置一些比较通用的会员属性，这些属性的名称和类型如下表所示：

|属性|	界面显示名称|	类型|	说明|
| ------------ | ------- |-----| ------------------------------- |
| id | 会员ID | 数字 |
| name | 姓名 | 文本 |
| familyName | 姓 | 文本 |
| givenName | 名 | 文本 |
| customerId | 客户id | 文本 |
| membershipCode | 会员号 | 文本 |
| idCard | ​会员身份证	| 文本 |
| address | ​详细地址	| 文本 |
| educationBackgro | 教育背景 | 文本 |
| img | 用户头像 | 文本 |
| gender | 性别 | 文本 |
| mobile | 手机号码 | 文本 |
| email | 邮箱 | 文本 |
| birthday | 生日 | 文本 |
| dateJoin | 注册时间 | 日期时间 |
| createMethod | 创建方式 | 文本 |
| createChannel | 创建渠道 | 文本 |
| industry | 公司行业 | 文本 |
| income | 收入 | 文本 |
| balance | 储值余额 | 数字 |
| referrer | 推广人 | 文本 |
| lastUpdated | 最后更新时间 | 日期时间 |
| level | 会员等级 | 文本 |
| point | 会员积分 | 数字 |
| dateCreated | 系统创建时间 | 日期时间 |

除了系统内置的会员属性外，您还可以增加自定义属性。  
登录DM Hub，在会员属性设置页面中，可增加自定义会员属性。包括属性名、属性代码、属性类型等。
自定义属性的代码以"c_"作为前缀。

## 会员身份模型

DM Hub内置了几个身份类型

|内置身份类型|	含义| 是否唯一 |
| ------------ | ------- | ------|
| mobile | 手机号 | 是 |
|wechat|	微信的openid| 否 |
|wechat-unionid|	微信的unionid| 否 |
|taobao-account	|淘宝账号| 否 |
 

另外用户可以在DM Hub会员身份设置中自定义会员身份类型，用户定义的身份类型以"c_"作为前缀。

## 1. 查看全部会员

- HTTP请求方式: `GET`

- `/loyalty/v1/membership?access_token={access_token}`

- Response

```json
{
    "rows": [
        {
            "address": null,
            "balance": null,
            "birthday": "1988-01-01",
            "createChannel": null,
            "createMethod": "外部系统导入",
            "customerId": null,
            "dateCreated": "2017-10-31T03:07:47Z",
            "dateJoin": "2017-10-31T03:07:47Z",
            "educationBackgro": null,
            "email": null,
            "familyName": null,
            "gender": 1,
            "id": 1,
            "idCard": null,
            "img": null,
            "income": null,
            "industry": null,
            "givenName": null,
            "lastUpdated": "2017-10-31T03:07:47Z",
            "level": 0,
            "membershipCode": null,
            "mobile": null,
            "name": "test",
            "point": 0,
            "referrer": null
        }
    ]
}
```

## 2. 创建会员和会员身份

创建会员时需要同时包含会员身份的信息，即membership和identities两项都不能为空值。  

- HTTP请求方式: `POST`

- `/loyalty/v1/membershipAndIdentities?access_token={access_token}`

- Request Payload

```json
{
    "membership": {
        "name": "test",
        "cm_test2": true,
        "gender": 1,
        "birthday": "1988-01-01",
        "cm_test3": "true"
    },
    "identities": [
        {
            "type": "wechat",
            "value": "123456",
            "name": "cm_test"
        }
    ]
}
```

- Response

```json
{
    "address": null,
    "balance": null,
    "birthday": "1988-01-01",
    "createChannel": null,
    "createMethod": "外部系统导入",
    "customerId": null,
    "dateCreated": "2017-10-31T03:21:09Z",
    "dateJoin": "2017-10-31T03:21:09Z",
    "educationBackgro": null,
    "email": null,
    "familyName": null,
    "gender": 1,
    "id": 3,
    "idCard": null,
    "img": null,
    "income": null,
    "industry": null,
    "givenName": null,
    "lastUpdated": "2017-10-31T03:21:09Z",
    "level": 0,
    "membershipCode": null,
    "mobile": null,
    "name": "test",
    "point": 0,
    "referrer": null
}
```

## 3. 查看一个会员

- HTTP请求方式: `GET`

- `/loyalty/v1/membership/${membershipId}?access_token={access_token}`

- Response

```json
{
    "address": null,
    "balance": null,
    "birthday": "1988-01-01",
    "createChannel": null,
    "createMethod": "外部系统导入",
    "customerId": null,
    "dateCreated": "2017-10-31T03:07:47Z",
    "dateJoin": "2017-10-31T03:07:47Z",
    "educationBackgro": null,
    "email": null,
    "familyName": null,
    "gender": 1,
    "id": 1,
    "idCard": null,
    "img": null,
    "income": null,
    "industry": null,
    "givenName": null,
    "lastUpdated": "2017-10-31T03:07:47Z",
    "level": 0,
    "membershipCode": null,
    "mobile": null,
    "name": "test",
    "point": 0,
    "referrer": null
}
```

## 4. 修改一个会员

- HTTP请求方式: `PUT`

- `/loyalty/v1/membership/${membershipId}?access_token={access_token}`

- Request Payload

```json
{
    "name": "test1",
    "gender": 0,
    "email": "111@test.com"
}
```

- Response

```json
{
    "address": null,
    "balance": null,
    "birthday": "1988-01-01",
    "createChannel": null,
    "createMethod": "外部系统导入",
    "customerId": null,
    "dateCreated": "2017-10-31T03:07:47Z",
    "dateJoin": "2017-10-31T03:07:47Z",
    "educationBackgro": null,
    "email": "111@test.com",
    "familyName": null,
    "gender": 0,
    "id": 1,
    "idCard": null,
    "img": null,
    "income": null,
    "industry": null,
    "givenName": null,
    "lastUpdated": "2017-10-31T05:56:57Z",
    "level": 0,
    "membershipCode": null,
    "mobile": null,
    "name": "test1",
    "point": 0,
    "referrer": null
}
```

## 5. 修改会员等级
- HTTP请求方式: `PUT`

- `/loyalty/v1/membership/${membershipId}/level?access_token={access_token}`

- Request Payload

```json

    {
        "level": 8
    }

```
- Response

```json

    {
            "dateCreated": "2017-10-31T06:54:01Z",
            "id": 3,
            "lastUpdated": "2017-10-31T06:54:01Z",
            "levelType": 0,
            "levelUpdateStatus": 1,
            "membershipId": 1,
            "newLevel": 8,
            "oldLevel": 0,
            "remark": null,
            "rule": null,
            "tenantId": 11
    }

```


## 6. 绑定会员身份

- HTTP请求方式: `POST`

- `/loyalty/v1/membership/${membershipId}/bindIdentity?access_token={access_token}`

- Request Payload

```json
[
    {
        "type": "wechat",
        "value": "666",
        "name": "cm_test1"
    }
]
```

- Response

```json
[
    {
        "name": "cm_test1",
        "type": "wechat",
        "value": "666"
    }
]
```

## 7. 根据会员身份查找会员

- HTTP请求方式: `GET`

- `/loyalty/v1/membershipService/getMembershipByIdentity?access_token={access_token}&type={identityType}&value={identityValue}`

- Response

```json
{
    "identities": [
        {
            "name": "cm_test2",
            "type": "wechat",
            "value": "1111111111"
        }
    ],
    "membership": {
        "address": null,
        "balance": null,
        "birthday": "1988-01-01",
        "createChannel": null,
        "createMethod": "外部系统导入",
        "customerId": null,
        "dateCreated": "2017-10-31T03:07:47Z",
        "dateJoin": "2017-10-31T03:07:47Z",
        "educationBackgro": null,
        "email": "111@test.com",
        "familyName": null,
        "gender": 0,
        "id": 1,
        "idCard": null,
        "img": null,
        "income": null,
        "industry": null,
        "givenName": null,
        "lastUpdated": "2017-10-31T05:56:57Z",
        "level": 0,
        "membershipCode": null,
        "mobile": null,
        "name": "test1",
        "point": 0,
        "referrer": null
    }
}
```

## 8. 根据会员身份列表查找会员

- HTTP请求方式: `POST`

- `/loyalty/v1/membershipService/listMembershipByIdentities?access_token={access_token}`

- Request Payload

```json
[
    {
        "type": "wechat",
        "value": "666"
    },
    {
        "type": "wechat",
        "value": "333"
    }
]
```

- Response

```json
{
    "rows": [
        {
            "identities": [
                {
                    "name": "cm_test2",
                    "type": "wechat",
                    "value": "1111111111"
                }
            ],
            "membership": {
                "address": null,
                "balance": null,
                "birthday": "1988-01-01",
                "createChannel": null,
                "createMethod": "外部系统导入",
                "customerId": null,
                "dateCreated": "2017-10-31T03:07:47Z",
                "dateJoin": "2017-10-31T03:07:47Z",
                "educationBackgro": null,
                "email": "111@test.com",
                "familyName": null,
                "gender": 0,
                "id": 1,
                "idCard": null,
                "img": null,
                "income": null,
                "industry": null,
                "givenName": null,
                "lastUpdated": "2017-10-31T05:56:57Z",
                "level": 0,
                "membershipCode": null,
                "mobile": null,
                "name": "test1",
                "point": 0,
                "referrer": null
            }
        },
        {
            "identities": [
                {
                    "name": "cm_test2",
                    "type": "wechat",
                    "value": "333"
                }
            ],
            "membership": {
                "address": null,
                "balance": null,
                "birthday": "1988-01-01",
                "createChannel": null,
                "createMethod": "外部系统导入",
                "customerId": null,
                "dateCreated": "2017-10-31T03:21:09Z",
                "dateJoin": "2017-10-31T03:21:09Z",
                "educationBackgro": null,
                "email": null,
                "familyName": null,
                "gender": 1,
                "id": 3,
                "idCard": null,
                "img": null,
                "income": null,
                "industry": null,
                "givenName": null,
                "lastUpdated": "2017-10-31T03:21:09Z",
                "level": 0,
                "membershipCode": null,
                "mobile": null,
                "name": "test",
                "point": 0,
                "referrer": null
            }
        }
    ]
}
```
## 9. 修改会员手机号

- HTTP请求方式: `PUT`

- `/loyalty/v1/membershipService/${membershipId}/updateMobile?access_token={access_token}`

- Request Payload

```json
    {
        "oldMobile": "123",
        "newMobile": "456"
    }
```
- Response

```json
    {
        "address": null,
        "balance": null,
        "birthday": "1999-01-01",
        "c_111": null,
        "c_1111": null,
        "c_12": null,
        "c_123": null,
        "c_123123": null,
        "c_Member": null,
        "c_qqq": null,
        "c_qwa123": null,
        "c_qwqqw": null,
        "c_sd": null,
        "c_sdsf": null,
        "c_wewe": null,
        "c_wewe1": null,
        "c_驱蚊器": null,
        "createChannel": null,
        "createMethod": "外部系统导入",
        "customerId": 20526992,
        "dateCreated": "2017-11-13T08:43:05Z",
        "dateJoin": "2017-11-13T08:43:05Z",
        "educationBackgro": null,
        "email": null,
        "familyName": null,
        "gender": 1,
        "givenName": null,
        "id": 85,
        "idCard": null,
        "img": null,
        "income": null,
        "industry": null,
        "lastUpdated": "2017-11-13T08:46:24Z",
        "level": 0,
        "membershipCode": null,
        "mobile": "456",
        "name": "test",
        "point": 0,
        "referrer": null
    }
```

## 10. 查看会员等级设置

- HTTP请求方式: `GET`

- `/loyalty/v1/settings/level/rules?access_token={access_token}`

- Response

```json
{
        "rows": [
            {
                "desp": null,
                "id": 61,
                "isForever": true,
                "name": "1",
                "operator": "or",
                "priority": 0,
                "rules": {
                    "consumption": {
                        "enabled": false,
                        "month": 12,
                        "number": 5000
                    },
                    "consumptionTotal": {
                        "enabled": false,
                        "month": 12,
                        "number": 5000
                    },
                    "desp": "默认最低等级",
                    "frequency": {
                        "enabled": false,
                        "month": 12,
                        "number": 5000
                    },
                    "frequencyTotal": {
                        "enabled": false,
                        "month": 12,
                        "number": 5000
                    },
                    "points": {
                        "enabled": false,
                        "month": 12,
                        "number": 5000
                    },
                    "pointsTotal": {
                        "enabled": false,
                        "month": 12,
                        "number": 5000
                    }
                },
                "status": 0
            },
            {
                "desp": null,
                "id": 62,
                "isForever": false,
                "name": "2",
                "operator": "or",
                "priority": 1,
                "rules": {},
                "status": 0
            },
            {
                "desp": null,
                "id": 63,
                "isForever": true,
                "name": "3",
                "operator": "or",
                "priority": 2,
                "rules": {},
                "status": 0
            },
            {
                "desp": null,
                "id": 64,
                "isForever": false,
                "name": "5",
                "operator": "or",
                "priority": 3,
                "rules": {},
                "status": 0
            }
        ]
}
```

## 11. 订单Api
###1. 创建订单
- HTTP请求方式: `POST`
- `/loyalty/v1/deal?access_token={token}`
- Payload
```json
{
  "membershipId": 1,
  "orderNo": "123456",
  "dealLine": [
    {
      "lineId": "11111"
    },
    {
    "lineId": "22222"
    }
  ]
}

```

订单头

|英文名称|	字段名称|	字段类型|	必须字段|说明  |
| ------------ | ------- |-----|-----| ---------------- |
|salesChannel| 销售渠道 |  String|  是|  |
|store| 店铺 |  String|  是|  |
|orderNo| 订单号 |  String|  是|  |
|type| 订单类型 |  String|  |  |
|dateOrder| 订单时间 |  DateTime|  是| UTC时间 |
|membershipId| 会员ID |  Number|  是|  |
|amountDiscount| 订单折扣 |  Number|  是|  |
|couponCode| 优惠券Code |  String|  |  |
|groupId| 团购ID |  String|  |  |
|amountTotal| 订单总额 |  Number|  |  |
|amountPaid| 实际支付金额 |  Number| 是 |  |
|paymentTerm| 支付方式 |  String|  |  |
|paymentNo| 支付号 |  String|  |  |
|shippingMethod| 运送方式 |  String|  |  |
|contactName| 收货人姓名 |  String|  |  |
|contactTel| 收货人手机 |  String|  |  |
|shippingProvince| 收货人省份 |  String|  |  |
|shippingCity| 收货人城市 |  String|  |  |
|shippingCounty| 收货人区县 |  String|  |  |
|shippingStreet| 收货人街道 |  String|  |  |
|shippingAddress| 收货人具体地址 |  String|  |  |
|dealLines| 订单行 |  JsonArray| 是 | 结构见订单行 |


订单行

|英文名称|	字段名称|	字段类型|	必须字段|说明  |
| ------------ | ------- |-----|-----| ---------------- |
|lineId| 订单行id |  String| 是 |可使用skuid，在一个订单中保证唯一 |
|productName| 产品名称 |  String| 是 |  |
|productId| 产品ID |  String|  |  |
|skuId| SKU ID |  String|  |  |
|category| 品类 |  String|  |  |
|qty| 数量 |  Number| 是 |  |
|priceUnit| 单价 |  Number|  |  |
|priceSubTotal| 总价 |  Number|  |  |

- Response

成功
```json
{
  "membershipId": 1,
  "orderNo": "123456",
  "id": "1",
  "dealLine": [
    {
      "lineId": "11111"
    },
    {
      "lineId": "22222"
    }
  ],
  "state": "已付款"
}
```
失败
```json
{
  "error": {
  "code":"409000",
  "message": "error info"
  }
}
```

###2. 取消订单
- HTTP请求方式: `POST`
- ` /loyalty/v1/dealService/cancel?access_token={token}`
- Payload
```json
{
  "membershipId": 1,
  "orderNo": "123456"
}
```

- Response
```json
{
  "membershipId": 1,
  "orderNo": "123456",
  "id": "1",
  "dealLine": [
    {
      "lineId": "11111"
    },
    {
      "lineId": "22222"
    }
  ],
  "state": "已取消"
}
```

###3. 退单
- HTTP请求方式: `POST`
- ` /loyalty/v1/dealService/refund?access_token={token}`
- Payload
```json
{
  "refundLines": [
    {
      "lineId": "11111"
    }
  ],
  "refundTotal": 1111,
  "orderNo": "123456",
  "membershipId": 1
}
```

退单头

|英文名称|	字段名称|	字段类型|	必须字段|说明  |
| ------------ | ------- |-----|-----| ---------------- |
|membershipId| 会员ID |  Number| 是 | |
|orderNo| 订单号 |  String| 是 | |
|dateRefund| 退单时间 |  DateTime| 是 | |
|refundTotal| 退单金额 |  Number| 是 | |
|reason| 退单原因 |  String|  | |
|refundLines| 退单行 |  JsonArray| 是 |结构见退单行 |

退单行

|英文名称|	字段名称|	字段类型|	必须字段|说明  |
| ------------ | ------- |-----|-----| ---------------- |
|lineId| 订单行id |  String| 是 | 可使用skuid，在一个订单中保证唯一|

- Response

```json
{
  "membershipId": 1,
  "orderNo": "123456",
  "refundTotal": "1",
  "refundLines": [
    {
      "lineId": "11111"
    }
  ]
}
```






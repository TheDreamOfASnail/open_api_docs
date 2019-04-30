


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
| gender | 性别 | 数字 |
| mobile | 手机号码 | 文本 |
| email | 邮箱 | 文本 |
| birthday | 生日 | 文本 |
| dateJoin | 注册时间 | 日期时间 |时间格式为 “2016-11-11T11:11:11” 为UTC时间|
| createMethod | 创建方式 | 文本 |
| createChannel | 创建渠道 | 文本 |
| industry | 公司行业 | 文本 |
| income | 收入 | 文本 |
| balance | 储值余额 | 数字 |
| referrer | 推广人 | 文本 |
| lastUpdated | 最后更新时间 | 日期时间 |时间格式为 “2016-11-11T11:11:11” 为UTC时间|
| level | 会员等级 | Json对象 |
| point | 会员积分 | 数字 |
| source | 来源 | 文本 |
| contentName | 来源内容 | 文本 |
| country | 国家 | 文本 |
| province | 省 | 文本 |
| city | 市 | 文本 |
| county | 区县 | 文本 |
| dateCreated | 系统创建时间 | 日期时间 |时间格式为 “2016-11-11T11:11:11” 为UTC时间|

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
            "level":  {
                        "priority": 0,        //等级所代表的层级，0为最低，向上递增
                        "name": "青铜会员",
                        "id": 422
                        },
            "membershipCode": null,
            "mobile": null,
            "name": "test",
            "point": 0,
            "source": null,                 //新增字段
            "contentName": null,            //新增字段
            "campaignId": null,             //新增字段
            "country": null,                //新增字段
            "province": null,               //新增字段
            "city": null,                   //新增字段
            "county": null                  //新增字段
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
    "level": {
        "priority": 0,
        "name": "青铜会员",
        "id": 422
    },
    "membershipCode": null,
    "mobile": null,
    "name": "test",
    "point": 0,
    "source": null,
    "contentName": null,
    "campaignId": null,
    "country": null,
    "province": null,
    "city": null,
    "county": null
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
    "level": {
        "priority": 0,
        "name": "青铜会员",
        "id": 422
    },
    "membershipCode": null,
    "mobile": null,
    "name": "test",
    "point": 0,
    "source": null,
    "contentName": null,
    "campaignId": null,
    "country": null,
    "province": null,
    "city": null,
    "county": null
}
```

## 4. 修改一个会员

如需强制修改会员的来源，来源内容，营销活动信息，forceUpdate字段取true

- HTTP请求方式: `PUT`

- `/loyalty/v1/membership/${membershipId}?access_token={access_token}&forceUpdate=false`

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
    "level": {
        "priority": 0,
        "name": "青铜会员",
        "id": 422
    },
    "membershipCode": null,
    "mobile": null,
    "name": "test1",
    "point": 0,
    "source": null,
    "contentName": null,
    "campaignId": null,
    "country": null,
    "province": null,
    "city": null,
    "county": null
}
```

## 5. 增减会员积分

- `POST`

- `/loyalty/v1/membership/$membershipId/point/incr?access_token={access_token}`
- `/loyalty/v1/membership/$membershipId/point/decr?access_token={access_token}`

- Request Payload

```json
{
    "point":8,
    "pattern":0                        //积分获取/减少方式（必填）
}
```

- Response

```json
{
    "point": 8
}
```

积分方式：
```json
{
  "积分增加": {
    "0": "其他",
    "1": "初始积分",
    "2": "交易送积分",
    "3": "参与互动得积分",
    "4": "积分奖励",
    "5": "积分调整"
  },"积分减少": {
    "0": "其他",
    "1": "积分兑换",
    "2": "交易退积分",
    "3": "参与互动消耗积分",
    "4": "惩罚扣积分",
    "5": "积分调整",
    "6": "积分失效"
  }
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
        "level": {
            "priority": 0,
            "name": "青铜会员",
            "id": 422
        },
        "membershipCode": null,
        "mobile": null,
        "name": "test1",
        "point": 0,
        "source": null,
        "contentName": null,
        "campaignId": null,
        "country": null,
        "province": null,
        "city": null,
        "county": null
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
                "level": {
                    "priority": 0,
                    "name": "青铜会员",
                    "id": 422
                },
                "membershipCode": null,
                "mobile": null,
                "name": "test1",
                "point": 0,
                "source": null,
                "contentName": null,
                "campaignId": null,
                "country": null,
                "province": null,
                "city": null,
                "county": null
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
                "level": {
                    "priority": 0,
                    "name": "青铜会员",
                    "id": 422
                },
                "membershipCode": null,
                "mobile": null,
                "name": "test",
                "point": 0,
                "source": null,
                "contentName": null,
                "campaignId": null,
                "country": null,
                "province": null,
                "city": null,
                "county": null
            }
        }
    ]
}
```
## 9. 修改会员手机号

- HTTP请求方式: `PUT`

- `/loyalty/v1/membershipService/updateMobile?access_token={access_token}`

- Request Payload

```json
{
    "oldMobile": "123",
    "newMobile": "456",
    "membershipId":8
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
    "level": {
        "priority": 0,
        "name": "青铜会员",
        "id": 422
    },
    "membershipCode": null,
    "mobile": "456",
    "name": "test",
    "point": 0,
    "contentName": null,
    "campaignId": null,
    "country": null,
    "province": null,
    "city": null,
    "county": null
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
### 11.1. 创建订单
- HTTP请求方式: `POST`
- `/loyalty/v1/deal?access_token={token}`
- Payload
```json
{
  "membershipId": 1,
  "identities": [
        {
            "type": "wechat",
            "value": "123456",
            "name": "cm_test"
        }
    ],
  "orderNo": "123456",
  "dealLines": [
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
|dateOrder| 订单时间 |  DateTime|  是| 时间格式为 “2016-11-11T11:11:11”, UTC时间 |
|membershipId| 会员ID |  Number|  是| 和会员身份字段选填一项 |
|identities| 会员身份 |  JsonArray| 是 | 和会员ID字段选填一项 |
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
  "dealLines": [
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

### 11.2. 修改订单
- HTTP请求方式: `POST`
- `/loyalty/v1/dealService/update/?access_token={token}`
- Payload
```json
{
  "membershipId": 1,
  "orderNo": "123456",
  "dealLines": [
    {
      "lineId": "11111"
    },
    {
    "lineId": "22222"
    }
  ]
}

```

- Response

成功
```json
{
  "membershipId": 1,
  "identities": [
        {
            "type": "wechat",
            "value": "123456",
            "name": "cm_test"
        }
    ],
  "orderNo": "123456",
  "id": "1",
  "dealLines": [
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

### 11.3. 取消订单
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
  "dealLines": [
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

### 11.4. 退单
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
|dateRefund| 退单时间 |  DateTime| 是 |时间格式为 “2016-11-11T11:11:11”, UTC时间|
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

### 11.4. 删除退单
- HTTP请求方式: `POST`
- ` /loyalty/v1/dealService/deleteRefund?access_token={token}`
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
  "refundTotal": 3333,
  "orderNo": "123456",
  "membershipId": 1,
  "dateRefund":"2017-04-22T12:56:47Z",
  "refundLines": [
    {
      "lineId": "123456-2"
    }
  ]
}
```

### 11.5. 删除订单
- HTTP请求方式: `POST`
- ` /loyalty/v1/dealService/delete?access_token={token}`
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
  "dealLines": [
    {
      "lineId": "11111"
    },
    {
      "lineId": "22222"
    }
  ]
}
```

## 12. 会员注册推送设备信息

请求方式：`POST`

请求路径：`https://api.convertlab.com/loyalty/v1/appPush/register?access_token={access_token}`

参数说明：

- access_token ：访问该 API 的令牌

POST 数据说明：

```json
{
    "provider": "<必传> 推送服务提供商，'jpush' 或 'getui'",
    "appKey": "<必传> 在推送服务提供商平台创建应用时得到的 AppKey",
    "pushId": "<必传> 推送服务提供商分配给设备的 PushID（极光称作 Registration ID，个推称作 ClientID，本文档统一称作 PushID）",
    "os": "<必传> 移动端平台类型，'android' 或 'ios'",
    "membershipId": "<非必传> 会员 ID。",
    "mobile": "<非必传> 会员手机号。"
}
```

注：_membershipId_ 参数和 _mobile_ 参数用于将推送设备信息与会员建立关联，建立关联过程中，优先根据 _membershipId_ 查找会员，如果没有找到会员，再根据 _mobile_ 查找会员，如果找到会员，则将推送设备信息与该会员建立关联；否则，推送设备信息会被注册为匿名的信息。

返回结果说明：

- 注册成功

```json
{
    "appKey": "<AppKey>",
    "membershipId": "<会员 ID>",
    "os": "<os>",
    "provider": "<provider>",
    "pushId": "<PushID>"
}
```

注：如果返回结果中的 _membershiprId_ 为 `null`，则表明推送设备信息被注册为匿名的信息。

- 必传字段缺失

```json
{
    "error": {
        "code": "400005",
        "message": "Missing field provider!"
    }
}
```

- 必传字段无效

```json
{
    "error": {
        "code": "400001",
        "message": "Invalid os(winphone)!"
    }
}
```

## 13. 优惠券Api
### 模型
优惠券包括优惠券（coupon）和优惠券认领（membershipCoupon） 两个模型。操作员在会员系统的前端设置了一个优惠券后，会生成一个coupon实体；在会员领取/系统发放之后，系统会生成某会员专属的一个membershipCoupon实体。

每一个coupon都有唯一标识couponId，每一个membershipCoupon都有唯一标识couponCode。具体的模型如下。

coupon

|英文名称|	字段名称|	字段类型|	说明 |
| ------------ | ------- |-----|----- |
|couponId| 优惠券id |  String|  |
|couponName| 优惠券名称 |  String|  |
|couponLabel| 优惠券标题 |  String|  |
|couponSubLabel| 优惠券副标题 |  String|  |
|couponType| 优惠券类型 |  Number| 1为代金券，2为折扣券，3为商品券 |
|channels| 优惠券渠道 |  JsonArray| 目前界面最多可设置线上和线下两个渠道 |
|drawLimit| 每人限令张数 |  Number|  |
|total| 总张数 |  Number|  |
|store| 库存 |  Number|  |
|note| 使用须知 |  String|  |
|validType| 有效类型 |  Number| 1为绝对日期范围，2为相对领取时间 |
|validDate| 有效日期 |  JsonObject| 根据validType区分 |
|rule| 使用规则 |  JsonObject|  |

coupon.channels

|英文名称|	字段名称|	字段类型|	说明 |
| ------------ | ------- |-----|----- |
|couponId| 优惠券渠道码 |  String|  |
|couponChannel| 优惠券渠道 |  String| 目前有两个渠道，线上online，线下offline |
|url| 渠道对应的url |  String|  |

coupon.validDate

|英文名称|	字段名称|	字段类型|	说明 |
| ------------ | ------- |-----|----- |
|startDays| 领取后有效起始天数 |  Number| 相对有效日期使用 |
|validDays| 有效后终止天数 |  Number| 相对有效日期使用 |
|startDate| 起始有效期 |  Date|绝对有效日期使用  |
|endDate| 终止有效期 |  Date| 绝对有效日期使用 |

coupon.rule

|英文名称|	字段名称|	字段类型|	说明 |
| ------------ | ------- |-----|----- |
|amountLimit| 最低消费 |  Number|  |
|discount| 折扣额度 |  Number| 折扣券使用 |
|freeFee| 减免金额 |  Number|代金券使用  |
|goodsLimit| 指定商品 |  String|  |
|...| 自定义规则 |  ...|  |

membershipCoupon

|英文名称|	字段名称|	字段类型|	说明 |
| ------------ | ------- |-----|----- |
|membershipId| 会员id |  Number|  |
|couponId| 优惠券id |  String| 折扣券使用 |
|dateDraw| 领取日期 |  DateTime|代金券使用，格式为:“2017-06-01T12:12:12Z” 为UTC时间  |
|dateRedeem| 核销日期 |  DateTime| 格式为:“2017-06-01T12:12:12Z” 为UTC时间 |
|startDate| 起始有效期 |  Date|  |
|endDate| 终止有效期 |  Date|  |
|status| 状态 |  Number| 折扣券使用 |
|couponCode| 券码 |  String|代金券使用  |
|uuid| 券码加密 |  String|  |
|barcodeUrl| 条形码地址 |  String |  |
|qrcodeUrl| 二维码地址 |  String |  |

membershipCoupon.status

|返回值|	normal|	used|
| ------------ | ------- |----- |
|含义| 可使用 | 已使用 |



### 13.1.获取所有coupon
`GET /loyalty/v1/coupon`

- Request

access_token  根据appid请求的token
needTotal     是否需要总页数
rows          每页行数
page          所选页数
sidx          排序字段
sord          升序asc或降序desc

- Response

```json
{
  "rows": [
    {
      "channels": [
        {
          "couponId": "test",
          "couponChannel": "offline",
          "url": null
        }
      ],
      "couponId": "STxgWromTbt727eBcPOo",
      "couponLabel": "test",
      "couponName": "test",
      "couponSubLabel": "test",
      "couponType": 1,
      "drawLimit": 100,
      "note": "test",
      "rule": {
        "amountLimit": null,
        "discount": null,
        "freeFee": null,
        "goodsLimit": "null"
      },
      "total": 100000,
      "validDate": {
        "startDays": 5,
        "validDays": 5
      },
      "validType": 2
      }
      ],
  "total": 12, //总页数
  "records": 10 //总条数
}
```

只有在使用needTotal后会有total和records值。

### 13.2.根据couponId获取coupon
`GET /loyalty/v1/coupon/$couponId`

- Request

access_token  根据appid请求的token

- Response

成功

```json
{
  "channels": [
    {
      "couponId": "test",
      "couponChannel": "offline",
      "url": null
    }
  ],
  "couponId": "STxgWromTbt727eBcPOo",
  "couponLabel": "test",
  "couponName": "test",
  "couponSubLabel": "test",
  "couponType": 1,
  "drawLimit": 100,
  "note": "test",
  "rule": {
    "amountLimit": null,
    "discount": null,
    "freeFee": null,
    "goodsLimit": "null"
  },
  "total": 100000,
  "validDate": {
    "startDays": 5,
    "validDays": 5
  },
  "validType": 2
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

### 13.3.根据couponChannel获取coupon
`GET /loyalty/v1/couponService/getCouponByChannel`

- Request

access_token  根据appid请求的token
channel       online或者offline
couponId      对应渠道的couponId

- Response

成功
```json
{
  "rows": [
    {
      "channels": [
        {
          "couponId": "test",
          "couponChannel": "offline",
          "url": null
        }
      ],
      "couponId": "STxgWromTbt727eBcPOo",
      "couponLabel": "test",
      "couponName": "test",
      "couponSubLabel": "test",
      "couponType": 1,
      "drawLimit": 100,
      "note": "test",
      "rule": {
        "amountLimit": null,
        "discount": null,
        "freeFee": null,
        "goodsLimit": "null"
      },
      "total": 100000,
      "validDate": {
        "startDays": 5,
        "validDays": 5
      },
      "validType": 2
    }
  ]
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

### 13.4.领券
`POST /loyalty/v1/membership/$membershipId/coupon/draw`

- Request

access_token  根据appid请求的token

- Payload

```json
{
"couponId": "11111"
}
```
- Response

成功
```json
{
  "dateDraw": "2017-12-05T05:54:10Z",
  "endDate": "2017-12-15",
  "couponId": "STxgWromTbt727eBcPOo",
  "qrcodeUrl": "http://127.0.0.1:8004/loyalty/qrimg/cnik8caw3EqPVCLAFP4IsmVeXwqb-EtxJSw3gugIq-0",
  "membershipId": 1,
  "barcodeUrl": "http://127.0.0.1:8004/loyalty/barimg/cnik8caw3EqPVCLAFP4IsmVeXwqb-EtxJSw3gugIq-0",
  "dateRedeem": null,
  "uuid": "cnik8caw3EqPVCLAFP4IsmVeXwqb-EtxJSw3gugIq-0\r\n",
  "startDate": "2017-12-10",
  "couponCode": "34636772868722688",
  "status": "notStarted",
  "couponType": 1,
  "couponName": "test",
  "couponLabel": "test",
  "couponSubLabel": "test",
  "note": "test",
  "channels": [
    {
      "couponId": "test",
      "couponChannel": "offline",
      "url": null
    }
  ],
  "rule": {
    "goodsLimit": "null",
    "freeFee": null,
    "discount": null,
    "amountLimit": null
  }
}
```
从couponType开始，之后的字段是这张券所属coupon的信息。

失败
```json
{
  "error": {
    "code":"409000",
    "message": "error info"
  }
}
```

### 13.5.根据couponCode获取membershipCoupon
`GET /loyalty/v1/membershipCoupon/$couponCode`

- Request

access_token  根据appid请求的token

- Response

成功

```json
{
  "dateDraw": "2017-12-05T05:54:10Z",
  "endDate": "2017-12-15",
  "couponId": "STxgWromTbt727eBcPOo",
  "qrcodeUrl": "http://127.0.0.1:8004/loyalty/qrimg/cnik8caw3EqPVCLAFP4IsmVeXwqb-EtxJSw3gugIq-0",
  "membershipId": 1,
  "barcodeUrl": "http://127.0.0.1:8004/loyalty/barimg/cnik8caw3EqPVCLAFP4IsmVeXwqb-EtxJSw3gugIq-0",
  "dateRedeem": null,
  "uuid": "cnik8caw3EqPVCLAFP4IsmVeXwqb-EtxJSw3gugIq-0\r\n",
  "startDate": "2017-12-10",
  "couponCode": "34636772868722688",
  "status": "notStarted",
  "couponType": 1,
  "couponName": "test",
  "couponLabel": "test",
  "couponSubLabel": "test",
  "note": "test",
  "channels": [
    {
      "couponId": "test",
      "couponChannel": "offline",
      "url": null
    }
  ],
  "rule": {
    "goodsLimit": "null",
    "freeFee": null,
    "discount": null,
    "amountLimit": null
  }
}
```

### 13.6.根据membershipId获取membershipCoupon列表
`GET /loyalty/v1/membership/$membershipId/coupon`

- Request

access_token  根据appid请求的token
status 筛选membershipCoupon状态，normal为可使用，used为已使用

- Response

成功

```json
{
  "rows": [
    {
      "dateDraw": "2017-12-05T05:54:10Z",
      "endDate": "2017-12-15",
      "couponId": "STxgWromTbt727eBcPOo",
      "qrcodeUrl": "http://127.0.0.1:8004/loyalty/qrimg/cnik8caw3EqPVCLAFP4IsmVeXwqb-EtxJSw3gugIq-0",
      "membershipId": 1,
      "barcodeUrl": "http://127.0.0.1:8004/loyalty/barimg/cnik8caw3EqPVCLAFP4IsmVeXwqb-EtxJSw3gugIq-0",
      "dateRedeem": null,
      "uuid": "cnik8caw3EqPVCLAFP4IsmVeXwqb-EtxJSw3gugIq-0\r\n",
      "startDate": "2017-12-10",
      "couponCode": "34636772868722688",
      "status": "notStarted",
      "couponType": 1,
      "couponName": "test",
      "couponLabel": "test",
      "couponSubLabel": "test",
      "note": "test",
      "channels": [
        {
          "couponId": "test",
          "couponChannel": "offline",
          "url": null
        }
      ],
      "rule": {
        "goodsLimit": "null",
        "freeFee": null,
        "discount": null,
        "amountLimit": null
      }
    }
  ],
  "total": 12,
  "records": 10
}
```

### 13.7.核销
`POST /loyalty/v1/membershipCoupon/$couponCode/redeem`

- Request

access_token  根据appid请求的token

- Payload
```json
{
"membershipId": 1
}
```

- Response

成功

```json
{
  "dateDraw": "2017-12-05T05:54:10Z",
  "endDate": "2017-12-15",
  "couponId": "STxgWromTbt727eBcPOo",
  "qrcodeUrl": "http://127.0.0.1:8004/loyalty/qrimg/cnik8caw3EqPVCLAFP4IsmVeXwqb-EtxJSw3gugIq-0",
  "membershipId": 1,
  "barcodeUrl": "http://127.0.0.1:8004/loyalty/barimg/cnik8caw3EqPVCLAFP4IsmVeXwqb-EtxJSw3gugIq-0",
  "dateRedeem": null,
  "uuid": "cnik8caw3EqPVCLAFP4IsmVeXwqb-EtxJSw3gugIq-0\r\n",
  "startDate": "2017-12-10",
  "couponCode": "34636772868722688",
  "status": "used",
  "couponType": 1,
  "couponName": "test",
  "couponLabel": "test",
  "couponSubLabel": "test",
  "note": "test",
  "channels": [
    {
      "couponId": "test",
      "couponChannel": "offline",
      "url": null
    }
  ],
  "rule": {
    "goodsLimit": "null",
    "freeFee": null,
    "discount": null,
    "amountLimit": null
  }
}
```
## 14.删除会员身份

如果被删除的身份为此会员唯一身份则不允许删除，如果删除的身份类型为mobile则会清空对应会员的号码，身份的删除会同步到对应的客户身份

- HTTP请求方式: `DELETE`

- `/loyalty/v1/membership/identity/$membershipId?type=mobile&value=133xxxx0592`

- Request

access_token  根据appid请求的token

type 会员身份类型

value 会员身份值

- Response

成功
```json
{"result":"success"}
```
失败：唯一身份
```json
{"error":{"code":409224,"message":"Identity is last one"}}
```
失败：未找到对应身份
```json
{"error":{"code":409225,"message":"Identity not found"}}
```

## 15.查看会员积分明细


- HTTP请求方式: `GET`

- `/loyalty/v1/membership/$membershipId/point?rows=20&page=1&sord=asc&needTotal=true`

- Request

access_token  根据appid请求的token

rows 每页记录数

page 当前页号

sord 记录排序顺序 asc/desc

needTotal 是否返回总记录数

- Response

 records 记录总数
 
 total 页数

```json
{
    "rows": [
        {
            "id": 248,
            "contentName": null,
            "campaignId": null,
            "date": "2018-07-11T09:55:35Z",
            "dateCreated": "2018-07-11T09:55:35Z",
            "leftPoint": 114,
            "lastUpdated": "2018-07-11T09:55:35Z",
            "pattern": 3,
            "source": null,
            "newPoint": 114,
            "tenantId": 26,
            "membershipId": 399,
            "point": 5,
            "oldPoint": 119,
            "type": -1,
            "status": -1,
            "expireDate": null,
            "remark": null,
            "externalId": "wechat_leave_message"
        }
    ],
    "records": 1,
    "total": 1
}
```
## 16.查看会员经验明细


- HTTP请求方式: `GET`

- `/loyalty/v1/membership/$membershipId/exp/changeLogs?rows=20&page=1&sord=asc&needTotal=true`

- Request

access_token  根据appid请求的token

rows 每页记录数

page 当前页号

sord 记录排序顺序 asc/desc

needTotal 是否返回总记录数

- Response

records 记录总数
 
 total 页数
```json
{
    "rows": [
        {
            "id": 256,
            "tenantId": 26,
            "dateCreated": "2018-01-22T10:09:18Z",
            "membershipId": 667,
            "lastUpdated": "2018-01-22T10:09:18Z",
            "expType": 1,
            "expValue": 10,
            "oldExp": 0,
            "remark": null,
            "dateObtain": "2018-01-22T10:09:17Z",
            "externalId": "1d09ca04-0c80-4d43-8db7-3d9c4f89f47d",
            "newExp": 10
        }
    ],
    "records": 1,
    "total": 1
}
```

## 17.根据md5查询会员身份的API
可以根据md5查询对应的会员身份

**调用请求**
```
HTTP请求方式: GET
http://api.dmhub.cn/loyalty/v1/membershipService/getMembershipIdentityByMd5?access_token={access_token}&md5type={md5type}&md5value={md5value}
```

**参数说明**

|参数|  是否必填| 说明|
|-----|----|----|
|access_token|  是 |访问API的令牌|
|md5type  |是| md5类型，通用md5取common,天猫md5取tmall|
|md5value|  是 |md5值|

**返回结果**
```
{
    "id": 8,
    "tenantId": 26,
    "dateCreated": "2019-04-03T06:09:04Z",
    "membershipId": 12427,
    "lastUpdated": "2019-04-03T06:09:04Z",
    "md5type": "common",
    "value": "13817704167",
    "type": "mobile",
    "md5value": "66f2a37ccdb1933d821ffb51d4922d1c"
}
```
**返回参数说明**

- type 会员身份类型
- value 会员身份值
- membershipId 会员的id

**找不到身份-返回结果**
```
status: 200 OK
{
    "error": {
        "code": "409200",
        "message": "Not found"
    }
}
```


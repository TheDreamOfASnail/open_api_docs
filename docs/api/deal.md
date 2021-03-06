

## 客户交易模型
DM Hub系统中所有交易信息都可以被记录下来。这里的交易可以是有订单发生的订单信息或没有订单行为的交易，如电话充值等。

通过客户交易接口，您可以将 交易成功 的订单导入DM Hub，也可以查询、修改和删除已经导入的订单。DM Hub会将导入的订单数据进行分析，您可以在导入后通过页面操作浏览，筛选，分析交易数据，也可以通过订单中的一些客户信息进行客户触达。

客户交易API包括查看所有订单API，增加订单API，修改订单API，查询订单API和删除订单API。这些API使用客户订单模型，如下所示。

<img src="../../resources/deal1.png" width="600"/>

在模型中，每一个交易都会包含n个订单物品，交易和订单物品通过订单编号相关联。具体的模型结构如下。

|属性|	属性意义|	类型|	说明|
| ------------ | ------- |-------|------------ |
|id|	客户交易ID|	Long|	只读字段|
|customerId|	客户id|	Long|	交易所属客户|
|orderNo|	订单号	|String|	交易在对接系统中的订单号|
|amountTotal	|订单总金额|	BigDecimal|	在交易中订单的总额，包括支付金额和优惠金额|
|amountPaid|	实际支付金额|	BigDecimal|	客户支付金额|
|amountDiscount|订单折扣金额	|BigDecimal|	订单折扣|
|discountType|优惠类型	|String|	优惠类型|
|couponCode	|优惠券	|String|	优惠券码|
|groupId	|团购|	String|	团购id|
|paymentTerm	|支付方式|	String|	现金、信用卡、微信支付、支付宝等支付方式|
|paymentNo|	支付号|	String|	支付后的交易号码|
|type	|订单类型	|String|	线上、线下等类型|
|dateOrder|	订单时间|	DateTime|	订单支付完成时间，采用UTC时间格式为:“2017-06-07T12:20:20Z” 如是北京时间，请减8小时|
|store	|店铺名称|	String|	订单店铺（线下或线上的店铺名）|
|salesChannel	|渠道|	String	|订单渠道（如线下，天猫等）|
|shippingMethod|	运送方式|	String|	货物的运送方式|
|contactName|	收货人名称|	String|	收货人名称|
|contactTel|	收货人电话|	String|	收货人电话|
|zipcode|	邮编|	String|	邮编|
|shippingProvince|	收货人省份|	String|	收货人省份|
|shippingCity	|收货人城市|	String|	收货人城市|
|shippingCounty|	收货人区县|	String	|收货人区县|
|shippingStreet|	收货人街道	|String|	收货人街道|
|shippingAddress	|收货人详细地址|	String|	收货人详细地址|
|buyerMessage	|买家留言|	String|	买家留言|
|remark	|订单备注|	String|	订单备注|
|campaign	|营销活动编码|	String|	营销活动编码|
|merchantPoint	|订单积分|	Integer|	订单积分|
>支持订单头自定义字段

### 订单物品模型

|属性|	属性意义|	类型	|说明|
| ------------ | ------- |-------|------------ |
|orderNo|	订单号|	String|	交易在对接系统中的订单号|
|lineId|	订单行ID|	String|	订单行在该订单中的唯一标识，可以传商品id或skuid|
|discountType|优惠类型	|String|	优惠类型|
|counponCode	|优惠券	|String|	优惠券码|
|productName|商品名称|	String|商品名称|
|productId|商品ID|	String|商品ID|
|skuId	|skuid|	String|skuID|
|brandName|	产品品牌 |	String |	产品品牌|
|category|	产品所属品类	|String|	产品所属品类，比如啤酒|
|qty|	订购数量|	Integer|	订购数量|
|priceUnit	|单件商品价格|	BigDecimal|	单件商品价格|
|priceSubTotal|	该商品总价|	BigDecimal|	该商品总价|
|priceSubPaid|	该商品实际支付金额|	BigDecimal|	该商品实际支付金额|
>支持订单行自定义字段

## 创建业务订单的API
订单物品放在订单的line字段中一起创建。
customerId和customerIdentities选填一项。

**调用请求**
```
http请求方式：POST
https://api.convertlab.com/v1/deals?access_token=<access_token>

POST请求示例：
{
  "customerId": 8888,
  "orderNo": "11122233344455",
  "amountTotal": 69.0,
  "amountPaid": 59.0,
  "amountDiscount": 10,
  "counponCode": "222333444",
  "groupId": "888",
  "paymentTerm": "wechat",
  "paymentNo": "555666777",
  "type": "online",
  "dateOrder": "2017-04-20T12:56:47Z",
  "store": "CL官方商城",
  "salesChannel": "tmall",
  "shippingMethod": "zto",
  "contactName": "JH",
  "contactTel": "12399988877",
  "shippingProvince": "上海",
  "shippingCity": "上海",
  "shippingCounty": "徐汇区",
  "shippingStreet": "汇谷科技园",
  "shippingAddress": "上海市徐汇区汇谷科技园1幢605",
  "lines": [
{
      "lineId": "149766666",
      "productName": "啤酒6瓶装",
      "productId": "1497",
      "skuId": "149766666",
      "category": "啤酒",
      "qty": 1,
      "priceUnit": 69.0,
      "priceSubTotal": 69.0
    }
  ],
  "customerIdentities": [
      {
          "identityType": "wechat",
          "identityValue": "o123456...",
          "identityName": "微信昵称"
      },
      {
          "identityType": "your-system-account",
          "identityValue": "user123",
          "identityName": "您系统里的用户名"
      }
  ]
}
```

**参数说明**

|参数|	是否必填|	说明|
| ------------ | ------- |------------- |
|id|	是|	客户交易ID|
|customerId|	是|	客户id|
|orderNo|	是	|订单号|
|amountTotal	|否	|订单总金额|
|amountPaid|	是	|实际支付金额|
|amountDiscount|否|	订单折扣|
|discountType|否|	优惠类型|
|counponCode	|否|	优惠券码|
|groupId|	否|	团购|
|paymentTerm	|否|	支付方式|
|paymentNo|	否|	支付号|
|type|	否	|订单类型|
|dateOrder	|是	|订单时间，时间格式为 “2016-11-11T11:11:11” 为UTC时间|
|store	|否	|店铺名称|
|salesChannel|	否|	渠道|
|shippingMethod|	否	|运送方式|
|contactName|	否	|收货人名称|
|contactTel|	否|	收货人电话|
|zipcode|否|	邮编|
|shippingProvince|	否	|收货人省份|
|shippingCity	|否|	收货人城市|
|shippingCounty|	否|	收货人区县|
|shippingStreet|	否|	收货人街道|
|shippingAddress	|否	|收货人详细地址|
|buyerMessage	|否|	买家留言|
|remark	|否|	订单备注|
|campaign	|否|	营销活动编码|
|merchantPoint	|否|	订单积分|
|orderNo|是|	交易在对接系统中的订单号|
|lineId|是|	订单行在该订单中的唯一标识，可以传商品id或skuid|
|discountType|否|	优惠类型|
|counponCode	|否|	优惠券码|
|productName|是|商品名称|
|productId	|否|商品ID|
|skuId|	否	|SkuID|
|brandName|	否 |	产品品牌|
|category|	否|	产品所属品类|
|qty|	是	|商品数量|
|priceUnit|	否	|单件商品价格|
|priceSubTotal|	否	|该商品总价|
|priceSubPaid|否|	该商品实际支付金额|

**返回结果**
```
{
  "id": 1234,
  "customerId": 8888,
  "orderNo": "11122233344455",
  "amountTotal": 69.0,
  "amountPaid": 59.0,
  "amountDiscount": 10,
  "counponCode": "222333444",
  "groupId": "888",
  "paymentTerm": "wechat",
  "paymentNo": "555666777",
  "type": "online",
  "dateOrder": "2017-04-20T12:56:47Z",
  "store": "CL官方商城",
  "salesChannel": "tmall",
  "shippingMethod": "zto",
  "contactName": "JH",
  "contactTel": "12399988877",
  "shippingProvince": "上海",
  "shippingCity": "上海",
  "shippingCounty": "徐汇区",
  "shippingStreet": "汇谷科技园",
  "shippingAddress": "上海市徐汇区汇谷科技园1幢605",
  "lines": [
{
      "lineId": "149766666",
      "productName": "啤酒6瓶装",
      "productId": "1497",
      "skuId": "149766666",
      "category": "啤酒",
      "qty": 1,
      "priceUnit": 69.0,
      "priceSubTotal": 69.0
    }
  ]
}
```

## 查询订单的API
**调用请求**
```
HTTP请求方法GET

https://api.convertlab.com/v1/deals/{id}?access_token={access_token}
```

**参数说明**

|参数|	是否必填|	说明|
| ------------ | ------- |----------- |
|access_token|	是	|请求凭证|
|id	|是	|客户交易ID|

**返回数据**
```
{
  "id": 1234,
  "customerId": 8888,
  "orderNo": "11122233344455",
  "amountTotal": 69.0,
  "amountPaid": 59.0,
  "amountDiscount": 10,
  "counponCode": "222333444",
  "groupId": "888",
  "paymentTerm": "wechat",
  "paymentNo": "555666777",
  "type": "online",
  "dateOrder": "2017-04-20T12:56:47Z",
  "store": "CL官方商城",
  "salesChannel": "tmall",
  "shippingMethod": "zto",
  "contactName": "JH",
  "contactTel": "12399988877",
  "shippingProvince": "上海",
  "shippingCity": "上海",
  "shippingCounty": "徐汇区",
  "shippingStreet": "汇谷科技园",
  "shippingAddress": "上海市徐汇区汇谷科技园1幢605",
  "lines": [
{
    "lineId": "149766666",
    "productName": "啤酒6瓶装",
    "productId": "1497",
    "skuId": "149766666",
    "category": "啤酒",
    "qty": 1,
    "priceUnit": 69.0,
    "priceSubTotal": 69.0
    }
  ]
}
```

## 查询所有订单的API
**调用请求**
```
http请求方式：GET
https://api.convertlab.com/v1/deals?access_token={access_token}&rows={rows}&page={page}&sidx={sidx}&sord={sord}
```

**参数说明**

|参数	|是否必填|	说明|
| ------------ | ------- |--------- |
|access_token|	是|	请求凭证|
|customer_id| 否	|	只查询某个客户的订单|
|rows|	否|	每页的记录数|
|page	|否	|起始页数，以1开始|
|sidx|	否|	排序的字段，默认按id排序|
|sord	|否	|asc表示升序，desc表示降序，默认为升序|

**返回结果**
```
{
  "page": 1,
  "records": 1,
  "rows": [
    {
      "id": 1234,
      "customerId": 8888,
      "orderNo": "11122233344455",
      "amountTotal": 69.0,
      "amountPaid": 59.0,
      "amountDiscount": 10,
      "counponCode": "222333444",
      "groupId": "888",
      "paymentTerm": "wechat",
      "paymentNo": "555666777",
      "type": "online",
      "dateOrder": "2017-04-20T12:56:47Z",
      "store": "CL官方商城",
      "salesChannel": "tmall",
      "shippingMethod": "zto",
      "contactName": "JH",
      "contactTel": "12399988877",
      "shippingProvince": "上海",
      "shippingCity": "上海",
      "shippingCounty": "徐汇区",
      "shippingStreet": "汇谷科技园",
      "shippingAddress": "上海市徐汇区汇谷科技园1幢605",
      "lines": [
{
      "lineId": "149766666",
      "productName": "啤酒6瓶装",
      "productId": "1497",
      "skuId": "149766666",
      "category": "啤酒",
      "qty": 1,
      "priceUnit": 69.0,
      "priceSubTotal": 69.0,
      "brandName": "百威"
    }
      ]
    }
  ]
```

## 修改业务订单的API
所有订单相关字段均可以修改

**调用请求**
```
http请求方式：PUT
https://api.convertlab.com/v1/deals/{id}?access_token={access_token}

PUT请求示例：
{
  "contactName": "CL",
  "contactTel": "18566677788",
}
```

**参数说明**

|参数|	是否必填|	说明|
| ------------ | ------- |-------- |
|access_token|	是|	请求凭证|

**返回结果**
```
{
  "id": 1234,
  "customerId": 8888,
  "orderNo": "11122233344455",
  "amountTotal": 69.0,
  "amountPaid": 59.0,
  "amountDiscount": 10,
  "counponCode": "222333444",
  "groupId": "888",
  "paymentTerm": "wechat",
  "paymentNo": "555666777",
  "type": "online",
  "dateOrder": "2017-04-20T12:56:47Z",
  "store": "CL官方商城",
  "salesChannel": "tmall",
  "shippingMethod": "zto",
  "contactName": "CL",
  "contactTel": "18566677788",
  "shippingProvince": "上海",
  "shippingCity": "上海",
  "shippingCounty": "徐汇区",
  "shippingStreet": "汇谷科技园",
  "shippingAddress": "上海市徐汇区汇谷科技园1幢605",
  "lines": [
{
      "lineId": "149766666",
      "productName": "啤酒6瓶装",
      "productId": "1497",
      "skuId": "149766666",
      "category": "啤酒",
      "qty": 1,
      "priceUnit": 69.0,
      "priceSubTotal": 69.0,
      "brandName": "百威"
    }
  ]
}
```

## 取消业务订单的API
取消业务订单

**调用请求**
```
http请求方式：POST
https://api.convertlab.com/v1/dealService/cancel?access_token={access_token}

POST请求示例：
{
  "orderNo": "11122233344455"
}
```

**参数说明**

|参数|	是否必填|	说明|
| ------------ | ------- |-------- |
|access_token|	是|	请求凭证|

**返回结果**
```
{
  "id": 1234,
  "customerId": 8888,
  "orderNo": "11122233344455",
  "amountTotal": 69.0,
  "amountPaid": 59.0,
  "amountDiscount": 10,
  "counponCode": "222333444",
  "groupId": "888",
  "paymentTerm": "wechat",
  "paymentNo": "555666777",
  "type": "online",
  "dateOrder": "2017-04-20T12:56:47Z",
  "store": "CL官方商城",
  "state": "已取消",
  "salesChannel": "tmall",
  "shippingMethod": "zto",
  "contactName": "CL",
  "contactTel": "18566677788",
  "shippingProvince": "上海",
  "shippingCity": "上海",
  "shippingCounty": "徐汇区",
  "shippingStreet": "汇谷科技园",
  "shippingAddress": "上海市徐汇区汇谷科技园1幢605",
  "lines": [
{
      "lineId": "149766666",
      "productName": "啤酒6瓶装",
      "productId": "1497",
      "skuId": "149766666",
      "category": "啤酒",
      "qty": 1,
      "priceUnit": 69.0,
      "priceSubTotal": 69.0,
      "brandName": "百威"
    }
  ]
}
```

## 退货订单的API
退货业务订单

**调用请求**
```
http请求方式：POST
https://api.convertlab.com/v1/dealService/refund?access_token={access_token}

POST请求示例：
{
"refundLines": [
    {
      "lineId": "149766666"
    }
  ],
  "refundTotal": 69.0,   // 退款金额
  "orderNo": "11122233344455"
}
```

**参数说明**

|参数|	是否必填|	说明|
| ------------ | ------- |-------- |
|access_token|	是|	请求凭证|

**返回结果**
```
{
	"dateRefund": null,
	"dateCreated": "2018-12-20T03:14:02Z",
	"orderNo": "11122233344455",
	"refundTotal": 69,
	"lastUpdated": "2018-12-20T03:14:02Z",
	"customerId": 8888,
	"reason": null,
	"id": 2100032073,
	"refundLines": [
  {
		"customerId": 8888,
		"skuId": "149766699",
		"orderNo": "11111111024",
		"productId": "1497",
		"qty": 1,
		"category": "啤酒",
		"priceUnit": 69.000000,
		"productName": "啤酒12瓶装",
		"lineId": "149766666",
		"refundId": 2100032073,
		"priceSubTotal": 69.000000
	}
  ]
}

```

## 删除退货订单的API
删除退货订单

**调用请求**
```
http请求方式：POST
https://api.convertlab.com/v1/dealService/deleteRefund?access_token={access_token}

POST请求示例：
{
  "orderNo": "E20180115140107"
}
```

**参数说明**

|参数|	是否必填|	说明|
| ------------ | ------- |-------- |
|access_token|	是|	请求凭证|

**返回结果**
```
{
	"dateRefund": null,
	"dateCreated": "2018-12-20T03:14:02Z",
	"orderNo": "E20180115140107",
	"refundTotal": 69,
	"lastUpdated": "2018-12-20T03:14:02Z",
	"customerId": 8888,
	"reason": null,
	"id": 2100032073,
	"refundLines": []
}

```

## 删除业务订单的API
**调用请求**

```
http请求方式：DELETE
https://api.convertlab.com/v1/deals/{id}?access_token={access_token}
```

**参数说明**

|参数|	是否必填|	说明|
| ------------ | ------- |----------- |
|access_token|	是	|请求凭证|


## 根据订单号查询订单详情的API
**调用请求**

```
http请求方式：GET
https://api.convertlab.com/v1/dealService/getDealByOrderNo?access_token={access_token}&orderNo={orderNo}
```

**参数说明**

|参数|	是否必填|	说明|
| ------------ | ------- |----------- |
|access_token|	是	|请求凭证|
|orderNo|	是	|需要查询的订单号|

**返回结果**
```
{
	"campaign": null,
	"shippingCounty": "徐汇区",
	"shippingStreet": "汇谷科技园",
	"zipcode": null,
	"shippingAddress": "上海市徐汇区汇谷科技园1幢605",
	"salesChannel": "tmall",
	"amountPaid": 59.000000,
	"contactName": "JH",
	"shippingCity": "上海",
	"state": "已付款",
	"merchantPoint": null,
	"groupId": "888",
	"amountTotal": 69.000000,
	"couponCode": null,
	"contactTel": "12399988877",
	"dateOrder": "2018-12-20T12:56:47Z",
	"buyerMessage": null,
	"customerId": 90840682394599424,
	"shippingMethod": "zto",
	"paymentTerm": "wechat",
	"shippingProvince": "上海",
	"store": "CL官方商城",
	"amountDiscount": 10.000000,
	"discountType": null,
	"paymentNo": "555666777",
	"remark": null,
	"type": "online",
	"lines": [
	{
		"couponCode": null,
		"priceSubPaid": null,
		"skuId": "149766666",
		"lNum3": null,
		"lNum2": null,
		"lNum4": null,
		"category": "啤酒",
		"priceUnit": 69.000000,
		"brandName": null,
		"priceSubTotal": 69.000000,
		"lNum1": null,
		"discountType": null,
		"lDate3": null,
		"lDate2": null,
		"lAttr6": null,
		"productId": "1497",
		"lDate4": null,
		"lAttr5": null,
		"productName": "啤酒6瓶装",
		"qty": 1,
		"lineId": "149766666",
		"lAttr4": null,
		"lAttr3": null,
		"lDate1": null,
		"lAttr2": null,
		"lAttr1": null
	},
	{
		"couponCode": null,
		"priceSubPaid": null,
		"lNum3": null,
		"lNum2": null,
		"lNum4": null,
		"category": "啤酒",
		"priceUnit": 69.000000,
		"productName": "啤酒12瓶装",
		"lineId": "149766699",
		"brandName": null,
		"priceSubTotal": 69.000000,
		"lNum1": null,
		"discountType": null,
		"skuId": "149766699",
		"lDate3": null,
		"lDate2": null,
		"lAttr6": null,
		"productId": "1497",
		"lDate4": null,
		"lAttr5": null,
		"qty": 1,
		"lAttr4": null,
		"lAttr3": null,
		"lDate1": null,
		"lAttr2": null,
		"lAttr1": null
	}
	],
	"id": 2307902913,
	"orderNo": "11111111024",
	"customerIdStr": "90840682394599424"
}

```

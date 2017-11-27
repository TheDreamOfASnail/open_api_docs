1. `Webhook` 消息目前只支持 `JSON` 格式。
2. `JSON` 消息支持变量，例如，变量 var 在消息中表示为 `"${var}"`；
3. 目前 `JSON` 变量包含`内置变量`和`客户属性变量`，`客户属性变量`需要添加 `customer` 前缀。以下`内置变量`，不需要任何前缀： `"flowId"`（自动流程 ID）, `"flowStep"`（自动流程步骤）, `"customerId"`（客户 ID）。
4. `客户属性变量`，例如客户名称（`customer.name`），客户邮箱（`customer.email`），客户电话（`customer.mobile`） 等；也支持`客户自定义属性`（ID以 attr 开头） 更多客户属性，请到 "设置中心" -> "客户属性" 查看。
5. 没有定义的客户属性或者客户的属性值为空，消息体内的内容也为空。
5. 以下是一个实际的 `Webhook` 消息的例子 - 
```
{
  "customerId": "${customerId}",
  "flowId": "${flowId}",
  "flowStep": "${flowStep}",
  "email" : "${customer.email}",
  "mobile": "${customer.mobile}",
  "customerAdditionInfo": "${customer.attr1}",
  "webhookSource": "convertlab"
}
```
如果客户的 id 为 123456， 自动流 id 为 789， 自动流步骤为 5， 客户email 为 customer@company.com， 客户电话号码为空， 客户的 attr1 属性为 "蓝色"，则用户收到的 webhook消息为 -
```
{
  "customerId": "123456",
  "flowId": "789",
  "flowStep": "3",
  "email" : "customer@company.com",
  "mobile": "",
  "customerAdditionInfo": "蓝色",
  "webhookSource": "convertlab"
}
```
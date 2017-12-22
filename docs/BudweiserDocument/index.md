

## 订单接口
### 订单模型


|     属性     |  类型  |             说明                |
| -----------------| ----- | -------------------------- |
| tid              |varchar |订单编号                        |
| orderstatus      |varchar |交易状态                        |
| total_weight     |varchar |该笔交易中所有商品的总数量          |
| receiver_address |varchar |收货人详细地址                   |
| trade_memo       |varchar |交易的备注内容          |
| created          |datetime|交易创建时间       |
| total_goods_fee  |varchar |商品总额（不包括配送费用          |
| receiver_city    |varchar |收货人城市       |
| pay_time         |datetime|付款时间          |
| shipping_fee     |varchar |交易物流配送费用       |
| receiver_mobile  |varchar |收货人电话          |
| receiver_name    |varchar |收货人姓名       |
| seller_uname     |varchar |卖家账号          |
| total_trade_fee  |varchar |交易应付总额（包括商品价格+配送费用）       |
| receiver_state   |varchar |收货人省份          |
| receiver_district|varchar |收货人地区       |
| orders_number    |varchar |子订单数量          |
| buy_name         |varchar |买家会员名       |
| buyer_account    |varchar |买家支付账号          |

### 商品模型

|     属性     |  类型  |             说明                |
| -----------------| ----- | -------------------------- |
| tid             |varchar |订单编号          |
| status          |varchar |交易状态       |
| msgid           |varchar |旺店通数据库的主键id          |
| oid             |varchar |子订单编号       |
| iid             |varchar |商品id          |
| title           |varchar |商品名称       |
| refund_status   |varchar |退款状态         |
| sale_price      |varchar |销售单价       |
| sku_properties  |varchar |商品名称          |
| bn              |varchar |商家编码       |
| num             |varchar |货品数量          |
| price           |varchar |原价       |
| sku_id          |varchar |规格编码          |
| total_item_fee  |int     |子订单实付金额       |


**调用请求**
```
HTTP请求方式：POST
http://(生产环境ip)/pushData?customerid=BudweiserTmall

POST请求示例：
{
  "from_type": "淘宝",
          "msg_id": "149245",
          "data": {
              "total_weight": "7.0000",
              "receiver_address": "天涯镇三亚天涯海角漫享时光海景客栈",
              "trade_memo": "",
              "created": "2017-04-21 13:52:40",
              "tid": "AT201704210011",
              "status": "TRADE_FINISHED",
              "total_goods_fee": "18.0000",
              "receiver_city": "460200",
              "pay_time": "2017-04-21 13:52:40",
              "shipping_fee": "0.0000",
              "receiver_mobile": "15001253861",
              "receiver_name": "大海",
              "seller_uname": "绿岛",
              "total_trade_fee": 18,
              "receiver_state": "460000",
              "receiver_district": "海南省 三亚市",
  			"orders_number":"2",
              "payment_lists": {
                  "buy_name": "巴黎新疆安康",
                  "buyer_account": ""
              },
              "orders": {
                  "iid": "5",
                  "title": "",
                  "oid": "AD201704210025",
                  "refund_status": "0",
                  "orders_items": {
                      "sale_price": 0,
                      "sku_properties": "",
                      "bn": "1HSD211-1-A1",
                      "num": "1.0000",
                      "price": "18.0000",
                      "sku_id": "sdfffds",
                      "total_item_fee": 0
                  }
              }
          }
}
```

**参数说明**
customerid为推送数据的客户,只接受customerid为 BudweiserTmall
- 请求体内字段的意义请参考属性模型


**返回结果**
```
{
    "flag": "success", //成功 success,失败 error
    "code": "0",   //success :0 ,error :1
    "message": "" // 程序处理信息
}
```


## 退换货接口
### 退换货订单模型

|     属性     |  类型  |             描述                |
| -----------------| ----- | -------------------------- |
| refund_id                               |int |退换单主键|
| refund_no                               |varchar |erp退换单号|
| platform_id                             |int |平台类型（此处返回的是id）|
| src_no                                  |varchar |平台退款单号|
| type                                    |int |1.退款(未发货，退款申请) 2.退货 3.换货 4.退款不退货 5.订单补款|
| process_statusYes                       |int|处理状态|
| status                                  |int |平台状态|
| guarantee_mode                          |int |担保方式：1.担保交易 2.非担保交易 3.非担保在线交易（ecshop）|
| cs_status                               |int|1.需要客服介入 2.客服已经介入 3.客服初审完成 4.客服主管复审失败5.客服处理完成|
| shop_no                                 |varchar |店铺编号|
| swap_trade_id                           |decimal(19,4) |换货订单id|
| pay_account                             |varchar |买家支付帐号|
| pay_no                                  |varchar |支付订单号|
| goods_amount                            |decimal(19,4) |货品金额|
| refund_amount                           |decimal(19,4) |买家申请退款金额|
| guarante_refund_amount                  |decimal(19,4) |平台退款金额|
| actual_refund_amount                    |decimal(19,4) |实际退款/收款金额|
| post_amount                             |decimal(19,4) |邮费金额|
| other_amount                            |decimal(19,4) |其它金额|
| paid                                    |decimal(19,4) |已退款/已收款|
| tid                                     |varchar |订单的原始单号|
| sales_trade_id                          |int |系统订单ID|
| sales_tid                               |varchar |系统订单号|
| buyer_nick                              |varchar |昵称|
| receiver_name                           |varchar|退款订单中收件人姓名|
| receiver_address                        |varchar |退款订单中收件人地址|
| receiver_telno                          |varchar |退款订单中收件人电话|
| return_name                             |varchar|退货人姓名|
| return_mobile                           |varchar |退货人手机号|
| return_telno                            |varchar |退货人电话|
| return_address                          |varchar |退回仓库地址|
| swap_receiver                           |varchar |换货收件人姓名|
| swap_mobile                             |varchar |换收发件人姓名手机|
| swap_telno                              |varchar |换货收件人姓名电话|
| swap_province                           |varchar |换货收件人省份|
| swap_city                               |varchar |换货收件人城市|
| swap_district                           |varchar |换货收件人区县|
| swap_area                               |varchar |换货收件人省市区|
| swap_warehouse_no                       |varchar |换出货品出库仓库编号|
| swap_address                            |varchar |换货收件人姓名地址|
| warehouse_no                            |varchar |期望退回的仓库编号|
| refund_time                             |date |退款创建时间|
| remark                                  |varchar |退款说明|
| modified                                |date |最后修改时间|
| return_logistics_name                   |varchar |       |
| return_logistics_no                     |varchar |       |
| direct_refund_amount                    |varchar |       |
| shop_name                               |varchar |       |
| customer_no                             |varchar |       |
| customer_name                           |varchar |       |
| swap_zip                                |varchar |       |
| swap_logistics_no                       |varchar |       |
| swap_logistics_typeswap_logistics_name  |varchar |       |
| creator_name                            |varchar |       |
| exchange_amount                         |decimal(19,4)|  |
| created                                 |date |          |

### 退货商品模型

|     字段名称     |  类型  |             描述                |
| -----------------| ----- | -------------------------- |
| order_id            |int |erp子订单主键|
| refund_id           |int |退换单主键|
| oid                 |int |原始子订单id|
| tid                 |varchar |订单子订单的原始单号|
| process_status      |int |处理状态|
| sales_tid           |varchar|销售订单编号|
| order_num           |decimal(19,4) |实际数量|
| price               |decimal(19,4) |价格|
| original_price      |decimal(19,4)|原价|
| discount            |decimal(19,4) |优惠|
| paid                |decimal(19,4) |已付金额|
| refund_num          |decimal(19,4) |退款数量|
| total_amount        |decimal(19,4) |退款总金额|
| spec_id             |int |erp商品主键|
| spec_no             |varchar |商家编码|
| goods_name          |varchar |货品名称|
| spec_name           |varchar |规格名称|
| suite_no            |varchar |组合装编号|
| suite_name          |varchar |组合装名称|
| suite_num           |decimal(19,4) |组合装数量|
| stockin_num         |decimal(19,4) |退货入库数量|
| remark              |varchar |退款说明|
| market_price        |varchar ||
| spec_code           |varchar ||
| goods_no            |varchar ||
| cost_price          |decimal(19,4) ||

### 换货商品模型

|     字段名称     |  类型  |             描述                |
| -----------------| ----- | -------------------------- |
| rec_id          |int |主键id|
| refund_id       |int |退换单主键id|
| target_type     |int |商品类型 1.表示单品 2.表示组合装|
| target_id       |varchar |商品id|
| goods_name      |varchar |商品名称|
| spec_name       |varchar|规格名称|
| merchant_no     |varchar|商家编码|
| retail_price    |decimal(19,4) |零售价|
| num             |decimal(19,4)|数量|
| remark          |varchar|备注|



**调用请求**
```
HTTP请求方式：POST
http://(生产环境ip)/pushReturngoods?app_key=24647807

POST请求示例：
{
"data": {
        "refunds": [
            {
                "shop_no": "api_test",
                "warehouse_no": "0",
                "exchange_amount": "0.0000",
                "remark": "0",
                "receiver_address": "上海 上海市 徐汇区 宜山路1289二楼前台",
                "type": "2",
                "return_logistics_name": "圆通速递",
                "pay_account": "1",
                "platform_id": "127",
                "swap_zip": "0",
                "created": "2017-12-07 13:29:44",
                "actual_refund_amount": "0",
                "return_mobile": "18900890089",
                "tid": "1712051519002014",
                "refund_amount": "0.0000",
                "receiver_telno": "323232",
                "cs_status": "0",
                "swap_logistics_name": "0",
                "refund_out_goods_list": [
                    {
                        "refund_id": "1",
                        "num": "2.0000",
                        "merchant_no": "test001",
                        "remark": "2",
                        "goods_name": "测试商品用例1",
                        "retail_price": "10.0000",
                        "target_type": "1",
                        "spec_name": "默认规格",
                        "target_id": "1",
                        "rec_id": "1"
                    }
                ],
                "status": "5",
                "customer_name": "测试c",
                "swap_address": "0",
                "customer_no": "KH201712050001",
                "receiver_name": "测试c",
                "src_no": "0",
                "modified": "2017-12-07 13:29:44",
                "buyer_nick": "测试c",
                "swap_logistics_no": "0",
                "sales_trade_id": "20990",
                "swap_telno": "1",
                "return_name": "测试c",
                "refund_order_list": [
                    {
                        "suite_no": "232",
                        "refund_num": "1.0000",
                        "goods_no": "lztestyj001",
                        "remark": "2",
                        "original_price": "0.0000",
                        "suite_name": "4343",
                        "suite_num": "0.0000",
                        "spec_code": "4",
                        "goods_name": "ERP普通测试商品0001",
                        "order_id": "1044",
                        "paid": "0.0000",
                        "order_num": "1.0000",
                        "oid": "1001767",
                        "process_status": "0",
                        "tid": "1712051519002014",
                        "refund_id": "884",
                        "total_amount": "0.0000",
                        "refund_order_amount": "0.0000",
                        "cost_price": "0.0000",
                        "spec_id": "2",
                        "stockin_num": "1.0000",
                        "discount": "0.0000",
                        "spec_name": "默认规格",
                        "price": "0.0000",
                        "market_price": "0.0000",
                        "spec_no": "2323"
                    }
                ],
                "creator_name": "0",
                "pay_no": "123",
                "guarante_refund_amount": "0",
                "refund_no": "TK1712070002",
                "guarantee_mode": "2",
                "swap_province": "0",
                "post_amount": "0.0000",
                "goods_amount": "0.0000",
                "paid": "0.0000",
                "other_amount": "0.0000",
                "sales_tid": "JY201712050001",
                "swap_receiver": "1",
                "process_status": "90",
                "refund_id": "884",
                "swap_mobile": "1",
                "return_address": "热热",
                "refund_time": "0",
                "return_telno": "3232",
                "swap_area": "0",
                "return_logistics_no": "0",
                "swap_trade_id": "0",
                "shop_name": "API公共测试",
                "swap_city": "0",
                "swap_logistics_type": "0",
                "direct_refund_amount": "0",
                "swap_district": "0"
            }
        ]
    }
}
```
**参数说明**

"refund_order_list"：此节点为退回货品详情信息。
"refund_out_goods_list"：此节点为换出货品详情信息。
如果只退货，那么refund_out_goods_list 的值设置为null即可
如果换货业务，比如用A换B，那么refund_order_list为货品A的详情信息，refund_out_goods_list为货品B的详情信息。
请求体内字段的意义请参见设计模型
       
       
**返回结果**
```
{
  "returnflag": "success", //处理成功:success ,失败:error
  "returncode": "0",  //success :0 error:1
  "returnmessage": "" //成功为空,失败为异常信息
}
```


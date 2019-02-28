

## 客户标签模型
客户标签在模型上分为标签分组(dimension)和标签(tag)

标签分组的模型：

|     属性     | 属性意义 |  类型  |             说明                |
| ------------ | ------- |-----| ------------------------------- |
| dimensionKey   |  分组主键     |String |最长255个字符          |
| name       |  分组的名字    | String|最长255个字符       |
| dateCreated       |  创建时间    | Datetime|格式为:“2017-06-01T12:12:12Z” 为UTC时间       |
| lastUpdated       |  最后更新时间    | Datetime|格式为:“2017-06-01T12:12:12Z” 为UTC时间       |

标签的模型：

|     属性     | 属性意义 |  类型  |             说明                |
| ------------ | ------- |-----| ------------------------------- |
| name   |  标签的名字     |String |最长32个字符         |
| dimension       |  所属分组的主键    | String|最长255个字符       |
| dateCreated       |  创建时间    | Datetime|格式为:“2017-06-01T12:12:12Z” 为UTC时间       |
| lastUpdated       |  最后更新时间    | Datetime|格式为:“2017-06-01T12:12:12Z” 为UTC时间       |

## 创建标签分组的API
**调用请求**
```
HTTP请求方式：POST
https://api.convertlab.com/v1/tagdimensions?access_token={access_token}

POST请求示例：
{
  "name": "购买汽车分组",
  "dimensionKey": "purchase_car_group"
}
```
**返回结果**
```
{
  "id": 1,
  "dimensionKey": "purchase_car_group",
  "name": "购买汽车分组",
  "lastUpdated": "2017-06-07T12:19:05Z",
  "dateCreated": "2017-06-07T12:19:05Z"
}
```
## 获取标签分组的列表的API
**调用请求**
```
HTTP请求方式：GET
https://api.convertlab.com/v1/tagdimensions?access_token={access_token}&max={max}
```
**参数说明**

|     参数     | 是否必填 |               说明                |
| ------------ | ------- |------------------------------- |
| access_token   |  是     |访问API的令牌         |
| max       |  否    |返回的列表数量，默认为20       |
**返回结果**
```
[
    {
      "id": 1,
      "dimensionKey": "purchase_car_group",
      "name": "购买汽车分组",
      "lastUpdated": "2017-06-07T12:19:05Z",
      "dateCreated": "2017-06-07T12:19:05Z"
    }
]
```
**DM Hub系统内置了三个标签分组**

|     分组主键     | 分组名称 |
| ------------ | ------- |
| basic   |  基本属性     |
| interests       |  兴趣偏好    |
| consumptive_habit       | 消费倾向    |

## 创建标签的API
**调用请求**
```
HTTP请求方式：POST
https://api.convertlab.com/v1/tags?access_token={access_token}

POST请求示例：
{
  "name": "法拉利",
  "dimension": "purchase_car_group"
}
```
**参数说明**
- access_token 请求接口的令牌

**返回结果**
```
{
  "id": 3,
  "name": "法拉利",
  "dimension": "purchase_car_group",
  "dateCreated": "2017-06-08T02:15:31Z",
  "lastUpdated": "2017-06-08T02:15:31Z"
}
```
## 更新标签的API
**调用请求**
```
HTTP请求方式：PUT
https://api.convertlab.com/v1/tags/{id}?access_token={access_token}

POST请求示例：
{
  "name": "保时捷",
  "dimension": "purchase_car_group"
}
```
**参数说明**

|     参数     | 是否必填 |               说明                |
| ------------ | ------- |------------------------------- |
| access_token   |  是     |访问API的令牌         |
| id       |  是    |      要更新的标签的id       |
| name   |  否     |      将标签更新为新名字        |
| dimension       |  否    |      将标签加入新的标签组      |

**返回结果**
```
{
  "id": 3,
  "name": "保时捷",
  "dimension": "purchase_car_group",
  "dateCreated": "2017-06-08T02:15:31Z",
  "lastUpdated": "2017-06-08T02:15:31Z"
}
```
## 删除标签的API
**调用请求**
```
http请求方式：DELETE
https://api.convertlab.com/v1/tags/{id}?access_token={access_token}
```
**参数说明**

|     参数     | 是否必填 |               说明                |
| ------------ | ------- |------------------------------- |
| access_token   |  是     |访问API的令牌         |
| id       |  是    |要更新的标签的id      |

## 查询标签的API
**调用请求**
```
http请求方式：GET
https://api.convertlab.com/v1/tags?access_token={access_token}&rows={rows}&page={page}&sidx={sidx}&sord={sord}
```
**参数说明**

|     参数     | 是否必填 |               说明                |
| ------------ | ------- |------------------------------- |
| access_token   |  是     |访问API的令牌         |
| rows       |  否    |每页的记录数      |
| page   |  否     |起始页数，以1开始        |
| sidx       |  否    |排序的字段，默认按id排序      |
| sord       |  否    |asc表示升序，desc表示降序，默认为升序      |

**返回结果**
```
{
  "page": 1,
  "records": 1,
  "total": 1,
  "rows": [
    {
      "id": 3,
      "dateCreated": "2017-06-08T02:15:32Z",
      "dimension": "purchase_car_group",
      "lastUpdated": "2017-06-08T02:15:32Z",
      "name": "法拉利"
    }
  ]
}
```
**返回结果说明**
- page 结果为第几页
- records 返回的记录条数
- total 系统拥有标签的总页数
- rows 返回的记录数组

## 为客户添加标签的API
```
http请求方式：POST
https://api.convertlab.com/v1/tagservice/addCustomerTag?access_token={access_token}

POST请求示例：
{
  "customerId": 12345,
  "tags": [
    {
    "name":"土豪",
    "dimension":"精英"
     }
   ]
}
```
**参数说明**

|     参数     | 是否必填 |               说明                |
| ------------ | ------- |------------------------------- |
| access_token   |  是     |访问API的令牌         |
| customerId       |  是    |要添加标签的客户id      |
| tags   |  是     |要添加的标签的数组      |

**返回结果**
```
[
   "name":"土豪",
   "dimension":"精英"
]
```
## 将标签从客户删除的API
```
http请求方式:POST
https://api.convertlab.com/v1/tagservice/removeCustomerTag?access_token=<access_token>

POST请求示例：
{
  "customerId": 12345,
  "tags": [
   "土豪","青年"
  ]
}
```
**参数说明**

|     参数     | 是否必填 |               说明                |
| ------------ | ------- |------------------------------- |
| access_token   |  是     |访问API的令牌         |
| customerId       |  是    |要删除标签的客户id      |
| tags   |  是     |要删除的标签的数组      |

**返回结果**
```
[
   "土豪","青年"
]
```
## 查询客户标签API
```
http请求方式：GET
https://api.convertlab.com/v1/tagservice/getCustomerTags?access_token={access_token}&customerId={customerId}
```
**参数说明**

|     参数     | 是否必填 |               说明                |
| ------------ | ------- |------------------------------- |
| access_token   |  是     |访问API的令牌         |
| customerId       |  是    |要查询标签的客户的id列表，多个客户id用逗号隔开      |

**返回结果**
```
{
  "12345": "土豪,精英"
}
```
## 合并标签的API
```
http请求方式：POST
https://api.convertlab.com/v1/tags/{fromId}/mergeto/{toid}?access_token={access_token}
```
**参数说明**

|     参数     | 是否必填   |               说明                |
| ------------ | --------- |------------------------------- |
| access_token   |  是     |访问API的令牌         |
| fromId       |  是    |要合并的源标签id。打上该标签的客户都会打上目标标签，同时该标签要给删除      |
| toId   |  是     |要合并标签的目标标签     |
**返回结果**
```
{"success": true}
```

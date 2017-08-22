

## 群组模型
您可以将客户按不同的条件分成不同的群组，并对不同群组的客户采用不同的策略进行培育。这种分组除了可以DM Hub系统中进行，您也可以通过开发API来完成。DM Hub的群组API允许操作静态群组，向群组中添加成员，查询成员列表等。

**群组模型**

|属性	|属性意义|	类型|	说明|
| ------------ | ------- |------ | ----------------- |
|id|	群组id|	Long|	只读字段|
|name|	群组名	|String|	最长运行255个字符|
|dateCreated|	群组创建时间|	String|	格式为: “2017-06-07T12:20:20Z” 为UTC时间|
|	lastUpdated|群组修改时间	|String|	格式同dateCreated|

**群组成员模型**

|属性|	属性意义|	类型	|说明|
| ------------ | ------- |------ | ----------------- |
|id|	客户在群组中的成员id|	Long|	只读字段|
|listId|	群组id|	Long	| |
|customerId|	客户id|	Long	| |
|dateCreated|	加入群组时间|	String|	格式为: “2017-06-07T12:20:20Z” 为UTC时间|

## 创建群组API
**调用请求**
```
http请求方式：POST
https://api.convertlab.com/v1/lists?access_token={access_token}

POST请求示例：
{
    "name": "金卡会员"
}
```

**参数说明**

|参数|	是否必填|	说明|
| ------------ | ------- |-------------- |
|access_token|	是	|访问API的令牌|
|name	|是|	群组名称|

**返回结果**
```
{
  "id": 1,
  "name": "金卡会员",
  "dateCreated": "2017-05-23T02:42:14Z",
  "lastUpdated": "2017-06-08T06:04:25Z"
}
```

## 删除群组的API
**调用请求**
```
http请求方式：DELETE
https://api.convertlab.com/v1/lists/{id}?access_token={access_token}
```
**参数说明**

|参数|	是否必填|	说明|
| ------------ | ------- |-------------- |
|access_token|	是	|访问API的令牌|
|id|	是	|群组id|

**注：** 删除群组并不会删除客户

## 查询群组列表的API
**调用请求**
```
http请求方式GET
https://api.convertlab.com/v1/lists?access_token={access_token}&rows={rows}&page={page}&sidx={sidx}&sord={sord}
```

**参数说明**

|参数	|是否必填|	说明|
| ------------ | ------- |-------------- |
|access_token|	是|	访问API的令牌|
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
      "id": 1,
      "name": "test2",
      "dateCreated": "2017-05-23T02:42:14Z",
      "lastUpdated": "2017-06-08T06:04:25Z"
    }
  ],
  "total": 1
}
```

**返回结果说明**

- page 结果为第几页
- records 返回的记录条数
- total 系统拥有标签的总页数
- rows 返回的记录数组

## 将一个客户加入某个群组API
**请求调用**
```
http请求方式：POST
https://api.convertlab.com/v1/listMembers?access_token={access_token}

POST请求示例：
{
  "data": {
    "customerId": 4,
    "listId": 1
  }
}
```

**参数说明**

|参数|	是否必填|	说明|
| ------------ | ------- |-------------- |
|access_token|	是|	访问API的令牌|
|data|	是|	具体数据都存放在该字段内|
|customerId|	是|	要加入群组的客户id|
|listId|	是|	要加入的群组id|

**返回结果**
```
{
  "data": {
    "id": 36345,
    "customerId": 5,
    "dateCreated": "2017-06-08T07:12:56Z",
    "lastUpdated": "2017-06-08T07:12:56Z",
    "listId": 1
  }
}
```

**返回结果说明**

- id为客户在群组中的id
- dateCreated 为客户加入群组中的时间

## 将一个客户从某个群组中删除的API
**调用请求**
```
http请求方式：DELETE
https://api.convertlab.com/v1/listMembers/{id}?access_token={access_token}
```

**参数说明**

|参数|	是否必填|	说明|
| ------------ | ------- |-------------- |
|access_token|	是|	访问API的令牌|
|id|	是|	要删除客户在群组中的id|

## 将多个客户加入某群组的API
**调用请求**
```
HTTP请求方式：POST
https://api.convertlab.com/v1/listMembersBatch?access_token={access_token}

POST请求示例：
{
  "items": [
    {
      "customerId": 91,
      "listId": 1
    },
    {
      "customerId": 92,
      "listId": 1
    }
  ]
}
```

**参数说明**

|参数|	是否必填|	说明|
| ------------ | ------- |-------------- |
|access_token|	是	|访问API的令牌|
|items	|是	|存放具体数据数组|
|customerId|	是|	要加入群组的客户id|
|listId|	是	|要加入的群组id|

**返回结果**
```
{
    "items": [
      {
        "id": 1,
        "customerId": 92,
        "dateCreated": "2017-01-24T07:32:33Z",
        "lastUpdated": "2017-01-24T07:32:34Z",
        "listId": 1
      },
      {
        "id": 2,
        "customerId": 91,
        "dateCreated": "2017-01-24T07:33:34Z",
        "lastUpdated": "2017-01-24T07:33:34Z",
        "listId": 1
      }
    ]
  }
  ```

## 查看群组成员详情的API
**调用请求**
```
HTTP请求方式：GET
https://api.convertlab.com/v1/listMembers?access_token={access_token}&listId={listId}&customerId={customerId}&page={page}&rows={rows}&sidx={sidx}&sord={sord}
```

**参数说明**

|参数|	是否必填|	说明|
| ------------ | ------- |-------------- |
|access_token|	是	|访问API的令牌|
|listId|	否|	要查询群组成员详情的群组id|
|customerId|	否|	要查询群组成员详情的客户id|
|page|	否|	起始页，从1开始|
|rows|	否|	每页的记录数|
|sidx|	否|	排序的字段，默认按id排序|
|sord|	否|	asc表示升序，desc表示降序，默认为升序|

**返回结果**
```
{
    "items": [
      {
        "id": 1,
        "customerId": 92,
        "dateCreated": "2017-01-24T07:32:33Z",
        "lastUpdated": "2017-01-24T07:32:34Z",
        "listId": 1
      },
      {
        "id": 2,
        "customerId": 91,
        "dateCreated": "2017-01-24T07:33:34Z",
        "lastUpdated": "2017-01-24T07:33:34Z",
        "listId": 1
      }
    ]
  }
  ```
## 根据条件获取群组成员的客户详情的API
**调用请求**
```
HTTP请求方式：GET
https://api.convertlab.com/v1/listservice/members?access_token={access_token}&listId={listId}&joinListDateSince={joinListDateSince}&joinListDateTo={joinListDateTo}&rows={rows}&page={page}&sidx={sidx}&sord={sord}
```

**参数说明**

|参数|	是否必填|	说明|
| ------------ | ------- |-------------- |
|access_token|	是|	访问API的令牌|
|listId|	是	|要查询的群组|
|joinListDateSince|	否|	加入群组的最早时间|
|joinListDateTo|	否|	加入群组的最晚时间|
|rows|	否|	每页的记录数|
|page|	否|	起始页数，以1开始|
|sidx|	否|	排序的字段，默认按id排序|
|sord|	否|	asc表示升序，desc表示降序，默认为升序|

**返回结果**
```
{
  "rows": [
    {
      "id": 5,
      "displayName": "test6",
      "name": "test6",
      "img": null,
      "gender": 0,
      "mobile": null,
      "mobileVerified": false,
      "email": null,
      "emailVerified": false,
      "birthday": null,
      "wechat": null,
      "nickName": null,
      "country": null,
      "province": null,
      "city": null
    },
    {
      "id": 7,
      "displayName": "小D",
      "name": "小D",
      "img": null,
      "gender": 1,
      "mobile": "18612341234",
      "mobileVerified": true,
      "email": null,
      "emailVerified": false,
      "birthday": null,
      "wechat": null,
      "nickName": null,
      "country": null,
      "province": null,
      "city": null
    }
  ]
}
```

## 根据条件获取群组成员的数量的API
**调用请求**
```
HTTP请求方法：GET
https://api.convertlab.com/v1/listservice/memberCount?access_token={access_token}&listId={listId}&joinListDateSince={joinListDateSince}&joinListDateTo={joinListDateTo}
```

**参数说明**

|参数|	是否必填|	说明|
| ------------ | ------- |-------------- |
|access_token|	是	|访问API的令牌|
|listId|	是|	要查询的群组|
|joinListDateSince|	否	|加入群组的最早时间|
|joinListDateTo|	否|	加入群组的最晚时间|

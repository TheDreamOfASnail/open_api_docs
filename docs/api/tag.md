**标签(tag)数据结构**
```
{
  "name": "标签名称",
  "dimension": "标签分组主键"
}
```
**标签分组(tagdimension)数据结构**
```
{
  "dimensionKey": "分组主键",
  "name": "分组名字",
  "parentKey": "上级分组（可省略）"
}
```

## 标签分组的创建
**调用请求**
```
POST /v1/tagdimensions
```
**Payload**
```
{
  "dimensionKey": "students",
  "name": "学生"
}
```
- - -

## 向客户添加标签
**调用请求**
```
POST  /v1/tagservice/addCustomerTag
```
**Payload**
```
{
  "customerId": 1234,
  "tags": [
    {
       "name": "小学生",
       "dimension": "students"
    }
  ]
}
``` 
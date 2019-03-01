

## 导入媒体数据
将已经存在oss上的文件进行导入

**调用请求**
```
HTTP请求方式: POST
https://api.convertlab.com/v1/third_party_data/importData?access_token={access_token}

POST请求示例：
{
  "fileList": [{
    file: "$file",
    eventType: "$eventType"
  }]
}
```

**参数说明**

|     参数     | 是否必填 |             说明                |
| ------------ | ------- | ------------------------------- |
| fileList    |  是     | 要导入的文件列表          |


|字段	|型|	说明|
| ------------ | ------- |-----|
|file	|字符串(String)|	文件在oss上的路径，例如： oss://cl-data/test1  |
|eventType	|字符串(String)|	事件类型，可以为："event.mediaView"（曝光事件）或者 "event.mediaClick"（点击事件） |


**返回说明**
```
{
   "error": { 
        code： ''，
        message: 'xxx',
   },
  "taskList": [$taskid]
}
```
**返回字段说明**

|     字段     |          说明             |
| ------------ | ------------------------ |
| error   |  导入任务未创建成功     |
| taskList|  导入任务id列表  |



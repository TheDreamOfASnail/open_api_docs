登录DM Hub系统，点击菜单**内容>公司网站>集成公司网站**：
![](../resources/track1.png)

按照页面的描述文字，将页面内的javascript代码放在官网主页的</html>之前。 如：
![](../resources/track2.png)

**说明**

1. this.push({})中的参数是一个JSON对象，该JSON对象便是整个页面追踪过程的上下文(context)信息，我们称之为**页面参数**(page parameters)。该JSON可以包含以下字段如下：

	|字段名|字段类型|字段描述|
	|:---|:---|:---|  
	|channelType|String|表示集成的触点类型，需要小写英文字母，比如公司的英文名，或者网站的域名|
	|channelName|String|触点的名字，比如公司网站的名字|
	|userId|String|用户标识，如果公司网站有用户体系，可以是用户的id。|
	|source|String|访问来源| 
	|tag|String|内容标签，多个标签可以用逗号分开|

2. this.track()函数用户记录用户的访问行为，除了open_page行为，我们还可以通过自定义一些事件，来跟踪用户的页面点击行为。track()具有以下参数：
function track(event, targetName, targetId, properties, callback)
		
	**注**：targetName和targetId必须同时出现或同时省略
	

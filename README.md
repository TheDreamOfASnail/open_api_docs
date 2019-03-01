# open_api_docs
Convertlab公司DM Hub产品的开发API文档
- - - 
    
## 目录结构解析
* mkdocs.yml: 总配置，包括主题模式、Github路径、各目录结构层次等。 
* docs目录: 存放所有md文件等地方。
* docs/test目录: api中swaggerui所在目录的所有内容，用于在线测试。

- - - - 

配置需求:
- mkdocs 0.16.3

## 部署到github pages上的方法
1. 安装mkdocs, apt-get/homebrew。
2. 在与mkdocs.yml同级的路径下执行"mkdocs gh-deploy"

## 本地测试
- mkdocs serve

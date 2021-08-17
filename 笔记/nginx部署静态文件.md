### nginx部署静态文件
#### 问题出现在URL上带了中文，导致访问不到正确的资源
##### 1. nginx server 中配置 charset utf-8
```
...
server {
  listen 8080
  charset utf-8
  ...
}
...
```
##### 2. unzip解压带参数
```
// 命令行输入：
unzip -O cp936 PHM.zip
```
##### 3. 另一种情况，可能是解压后的文件编码格式为GBK(理论上不会，Linux默认格式为UTF-8,怀疑是没有在Linux上解压，而是在windows上解压后上传了文件夹（改上传格式应该可以避免），导致此文件编码格式为GBK)，需要转一下。
```
// 先安装convmv
convmv -f GBK -t UTF-8 -r --notest 文件路径
```
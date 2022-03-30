##### 直接使用已编译好的包
Node 官网已经把 linux 下载版本更改为已编译好的版本了，我们可以直接下载解压后使用：
```
# cd /usr/local/src/
# wget https://nodejs.org/dist/v14.16.1/node-v14.16.1-linux-x64.tar.xz    // 下载
# tar xf node-v14.16.1-linux-x64.tar.xz         // 解压
# cd node-v14.16.1-linux-x64/                   // 进入解压目录
# ./bin/node -v                                 // 执行node命令 查看版本
v14.16.1
```

解压文件的 bin 目录底下包含了 node、npm 等命令，我们可以使用 ln 命令来设置软连接：
```
# ln -s /usr/local/src/node-v14.16.1-linux-x64/bin/node /usr/bin/node
# node -v
v14.16.1

# ln -s /usr/local/src/node-v14.16.1-linux-x64/bin/npm /usr/bin/npm
# npm -v
6.14.12
```
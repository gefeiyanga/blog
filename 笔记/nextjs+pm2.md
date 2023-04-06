#### next.js部署，使用pm2守护进程

##### 1. 安装pm2: npm install pm2@latest -g
##### 2. link pm2: ln -s /root/app/nodejs/node-v14.15.0-linux-x64/bin/pm2 /usr/local/bin
##### 3. 拉nextjs的样板代码，npm install 安装依赖
##### 4. 更新package.json 
  ```...
    "start": "next start -p 8008",
    ...
  ```
##### 5. 生成pm2配置文件并更新: pm2 ecosystem
  ```
  module.exports = {
    apps : [{
        name: 'official-web',
        exec_mode: 'cluster',
        script: 'npm',
        args: 'start',
    }],
  };
  ```
##### 6. 启动pm2: pm2 start ecosystem.config.js

##### PS. 使用命令行启动，使用cluster模式，并集中打印日志
```
pm2 start --name official-web dist/main.js -i max --merge-logs
```

# nginx+umi 配置前端服务器

#### 更新nginx安装在 usr/local 下的启动方式：https://blog.csdn.net/w1014074794/article/details/51881050

#### nginx安装
https://www.nginx.cn/install

#### nginx配置
nginx配置默认地址 /etc/nginx/nginx.conf
修改配置后平滑重启 nginx -s reload
以下代码基于不同端口配置多个项目

#### nginx服务 重启：service nginx restart
#### nginx重启报错：nginx: [error] open() "/usr/local/nginx/logs/nginx.pid" failed (2: No such file or directory)
```
// 使用nginx -c的参数指定nginx.conf文件的位置
/usr/local/nginx/sbin/nginx -c /usr/local/nginx/conf/nginx.conf
```

#### 配置文件部分代码
```
...
    server {
        listen 8001;

        location / {
          alias /usr/local/equipment_management/dist/;
          autoindex on;
          # 增加下列命令，index.html可换为项目中使用的其它文件名
          # 解决刷新404的问题
          try_files $uri $uri/ /index.html;
        }
        location /api {
          rewrite  ^/api/(.*)$ /$1 break;
          proxy_pass http://47.103.209.88:8082;
        }
    }

    server {
        listen       80 default_server;
        listen       [::]:80 default_server;
        server_name  _;
        root         /usr/local/Limitless_2_3/Template/layout_1/LTR/material/full;

        # Load configuration files for the default server block.
        include /etc/nginx/default.d/*.conf;

        location / {
        }

        location /global_assets/ {
          alias /usr/local/Limitless_2_3/Template/global_assets/;
          autoindex on;
        }
    }

    server {
        listen      3000;
        server_name  localhost;

        #charset utf-8;

        #access_log  logs/host.access.log  main;

        location / {
            root   html;
            try_files $uri /index.html;
            index  index.html index.htm;
        }
        location ^~/local_analysis {
            #此为后台服务器地址
            proxy_pass   http://127.0.0.1:8192/local_analysis/;
        }

        location ^~/data/upload{
            #此为后台静态文件访问地址
            proxy_pass   http://127.0.0.1:8192/local_analysis/data/upload/; 
        }
    }
...
```

#### 参考部分
https://v2-pro.ant.design/docs/deploy-cn  antd-pro官方文档
https://juejin.cn/post/6844904183879958541
https://www.ghosind.com/2020/08/14/react-404-after-reload

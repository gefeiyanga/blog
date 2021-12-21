#### 服务器重启后遇到的Error: Failed to start nginx.service:unit not found when starting nginx under centos

#### The reason for the error is that the nginx service was not added, so the startup failed.

#### Solution:

1. Create a new file named nginx under / root/etc/init.d / directory
Or execute the command in the root directory: vim/etc/init.d/nginx (note that there is a space next to vim)

2. Insert the following code

```
#!/bin/sh
# nginx - this script starts and stops the nginx daemin
#
# chkconfig:   - 85 15

# description:  Nginx is an HTTP(S) server, HTTP(S) reverse \
#               proxy and IMAP/POP3 proxy server

# processname: nginx
# config:      /usr/local/nginx/conf/nginx.conf
# pidfile:     /usr/local/nginx/logs/nginx.pid

# Source function library.

. /etc/rc.d/init.d/functions

# Source networking configuration.

. /etc/sysconfig/network

# Check that networking is up.

[ "$NETWORKING" = "no" ] && exit 0

nginx="/usr/local/nginx/sbin/nginx"

prog=$(basename $nginx)

NGINX_CONF_FILE="/usr/local/nginx/conf/nginx.conf"

lockfile=/var/lock/subsys/nginx

start() {

    [ -x $nginx ] || exit 5

    [ -f $NGINX_CONF_FILE ] || exit 6

    echo -n $"Starting $prog: "

    daemon $nginx -c $NGINX_CONF_FILE

    retval=$?

    echo

    [ $retval -eq 0 ] && touch $lockfile

    return $retval

}


stop() {

    echo -n $"Stopping $prog: "

    killproc $prog -QUIT

    retval=$?

    echo

    [ $retval -eq 0 ] && rm -f $lockfile

    return $retval

}



restart() {

    configtest || return $?

    stop

    start

}


reload() {

    configtest || return $?

    echo -n $"Reloading $prog: "

    killproc $nginx -HUP

    RETVAL=$?

    echo

}

force_reload() {

    restart

}


configtest() {

  $nginx -t -c $NGINX_CONF_FILE

}



rh_status() {

    status $prog

}


rh_status_q() {

    rh_status >/dev/null 2>&1

}

case "$1" in

    start)

        rh_status_q && exit 0
        $1
        ;;

    stop)


        rh_status_q || exit 0
        $1
        ;;

    restart|configtest)
        $1
        ;;

    reload)
        rh_status_q || exit 7
        $1
        ;;


    force-reload)
        force_reload
        ;;
    status)
        rh_status
        ;;


    condrestart|try-restart)

        rh_status_q || exit 0
            ;;

    *)

        echo $"Usage: $0 {start|stop|status|restart|condrestart|try-restart|reload|force-reload|configtest}"
        exit 2

esac
```

3. Enter this directory by command

　　# cd /etc/init.d

 

4. Execute the following commands accordingly
```
chmod 755 /etc/init.d/nginx
```
```
chkconfig --add nginx (note that before add are two short horizontal lines-)

chkconfig nginx on

chkconfig --list
```
5.service nginx status error reporting
![avatar](https://github.com/gefeiyanga/blog/blob/master/img/nginxError.jpeg?raw=true)

Error: Failed to start SYSV: Nginx is an HTTP(S) server, HTTP(S) reverse

There's nothing wrong here, but most of the time we start nginx with / usr/local/nginx/sbin/nginx

Just find the process and kill it, then execute / etc/rc.d/init.d/nginx start.

Order:
```
killall -9 nginx

/etc/rc.d/init.d/nginx start
```
Then you can start the nginx service with service nginx restart|start|stop...!!!

#### 最后浏览器请求依然无法访问，而服务器上curl可以拿到页面，查找资料后发现要 禁用/停止自带的firewalld服务
```
1.停止firewalld服务
systemctl stop firewalld
2.禁用firewalld服务
systemctl mask firewalld
centos有自带的防火墙  把它关闭后浏览器就正常访问了
```

#### 抄自 https://programmer.ink/think/failed-to-start-nginx.service-unit-not-found-when-starting-nginx-under-centos.html

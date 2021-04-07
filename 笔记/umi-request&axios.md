# umi-request & axios

#### umi-request(基于fetch)
```
import { extend } from 'umi-request';
import { notification, message } from 'antd';

// 封装
export const baseUrl = '/local_analysis';

const codeMessage: { [status: number]: string } = {
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。',
  700: '用户未登录。',
  701: '用户已在其他地点登录。',
  702: '用户已过期，请重新登录。',
};

/** 异常处理程序 */
const errorHandler = (error: { response: Response }): Response => {
  const { response } = error;
  if (response && response.status) {
    const errorText = codeMessage[response.status] || response.statusText;
    const { status, url } = response;

    notification.error({
      message: `请求错误 ${status}: ${url}`,
      description: errorText,
    });
    if (
      response.status == 701 ||
      response.status == 701 ||
      response.status == 702
    ) {
      localStorage.setItem('userInfo', JSON.stringify({}));
      window.location.href = '/user/login'
    }
  } else if (!response) {
    notification.error({
      description: '您的网络发生异常，无法连接服务器',
      message: '网络异常',
    });
  }
  return response;
};

/** 配置request请求时的默认参数 */
const request = extend({
  prefix: baseUrl,
  errorHandler, // 默认错误处理
  credentials: 'include', // 默认请求是否带上cookie
  mode: 'cors',
  headers: {
    'Content-Type': 'application/json',
    Accept: '*/*',
    token: JSON.parse(localStorage.getItem('userInfo') || '{}').cookie,
  },
});
```

#### axios(xhr)
```
import axios from 'axios';
import { notification, message } from 'antd';

// 封装
export const baseUrl = '/local_analysis';

const request = axios.create({
  baseURL: baseUrl,
  withCredentials: true,
});
let number = 0;
// 添加请求拦截器
request.interceptors.request.use(
  function (config) {
    // console.log(config)
    // 在发送请求之前做些什么
    return {
      ...config,
      headers: {
        ...config?.headers,
        token: JSON.parse(localStorage.getItem('userInfo') || '{}').cookie,
        'Cache-Control': 'no-store',
      },
    };
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  },
);
request.interceptors.response.use(
  (res) => {
    number = 0;
    if (res.data.success) {
      return res;
    } else {
      if (res.data.message !== '01') {
        message.error(res.data.message);
      }
      return res;
    }
  },
  (error) => {
    if (error) {
      // 请求配置发生的错误
      console.log(error);
      if (!error.response) {
        throw new Error(error.message);
      }
      // 获取状态码
      const status = error.response.status;
      // 错误状态处理
      if (status === 702) {
        if (!number) {
          message.error('用户已过期，请重新登录');
          localStorage.setItem('userInfo', JSON.stringify({}));
          number++;
        }
      } else if (status === 700) {
        if (!number) {
          message.error('用户未登录');
          localStorage.setItem('userInfo', JSON.stringify({}));
          number++;
        }
      } else if (status === 701) {
        if (!number) {
          message.error('用户已在其他地点登录');
          localStorage.setItem('userInfo', JSON.stringify({}));
          number++;
        }
      }
    }
    return Promise.reject(error);
  },
);
```

#### 开发阶段前后端分离时，跨域导致无法携带cookie

开发时跨域的“最佳”解决方式是proxy，基于的是[webpack devserverproxy](https://webpack.docschina.org/configuration/dev-server/#devserverproxy)

在webpack config未封装的框架中（如create-react-app），在package.json文件中配置proxy

在umi框架中，需要在.umirc.ts文件中配置proxy，且只能是proxy。[参考](https://www.yuque.com/umijs/umi/proxy)

当配置好proxy，能登录，但其他接口仍然无法携带cookie，可以查看接口中Cookie栏中过滤掉cookie的原因（记得钩上查看过滤掉的cookie），这里给个例子(我的项目比较特别，所以这么配置，如果直接代理反向api会导致cookie的path 和 request中的path不一致，请求无法携带cookie)
```
  proxy: {
    '/local_analysis': { 
      target: 'http://192.168.1.156:8192/',
      // changeOrigin: true,
      // pathRewrite: { '^/local_analysis': '/local_analysis' },
    },
  },
```
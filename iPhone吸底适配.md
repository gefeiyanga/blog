# iPhone新机型吸底适配
#### 问题：
iPhoneX 及后来的苹果机型取消了物理按键，改成底部小黑条，导致常规吸底效果体验很差。

解决方案：
##### 解决方法分三步
##### 1. 设置网页在可视窗口的布局方式
###### viweport-fit 属性，使得页面内容完全覆盖整个窗口：
![avatar](https://raw.githubusercontent.com/gefeiyanga/Tips/master/%E6%88%AA%E5%B1%8F2020-06-03%20%E4%B8%8B%E5%8D%8810.57.18.png)
###### contain: 可视窗口完全包含网页内容（左图）
###### cover：网页内容完全覆盖可视窗口（右图）
###### auto：默认值，跟 contain 表现一致
```
<meta name="viewport" content="width=device-width, viewport-fit=cover">
```
##### 2. 页面主体内容限定在安全区域内
###### 如果不设置这个值，可能存在小黑条遮挡页面最底部内容的情况
```
body {
    // 兼容 iOS < 11.2
    padding-bottom: constant(safe-area-inset-bottom);
    // 兼容 iOS >= 11.2
    padding-bottom: env(safe-area-inset-bottom);
}
```
##### 3. fixed 元素的适配
###### 注意，这个方案需要吸底条必须是有背景色的，因为扩展的部分背景是跟随外容器的，否则出现镂空情况。
```
// 可以通过加内边距 padding 扩展高度：
{
    padding-bottom: constant(safe-area-inset-bottom);
    padding-bottom: env(safe-area-inset-bottom);
}

// 或者通过计算函数 calc 覆盖原来高度：
{
    height: calc(60px(实际情况决定) + constant(safe-area-inset-bottom));
    height: calc(60px(实际情况决定) + env(safe-area-inset-bottom));
}
```

<a href="https://aotu.io/notes/2017/11/27/iphonex/index.html" target="_blank">参考文档</a>
### iPhone微信浏览器音频自动播放

#### 1. 需求
    全景图片在手机预览时，如果用户插入了背景音乐，预览时应该自动播放，但在iPhone微信浏览器中无法实现，Android没有问题。网上搜了下，微信和苹果只有检测到用户行为时才会播放音乐，但微信开发了WeixinJSBridge接口，可以模拟用户行为。而网上的代码并不完整，在阅读微信开发者手册后，完成了以下较为完整的代码。

#### 2. 代码部分
```
    if(window.WeixinJSBridge){  
        WeixinJSBridge.invoke('getNetworkType', {}, (e) => {  
            this.audio.play();  
        }, false);  
    } else {  
        document.addEventListener("WeixinJSBridgeReady", () => {  
            WeixinJSBridge.invoke('getNetworkType', {}, (e) => {  
                this.audio.play();  
            });  
        }, false);  
    } 
```
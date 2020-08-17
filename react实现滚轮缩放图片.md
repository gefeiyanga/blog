### react实现滚轮缩放图片

#### 1. 需求
    全景客户端项目之前是后端处理xml文件，导致前端无法监听点击热点事件，即无法获取到热点链接的图片，后端也没法写js代码。现在考虑重构，前端则能拿到图片链接，可以完成缩热点链接图片的需求。

#### 2. 代码部分
```
    jsx:

    moreDetailSrc ? 
    <div className={style.moreDetailImgWrap} onClick={this.closeMoreDetail}>
        <img id='bigImg' onWheel={this.bigimg} className={style.moreDetailImg} src={moreDetailSrc} alt=""/>
    </div> : null
```
```
    css: 

    .moreDetailImgWrap
        position: fixed
        z-index 999
        width 100vw
        height 100vh
        left 0
        right 0
        margin: 0 auto
        .moreDetailImg
            width 400px
            height 400px
            position: absolute
            left 50%
            right 50%
            top: 35%
            transform: translate(-50%, -50%)
```

```
    js:
    
    bigimg = (event) => {
        let obj = document.getElementById('bigImg')
        let zoom = parseInt(obj.style.zoom,10) || 100;
        let wheelDelta = event.nativeEvent.wheelDelta || -event.nativeEvent.detail
        // 改变'32'即可改变每次滚轮导致图片缩放的程度
        zoom += wheelDelta / 32;
        if(zoom > 0 )
            if (zoom < 60) {
                return
            }
            document.getElementById('bigImg').setAttribute('style', `zoom:${zoom}%`)
        return false;
    }
```

#### 3. 注意点
    1. 监听滚轮事件的方法在原生js中为onmousewheel，而在react中没有对应的onMouseWheel方法，而是叫onWheel。同样，该方法不同于原生方法，他没有event.wheelDelta，它在react中是 event.nativeEvent.wheelDelta || -event.nativeEvent.detail

    2. 这里的css也有一些特殊。被缩放的图片要有一个父元素包裹，且为固定定位，宽高为视口宽高，被缩放的图片元素为绝对定位。这要做的目的是为了让被缩放的图片始终处于视口中央。
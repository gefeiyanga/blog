# 小程序和NFC板子通信
#### 需求
微信小程序读写NFC板子，完成相关配置
#### 硬件背景
NFC规格：iso15693标准，ST25DV_xx， NFCv标签，当然还有其他规格，以下叙述以该规格展开。
#### 小程序背景
参考微信小程序官方 https://developers.weixin.qq.com/miniprogram/dev/framework/device/nfc.html
```
// 获取NFC适配器实例
const nfc = wx.getNFCAdapter()

// 注册贴卡监听回调
nfc.onDiscovered(this.discoverHandler)

// 开始监听贴卡
nfc.startDiscovery({
  fail: (err)=>{},
  success: ()=>{},
  complete: ()=>{}
})

// 监听回调
discoverHandler: function (res) {
  const _that = this;
  const { nfc } = this;

  // NfcV
  if (res.techs.includes(nfc.tech.nfcV)) {
    const nfcV = nfc.getNfcV()
    nfcV.connect({
      success: async (res) => {
        if(nfcV.isConnected) {

          // 写单个块数据
          // writeSingleBlock(nfcV, 16);

          // 读单个块数据
          // readSingleBlock(nfcV, 2)

          // 写多个块的数据
          // writeMultBlock(nfcV, 11);             

          const callback = async (buf) => {
            if(buf[0] == 0) {  // 读写成功
            } else {  // 读写失败
            }
            _that.removeScanListen()  // 清除nfc扫描，清除nfc连接到的监听，这一步非常重要
          }
          // 读多个块的数据(读基本信息)
          readMultBlock(nfcV, 0, 16, callback);  // 实例, 起始地址, 块数, 读写结束的回调

        }
      }
    });
    return
  }
}

removeScanListen() {
  if (this.nfc) {
    this.nfc.stopDiscovery()  // 停止扫描NFC
    this.nfc.offDiscovered(this.discoverHandler)  // 停止监听（我这里有两个监听）
    this.nfc.offDiscovered(this.stopUseDiscoverHandler)
    this.nfc = null
  }
}
```
以上代码展示了手机与NFC板子通信的基本流程，有几点注意：
- 读写函数已经进行了封装，具体请求、响应数据格式要和对接的硬件工程师交流，获取对应的RF指令。这也是为什么微信小程序社区中有开发者问为什么没有人给出确定的回复，这些RF指令只有硬件工程师知道，或者板子的说明书中有。
- 如果按照上面小程序文档的说明进行数据读写，还会有一个问题，每一次重新唤醒NFC扫描都会生成新的实例，导致了this.setData({})后，data的数据确实变了，但页面不更新。所以我们不仅要调用清除NFC扫描的函数，还要调用清除NFC监听连接的函数（这一步官方文档不知为何漏了）。
- 硬件手册对于软件开发者来说不太友好，需要硬件工程师的支持。比如有“Manage GPO”的指令，当你幸幸苦苦搞出来了这个指令的数据，结果发现启动失败，这个时候应该和硬件工程师沟通。这里确实是需要他们先打开该功能，我们才能使用这个配置。当然手册中也有相关说明，只是比较隐秘。
- 在进行数据转换时，十进制和16进制相互转换。读数据时，小程序封装后给的是10进制ArrayBuffer，而在写数据时，我们需要提供十六进制的ArrayBuffer。假设我们和硬件方面沟通的某个字段占四个字节，我们读到四个字节的十进制数，先要把它们转为4个16进制数。通过js的左移（<<）可以得到最终的十进制数，但是第一个字节的16进制数左移24位得到是负数...搜索相关内容，得出结论：js还是不要用它的左移运算好，可以使用 x * Math.pow(2, 24) 计算。
- 至于RF指令，只能阅读硬件手册。

#### 还是留一个 写多个块 的代码
```
// 写多个块的数据
const writeMultBlock = (nfcV, blockNum, newConfigure, callback) => {

  const {
  } = newConfigure;

  const nowText = parseInt(Date.now() / 1000);

  console.log(nowText, 'nowText')

  // let writeMultData = new Uint8Array(52);
  // 因为写多个块的长度限制最大为4，所以分了三组写入
  let writeMultData1 = new Uint8Array(20);
  let writeMultData2 = new Uint8Array(20);
  let writeMultData3 = new Uint8Array(20);
  let writeMultData4 = new Uint8Array(8);

  writeMultData1[0] = 0x02; // Flags
  writeMultData1[1] = 0x24; // Write multiple block
  writeMultData1[2] = '0x' + parseInt(blockNum).toString(16);; // block Num
  writeMultData1[3] = 0x03; // block length, 长度应比实际长度少 1（因为block Num起始位置是 0）

  writeMultData2[0] = 0x02; // Flags
  writeMultData2[1] = 0x24; // Write multiple block
  writeMultData2[2] = '0x' + parseInt(blockNum + 4).toString(16);; // block Num
  writeMultData2[3] = 0x03; // block length, 长度应比实际长度少 1（因为block Num起始位置是 0）

  writeMultData3[0] = 0x02; // Flags
  writeMultData3[1] = 0x24; // Write multiple block
  writeMultData3[2] = '0x' + parseInt(blockNum + 8).toString(16);; // block Num
  writeMultData3[3] = 0x03; // block length, 长度应比实际长度少 1（因为block Num起始位置是 0）

  writeMultData4[0] = 0x02; // Flags
  writeMultData4[1] = 0x24; // Write multiple block
  writeMultData4[2] = '0x' + parseInt(blockNum + 12).toString(16);; // block Num
  writeMultData4[3] = 0x00; // block length, 长度应比实际长度少 1（因为block Num起始位置是 0）

  writeMultData1[4] = 0xAA;  // 配置OKflag
  writeMultData1[5] = textTo16(wakeUpCycle).start;
  writeMultData1[6] = textTo16(wakeUpCycle).end;  // 唤醒周期: [2byte]
  writeMultData1[7] = '0x' + parseInt(originalWaveformSendCycle).toString(16);  // 原始波形发送周期: [1byte]

  writeMultData1[8] = textTo16(zigbeePid).start;
  writeMultData1[9] = textTo16(zigbeePid).end;  // Zigbee PID: [2byte]
  writeMultData1[10] = '0x' + parseInt(zigbeeChannel).toString(16);  // Zigbee 信道: [1byte]
  writeMultData1[11] = textTo16(zigbeeLocalAddress).start;

  writeMultData1[12] = textTo16(zigbeeLocalAddress).end;  // Zigbee 本地地址: [2byte]	
  writeMultData1[13] = textTo16(zigbeeTargetAddress).start;
  writeMultData1[14] = textTo16(zigbeeTargetAddress).end;  // Zigbee 目标地址: [2byte]	
  writeMultData1[15] = '0x' + parseInt(zigbeeTransmitPower).toString(16);  // Zigbee 发射功率: [1byte]	

  writeMultData1[16] = '0x' + parseInt(zigbeeRetriesNum).toString(16);  // Zigbee 重试次数: [1byte]
  writeMultData1[17] = '0x' + parseInt(zigbeeRetriesInterval).toString(16);  // Zigbee 重试间隔: [1byte]
  writeMultData1[18] = '0x' + parseInt(accSamplingRate).toString(16);  // ACC 采样速率: [1byte]	
  writeMultData1[19] = '0x' + parseInt(accSamplingTime).toString(16);  // ACC 采样时间: [1byte]	


  writeMultData2[4] = textTo16(bandEnergyParam1Start).start;
  writeMultData2[5] = textTo16(bandEnergyParam1Start).end;  // 频带能量参数1 START: [2byte]
  writeMultData2[6] = textTo16(bandEnergyParam1End).start;
  writeMultData2[7] = textTo16(bandEnergyParam1End).end;  // 频带能量参数1 END: [2byte]

  writeMultData2[8] = textTo16(bandEnergyParam2Start).start;
  writeMultData2[9] = textTo16(bandEnergyParam2Start).end;  // 频带能量参数2 START: [2byte]
  writeMultData2[10] = textTo16(bandEnergyParam2End).start;
  writeMultData2[11] = textTo16(bandEnergyParam2End).end;  // 频带能量参数2 END: [2byte]

  writeMultData2[12] = textTo16(bandEnergyParam3Start).start;
  writeMultData2[13] = textTo16(bandEnergyParam3Start).end;  // 频带能量参数3 START: [2byte]
  writeMultData2[14] = textTo16(bandEnergyParam3End).start;
  writeMultData2[15] = textTo16(bandEnergyParam3End).end;  // 频带能量参数3 END: [2byte]

  writeMultData2[16] = textTo16(bandEnergyParam4Start).start;
  writeMultData2[17] = textTo16(bandEnergyParam4Start).end;  // 频带能量参数4 START: [2byte]
  writeMultData2[18] = textTo16(bandEnergyParam4End).start;
  writeMultData2[19] = textTo16(bandEnergyParam4End).end;  // 频带能量参数4 END: [2byte]


  writeMultData3[4] = textTo16(bandEnergyParam5Start).start;
  writeMultData3[5] = textTo16(bandEnergyParam5Start).end;  // 频带能量参数5 START: [2byte]
  writeMultData3[6] = textTo16(bandEnergyParam5End).start;
  writeMultData3[7] = textTo16(bandEnergyParam5End).end;  // 频带能量参数5 END: [2byte]

  writeMultData3[8] = textTo16(envelopeBandpassFrequency).start;
  writeMultData3[9] = textTo16(envelopeBandpassFrequency).end;  // 包络带通频率: [2byte]
  writeMultData3[10] = textTo16(failureFrequency1).start;
  writeMultData3[11] = textTo16(failureFrequency1).end;  // 故障频率1: [2byte]

  writeMultData3[12] = textTo16(failureFrequency2).start;
  writeMultData3[13] = textTo16(failureFrequency2).end;  // 故障频率2: [2byte]
  writeMultData3[14] = textTo16(failureFrequency3).start;
  writeMultData3[15] = textTo16(failureFrequency3).end;  // 故障频率3: [2byte]

  writeMultData3[16] = textTo16(failureFrequency4).start;
  writeMultData3[17] = textTo16(failureFrequency4).end;  // 故障频率4: [2byte]
  writeMultData3[18] = '0x' + parseInt(nowText).toString(16).slice(0, 2);
  writeMultData3[19] = '0x' + parseInt(nowText).toString(16).slice(2, 4);


  writeMultData4[4] = '0x' + parseInt(nowText).toString(16).slice(4, 6);
  writeMultData4[5] = '0x' + parseInt(nowText).toString(16).slice(6);
  writeMultData4[6] = '0x00';
  writeMultData4[7] = '0x00';

  const promises = [
    writeTransceive(nfcV, writeMultData1),
    writeTransceive(nfcV, writeMultData2),
    writeTransceive(nfcV, writeMultData3),
    writeTransceive(nfcV, writeMultData4),
  ]

  Promise.all(promises).then((result) => {
    console.log(result)
    if(
      result.every((item) => item == 'success')
    ) {
      callback(true)
    } else {
      callback(false)
    }
  }).catch((error) => {
    console.log(error)
    callback(false)
  })
}

// 手机与NFC传感器数据传输 (为写多个块特别制定)
const writeTransceive = (nfcV, data) => new Promise((resolve, reject) => {

  nfcV.transceive({
    data: data.buffer,
    success: (res) => {
      let buf = new Uint8Array(res.data);
      console.log('successRes:', buf);
      for(var i = 0; i < buf.length; ++i){
        console.log(buf[i])
      }
      if(buf[0] == 0) {
        resolve('success')
      } else {
        reject('fail')
      }
  
    },
    fail: (res) => {
      console.log('failRes:', res);
      reject('fail')
    },
  })

}) 

```

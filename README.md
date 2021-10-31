# video-player-web

> web 端直播流播放器，支持 H.264 和 H.265 编码格式的视频播放，目前仅验证过 RTSP 协议的视频流播放。

包含`node + http-flv`和`jessibuca + ws-flv`两种实现方案

## node + http-flv 方案

实现思路：起一个 Node 服务，用于将 RTMP 视频流转为 http-flv 视频流;然后借助 ffmpeg 工具将 RTSP 视频流转为 RTMP 视频流（转换流媒体的传输协议），可通过 ffmpeg 命令行或 node 包 fluent-ffmpeg 完成。最后在 web 页面借助 Flv.js 实时播放 http-flv 视频。

- 命令行方式

  `ffmpeg -i rtsp://127.0.0.1:8554/aa -vcodec -c copy -f flv rtmp://localhost:1935/live/test`

> 这种方案适合播放 H.264 编码的 RTSP 视频流，如果播放 H.265 编码的视频流，则需要 ffmpeg 在 rtsp 转 rtmp 时进行编码转换(很占 CPU 和内存资源，不推荐)，转为 H.264，因为 Adobe 的 Flv.js 工具仅支持解码 H.264 的 http-flv 视频流。

## jessibuca + ws-flv 方案

主要是借助强大的开源工具 [Jessibuca](http://jessibuca.monibuca.com/) H5 直播流播放器工具，然后后端配合将 RTSP 视频流转为为 ws-flv 视频流，前端只需传入后端提供的 ws-flv 地址即可。

Jessibuca 方案的底层实现原理是借助 wasm、ffmpeg，能同时支持直播 H.264 和 H.265 两种编码的视频流。

优势：同时支持解码接收 http-flv、ws-flv 两种形式的音视频，H.264/H.265+AAC/PCMA/PCMU 流，WebGL 视频渲染，WebAudio 音频播放。

劣势：相比 Flv.js 方案，比较占 CPU 和内存。如果仅需要支持 H.264 的音视频，建议采用前一种方案

## 参考资料

1. [H.265 编码视频在 web 网页实现无插件播放应该通过软解码还是硬解码](https://cloud.tencent.com/developer/article/1822984)
2. [流媒体传输协议（rtp/rtcp/rtsp/rtmp/mms/hls）](https://zhuanlan.zhihu.com/p/27442401)
3. [音视频开发基础概述 - PCM、YUV、H264、常用软件介绍](https://blog.csdn.net/u011330638/article/details/81107312)
4. [一张图概括淘宝直播背后的前端技术](https://fed.taobao.org/blog/taofed/do71ct/gmb6yb/)
5. [ffmpeg 详细安装教程](https://zhuanlan.zhihu.com/p/324472015)
6. [Github Jessibuca](https://github.com/langhuihui/jessibuca)

## H.264 视频转换过程：rtsp -> rmtp -> http-flv

`ffmpeg -i rtsp://127.0.0.1:8554/aa -c copy -f flv rtmp://localhost:1935/live/test`

ffmpeg -i rtsp://127.0.0.1:8554/aa -vcodec -c copy -f flv rtmp://localhost:1935/live/test

ffmpeg -i "rtsp://admin:a1234567@10.30.30.110:554/cam/realmonitor?channel=1&subtype=0" -c copy -f flv rtmp://localhost:1935/live/test

ffmpeg -i "rtsp://admin:admin123@192.168.10.90:554/cam/realmonitor?channel=1%26subtype=0" -c copy -f flv rtmp://localhost:1935/live/test2

## H.264 视频转换过程：rtsp ->rtmp ->http-flv

e.g. `ffmpeg -i rtmp://abc/ccc/111 -f mpegts -codec:v mpeg1video -s 480x640 -b:v 1000k -bf 0 http://localhost:110/abc`
`ffmpeg -i "rtsp://admin:a1234567@10.30.30.110:554/cam/realmonitor?channel=1&subtype=0" -f mpegts -codec:v h264 "http://localhost:2000/test"`

`ffmpeg -i "rtsp://admin:a1234567@10.30.30.110:554/cam/realmonitor?channel=1&subtype=0" -f mpegts -codec:v mpeg1video "http://localhost:2000/test"`

`ffmpeg -i "rtsp://admin:a1234567@10.30.30.110:554/cam/realmonitor?channel=1&subtype=0" -f mpegts -codec:v mpeg1video "http://localhost:2000/test`

## H.264

- coap_libb
  rtsp://admin:abc123456@hua@10.30.30.105:554/cam/realmonitor?channel=1&subtype=0
  ws://10.30.30.96:38080/ws/live/coap_libb.flv?vhost=media-service

- 192.168.10)90
  rtsp://admin:admin123@192.168.10.90:554/cam/realmonitor?channel=1%26subtype=0

  rtsp://admin:abc123456@hua@10.30.30.105:554/cam/realmonitor?channel=1&subtype=0

## H.265 视频流地址

rtsp://admin:a1234567@10.30.30.110:554/cam/realmonitor?channel=1&subtype=1

- rtsp://admin:a1234567@10.30.30.110:554/cam/realmonitor?channel=1&subtype=2
  ws://10.30.30.96:38080/ws/live/rtu_demo.flv?vhost=media-service

1. H.264 编码格式可以直接在 web 浏览器通过 H5 来进行视频解码来完成播放，但是对于 H.265 编码的视频，无法通过 H5 直接解码来进行视频播放 https://cloud.tencent.com/developer/article/1822984
2. FLV 不支持 H.265 视频编码，即 rtsp->rtmp->http-flv 方案仅适用于 H.264 编码的视频流
3. 前端要同时支持 rtsp 协议的 H.264 和 H.265 视频播放的方案主要有两种：

- 前端借助 ffmpeg 将 H.265 的 rtsp 视频流转码为 H.264 的 rtmp 视频流，再转换为 http-flv 提供给 web 页面播放（转码有失真，且耗 CPU）
- 前端借助 ffmpeg、wasm 工具转为 http-flv 视频流或 ws-flv 的视频流（待验证） https://github.com/langhuihui/jessibuca

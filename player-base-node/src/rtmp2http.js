// FLV不支持H.265(hevc)视频播放
// ffmpeg -i "rtsp://admin:a1234567@10.30.30.110:554/cam/realmonitor?channel=1&subtype=0" -c  copy  -f flv rtmp://localhost:1935/live/test
// ffmpeg -i "rtsp://admin:admin123@192.168.10.90:554/cam/realmonitor?channel=1%26subtype=0" -c  copy  -f flv rtmp://localhost:1935/live/test2
const NodeMediaServer = require('node-media-server');
const config = {
  rtmp: {
    port: 1935,
    chunk_size: 60000,
    gop_cache: 60,
    ping_timeout: 30,
  },
  http: {
    port: 8085,
    allow_origin: '*',
  },
};
var nms = new NodeMediaServer(config);
nms.run();

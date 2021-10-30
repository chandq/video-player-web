const ffmpeg = require('fluent-ffmpeg');
const rtsp2rtmp = (s_uri, t_uri) => {
  ffmpeg(s_uri)
    .outputOptions(['-vcodec', 'copy', '-threads', '2', '-an'])
    // .outputOptions(['-c:a', 'copy', '-c:v', 'h264', '-threads', '2', '-an'])
    .inputFPS(50)
    .noAudio()
    .aspect('4:3')
    .format('flv')
    .output(t_uri)
    .on('start', function (e) {
      console.log('[ffmpeg 推流开始]' + e);
    })
    .on('end', function () {
      console.log('[ffmpeg 结束]' + err);
    })
    .on('error', function (err) {
      console.log('[ffmpeg 结束]' + err);
    })
    .run();
};

const data = [
  {
    s_uri: 'rtsp://admin:a1234567@10.30.30.110:554/cam/realmonitor?channel=1&subtype=0',
    t_uri: 'rtmp://localhost:1935/live/test',
  },
  {
    s_uri: 'rtsp://admin:admin123@192.168.10.90:554/cam/realmonitor?channel=1%26subtype=0',
    t_uri: 'rtmp://localhost:1935/live/test2',
  },
  {
    s_uri: 'rtsp://admin:abc123456@hua@10.30.30.105:554/cam/realmonitor?channel=1&subtype=0',
    t_uri: 'rtmp://localhost:1935/live/test3',
  },
];
data.forEach(({ s_uri, t_uri }) => {
  rtsp2rtmp(s_uri, t_uri);
});

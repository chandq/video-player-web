const { info } = require('console');
var http = require('http');
var WebSocket = require('ws');
//开启一个webSocket 服务：ws://127.0.0.1：3000与前端通讯
var socketServer = new WebSocket.Server({ port: 3000, perllessageDeflate: false });
//开启一个http服务：http://127.0.0.1：2000用于接受ffmpeg 传过来的数据
var streanServer = http
  .createServer(function (request, response) {
    // response.connection.setTimeout(0);
    request.on('data', function (data) {
      // info('client rev::', socketServer.clients);
      //ffapes 推送过来的帧数据
      socketServer.clients.forEach(function each(client) {
        info('each client::', client.readyState, client.OPEN);
        if (client.readyState == client.OPEN) {
          // info('client::', sender);
          console.count('send');
          client.send(data); //将数据发送给前端页面
        }
      });
    });
  })
  .listen(2000);

socketServer.on('connection', (server, socket, req) => {
  info('connection::', socket.headers);
  server.on('message', data => {
    info('server rev::', data.toString());
  });
});

// setTimeout(() => {
//   // 创建 WebSocket 客户端，连接的是本机的 30002 的 WebSocket 服务
//   const webSocketClient = new WebSocket('ws://127.0.0.1:3000');

//   // 监听的是 客户端获知 WebSocket 连接成功后的事件
//   webSocketClient.on('open', () => {
//     console.log('web socket opened');
//   });
//   setTimeout(() => {
//     webSocketClient.send('terminate');
//   }, 1000);
// }, 1000);
/*
ffmpeg-i rtsp://127.0.0.1：8554/1 #拉流地址
-f mpests-codec:v mpeglvideo\
http://127.0.0.1：2000/test #推流地址test是自定义的参数
*/
console.log('开启webSocket服务\033[40：36m ws://127.0.0.1：3000 \033[40：37m成功！');
console.log('开启http服务\033[40：36m http://127.0.0.1：2000 \033 [40：37m成功！');

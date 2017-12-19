const socket = io.connect('http://localhost:3000');
socket.on('news', function (data: any) {
  console.log(data);
});
const fs = require('fs');
const readline = require('readline');
const server = require('http').createServer();
const io = require('socket.io')(server);

io.on('connection', (socket) => {
  console.log('Клієнт підключився');

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  rl.question('Введіть шлях до файлу book.txt.gz: ', (path) => {
    const r = fs.createReadStream(path);
    const w = fs.createWriteStream('book.txt');

    r.pipe(zlib.createGunzip()).pipe(w);

    w.on('finish', () => {
      console.log('Файл book.txt успішно розархівовано');
      socket.emit('unzipComplete', 'book.txt');
      rl.close();
    });
  });

  socket.on('disconnect', () => {
    console.log('Клієнт відключився');
  });
});

server.listen(3000, () => {
  console.log('Сервер запущено на порту 3000');
});

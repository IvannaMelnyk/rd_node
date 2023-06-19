const io = require('socket.io-client');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const socket = io('http://localhost:3000');

socket.on('connect', () => {
  console.log('Підключено до сервера');

  socket.on('unzipComplete', (filename) => {
    console.log(`Файл ${filename} успішно розархівовано`);
    rl.close();
    process.exit(0);
  });

  rl.question('Натисніть Enter, щоб підключитися до сервера і розархівувати файл: ', () => {
    socket.emit('unzipFile');
  });
});

socket.on('disconnect', () => {
  console.log('Відключено від сервера');
});

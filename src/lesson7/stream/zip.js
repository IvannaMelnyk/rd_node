const fs = require('fs');
const zlib = require('zlib');

const r = fs.createReadStream('book.txt.gz');
const z = zlib.createGzip();
const w = fs.createWriteStream('book.txt');
r.pipe(z).pipe(w);

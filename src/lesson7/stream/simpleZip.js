const fs = require('fs');
const zlib = require('zlib');

function main() {
    fs.readFile('book.txt.gz', (err, data) => {
        zlib.gzip(data, (err, zip) => {
            fs.writeFile(
                'book2.txt',
                zip,
                () => console.log('Done')
            );
        })
    });
}

main();

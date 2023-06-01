let interval = setInterval(() => { console.log('this is interval'); clearInterval(interval)});

setImmediate(() => console.log('this is setImmediate '),0);

setTimeout(() => console.log('this is setTimeOut'),0);

process.nextTick(() => console.log('this is nextTick'),0);

console.log('simple log');

let myPromise = () => new Promise((resolve) => setTimeout(() => { console.log('my Promise with setTimeout'); resolve()}),0);

let myPromise2 = () => new Promise((resolve) => { console.log('my Promise2'); resolve()} );

myPromise().then(console.log('res1'));

myPromise2().then(console.log('res2'));


//result

console.log('simple log', 'this is nextTick','this is setImmediate', 'this is setTimeOut', 'my Promise2', 'my Promise with setTimeout','this is interval','res1', 'res2');

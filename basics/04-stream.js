/* Streams & Buffers */

// start using data, before it has finished loading.

// 理論就像 ex. Netflix, Youtube, Spotify... 
// 不用等整隻影片都載完，先 buffer 下載一點，讓使用者可以觀看，背景再繼續執行下載一點一點
// 適合用在大量的檔案

const fs = require('fs')


// 1. fs.createReadStream(path[, options])

// path <string> | <Buffer> | <URL>
// options <string> | <Object>
//     - flags <string> See support of file system flags. Default: 'r'.
//     - encoding <string> Default: null
//     - fd <integer> | <FileHandle> Default: null
//     - mode <integer> Default: 0o666
//     - autoClose <boolean> Default: true
//     - emitClose <boolean> Default: true
//     - start <integer>
//     - end <integer> Default: Infinity
//     - highWaterMark <integer> Default: 64 * 1024
//     - fs <Object> | <null> Default: null
// Returns: <fs.ReadStream></fs.ReadStream>

const readStream = fs.createReadStream('basics/docs/blog3.txt', {
    encoding: 'utf-8' // 會把 buffer 亂碼字串轉成可閱讀的文字
})


// 2. fs.createWriteStream(path[, options])

const writeStream = fs.createWriteStream('basics/docs/blog4.txt')

// listen on the 'data' event on the readStream (like click event on js)
// 
readStream.on('data', (chunk) => {
    // every time we get a chunk of data, we fire this callback function to access the chunk of data

    // console.log('******** ⭐⭐⭐⭐⭐ NEW CHUNK ⭐⭐⭐⭐⭐ ********');
    // console.log('******** ⭐⭐⭐⭐⭐ NEW CHUNK ⭐⭐⭐⭐⭐ ********');
    // console.log('******** ⭐⭐⭐⭐⭐ NEW CHUNK ⭐⭐⭐⭐⭐ ********');

    // console.log(chunk);
    // 沒有加 encoding，會顯示一連串 buffer 亂碼

    // console.log(chunk.toString());
    // 轉成可以閱讀的 format

    writeStream.write('\n 😜😜😜 NEW CHUNK 😜😜😜 \n')
    writeStream.write('\n 😜😜😜 NEW CHUNK 😜😜😜 \n')
    writeStream.write('\n 😜😜😜 NEW CHUNK 😜😜😜 \n')
    writeStream.write(chunk)
})




// piping
// 除了用上面 readStream、writeStream 讀取寫入，也可以用 pipe 更快寫入
// read data from the readStream, everytime we get the chunk of data, then pipe into the writeStream

// readStream.pipe(writeStream)


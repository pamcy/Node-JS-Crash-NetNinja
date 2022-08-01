/* File System module */

// 小檔案適用

const fs = require('fs')

/* 1. reading files */

// 注意：it's asyncrhous code, take some time to do

// path <string> | <Buffer> | <URL> | <integer> filename or file descriptor (relative path)
// options <Object> | <string>
    // encoding <string> | <null> Default: null
    // flag <string> See support of file system flags. Default: 'r'.
    // signal <AbortSignal> allows aborting an in-progress readFile
// callback <Function>
// err <Error> | <AggregateError>
// data <string> | <Buffer></Buffer>

fs.readFile('basics/docs/blog1.txt', (err, data) => {
    // after read the file, then node will execute the following callback line
    if (err) {
        console.error(err)
    }

    // console.log(data)
    // 會顯示 Buffer 亂碼
    // <Buffer e2 80 9c 53 6f 20 6d 61 6e 79 20 62 6f 6f 6b 73 2c 20 73 6f 20 6c 69 74 74 6c 65 20 74 69 6d 65 2e e2 80 9d 20 2d 20 62 79 20 46 72 61 6e 6b 20 5a 61 ... 3 more bytes>

    console.log(data.toString())
    // “So many books, so little time.” - by Frank Zappa
})

console.log('!!! last line !!!')
// 檔案執行順序
// !!! last line !!!
// “So many books, so little time.” - by Frank Zappa

// readFile 還沒讀取完，但是 js code 還是會繼續執行
// last line 會先出現，等到 readFile 讀取完才會顯示檔案內容



/* 2. writing files */

// file <string> | <Buffer> | <URL> | <integer> filename or file descriptor
// data <string> | <Buffer> | <TypedArray> | <DataView> | <Object>
// options <Object> | <string>
    // encoding <string> | <null> Default: 'utf8'
    // mode <integer> Default: 0o666
    // flag <string> See support of file system flags. Default: 'w'.
    // signal <AbortSignal> allows aborting an in-progress writeFile
// callback <Function>
// err <Error> | <AggregateError></AggregateError>

fs.writeFile(
    'basics/docs/blog1.txt', // 寫入的檔案 relative 路徑
    ' Hallo Welt!', // 要新增的內容
    { flag: 'a' }, () => { // 'a' 代表不要覆蓋內容，在最後一行加上去
        console.log('text was added to the file');
    })

// blog1.txt 裡面會變成這樣
// “So many books, so little time.” - by Frank Zappa Hallo Welt!


// 不存在的路徑 node 會另外開一隻新檔案寫入
fs.writeFile(
    'basics/docs/blog2.txt',
    'If you tell the truth, you do not have to remember anything. -- by Mark Twin',
    () => {
        console.log('new file was created');
    }
)



/* 3. directories */

// Asynchronously creates a directory.

// fs.mkdir(path[, options], callback)

// path <string> | <Buffer> | <URL>
// options <Object> | <integer>
//     - recursive <boolean> Default: false
//     - mode <string> | <integer> Not supported on Windows. Default: 0o777.
// callback <Function>
//     - err <Error></Error>

// fs.mkdir('basics/assets', (err) => {
//     if (err) {
//         console.error(err);

//         // 如果 folder 已經存在，會顯示 error
//         // [Error: EEXIST: file already exists, mkdir 'basics/assets']
//     }

//     console.log('new folder created');
// })


// 避免 folder 已經存在顯示 error, 可以這樣寫

// a. fs.existsSync(path)
// Returns true if the path exists, false otherwise
// it's synchronous: 執行完才會繼續下一行

// path <string> | <Buffer> | <URL>
// Returns: <boolean></boolean>

// b. fs.rmdir(path[, options], callback)
// Asynchronously removes directories

// path <string> | <Buffer> | <URL>
// options <Object>
//     - maxRetries <integer> If an EBUSY, EMFILE, ENFILE, ENOTEMPTY, or EPERM error is encountered, Node.js retries the operation with a linear backoff wait of retryDelay milliseconds longer on each try. This option represents the number of retries. This option is ignored if the recursive option is not true. Default: 0.
//     - recursive <boolean> If true, perform a recursive directory removal. In recursive mode, operations are retried on failure. Default: false. Deprecated.
//     - retryDelay <integer> The amount of time in milliseconds to wait between retries. This option is ignored if the recursive option is not true. Default: 100.
// callback <Function>
//     - err <Error></Error>

if (!fs.existsSync('basics/assets')) {
    fs.mkdir('basics/assets', (err) => {
        if (err) {
            console.error(err);
        }

        console.log('new folder created');
    })
} else {
    fs.rmdir('basics/assets', (err) => {
        if (err) {
            console.error(err);
        }

        console.log('folder deleted');
    })
}



/* 4. deleting files */

// fs.unlink(path, callback)
// Asynchronously removes a file or symbolic link

// path <string> | <Buffer> | <URL>
// callback <Function>
//     - err <Error></Error>

if (fs.existsSync('basics/assets/deleteme.txt')) {
    fs.unlink('basics/assets/deleteme.txt', (err) => {
        if (err) {
            console.error(err);
        }

        console.log('file deleteme.txt was deleted');
    })
}

/* Clients & Servers */

// GET Request
// Client 端瀏覽器輸入網址和 Server 端要網頁內容 (ex. html, css, json, images)
// 這個過程叫 GET

// RESPONSE
// Server 端把 Clint 要的資料回傳
// 這個過程叫 RESPONSE

// HTTP (Hyper-Text Transfer Protocl)
// Client 和 Server 之間的溝通方式，是透過 HTTP
// 有點像是人與人彼此之間的溝通是透過語言 (ex. english, chinese...) 交流

// Localhost
// Like a domain name on the web, but on your own computer
// 預設的 ip address：127.0.0.1

// Port numbers
// Like doors into a computer
// 電腦裡的每一個 app 都有自己的 port number 和外面溝通
// Localhost port number 預設是 3000




/* Create a server */

const http = require('http')


// http.createServer([options][, requestListener])
// Create a local server to receive data from
const server = http.createServer((req, res) => {
    // 打開 localhost:3000
    // 每一次打開網頁或 refresh，就會和 server request 網頁，log 就會出現

    console.log('request made');
})


// Starts the HTTP server listening for connections. 
server.listen(3000, 'localhost', () => {
    // the callback fire when the server is listening on the port 3000
    // sever 啟用時會 log 這行

    console.log('listening for requests on port 3000');
})
// github source code
// https://github.com/iamshaunjp/node-crash-course/blob/lesson-7/app.js

/* Middleware */
/* tutorial: https://www.youtube.com/watch?v=_GJKAs7A0_4&list=PL4cUxeGkcC9jsz4LDYc6kv3ymONOKxwBU&index=8 */

/* What is a middleware? */
/* 1. a code or funtion runs on a server between 'before getting a request' and 'sending a response'
 * 2. ex. app.use(func) app.get('/'， func) 都是一種 middleware
 * 3. app.get('/', func) : only fire the get request function at certain route;
 *    app.use(func): run for every type of requests all routes, including POST requests
 * 4. 可以有多個以上的 middleware
 * 5. run top to bottom 直到 exit the process or send the response to the browser (所以可能要注意，一旦中途停掉，之後的 middleware fucntion 就不被執行)
 */

/* Middleware examples
 * 1. log details of every request
 * 2. authentication check
 * 3. parse JSON data sent from POST request
 * 4. return 404 pages
 */


// ----- BEGIN THE CODE ------ 
const express = require('express')
const morgan = require('morgan')

const app = express()

// register view engine
// 如果目錄結構使用資料夾 'views'，預設會自動讀取 'views' 底下的檔案
app.set('view engine', 'ejs')


// custom middleware example 1
// call app.use(), specifying the middleware function
// app.use((req, res, next) => {
//     console.log('new request made')
//     console.log('host:', req.hostname)
//     console.log('path:', req.path)
//     console.log('method:', req.method)

//     // 打開 browser 後，log 會看到這些 log message，但網頁會 hang 在那裡，沒有顯示網頁內容
//     // node middleware 不知道接下來該做什麼事，就 hang 在那裡不動
//     // 所以要加 next 繼續執行
//     next()
// })


// 使用第三方 middleware 插件
// 別人都幫你寫好所有繁複的細節了

// Morgan
// a HTTP request logger middleware for node.js
// Create a new morgan logger middleware function using the given format and options. 
app.use(morgan('dev'))



// Express static files middleware
// express.static(root, [options])
// serve images, CSS files, and JavaScript files in a directory named public
// The root argument specifies the root directory from which to serve static asset
// server 預設會保護所有檔案不被外部連結，所以需要另外開啟那些檔案可以外連
app.use(express.static('public'))



app.get('/', (req, res) => {
    // Server side rendering
    // 原本只是 EJS template 存在 server，browser 看不懂，在 server 端時會由 EJS view engine 加工處理，
    // 將動態資料寫入、邏輯、和其他...處理完後，再轉成 html 回傳到前端
    // 這個過程就叫 server side rendering

    const blogs = [
        {title: 'Yoshi finds eggs', snippet: 'Lorem ipsum dolor sit amet consectetur'},
        {title: 'Mario finds stars', snippet: 'Lorem ipsum dolor sit amet consectetur'},
        {title: 'How to defeat bowser', snippet: 'Lorem ipsum dolor sit amet consectetur'},
    ];

    // pass data 'title' and 'blogs' into views
    res.render('index', { title: 'Home', blogs })
})

// custom middleware example 2
// 如果 request url 是首頁，這段 middleware 就不會被執行
// 因為 respone 就會回傳首頁內容後就停止
// app.use((req, res, next)=> {
//     console.log('the next middleware');
//     next()
// })

app.get('/about', (req, res) => {
    res.render('about', { title: 'About' })
})

app.get('/blogs/create', (req, res) => {
    res.render('create', { title: 'Create blog' })
})

app.use((req, res) => {
    res.status(404).render('404', { title: '404' })
})

app.listen(3000)
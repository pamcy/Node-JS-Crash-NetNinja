// github source code
// https://github.com/iamshaunjp/node-crash-course/blob/lesson-7/app.js

const express = require('express')

const app = express()

// register view engine
// 如果目錄結構使用資料夾 'views'，預設會自動讀取 'views' 底下的檔案
app.set('view engine', 'ejs')

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
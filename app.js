// github source code
// https://github.com/iamshaunjp/node-crash-course/blob/lesson-7/app.js

const express = require('express')

const app = express()

// register view engine
// 如果目錄結構使用資料夾 'views'，預設會自動讀取 'views' 底下的檔案
app.set('view engine', 'ejs')

app.get('/', (req, res) => {
    res.render('index')
})

app.get('/about', (req, res) => {
    res.sendFile('./views/about.html', {
        root: __dirname
    })
})

app.get('/about-us', (req, res) => {
    res.redirect('/about')
})

app.use((req, res) => {
    res.status(404).sendFile('./views/404.html', {
        root: __dirname
    })
})

app.listen(3000)
const mongoose = require('mongoose')
const express = require('express')
const morgan = require('morgan')
const blogRoutes = require('./routes/blogRoutes')

const app = express()

// connect to db
// database name: personal-website (I have created in mongoDB)
const dbURI = 'mongodb+srv://fettbauch:WkmQpBOU5w2mbTVA@tutorial.hvhtz8a.mongodb.net/personal-website?retryWrites=true&w=majority'

mongoose.connect(dbURI)
    // 等成功連上 DB 後再開啟 server
    // 不然如果首頁內容依賴 DB 回傳資料，這時打開會是空的
    .then(result => app.listen(3000))
    .catch(error => console.error(error))

// register view engine
// 如果目錄結構使用資料夾 'views'，預設會自動讀取 'views' 底下的檔案
app.set('view engine', 'ejs')

// middleware & static files
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true })) // a built-in middleware function in Express. 把使用者 post 的 form data，解析成像 object or json like format
app.use(morgan('dev'))

// routes
app.get('/', (req, res) => {
    res.redirect('/blogs')
})

// blog routes
app.use('/blogs', blogRoutes) // load the router middle in the app

app.get('/about', (req, res) => {
    res.render('about', { title: 'About' })
})

app.use((req, res) => {
    res.status(404).render('404', { title: '404' })
})
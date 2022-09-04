const mongoose = require('mongoose')
const express = require('express')
const morgan = require('morgan')
const Blog = require('./models/blog')

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
app.get('/blogs', (req, res) => {
    // Server side rendering
    // 原本只是 EJS template 存在 server，browser 看不懂，在 server 端時會由 EJS view engine 加工處理，
    // 將動態資料寫入、邏輯、和其他...處理完後，再轉成 html 回傳到前端
    // 這個過程就叫 server side rendering

    // sort: -1 (from newest to oldest)
    Blog.find().sort({ createdAt: '-1' })
        .then(result => {
            // pass data 'title' and 'blogs' into views
            res.render('index', {title: 'All Blogs', blogs: result })
        })
        .catch(err=> {
            console.error(err);
        })
})

app.get('/blogs/create', (req, res) => {
    res.render('create', { title: 'Create blog' })
})

app.post('/blogs', (req, res) => {
    // console.log(req.body); 
    // { title: 'xxxxs', snippet: 'ssss', body: 'good to go!' }

    // create a new Blog instance，把 form data 存進 db
    const blog = new Blog(req.body)

    blog.save()
        .then((result) => {
            res.redirect('/blogs')
        })
        .catch((err) => {
            console.error(err);
        })
})

app.get('/about', (req, res) => {
    res.render('about', { title: 'About' })
})

app.use((req, res) => {
    res.status(404).render('404', { title: '404' })
})
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
app.use(morgan('dev'))

app.get('/add-blog', (req, res) => {
    // create a new Blog instance use the Blog model
    const blog = new Blog({
        title: 'What a day',
        snippet: 'I do not know what to say about....',
        body: 'It is just all about blah blah blah, ha ha ha!'
    })

    // an instance of a model is called a document. Creating them and saving to the database
    // save this document by inserting a new document into the database
    // 所以這裡的 blog 是小寫，instance of the blog
    blog.save()
        .then(result => {
            res.send(result)
            // 頁面上會看到這個 result
            // {
            //     title: "What a day!",
            //     snippet: "I do not know what to say about....",
            //     body: "It is just all about blah blah blah, ha ha ha!",
            //     _id: "630573f170ee315b876e24b9",
            //     createdAt: "2022-08-24T00:42:25.978Z",
            //     updatedAt: "2022-08-24T00:42:25.978Z",
            //     __v: 0
            // }
        })
        .catch(err => {
            console.error(err);
        })
})

app.get('/all-blogs', (req, res) => {
    // .find(): 回傳所有的 documents
    // 這裡的 Blog 是大寫，直接從 Model 裡面找然後回傳
    Blog.find()
        .then(result => {
            res.send(result)
        })
        .catch(err => {
            console.error(err);
        })
})

app.get('/single-blog', (req, res) => {
    // finds a single document by its _id field.
    // 存進 mongoDB 的 id 其實是一個 object，mongoose 有幫我們做處理，可以直接輸入 id string 就好
    Blog.findById('630ac7e4dd4866803dbf3278')
        .then(result => {
            res.send(result)
        })
        .catch(err => {
            console.error(err);
        })
})

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




// 備註：
// get current ip of Gitpod in terminal for accessing to mongoDB
// curl ifconfig.me
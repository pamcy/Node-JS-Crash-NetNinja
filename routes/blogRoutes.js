const express = require('express')
const router = express.Router() // create a new Router instance
const Blog = require('../models/blog')

router.get('/', (req, res) => {
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

router.get('/create', (req, res) => {
    res.render('create', { title: 'Create blog' })
})

router.post('/', (req, res) => {
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

router.get('/:id', (req, res) => {
    // :id 可以自己取任何適合的名字
    const id = req.params.id;

    Blog.findById(id)
        .then(result => {
            res.render('detail', { title: 'Blog details', blog: result })
        })
        .catch(err => {
            console.error(err);
        })
})

router.delete('/:id', (req, res) => {
    const id = req.params.id

    Blog.findByIdAndDelete(id)
        .then((result) => {
            // 前端如果是用 ajax request，後端不能直接執行 redirect 轉址，通常一定是要回傳 json
            // sends a JSON response
            res.json({ redirect: '/blogs' })
        })
        .catch(err => {
            console.error(err);
        })
})

module.exports = router



// NOTE:
// Use the express.Router class to create modular, mountable route handlers.
// A Router instance is a complete middleware and routing system; for this reason, it is often referred to as a “mini-app”.
// The above example creates a router as a module, loads a middleware function in it, defines some routes, and mounts the router module on a path in the main app.
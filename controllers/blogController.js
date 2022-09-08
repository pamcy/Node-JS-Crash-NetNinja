const Blog = require('../models/blog')

const blog_index = ((req, res) => {
    // Server side rendering
    // 原本只是 EJS template 存在 server，browser 看不懂，在 server 端時會由 EJS view engine 加工處理，
    // 將動態資料寫入、邏輯、和其他...處理完後，再轉成 html 回傳到前端
    // 這個過程就叫 server side rendering

    // sort: -1 (from newest to oldest)
    Blog.find().sort({ createdAt: '-1' })
        .then(result => {
            // pass data 'title' and 'blogs' into views
            res.render('blogs/index', {title: 'All Blogs', blogs: result })
        })
        .catch(err=> {
            console.error(err);
        })
})

const blog_create_get = ((req, res) => {
    res.render('blogs/create', { title: 'Create blog' })
})

const blog_create_post = ((req, res) => {
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

const blog_details = ((req, res) => {
    // :id 可以自己取任何適合的名字
    const id = req.params.id;

    Blog.findById(id)
        .then(result => {
            res.render('blogs/detail', { title: 'Blog details', blog: result })
        })
        .catch(err => {
            console.error(err);
        })
})

const blog_delete = ((req, res) => {
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

module.exports = {
    blog_index,
    blog_create_get,
    blog_create_post,
    blog_details,
    blog_delete
}


// MVC naming convention
// blog_index, 
// blog_details, 
// blog_create_get, 
// blog_create_post, 
// blog_delete
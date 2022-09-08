const express = require('express')
const router = express.Router() // create a new Router instance
const blogController = require('../controllers/blogController')

router.get('/', blogController.blog_index)
router.get('/create', blogController.blog_create_get)
router.post('/', blogController.blog_create_post)
router.get('/:id', blogController.blog_details)
router.delete('/:id', blogController.blog_delete)

module.exports = router



// NOTE:
// Use the express.Router class to create modular, mountable route handlers.
// A Router instance is a complete middleware and routing system; for this reason, it is often referred to as a “mini-app”.
// The above example creates a router as a module, loads a middleware function in it, defines some routes, and mounts the router module on a path in the main app.

// 把每個 handler function 取出來變成獨立成一隻 Controller
/* Create a server */

/* Status codes */
// describe the type of response sent to the browser

// 200 - OK
// 301 - Resource moved permanently
// 404 - Not found
// 500 - Internal server error

// 100 range - informational response
// 200 range - success codes
// 300 range - codes for redirects
// 400 range - user or client error codes
// 500 range - server error codes

const http = require('http')
const fs = require('fs')

const server = http.createServer((req, res) => {
    res.setHeader('Content-Type', 'text/html')

    let path = 'basics/views/'

    // 打開 browser devtool 'network' tab 看 status code 狀態
    switch (req.url) {
        case '/':
            path += 'index.html'
            res.statusCode = 200
            break;
        case '/about':
            path += 'about.html'
            res.statusCode = 200
            break
        case '/about-me':
            res.statusCode = 301
            // 連進 /about me 要自動轉址到 /about
            // The Location response header indicates the URL to redirect a page to.
            res.setHeader('Location', '/about')
            res.end()
            break
        default:
            path += '404.html'
            res.statusCode = 404
    }

    fs.readFile(path, (err, data) => {
        if (err) {
            console.error(err)
            res.end()
        }

        res.write(data)
        res.end()
    })
})


server.listen(3000, 'localhost', () => {
    console.log('listening for requests on port 3000');
})
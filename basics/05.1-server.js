/* Create a server */

const http = require('http')
const fs = require('fs')

const server = http.createServer((req, res) => {
    res.setHeader('Content-Type', 'text/html')

    console.log(req)

    let path = 'basics/views/'

    switch (req.url) {
        case '/':
            path += 'index.html'
            break;
        case '/about':
            path += 'about.html'
            break
        default:
            path += '404.html'
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
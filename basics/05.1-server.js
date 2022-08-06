/* Create a server */

const http = require('http')
const fs = require('fs')

// http.createServer([options][, requestListener])
// Create a local server to receive data from
const server = http.createServer((req, res) => {
    // 1. set the content type to the browser
    res.setHeader('Content-Type', 'text/html')

    // 2. set the content to the browser
    fs.readFile('basics/views/index.html', (err, data) => {
        if (err) {
            console.error(err)
            res.end()
        }

        res.write(data)
        
        // 3. end the response and send it to the browser
        res.end()
    })
})


// Starts the HTTP server listening for connections. 
server.listen(3000, 'localhost', () => {
    // the callback fire when the server is listening on the port 3000
    // sever 啟用時會 log 這行

    console.log('listening for requests on port 3000');
})
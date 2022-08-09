const express = require('express')

// 啟用 express
const app = express()

// listen for requests
// 不用額外寫 .setHeader or statusCode 等等，express 都自動處理好了
app.get('/', (req, res) => {
    // res.send('<h1>Hallo Express!</h1>')

    // Transfers the file at the given path. 
    // Sets the Content-Type response HTTP header field based on the filename’s extension.
    res.sendFile('./views/index.html', {
        // 一定要告訴 node 這個 index.html 是指向誰的 relative file path
        // Root directory for relative filenames
        // Get the directoy we current inside in the file
        // inside the project folder /workspace/Node-JS-Crash-NetNinja/basics
        // then we go inside the views file
        root: __dirname
    })

    // console.log(__dirname); 
    // /workspace/Node-JS-Crash-NetNinja/basics
})

app.get('/about', (req, res) => {
    res.sendFile('./views/about.html', {
        root: __dirname
    })
})

// 開啟 server port 3000
app.listen(3000)
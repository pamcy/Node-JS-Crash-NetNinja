const express = require('express')

// 啟用 express
const app = express()

// listen for requests
// 不用額外寫 .setHeader or statusCode 等等，express 都自動處理好了
app.get('/', (req, res) => {
    res.send('<h1>Hallo Express!</h1>')
})

// 開啟 server port 3000
app.listen(3000)
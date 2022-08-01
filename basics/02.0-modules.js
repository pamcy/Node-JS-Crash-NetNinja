// Moduals & Require

// 在 command line 輸入以下執行 file
// node basics/02.0-modules.js

const family = require('./02.1-people')
// 在檔案裡 require 其他 module 時， node 會自動跑執行那個 module

console.log(family)
// 1. for 1 export
// result:

// [ 'Pamcy', 'Adai', 'Ami', 'Amiao' ] : 這是 people.js 裡的 console.log
// {} : 如果 people.js 裡沒有 export，這裡會印出 empty object
// [ 'Pamcy', 'Adai', 'Ami', 'Amiao' ] : 這是 people.js 裡 module.exports 紙後，family 印出來的值


// 2. for many exports
// result:

// {
//     people: [ 'Pamcy', 'Adai', 'Ami', 'Amiao' ],
//     ages: [ '30', '45', '4', '3' ]
// }


// 直接 destructuring 取出值用
const { people, ages } = require('./02.1-people')

console.log(people) // [ 'Pamcy', 'Adai', 'Ami', 'Amiao' ]
console.log(ages) // [ '30', '45', '4', '3' ]

/* node js 內建的核心 module */
// operating system
const os = require('os')

console.log(os.platform()) // linux
console.log(os.homedir()) // /home/gitpod

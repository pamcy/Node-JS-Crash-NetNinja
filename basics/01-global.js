// Global Objects

// console.log(global)
{
    /* <ref *1> Object [global] {
  global: [Circular *1],
  clearInterval: [Function: clearInterval],
  clearTimeout: [Function: clearTimeout],
  setInterval: [Function: setInterval],
  setTimeout: [Function: setTimeout] {
    [Symbol(nodejs.util.promisify.custom)]: [Getter]
  },
  queueMicrotask: [Function: queueMicrotask],
  performance: Performance {
    nodeTiming: PerformanceNodeTiming {
      name: 'node',
      entryType: 'node',
      startTime: 0,
      duration: 86.0972630083561,
      nodeStart: 0.1743289828300476,
      v8Start: 8.127689003944397,
      bootstrapComplete: 62.76613399386406,
      environment: 30.54781699180603,
      loopStart: -1,
      loopExit: -1,
      idleTime: 0
    },
    timeOrigin: 1659319553933.539
  },
  clearImmediate: [Function: clearImmediate],
  setImmediate: [Function: setImmediate] {
    [Symbol(nodejs.util.promisify.custom)]: [Getter]
  }
} */
}

// global 可寫也可不寫
global.setTimeout(() => {
    console.log('i am in the global timeout') // 3 秒後出現這句話

    clearInterval(initRunning, 3000)
}, 3000)

const initRunning = setInterval(() => {
    console.log('i am in the global interval')
}, 1000)

// 很妙，我沒有寫 invoke function 在檔案裡面，執行 "node global" 會自己執行 fucntion 印出 log
// result:
// i am in the global interval
// i am in the global interval
// i am in the global timeout

// The directory name of the current module (absoulute path)
console.log(__dirname)
// /workspace/Node-JS-Crash-NetNinja

// The file name of the current module.
console.log(__filename)
// /workspace/Node-JS-Crash-NetNinja/global.js

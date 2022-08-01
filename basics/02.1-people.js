const people = ['Pamcy', 'Adai', 'Ami', 'Amiao']
const ages = ['30', '45', '4', '3']

console.log(people)

// for 1 export
module.exports = people

// for many exports at the same time

// module.exports = {
//     people: people,
//     ages: ages,
// }

// 可以直接縮寫成這樣就好
module.exports = {
    people,
    ages,
}

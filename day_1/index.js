const fs = require('fs')

const data = fs.readFileSync('adventofcode1.txt', 'utf8')
const separatedData = data.split('\n').map((v) => parseInt(v))

const counter_part_1 = (separatedData) => {
    let count = 0;
    let previous;

    separatedData.map((value) => {
        value > previous && count++
        previous = value
    })

    return count
}

const counter_part_2 = () => {
    let count = 0;
    let first = separatedData[0];
    let second = separatedData[1]
    let newData = []

    for (let i = 2; i < separatedData.length; i++) {
        newData.push(first + second + separatedData[i])
        first = separatedData[i - 1]
        second = separatedData[i]
    }

    return counter_part_1(newData)
}

// console.log(counter_part_1(separatedData))
console.log(counter_part_2(separatedData))
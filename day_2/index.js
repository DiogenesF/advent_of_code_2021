const fs = require('fs')

const data = fs.readFileSync('adventofcode2.txt', 'utf8')
const separatedData = data.split('\n')

const multiplication_part_1 = (separatedData) => {
    const result = {
        hor: 0,
        depth: 0,
    }

    separatedData.map((v) => {
        const [name, value] = v.split(' ')
        if (name === 'forward') {
            result.hor = result.hor + parseInt(value)
        } else if (name === 'up') {
            result.depth = result.depth - parseInt(value)
        } else if (name === 'down') {
            result.depth = result.depth + parseInt(value)
        }
    })

    return result.depth * result.hor
}

const multiplication_part_2 = (separatedData) => {
    const result = {
        hor: 0,
        depth: 0,
        aim: 0
    }
    separatedData.map((v) => {
        const [name, value] = v.split(' ')
        if (name === 'forward') {
            result.hor = result.hor + parseInt(value)
            result.depth = result.depth + (result.aim * parseInt(value))
        } else if (name === 'up') {
            result.aim = result.aim - parseInt(value)
        } else if (name === 'down') {
            result.aim = result.aim + parseInt(value)
        }
    })

    return result.depth * result.hor
}


// console.log(multiplication_part_1(separatedData));
console.log(multiplication_part_2(separatedData));

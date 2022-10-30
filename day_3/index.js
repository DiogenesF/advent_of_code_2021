fs = require('fs')

const data = fs.readFileSync('adventofcode3.txt', 'utf8')
let separatedData = data.split('\n')

const binaryToDecimal = (binaryValue, numberOfDigits) => {
    let counter = 0
    for (let i = 0; i < numberOfDigits; i++) {
        counter = counter + parseInt(binaryValue[i]) * (2 ** ((numberOfDigits - 1) - i))
    }
    return counter
}

const vertical_count = (separatedData) => {
    const numberOfDigits = separatedData[0].length
    const mostCommonBitsCountOnes = {}

    for (let i = 0; i < numberOfDigits; i++) {
        mostCommonBitsCountOnes[`bit_${i}`] = 0
    }

    for (let i = 0; i < separatedData.length; i++) {
        for (let j = 0; j < numberOfDigits; j++) {
            if (separatedData[i][j] === '1') {
                mostCommonBitsCountOnes[`bit_${j}`] = mostCommonBitsCountOnes[`bit_${j}`] + parseInt(separatedData[i][j])
            }
        }
    }

    const gama = []
    const epsilon = []

    for (let i = 0; i < numberOfDigits; i++) {
        if (mostCommonBitsCountOnes[`bit_${i}`] > parseInt(separatedData.length / 2)) {
            gama.push('1')
            epsilon.push('0')
        } else {
            gama.push('0')
            epsilon.push('1')
        }
    }

    let decimalGama = binaryToDecimal(gama, numberOfDigits)
    let decimalEpsilon = binaryToDecimal(epsilon, numberOfDigits)

    return decimalGama * decimalEpsilon
}

const vertical_count_removing = (separatedData, digit, isMostCommon) => {
    let numberOfDigits = separatedData[0].length
    if (separatedData.length === 1 || digit >= numberOfDigits) return separatedData[0]

    let count = 0

    for (let i = 0; i < separatedData.length; i++) {
        separatedData[i][digit] === '1' && count++
    }

    let filterOnes
    if (isMostCommon) {
        filterOnes = count >= (separatedData.length / 2)
    } else {
        filterOnes = count < (separatedData.length / 2)
    }
    return vertical_count_removing(separatedData.filter((value) => filterOnes ? value[digit] === '1' : value[digit] === '0'), ++digit, isMostCommon)
}

//part 1
// console.log(vertical_count(separatedData));

//part 2
const oxygen_gen_rating = binaryToDecimal(vertical_count_removing(separatedData, 0, true), separatedData[0].length)
const CO2_scrubber_rating = binaryToDecimal(vertical_count_removing(separatedData, 0, false), separatedData[0].length)
console.log(oxygen_gen_rating * CO2_scrubber_rating);

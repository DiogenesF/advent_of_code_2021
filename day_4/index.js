fs = require('fs')

const data = fs.readFileSync('adventofcode4.txt', 'utf8')
let separatedData = data.split('\n')

const bingoValues = separatedData[0].split(",")
const matrices = []
const matrixDimensionRow = 5
const matrixDimenstionCol = 5

const removeLeadingSpace = (rowValue) => {
    if (rowValue[0] === ' ') return rowValue.slice(1)
    return rowValue
}

const removeDoubleSpaces = (rowValue) => {
    return filterEmptyString(rowValue.split(' '))
}

const filterEmptyString = (arr) => {
    return arr.filter((value) => value !== '')
}

const fillMatricesFormatted = () => {
    let matrixAux = []
    let matrixIndex = 0

    filterEmptyString(separatedData.slice(1)).forEach((rowValue, i) => {
        if (i !== 0 && i % matrixDimensionRow == 0) {
            matrices[matrixIndex] = matrixAux
            matrixIndex++
            matrixAux = []
        }

        matrixAux.push(removeDoubleSpaces(removeLeadingSpace(rowValue)))
    })
}


const isThereAWinner = (matricesIndicesToCheck) => {
    let isCountGreaterThanDim;
    let winnerIndices = []

    for (let i = 0; i < matricesIndicesToCheck.length; i++) {
        const checkRowColPair = {}
        for (j = 0; j < matrixDimensionRow; j++) {
            for (k = 0; k < matrixDimenstionCol; k++) {
                if (matrices[matricesIndicesToCheck[i]][j][k] === 'X') {
                    isCountGreaterThanDim = fillPairObjectAndCount(checkRowColPair, j, k)
                    if (isCountGreaterThanDim) winnerIndices.push(matricesIndicesToCheck[i])
                }
            }
        }

    }
    if (winnerIndices.length) return winnerIndices
    return false
}

const fillPairObjectAndCount = (checkRowColPair, j, k) => {
    if (!checkRowColPair[`row_${j}`]) {
        checkRowColPair[`row_${j}`] = 1
    } else {
        checkRowColPair[`row_${j}`] = checkRowColPair[`row_${j}`] + 1
    }
    if (!checkRowColPair[`col_${k}`]) {
        checkRowColPair[`col_${k}`] = 1
    } else {
        checkRowColPair[`col_${k}`] = checkRowColPair[`col_${k}`] + 1
    }

    return isMarkedInColAndRowGreaterThanDimension(checkRowColPair, j, k)
}

const isMarkedInColAndRowGreaterThanDimension = (checkRowColPair, j, k) => {
    if (checkRowColPair[`row_${j}`] === matrixDimensionRow ||
        checkRowColPair[`col_${k}`] === matrixDimensionRow) {
        return true
    }
    return false
}

const sumNumberUnmarked = (winnerMatrixIndex) => {
    let sum = 0;

    for (i = 0; i < matrixDimensionRow; i++) {
        for (j = 0; j < matrixDimenstionCol; j++) {
            if (matrices[winnerMatrixIndex][i][j] !== 'X') {
                sum = sum + parseInt(matrices[winnerMatrixIndex][i][j])
            }
        }
    }

    return sum
}

const markValueInMatricesAndReturnItsIndex = (bingoValue, indicesThatAlreadyWon, isPart2 = false) => {
    const matricesIndicesMarked = []
    let canBreakFromRowLoop = false

    for (i = 0; i < matrices.length; i++) {
        if (isPart2 && indicesThatAlreadyWon.includes(i)) {
            continue;
        }
        for (j = 0; j < matrixDimensionRow; j++) {
            for (k = 0; k < matrixDimenstionCol; k++) {
                if (matrices[i][j][k] === bingoValue) {
                    matrices[i][j][k] = 'X'
                    matricesIndicesMarked.push(i)
                    canBreakFromRowLoop = true
                    break;
                }
            }
            if (canBreakFromRowLoop) break
        }
        canBreakFromRowLoop = false
    }

    return matricesIndicesMarked
}

//part 1
const processBingoValues = () => {
    for (let i = 0; i < bingoValues.length; i++) {
        result = processMatrices(bingoValues[i])
        if (result) return result
    }
}

const processMatrices = (bingoValue) => {
    let matricesIndicesToCheck;
    let winnerMatrixIndex;
    let sum;

    matricesIndicesToCheck = markValueInMatricesAndReturnItsIndex(bingoValue)
    winnerMatrixIndex = isThereAWinner(matricesIndicesToCheck)

    if (winnerMatrixIndex) {
        sum = sumNumberUnmarked(winnerMatrixIndex)
        return sum * bingoValue
    }
}

//part 2
const processBingoValuesPart2 = () => {
    let matricesIndicesToCheck = [];
    let winnerMatrixIndices = [];
    let sum;
    let bingoValueLastWinner;
    let arrayOfWinners = []

    for (let i = 0; i < bingoValues.length; i++) {
        matricesIndicesToCheck = markValueInMatricesAndReturnItsIndex(bingoValues[i], arrayOfWinners, true)
        winnerMatrixIndices = isThereAWinner(matricesIndicesToCheck)

        if (winnerMatrixIndices !== false) {
            bingoValueLastWinner = bingoValues[i]
            for (let i = 0; i < winnerMatrixIndices.length; i++) {
                if (!arrayOfWinners.includes(winnerMatrixIndices[i])) {
                    arrayOfWinners.push(winnerMatrixIndices[i])
                }
            }
        }
    }

    let lastMatrixWinnerIndex = arrayOfWinners[arrayOfWinners.length - 1]
    sum = sumNumberUnmarked(lastMatrixWinnerIndex)
    return sum * bingoValueLastWinner
}


fillMatricesFormatted()

//part 1
console.log(processBingoValues())

//part 2
console.log(processBingoValuesPart2())


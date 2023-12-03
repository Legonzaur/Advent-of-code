import { open } from 'node:fs/promises';
const asso = {
    "one": "1",
    "two": "2",
    "three": "3",
    "four": "4",
    "five": "5",
    "six": "6",
    "seven": "7",
    "eight": "8",
    "nine": "9"
}
const mapping = Object.entries(asso)

const file = await open('./inputs/1');
let sum = 0
for await (let origLine of file.readLines()) {
    let numbers = ""
    let line = origLine
    let index = line.search(/(one|two|three|four|five|six|seven|eight|nine|[1-9])/)
    if (isNaN(Number(line[index]))) {
        mapping.forEach(([str, val]) => {
            if (line.indexOf(str) != index) return
            numbers += val
        })
    }else{
        numbers += line[index]
    }

    let reversed = line.split('').reverse().join('')
    index = reversed.search(/(eno|owt|eerht|ruof|evif|xis|neves|thgie|enin|[1-9])/)
    if (isNaN(Number(reversed[index]))) {
        mapping.forEach(([str, val]) => {
            const strReversed = str.split('').reverse().join('')
            if (reversed.indexOf(strReversed) != index) return
            numbers += val
        })
    }else{
        numbers += reversed[index]
    }
    console.log(numbers)
    sum += Number(numbers)
}
console.log(sum)
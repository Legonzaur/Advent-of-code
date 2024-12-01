import { open } from 'node:fs/promises';

const file = await open('./inputs/14');

let input = (await file.readFile()).toString().split('\n').map(e => e.split(""))

function fallToUp({ x, y }: { x: number, y: number }) {
    let index = input.slice(0, y).findLastIndex(e => e[x] === '#' || e[x] === 'O')
    input[y][x] = '.'
    input[index + 1][x] = 'O'
}


input.forEach((row, rowIndex) => {
    row.forEach((el, colIndex) => {
        if (el === 'O') {
            fallToUp({ x: colIndex, y: rowIndex })
        }
    })
})


const score = input.reduce((prev, curr, index) => {
    let weight = input.length - index
    let score = curr.filter(e => e === "O").length * weight
    return prev + score
}, 0)

console.log(score)
import { open } from 'node:fs/promises';

const file = await open('./inputs/14.example');

let input = (await file.readFile()).toString().split('\n').map(e => e.split(""))

class Rock {
    x: number
    y: number
    amount: number
    neighbours: {
        left: Rock[]
        right: Rock[]
        top: Rock[]
        bottom: Rock[]
    }

    constructor(y: number, x: number) {
        this.x = x
        this.y = y
        this.amount = 0
        this.neighbours = {
            left: [],
            right: [],
            top: [],
            bottom: []
        }
    }
}

function fallToUp({ x, y }: { x: number, y: number }) {
    let index = input.slice(0, y).findLastIndex(e => e[x] === '#' || e[x] === 'O')
    input[y][x] = '.'
    input[index + 1][x] = 'O'
}
// Make all boulders align to the bottom of rocks
input.forEach((row, rowIndex) => {
    row.forEach((el, colIndex) => {
        if (el === 'O') {
            fallToUp({ x: colIndex, y: rowIndex })
        }
    })
})

// Add outer rocks
input.unshift("#".repeat(input[0].length).split(''))
input.push("#".repeat(input[0].length).split(''))
input.forEach(e => {
    e.push('#')
    e.unshift('#')
})

const rocks: Rock[] = []
input.forEach((row, rowIndex) => {
    row.forEach((el, columnIndex) => {
        if (el === "#") {
            rocks.push(new Rock(rowIndex, columnIndex))
        }
    })
})
// Populate rocks and neighbours
rocks.forEach(e => {
    const firstAtLeft = rocks.findLast(f => f.x < e.x && f.y === e.y)?.x ?? 0

    const firstAtRight = rocks.find(f => f.x > e.x && f.y === e.y)?.x ?? input[0].length - 1
    // e.neighbours.right = rocks.filter(f => e.y > f.y && e.x < f.x && firstAtRight > f.x)

    const firstAtTop = rocks.findLast(f => f.y < e.y && f.x === e.x)?.y ?? 0
    // e.neighbours.top = rocks.filter(f => e.y > f.y && e.x > f.x && firstAtTop < f.y)

    const firstAtBottom = rocks.find(f => f.y > e.y && f.x === e.x)?.y ?? input.length - 1
    // e.neighbours.bottom = rocks.filter(f => e.y < f.y && e.x > f.x && firstAtbottom > f.y)

    //Roll Right
    for (let i = firstAtBottom - 1; i > e.y; i--) {
        e.neighbours.right.push(
            rocks.filter(f => f.y === i && f.x > e.x)
                .reduce((prev, curr) => {
                    if (curr.x < prev.x) return curr
                    return prev
                })
        )
    }
    e.neighbours.right.reverse()

    //Roll Top
    for (let i = firstAtRight - 1; i > e.x; i--) {
        e.neighbours.top.push(
            rocks.filter(f => f.x === i && f.y < e.y)
                .reduce((prev, curr) => {
                    if (curr.y > prev.y) return curr
                    return prev
                })
        )
    }

    e.neighbours.top.reverse()

    //Roll Left
    for (let i = firstAtTop + 1; i < e.y; i++) {
        e.neighbours.left.push(
            rocks.filter(f => f.y === i && f.x < e.x)
                .reduce((prev, curr) => {
                    if (curr.x > prev.x) return curr
                    return prev
                })
        )
    }
    e.neighbours.left.reverse()
    //Roll Bottom
    for (let i = firstAtLeft + 1; i < e.x; i++) {
        e.neighbours.bottom.push(
            rocks.filter(f => f.x === i && f.y > e.y)
                .reduce((prev, curr) => {
                    if (curr.y < prev.y) return curr
                    return prev
                })
        )
    }
    e.neighbours.bottom.reverse()
})

const rightOrder = [...rocks]
rightOrder.sort((a, b) => {
    if (a.x < b.x) return 1
    if (a.x > b.x) return -1
    return 0
})

const leftOrder = [...rocks]
leftOrder.sort((a, b) => {
    if (a.x > b.x) return 1
    if (a.x < b.x) return -1
    return 0
})

const topOrder = [...rocks]
topOrder.sort((a, b) => {
    if (a.y > b.y) return 1
    if (a.y < b.y) return -1
    return 0
})

const bottomOrder = [...rocks]
bottomOrder.sort((a, b) => {
    if (a.y < b.y) return 1
    if (a.y > b.y) return -1
    return 0
})

// Populate bounders for each rock
rocks.forEach(r => {
    let offset = 1
    while (r.y + offset < input.length && input[r.y + offset][r.x] !== '#' && input[r.y + offset][r.x] !== '.') {
        r.amount++
        offset++
    }
})

rightOrder.forEach(r => {
    r.neighbours.right.splice(0, r.amount).forEach(n => n.amount++)
    r.amount = 0
})

bottomOrder.forEach(r => {
    r.neighbours.bottom.splice(0, r.amount).forEach(n => n.amount++)
    r.amount = 0
})

leftOrder.forEach(r => {
    r.neighbours.left.splice(0, r.amount).forEach(n => n.amount++)
    r.amount = 0
})

for (let i = 0; i < 999999999; i++) {
    topOrder.forEach(r => {
        r.neighbours.top.splice(0, r.amount).forEach(n => n.amount++)
        r.amount = 0
    })

    rightOrder.forEach(r => {
        r.neighbours.right.splice(0, r.amount).forEach(n => n.amount++)
        r.amount = 0
    })

    bottomOrder.forEach(r => {
        r.neighbours.bottom.splice(0, r.amount).forEach(n => n.amount++)
        r.amount = 0
    })

    leftOrder.forEach(r => {
        r.neighbours.left.splice(0, r.amount).forEach(n => n.amount++)
        r.amount = 0
    })
}

const sum = 0

console
import { open } from 'node:fs/promises';

const path = './inputs/16'
const file1 = (await open(path))
const file2 = (await open(path))

const input = (await file1.readFile()).toString().split('\n').map(e => e.split(""))
const process = (await file2.readFile()).toString().split('\n').map(e => e.split("").map(e => [] as Coords[]))

type Coords = { x: number, y: number }

function moveForward({ x, y }: Coords, direction: Coords) {
    ray({ x: x + direction.x, y: y + direction.y }, direction)
}

function ray({ x, y }: Coords, direction: Coords) {

    if (input[y] === undefined) {
        return
    }
    const current = input[y][x]

    if (current === undefined) {
        return
    }

    if (process[y][x].find(e => e.x == direction.x && e.y == direction.y)) {
        return
    }
    process[y][x].push(direction)



    if (current === '\\') {
        direction = { x: direction.y, y: direction.x }
        moveForward({ x, y }, direction)
        return
    }

    if (current === '/') {
        direction = { x: -direction.y, y: -direction.x }
        moveForward({ x, y }, direction)
        return
    }

    if (current === '|') {
        if (direction.x === 0) {
            moveForward({ x, y }, direction)
            return
        }
        moveForward({ x, y }, { x: 0, y: 1 })
        moveForward({ x, y }, { x: 0, y: -1 })
        return
    }

    if (current === '-') {
        if (direction.y === 0) {
            moveForward({ x, y }, direction)
            return
        }
        moveForward({ x, y }, { x: 1, y: 0 })
        moveForward({ x, y }, { x: -1, y: 0 })
        return
    }
    moveForward({ x, y }, direction)
}

ray({ x: 0, y: 0 }, { x: 1, y: 0 })

console.log(process.flat(1).reduce((acc, e) => e.length > 0 ? acc + 1 : acc, 0))



await Promise.all([file1.close(), file2.close()])

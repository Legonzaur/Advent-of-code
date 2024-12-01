import { open } from 'node:fs/promises';

const path = './inputs/16'

const file1 = (await open(path))
const input = (await file1.readFile()).toString().split('\n').map(e => e.split(""))
type Coords = { x: number, y: number }

function moveForward({ x, y }: Coords, direction: Coords, process: Coords[][][]) {
    ray({ x: x + direction.x, y: y + direction.y }, direction, process)
}

function ray({ x, y }: Coords, direction: Coords, process: Coords[][][]) {

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
    process[y][x].push({ ...direction })



    if (current === '\\') {
        direction = { x: direction.y, y: direction.x }
        moveForward({ x, y }, direction, process)
        return
    }

    if (current === '/') {
        direction = { x: -direction.y, y: -direction.x }
        moveForward({ x, y }, direction, process)
        return
    }

    if (current === '|') {
        if (direction.x === 0) {
            moveForward({ x, y }, direction, process)
            return
        }
        moveForward({ x, y }, { x: 0, y: 1 }, process)
        moveForward({ x, y }, { x: 0, y: -1 }, process)
        return
    }

    if (current === '-') {
        if (direction.y === 0) {
            moveForward({ x, y }, direction, process)
            return
        }
        moveForward({ x, y }, { x: 1, y: 0 }, process)
        moveForward({ x, y }, { x: -1, y: 0 }, process)
        return
    }
    moveForward({ x, y }, direction, process)
}

async function computeAt({ x, y }: Coords, direction: Coords) {

    const file2 = (await open(path))

    const process = (await file2.readFile()).toString().split('\n').map(e => e.split("").map(e => [] as Coords[]))
    const close = Promise.all([file1.close(), file2.close()])

    ray({ x, y }, direction, process)

    await close

    return process.flat(1).reduce((acc, e) => e.length > 0 ? acc + 1 : acc, 0)


}

const promises: Promise<number>[] = []
const height = input.length
const width = input[0].length
for (let i = 0; i < height; i++) {
    promises.push(computeAt({ x: 0, y: i }, { x: 1, y: 0 }))
    promises.push(computeAt({ x: width - 1, y: i }, { x: -1, y: 0 }))
}

for (let i = 0; i < width; i++) {
    promises.push(computeAt({ x: i, y: 0 }, { x: 0, y: 1 }))
    promises.push(computeAt({ x: i, y: height - 1 }, { x: 0, y: -1 }))
}

const numbers = await Promise.all(promises)
console.log(Math.max(...numbers))

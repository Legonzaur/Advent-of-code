import { write } from 'node:fs';
import { open, writeFile } from 'node:fs/promises';

const path = './inputs/17.example'
const file = (await open(path))
const input = (await file.readFile()).toString().split('\n').map((row, y) => row.split("").map<Coords>((e, x) => ({ score: Infinity, weight: Number(e), x, y, combo: 0 })))

const file2 = (await open(path))
const input2 = (await file2.readFile()).toString().split('\n').map(e => e.split(''))

type Direction = { x: number, y: number }

type Coords = { x: number, y: number, weight: number, score: number, combo: number, direction?: Direction }

const openSet: Coords[] = [input[0][1]]
const goal = input.at(-1)!.at(-1)!
const cameFrom = new Map<Coords, Coords>()

input[0][1].score = 0
input[0][1].direction = { x: 1, y: 0 }


function astar() {
    while (openSet.length > 0) {
        const current = openSet.shift()!
        if (current.combo == 3) { throw new Error() }
        printOutputTo(current)
        console
        if (current === goal) {
            return true
        }


        function processNeighbour(n: Coords) {
            if (n === undefined) { return false }
            const tentative_score = current.score + n.weight
            if (tentative_score > n.score) { return false }
            cameFrom.set(n, current)
            n.score = tentative_score
            if (openSet.includes(n)) {
                let index = openSet.indexOf(n)
                openSet.splice(index, 1)
            }

            let index = openSet.findIndex(e => e.score > n.score)
            if (index == -1) {
                openSet.push(n)
            } else {
                openSet.splice(index, 0, n)
            }

            return true
        }

        if (input[current.y + current.direction!.x] !== undefined) {
            //Right
            const n = input[current.y + current.direction!.x][current.x + current.direction!.y]
            if (processNeighbour(n) === true) {
                n.combo = 0
                n.direction = { y: current.direction!.x, x: current.direction!.y }
            }

        }

        if (input[current.y - current.direction!.x] !== undefined) {
            //Left
            const n = input[current.y - current.direction!.x][current.x - current.direction!.y]
            if (processNeighbour(n) === true) {
                n.combo == 0
                n.direction = { y: -current.direction!.x, x: -current.direction!.y }
            }
        }

        if (current.combo < 2 && input[current.y + current.direction!.y] !== undefined) {
            //Forward
            const n = input[current.y + current.direction!.y][current.x + current.direction!.x]
            if (processNeighbour(n) === true) {
                n.combo = current.combo + 1
                n.direction = { y: current.direction!.y, x: current.direction!.x }
            }
        }

    }
}



function printOutputTo(dest: Coords) {
    const input3 = JSON.parse(JSON.stringify(input2))
    let current = dest
    input3[current.y][current.x] = '#'
    while (cameFrom.has(current)) {
        current = cameFrom.get(current)!
        let character = ''
        if (current.direction!.x == 1) {
            character = '>'
        }
        if (current.direction!.x == -1) {
            character = '<'
        }
        if (current.direction!.y == -1) {
            character = '^'
        }
        if (current.direction!.y == 1) {
            character = 'v'
        }

        input3[current.y][current.x] = character
    }
    console.clear()
    console.log(input3.map((d: string[]) => d.join('')).join('\n'))
}
astar()
console.log(goal.score)

await file.close()
await file2.close()
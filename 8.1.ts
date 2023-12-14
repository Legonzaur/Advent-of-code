import { open } from 'node:fs/promises';


const file = await open('./inputs/8');
let sum = 0
let index = -1
let path = ""

const nodes: { [key: string]: { L: string, R: string } } = {}

for await (const line of file.readLines()) {
    index++
    if (index === 0) {
        path = line
        continue
    }
    if (line.length === 0) {
        continue
    }

    const result = /^(?<node>\w+) = \((?<L>\w+), (?<R>\w+)\)/gms.exec(line)
    if (result === null) {
        throw new Error('wtf')
    }
    if (result.groups === undefined) {
        throw new Error('wtf')
    }

    const node = result.groups['node']
    const L = result.groups['L']
    const R = result.groups['R']

    nodes[node] = { L, R }
}

let step = 0
let current = 'AAA'
while (current !== 'ZZZ') {
    let direction = path.at(step % path.length) as 'L' | 'R'
    current = nodes[current][direction]
    step++
}
console.log(path)





console.log(step)



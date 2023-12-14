import { open } from 'node:fs/promises';


const file = await open('./inputs/8');
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

let currents = Object.keys(nodes).filter(e => e.endsWith('A'))
let currentSteps = currents.map(n => {
    let step = 0
    while (!n.endsWith('Z')) {
        let direction = path.at(Number(step % path.length)) as 'L' | 'R'
        n = nodes[n][direction]
        step++
    }
    return step
})

console.log(currentSteps)
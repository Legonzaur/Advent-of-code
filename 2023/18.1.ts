import { open } from 'node:fs/promises';

type Wall = {
    coords: {
        x: number
        y: number
    }
    walls: {
        up?: string
        down?: string
        left?: string
        right?: string
    },
    bounds: {
        left?: Wall
        right?: Wall
        down?: Wall
        up?: Wall
    },
}

const dMap = {
    'L': { x: -1, y: 0 },
    'R': { x: 1, y: 0 },
    'U': { x: 0, y: -1 },
    'D': { x: 0, y: 1 },
}

const file = await open('./inputs/18');
const wallArray: Wall[] = []
const position = { x: 0, y: 0 }

function addWall(direction: string, color: string) {
    let w = wallArray.find(e => e.coords.x == position.x && e.coords.y == position.y)
    if (w !== undefined) {
        w.walls = direction == 'U' || direction == 'D' ? { ...w.walls, left: color, right: color } : { ...w.walls, up: color, down: color }
    } else {
        const walls = direction == 'U' || direction == 'D' ? { left: color, right: color } : { up: color, down: color }
        wallArray.push({
            coords: {
                x: position.x,
                y: position.y
            },
            bounds: {},
            walls
        })
    }
}



for await (const line of file.readLines()) {
    const processed = /^(?<direction>L|U|D|R) (?<meters>\d+) \((?<color>#[a-zA-Z0-9]+)\)$/gm.exec(line)?.groups
    if (processed === undefined) throw new Error('wtf')
    const { direction, meters, color } = processed
    addWall(direction, color)
    for (let i = 0; i < Number(meters); i++) {
        position.x += dMap[direction as keyof typeof dMap].x
        position.y += dMap[direction as keyof typeof dMap].y
        addWall(direction, color)
    }

}


const minY = wallArray.reduce((acc, e) => {
    if (e.coords.y < acc) return e.coords.y
    return acc
}, Infinity)
const minX = wallArray.reduce((acc, e) => {
    if (e.coords.x < acc) return e.coords.x
    return acc
}, Infinity)
const maxY = wallArray.reduce((acc, e) => {
    if (e.coords.y > acc) return e.coords.y
    return acc
}, -Infinity)
const maxX = wallArray.reduce((acc, e) => {
    if (e.coords.x > acc) return e.coords.x
    return acc
}, -Infinity)


const output = new Array<Array<string>>((maxY - minY) + 1).fill([""]).map(e => new Array<string>((maxX - minX) + 1).fill("."))



wallArray.forEach((e, index) => {
    output[e.coords.y - minY][e.coords.x - minX] = '#'
})


wallArray.sort((a, b) => {
    if (a.coords.y > b.coords.y) {
        return 1
    }
    if (a.coords.y < b.coords.y) {
        return -1
    }

    if (a.coords.x > b.coords.y) {
        return 1
    }
    if (a.coords.x > b.coords.y) {
        return -1
    }
    return 0
})

wallArray.forEach((e, index) => {
    if (e.walls.up === undefined) return
    const opposite = wallArray.find(f => f.coords.y > e.coords.y && f.coords.x == e.coords.x && f.walls.down !== undefined && f !== e)
    if (opposite === undefined) { return }
    // output[opposite.coords.y - minY][opposite.coords.x - minX] = "O"
    delete e.walls.down
    delete opposite.walls.up
    e.bounds.down = opposite
    opposite.bounds.up = e

})

const result = wallArray.forEach((e) => {
    if (e.bounds.down === undefined) { return }
    const numb = e.bounds.down.coords.y - e.coords.y
    for (let i = 0; i < numb; i++) {
        output[(e.coords.y - minY) + i][e.coords.x - minX] = "#"
    }

}, 0)





console.log(output.map(e => e.join('')).join('\n'))
console.log(output.flat().reduce((acc, e) => e == "#" ? acc + 1 : acc, 0))

await file.close()

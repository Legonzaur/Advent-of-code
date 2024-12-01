import { open } from 'node:fs/promises';

function getHash(input: string) {
    let curr = 0

    for (var i = 0; i < input.length; i++) {
        curr += input.charCodeAt(i)
        curr *= 17
        curr %= 256
    }
    return curr
}

const boxes = new Array(256).fill([]).map(() => new Array()) as { label: string, focal: number }[][]
const file = await open('./inputs/15');

for await (const line of file.readLines()) {


    const lenses = line.split(',')
    lenses.forEach(l => {
        // Remove
        if (l.endsWith('-')) {
            const label = l.slice(0, l.length - 1)
            const box = getHash(label)
            const index = boxes[box].findIndex(e => e.label === label)
            if (index == -1) {
                return
            }
            boxes[box].splice(index, 1)
        }

        // Add or Replace
        if (l.indexOf('=') !== -1) {
            const [label, focal] = l.split('=')
            const box = getHash(label)
            const index = boxes[box].findIndex(e => e.label === label)
            if (index == -1) {
                boxes[box].push({ label, focal: Number(focal) })
            } else {
                boxes[box][index].focal = Number(focal)
            }
        }
    })
}

const score = boxes.reduce((prev, box, boxIndex) =>
    box.reduce((acc, lens, slot) =>
        (boxIndex + 1) * (slot + 1) * lens.focal + acc
        , 0) + prev
    , 0)
console.log(score)
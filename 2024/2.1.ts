import { open } from 'node:fs/promises';


const file = await open('./2024/inputs/2');
const all_diffs = []
for await (const line of file.readLines()) {
    const levelsMatch = line.matchAll(/\d+ ?/gm)
    const levels = Array.from(levelsMatch).map(e => Number(e[0]))
    let previous = levels.shift()!
    all_diffs.push(levels.map((e) => {
        const value = e - previous
        previous = e
        return value
    }))

}
const result = all_diffs.reduce((prev, line, index) => {
    if (line.some(e => e == 0)) {
        return prev
    }
    if (!line.every(e => e < 0) && !line.every(e => e > 0)) {
        return prev
    }
    if (!line.every(e => Math.abs(e) >= 1 && Math.abs(e) <= 3)) {
        return prev
    }
    return prev + 1
}, 0)
console.log(result)
all_diffs
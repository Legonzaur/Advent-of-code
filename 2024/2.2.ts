// Doesn't works
import { open } from 'node:fs/promises';


const file = await open('./2024/inputs/2');
const all_diffs = []
const orig_lines: number[][] = []
for await (const line of file.readLines()) {
    const levelsMatch = line.matchAll(/\d+ ?/gm)
    const levels = Array.from(levelsMatch).map(e => Number(e[0]))
    all_diffs.push(compute_diff(levels))
    orig_lines.push(levels)
}

function compute_diff(line: number[]) {
    line = Array.from(line)
    let previous = line.shift()!
    return line.map((e) => {
        const value = e - previous
        previous = e
        return value
    })
}
function keep_only_errors(line: number[]) {
    return line.reduce<number[]>((prev, curr, index) => {
        if (curr == 0) {
            prev.push(index)
        } else if (index > 0 && (line[index - 1] < 0) && (curr > 0)) {
            prev.push(index)
        } else if (index > 0 && (line[index - 1] > 0) && (curr < 0)) {
            prev.push(index)
        } else if (!((Math.abs(curr) >= 1) && (Math.abs(curr) <= 3))) {
            prev.push(index)
        }
        return prev
    }, [])
}

const result = all_diffs.map((line) => {
    return keep_only_errors(line)
})

const orig_lines_spliced = all_diffs.map((line, index) => {
    const l = Array.from(orig_lines[index])
    const errors_indexes = keep_only_errors(line)
    if (errors_indexes.length > 0) {
        l.splice(errors_indexes[0], 1)
    }
    return l
})


console.log(orig_lines_spliced.map(compute_diff).map(keep_only_errors).reduce((t, c) => c.length == 0 ? t + 1 : t, 0))
all_diffs
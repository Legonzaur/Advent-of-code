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

let correct_lines = 0
all_diffs.forEach((line, line_index) => {
    const errors = keep_only_errors(line)
    if (errors.length == 0) {
        correct_lines++
        return
    }

    const ol = orig_lines[line_index]
    for (const i in ol) {
        const orig_line_spliced = Array.from(ol)
        orig_line_spliced.splice(Number(i), 1)
        if (keep_only_errors(compute_diff(orig_line_spliced)).length == 0) {
            correct_lines++
            return
        }
    }

})
console.log(correct_lines)
import { open } from "node:fs/promises";

const file = await open("./2024/inputs/5");

const rules: { [key: number]: number[] } = {}
const prints: string[][] = []
for await (const line of file.readLines()) {
    if (line.includes("|")) {
        const index = Number(Array.from(line.matchAll(/(\d+)\|(\d+)/gm))[0][1])
        const value = Number(Array.from(line.matchAll(/(\d+)\|(\d+)/gm))[0][2])
        if (!(index in rules)) {
            rules[index] = []
        }
        rules[index].push(value)
    } else if (line.includes(',')) {
        prints.push(line.split(","))
    }
}

function print_to_indexes(print: string[]) {
    const order: { [key: string]: number } = {}
    print.forEach((v, i) => {
        order[Number(v)] = i
    })
    return order
}
function check_rules(rules: { [key: number]: number[] }, print_indexes: { [key: number]: number }) {
    for (const [key, vs] of Object.entries(rules)) {
        for (const value of vs) {
            if (!(Number(key) in print_indexes) || !(value in print_indexes)) {
                continue
            }
            if (print_indexes[Number(key)] < print_indexes[value]) {
                continue
            }
            return false
        }

    }
    return true
}


const prints_filtered = prints.filter(p => !check_rules(rules, print_to_indexes(p)))

const prints_reordered = []
for (const p of prints_filtered) {
    const current_list: number[] = []
    for (const page of p) {

        if (current_list.length == 0) {
            current_list.push(Number(page))
            continue
        }

        if (page in rules) {
            let target_index = Infinity
            for (const e of rules[Number(page)]) {
                if (current_list.indexOf(e) > -1) {
                    target_index = Math.min(current_list.indexOf(e), target_index)
                }
            }
            current_list.splice(target_index, 0, Number(page))
        } else {
            current_list.push(Number(page))
        }
    }
    prints_reordered.push(current_list)
}

prints_reordered.reduce((prev, curr) => {
    return prev + curr[Math.floor(curr.length / 2)]
}, 0)

console.log(prints_reordered.reduce((prev, curr) => {
    return prev + curr[Math.floor(curr.length / 2)]
}, 0))
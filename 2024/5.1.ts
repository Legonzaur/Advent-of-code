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
const prints_order: Array<{ [key: number]: number }> = []
for (const p of prints) {
    const order: { [key: string]: number } = {}
    p.forEach((v, i) => {
        order[Number(v)] = i
    })
    prints_order.push(order)
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

const result = prints_order.map((p, i) => {
    if (check_rules(rules, p)) {
        return Number(prints[i][Math.floor(prints[i].length / 2)])
    }
    return 0
})
console.log(result.reduce((a, b) => a + b, 0))
import fs from "node:fs"

const input = fs.readFileSync("./2024/inputs/3").toString()

const groups = Array.from(input.matchAll(/(?<dont>don't\(\))|(?<do>do\(\))|(?<mul>mul\((\d{1,3}),(\d{1,3})\))/gm))
let enabled = true
let result = 0
for (const g of groups) {
    if (!g.groups) {
        continue
    }
    if (g.groups["dont"]) {
        enabled = false
        continue
    }
    if (g.groups["do"]) {
        enabled = true
        continue
    }
    if (enabled) {
        result += (Number(g[4]) * Number(g[5]))
    }

}
console.log(result)

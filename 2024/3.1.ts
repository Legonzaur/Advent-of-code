import fs from "node:fs"

const input = fs.readFileSync("./2024/inputs/3").toString()

const result = Array.from(input.matchAll(/mul\((\d{1,3}),(\d{1,3})\)/g)).map(e => Number(e[1]) * Number(e[2])).reduce((acc, curr) => acc + curr)
console.log(result)
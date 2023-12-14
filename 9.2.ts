import { open } from 'node:fs/promises';

function computeDifference(input: number[]) {
    const output: number[] = []
    input.forEach((e, i, arr) => {
        if (i === 0) return
        output.push(arr[i] - arr[i - 1])
    });
    return output
}
const file = await open('./inputs/9');
let sum = 0
for await (const line of file.readLines()) {
    const numbers = line.split(" ").map<number>(e => Number(e))
    const differences: number[][] = [numbers]
    if (differences.at(-1) === undefined) throw new Error('wtf')

    while (!differences.at(-1)?.every(e => e === 0)) {
        differences.push(computeDifference(differences.at(-1)!))
    }


    let acc = differences.reduceRight((prev, cur) => {
        cur.unshift(cur.at(0)! - prev)
        return cur.at(0)!
    }, 0)
    sum += acc
}
console.log(sum)



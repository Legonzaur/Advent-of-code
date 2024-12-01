import { open } from 'node:fs/promises';

type Part = { x: number, m: number, a: number, s: number }
const file1 = await open('./inputs/19.workflows');

const workflows: { [key: string]: any } = {}

for await (const line of file1.readLines()) {
    const result1 = /^(?<workflow>\w+){(?<c>.*),(?<end>\w+)}/gm.exec(line)
    if (result1 === null) throw new Error("wtf")
    if (result1.groups === undefined) throw new Error("wtf")


    const { workflow, c, end } = result1.groups as {
        workflow: keyof typeof workflows,
        c: string,
        end: keyof Part | 'R' | 'A'
    }

    const conditions = c.split(",").map(e => {
        const result2 = /(?<property>\w)(?<comparison>>|<)(?<n>\d+):(?<result>\w+)/gm.exec(e);
        if (result2 === null) throw new Error("wtf")
        if (result2.groups === undefined) throw new Error("wtf")
        const { property, comparison, n, result } = result2.groups
        return { property, comparison, number: Number(n), result } as {
            property: keyof Part,
            comparison: '>' | '<',
            number: number,
            result: keyof Part | 'R' | 'A'
        }
    })


    workflows[workflow] = (e: Part) => {
        for (let i = 0; i < conditions.length; i++) {
            const current = conditions[i]
            if (current.comparison === '>') {
                if (e[current.property] > current.number) {
                    return current.result
                }
            }

            if (current.comparison === '<') {
                if (e[current.property] < current.number) {
                    return current.result
                }
            }
        }
        return end
    }
}
await file1.close()


const file2 = await open('./inputs/19.parts');

let sum = 0
for await (const line of file2.readLines()) {
    let r = 'in'
    const part = /{x=(?<x>\d+),m=(?<m>\d+),a=(?<a>\d+),s=(?<s>\d+)}/gm.exec(line)
    if (part === null) throw new Error("wtf")
    if (part.groups === undefined) throw new Error("wtf")
    const machinePart = Object.fromEntries(Object.entries(part.groups).map(e => [e[0], Number(e[1])]))

    while (r !== 'R' && r !== 'A') {
        r = workflows[r](machinePart)
    }

    if (r === 'A') {
        sum += Object.values(machinePart).reduce((acc, v) => acc + v, 0)
    }
}

console.log(sum)



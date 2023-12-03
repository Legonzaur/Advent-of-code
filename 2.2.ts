import { open } from 'node:fs/promises';

const file = await open('./inputs/2');
let sum = 0
for await (let origLine of file.readLines()) {

    const bag = {
        "red": 0,
        "green": 0,
        "blue": 0
    } as { [key: string]: number }

    const result = (/Game (?<id>[0-9]+): (?<pulls>.*)/gm).exec(origLine)

    if (result == null) throw Error('result is null')
    const pulls = result.groups?.pulls.split('; ')
    if (pulls == undefined) throw Error('pulls is undefined')
    const id = Number(result.groups?.id)
    if (isNaN(id)) throw Error('id is undefined')

    
    pulls.forEach((pull) => {
        const balls = pull.split(', ')
        balls.forEach((ball)=>{
            const singles = (/(?:(?<n>\d+) (?<c>\w+)(?:, )?)+/gm).exec(ball)
            if (singles == null || singles.groups == null) throw Error()
            if (Number(singles.groups.n) > bag[singles.groups.c]) { 
                bag[singles.groups.c] = Number(singles.groups.n)
             }
            return
        })
    })
    sum += Object.values(bag).reduce((acc, val) => val * acc, 1)
}

console.log(sum)
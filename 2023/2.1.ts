import { open } from 'node:fs/promises';

const bag = {
    "red": 12,
    "green": 13,
    "blue": 14
} as { [key: string]: number }

const file = await open('./inputs/2');
let sum = 0
for await (let origLine of file.readLines()) {
    const result = (/Game (?<id>[0-9]+): (?<pulls>.*)/gm).exec(origLine)

    if (result == null) throw Error('result is null')
    const pulls = result.groups?.pulls.split('; ')
    if (pulls == undefined) throw Error('pulls is undefined')
    const id = Number(result.groups?.id)
    if (isNaN(id)) throw Error('id is undefined')

    const possible = pulls.reduce((acc, pull) => {
        const balls = pull.split(', ')
        return balls.reduce((acc, ball)=>{
            const singles = (/(?:(?<n>\d+) (?<c>\w+)(?:, )?)+/gm).exec(ball)
            if (singles == null || singles.groups == null) throw Error()
            if (Number(singles.groups.n) > bag[singles.groups.c]) { return false }
            return true && acc
        }, true) && acc
            
    }, true)
    if(possible){
        sum += id
    }
}
console.log(sum)
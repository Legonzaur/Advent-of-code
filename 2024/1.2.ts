import fs from 'node:fs';


const file = fs.readFileSync('./2024/inputs/1').toString();
const left: number[] = []
const right: number[] = []
const leftOccurences: {[key:number]:number} = {}
const rightOccurences: {[key:number]:number} = {}

const regexes = file.matchAll(/^(\d+)   (\d+)$/gm)

for(const match of regexes){
    const leftNumber = Number(match[1])
    const rightNumber = Number(match[2])
    left.push(leftNumber)
    right.push(rightNumber)

    if(!(rightNumber in rightOccurences)){
        rightOccurences[rightNumber] = 0
    }
    rightOccurences[rightNumber]++
}

const result = left.reduce((_prev, curr, index)=>{
    return _prev + (curr * (rightOccurences[curr] ?? 0))
},0)

console.log(result)

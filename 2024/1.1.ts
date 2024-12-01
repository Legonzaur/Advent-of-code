import fs from 'node:fs';


const file = fs.readFileSync('./2024/inputs/1').toString();
const left = []
const right: number[] = []
// for await (const line of file.readLines()) {
    
// }

const regexes = file.matchAll(/^(\d+)   (\d+)$/gm)

for(const match of regexes){
    left.push(Number(match[1]))
    right.push(Number(match[2]))
}
left.sort()
right.sort()

const result = left.reduce((_prev, curr, index)=>{
    return _prev + Math.abs(curr - right[index])
},0)

console.log(result)

import { open } from 'node:fs/promises';

const file = await open('./inputs/3.example');
let sum = 0
let input = (await file.readFile()).toString().split('\n')

function smartSlice(input:string[], index:number, start:number, end:number){
    const width = input[0].length
    if(start < 0) start = 0
    if(end > width) end = width
    if(index >= input.length) index = input.length-1
    if(index < 0) index = 0
    return input[index].slice(start, end)
}

input.forEach((line, index) => {
    const regex1 = (/\d+/gmd);
    let match;
    while ((match = regex1.exec(line)) !== null) {
        if(match.indices == undefined) throw new Error('no indices')
        const search = smartSlice(input, index-1, match.indices[0][0]-1,match.indices[0][1]+1) +
        smartSlice(input, index, match.indices[0][0]-1,match.indices[0][1]+1) +
        smartSlice(input, index+1, match.indices[0][0]-1,match.indices[0][1]+1)
        if(search.replaceAll(/(\.|\d)/gm, '').length > 0 ){
            sum += Number(match[0])
        }
    }
})
console.log(sum)

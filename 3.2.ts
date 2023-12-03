import { open } from 'node:fs/promises';

const file = await open('./inputs/3');
let sum = 0
let input = (await file.readFile()).toString().split('\n')
let numbers : {value: number, indices: number[]}[][] = []

input.forEach((line, index) => {
    const regex1 = (/\d+/gmd);
    let match;
    numbers.push([])
    while ((match = regex1.exec(line)) !== null) {
        if(match.indices == undefined) throw new Error('no indices')
        numbers[index].push({value:Number(match['0']),indices:match.indices[0]})
    }
})

input.forEach((line, index) => {
    const regex1 = (/\*/gm);
    let match: RegExpExecArray | null;
    while ((match = regex1.exec(line)) !== null) {
        const partNumbers = []
        if( match === null) throw new Error('match is null')

        let part = numbers[index].find(e=>e.indices[1] == match!.index)
        if(part !== undefined) partNumbers.push(part) 

        part = numbers[index].find(e=>e.indices[0] == match!.index+1)
        if(part !== undefined) partNumbers.push(part) 

        if(index > 0){
            const parts = numbers[index-1].filter(e=>e.indices[0] <= match!.index+1 && e.indices[1] >= match!.index)
            partNumbers.push(...parts) 
        }

        if(index < input.length -1){
            const parts = numbers[index+1].filter(e=>e.indices[0] <= match!.index+1 && e.indices[1] >= match!.index)
            partNumbers.push(...parts) 
        }
        

        if(partNumbers.length == 2){
            sum += partNumbers[0].value * partNumbers[1].value 
        }
    }
})
console.log(sum)

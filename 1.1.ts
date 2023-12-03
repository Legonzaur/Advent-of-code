import { open } from 'node:fs/promises';


const file = await open('./inputs/1');
let sum = 0
for await (const line of file.readLines()) {
    const numbers = line.replace(/\D/g, "")
    sum += Number(numbers[0] + numbers.at(-1))
}
console.log(sum)



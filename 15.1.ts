import { open } from 'node:fs/promises';

function getHash(input: string) {
    let curr = 0

    for (var i = 0; i < input.length; i++) {
        curr += input.charCodeAt(i)
        curr *= 17
        curr %= 256
    }
    return curr
}

const file = await open('./inputs/15');

for await (const line of file.readLines()) {
    console.log(line.split(',').map(getHash).reduce((acc, cur) => acc + cur, 0))
}
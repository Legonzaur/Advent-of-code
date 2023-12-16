import { open } from 'node:fs/promises';

const file = await open('./inputs/16');

let input = (await file.readFile()).toString().split('\n')

function ray(position: { x: number, y: number }, direction: { x: number, y: number }) {

}
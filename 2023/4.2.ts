import { open } from 'node:fs/promises';

const file = await open('./inputs/4');

// from MDN
function intersection<T>(setA: Set<T>, setB: Iterable<T>) {
  let _intersection = new Set<T>();
  for (let elem of setB) {
    if (setA.has(elem)) {
      _intersection.add(elem);
    }
  }
  return _intersection;
}

let index = 0
let copies = [1]
for await (let origLine of file.readLines()) {
  if (copies[index] == undefined) {
    copies[index] = 1
  }
  let [winning, current] = origLine.split('|')
  winning = winning.replace(/(?:Card( )+\d+\:)/gm, '')
  let regex1 = (/\d+/gmd);
  const setA = new Set<number>()
  let match;
  while ((match = regex1.exec(winning)) !== null) {
    if (isNaN(Number(match[0]))) throw new Error('wtf')
    setA.add(Number(match[0]))
  }

  const setB = new Array<number>()
  while ((match = regex1.exec(current)) !== null) {
    if (isNaN(Number(match[0]))) throw new Error('wtf')
    setB.push(Number(match[0]))
  }
  const size = intersection(setA, setB).size
  for (let i = 0; i < size; i++) {
    if (copies[index + i + 1] == undefined) copies[index + i + 1] = 1
    copies[index + i + 1] += copies[index]
    console.log(copies[index] + 1)
  }
  index++

}
console.log(copies.reduce((acc, c) => c+acc, 0))

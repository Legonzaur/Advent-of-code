import { open } from 'node:fs/promises';

const file = await open('./inputs/4');
let sum = 0

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

for await (let origLine of file.readLines()) {
    let [winning, current ] = origLine.split('|')
    winning = winning.replace(/(?:Card( )+\d+\:)/gm, '')
    let regex1 = (/\d+/gmd);
    const setA = new Set<number>()
    let match;
    while ((match = regex1.exec(winning)) !== null) {
        if(isNaN(Number(match[0]))) throw new Error('wtf')
        setA.add(Number(match[0]))
    }

    const setB = new Array<number>()
    while ((match = regex1.exec(current)) !== null) {
        if(isNaN(Number(match[0]))) throw new Error('wtf')
        setB.push(Number(match[0]))
    }
    const size = intersection(setA, setB).size
    if( size > 0 ){
        sum += Math.pow(2,size-1)
    }
}
console.log(sum)

import { open } from "node:fs/promises";

const file = await open("./inputs/5.example");

let input = (await file.readFile()).toString();

const seedsRegex = /^(?:seeds: )(?<seeds>(?:\d+ ?)+)/gm;
const seeds = seedsRegex
  .exec(input)
  ?.groups?.seeds?.split(" ")
  .map((e) => Number(e));
if (seeds === undefined) throw new Error("no");

const mapsRegex =
  /(?<from>\w+)-to-(?<to>\w+) map:\n(?<map>(?:\d+ \d+ \d+\n?)+)/g;

type Shifter = { origin: number; destination: number; range: number };

type Mapping = {
  [key: string]: {
    from: string;
    value: Array<Shifter>;
  };
};
const mappings: Mapping = {};

let match;
while ((match = mapsRegex.exec(input)) !== null) {
  if (match.groups === undefined) throw new Error("no2");

  mappings[match.groups.to] = {
    from: match.groups.from,
    value: match.groups.map
      .split("\n")
      .filter((e) => e != "")
      .map((s) => {
        const p = s.split(" ");
        return {
          origin: Number(p[1]),
          destination: Number(p[0]),
          range: Number(p[2]),
        };
      }),
  };
}

// function intersect(val1: Shifter[], val2: Shifter[]) {
//   if(val1.origin <= val2.destination && val1.origin+val1.range )
// }
let current = "location";
while (mappings[current].from != "seed") {
  let destination = mappings[mappings[current].from];
  console.log(destination);

  // mappings[current].from = destination.from;
}
console.log(mappings);

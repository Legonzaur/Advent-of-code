import { open } from "node:fs/promises";

const file = await open("./inputs/5");

let input = (await file.readFile()).toString();

const seedsRegex = /^(?:seeds: )(?<seeds>(?:\d+ ?)+)/gm;
const seeds = seedsRegex
  .exec(input)
  ?.groups?.seeds?.split(" ")
  .map((e) => Number(e));
if (seeds === undefined) throw new Error("no");

const mapsRegex =
  /(?<from>\w+)-to-(?<to>\w+) map:\n(?<map>(?:\d+ \d+ \d+\n?)+)/g;

const mappings: {
  [key: string]: {
    to: string;
    value: Array<{ origin: number; destination: number; range: number }>;
  };
} = {};

let match;
while ((match = mapsRegex.exec(input)) !== null) {
  if (match.groups === undefined) throw new Error("no2");
  mappings[match.groups.from] = {
    to: match.groups.to,
    value: match.groups.map.split("\n").map((s) => {
      const p = s.split(" ");
      return {
        origin: Number(p[1]),
        destination: Number(p[0]),
        range: Number(p[2]),
      };
    }),
  };
}

const result = seeds.map((seed) => {
  let c = seed;
  let current = "seed";
  while (current != "location") {
    const map = mappings[current].value.find(
      (e) => e.origin <= c && e.origin + e.range > c
    );

    if (map !== undefined) {
      c = c - map.origin + map.destination;
    }
    current = mappings[current].to;
  }
  return c;
});

console.log(result);
console.log(Math.min(...result));

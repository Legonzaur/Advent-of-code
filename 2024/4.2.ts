import { open } from "node:fs/promises";

const file = await open("./2024/inputs/4");
const all: string[][] = [];
let height = 0;
for await (const line of file.readLines()) {
  all.push(line.split(""));
  height++;
}

let result = 0;
const width = all[0].length;

all.forEach((line, y) => {
  line.forEach((char, x) => {
    if (x > 0 && y > 0 && x < width - 1 && y < height - 1) {
      if (char != "A") {
        return;
      }
      // M S
      //  A
      // M S
      if (
        all[y - 1][x - 1] == "M" &&
        all[y + 1][x + 1] == "S" &&
        all[y + 1][x - 1] == "M" &&
        all[y - 1][x + 1] == "S"
      ) {
        return result++;
      }
      // S M
      //  A
      // S M
      if (
        all[y - 1][x - 1] == "S" &&
        all[y + 1][x + 1] == "M" &&
        all[y + 1][x - 1] == "S" &&
        all[y - 1][x + 1] == "M"
      ) {
        return result++;
      }
      // M M
      //  A
      // S S
      if (
        all[y - 1][x - 1] == "M" &&
        all[y + 1][x + 1] == "S" &&
        all[y + 1][x - 1] == "S" &&
        all[y - 1][x + 1] == "M"
      ) {
        return result++;
      }
      // S S
      //  A
      // M M
      if (
        all[y - 1][x - 1] == "S" &&
        all[y + 1][x + 1] == "M" &&
        all[y + 1][x - 1] == "M" &&
        all[y - 1][x + 1] == "S"
      ) {
        return result++;
      }
    }
  });
});

console.log(result);

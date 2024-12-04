import { open } from "node:fs/promises";

type Letter = {
  letter: string;
  neighbors: {
    W: string;
    NW: string;
    N: string;
    NE: string;
  };
};

const file = await open("./2024/inputs/4");
const all = [];
let height = 0;
for await (const line of file.readLines()) {
  all.push(line.split(""));
  height++;
}
const width = all[0].length;

function isValid(chain: string) {
  return "XMAS".indexOf(chain) == 0 || "SAMX".indexOf(chain) == 0;
}

function isWin(chain: string) {
  return chain == "XMAS" || chain == "SAMX";
}

const all_processed: Letter[][] = [];
all.forEach((line, y_index) => {
  const CurProcLine: Letter[] = [];
  all_processed.push(CurProcLine);
  line.forEach((letter_str, x_index) => {
    const currProcLetter: Letter = {
      letter: letter_str,
      neighbors: {
        W: letter_str,
        NW: letter_str,
        N: letter_str,
        NE: letter_str,
      },
    };
    CurProcLine.push(currProcLetter);
    if (y_index > 0) {
      const north = all_processed[y_index - 1][x_index];
      const north_value = isWin(north.neighbors.N)
        ? north.letter
        : north.neighbors.N;

      const NChain = north_value + letter_str;
      if (isValid(NChain)) {
        currProcLetter.neighbors.N = NChain;
      } else {
      }
    }
    if (x_index > 0) {
      const west = all_processed[y_index][x_index - 1];
      const west_value = isWin(west.neighbors.W)
        ? west.letter
        : west.neighbors.W;

      const WChain = west_value + letter_str;

      if (isValid(WChain)) {
        currProcLetter.neighbors.W = WChain;
      } else {
      }
    }

    if (y_index > 0 && x_index > 0) {
      const nweast = all_processed[y_index - 1][x_index - 1];

      const nweast_value = isWin(nweast.neighbors.NW)
        ? nweast.letter
        : nweast.neighbors.NW;

      const NWChain = nweast_value + letter_str;
      if (isValid(NWChain)) {
        currProcLetter.neighbors.NW = NWChain;
      } else {
      }
    }

    if (y_index > 0 && x_index < width - 1) {
      const neast = all_processed[y_index - 1][x_index + 1];

      const neast_value = isWin(neast.neighbors.NE)
        ? neast.letter
        : neast.neighbors.NE;

      const NEChain = neast_value + letter_str;
      if (isValid(NEChain)) {
        currProcLetter.neighbors.NE = NEChain;
      } else {
      }
    }
  });
});

console.log(all_processed);

const result = all_processed.reduce((prev, curr) => {
  return (
    curr.reduce((_prev, _curr) => {
      if (isWin(_curr.neighbors.W)) {
        _prev++;
      }
      if (isWin(_curr.neighbors.N)) {
        _prev++;
      }
      if (isWin(_curr.neighbors.NW)) {
        _prev++;
      }
      if (isWin(_curr.neighbors.NE)) {
        _prev++;
      }
      return _prev;
    }, 0) + prev
  );
}, 0);

console.log(result);

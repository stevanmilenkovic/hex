import { compatibilityChecker, disconnect, hexCreator } from "./funcs";

export const generator = (n, m) => {
  // n => number of hexes in a short column
  // m => number of columns
  const hexNumber = n * m + Math.ceil(m / 2);
  const connectingHexes = [];

  for (let i = 0; i < hexNumber; i++) {
    let connecting = {
      id: i,
      12: i - 1,
      2: i + n,
      4: i + n + 1,
      6: i + 1,
      8: i - n,
      10: i - n - 1,
      must: [],
    };

    if (i === 0) {
      disconnect(connecting, [12, 2, 8, 10]);
    }

    if (i === n) {
      disconnect(connecting, [4, 6, 8, 10]);
    }

    if (n === hexNumber - 1) {
      if (m % 2) {
        disconnect(connecting, [2, 4, 6, 8]);
      } else {
        disconnect(connecting, [2, 4, 6]);
      }
    }

    if (n === hexNumber - 1 - n) {
      if (m % 2) {
        disconnect(connecting, [2, 4, 10, 12]);
      } else {
        disconnect(connecting, [2, 4, 12]);
      }
    }
    if (i <= n) {
      disconnect(connecting, [8, 10]);
    }

    if (i >= (m % 2 ? hexNumber - n - 1 : hexNumber - n)) {
      disconnect(connecting, [2, 4]);
    }

    if (i % (2 * n + 1) === 0) {
      disconnect(connecting, [12, 2, 10]);
    }
    if ((i - n) % (2 * n + 1) === 0) {
      disconnect(connecting, [4, 6, 8]);
    }
    if ((i - n - 1) % (2 * n + 1) === 0) {
      disconnect(connecting, [12]);
    }
    if ((i - 2 * n) % (2 * n + 1) === 0) {
      disconnect(connecting, [6]);
    }
    connectingHexes.push(connecting);
  }

  let hexes = [];

  hexCreator("empty", [false, false, false, false, false, false], hexes);
  hexCreator("single", [true, false, false, false, false, false], hexes);
  hexCreator("doubleAngle", [true, true, false, false, false, false], hexes);
  hexCreator("doubleCurved", [true, false, true, false, false, false], hexes);
  hexCreator("doubleStraight", [true, false, false, true, false, false], hexes);
  hexCreator("tripleAngle", [true, true, true, false, false, false], hexes);
  hexCreator("tripleLeft", [true, false, false, true, true, false], hexes);
  hexCreator("tripleRight", [true, false, true, true, false, false], hexes);
  hexCreator("tripleThird", [true, false, true, false, true, false], hexes);
  hexCreator("quadAngle", [true, true, true, true, false, false], hexes);
  hexCreator("quadCross", [true, true, false, true, true, false], hexes);
  hexCreator("quadPeace", [true, false, true, true, true, false], hexes);
  hexCreator("quintAngle", [true, true, true, true, true, false], hexes);
  hexCreator("omniHex", [true, true, true, true, true, true], hexes);

  let hexesSet = [];
  let organizedHexes = [...connectingHexes];

  for (let i = 0; i < organizedHexes.length; i++) {
    hexesSet.push(compatibilityChecker(hexes, organizedHexes, i, n, m));
  }

  let hexesToShow = hexesSet.map((hex) => ({
    name: hex.name,
    angle: hex.angle,
  }));
  return hexesToShow;
};

export const generateArray = (max, min = 0) => {
  const arr = [];
  for (let i = min; i < max; i++) {
    arr.push(i);
  }
  return arr;
};

export const randomElement = (arr) => {
  const randomIndex = Math.floor(Math.random() * arr.length);
  return arr[randomIndex];
};

export const checkIfSolved = (arr) => {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] !== true) {
      return false;
    }
  }
  return true;
};

export const calculatePadding = (columnsNum) => {
  let factor = 0;
  for (let i = 0; i < columnsNum; i++) factor += i;
  return factor;
};

export const disconnect = (obj, properties) => {
  properties.forEach((prop) => (obj[prop] = false));
};

export const boolRotator = (bools) => {
  let boolsArray = [];
  for (let i = 6; i > 0; i--) {
    boolsArray[i % 6] = bools[0];
    boolsArray[(i + 1) % 6] = bools[1];
    boolsArray[(i + 2) % 6] = bools[2];
    boolsArray[(i + 3) % 6] = bools[3];
    boolsArray[(i + 4) % 6] = bools[4];
    boolsArray[(i + 5) % 6] = bools[5];
  }
  return boolsArray;
};

export class Hex {
  constructor(name, bools, angle) {
    this.name = name;
    this.angle = angle;

    let i = 2;
    bools.forEach((bool) => {
      this[i] = bool;
      i += 2;
    });
  }
}

const adjustConnecting = (hex, organizedHexes, index, n, m) => {
  console.log("entering hexclass func");
  let limit = Boolean(m % 2)
    ? organizedHexes.length - n - 1
    : organizedHexes.length - n;

  let lastIndex = n * m + Math.ceil(m / 2) - 1;

  if (index < limit) {
    if (!hex[2] && index % (2 * n + 1) !== 0) {
      organizedHexes[index + n][8] = false;
    }
    if (!hex[4] && (index - n) % (2 * n + 1) !== 0) {
      organizedHexes[index + n + 1][10] = false;
    }
    if (
      !hex[6] &&
      (index - n) % (2 * n + 1) !== 0 &&
      (index - 2 * n) % (2 * n + 1) !== 0
    ) {
      organizedHexes[index + 1][12] = false;
    }
    if (hex[2]) {
      organizedHexes[index + n].must.push(8);
    }
    if (hex[4]) {
      organizedHexes[index + n + 1].must.push(10);
    }
    if (hex[6]) {
      organizedHexes[index + 1].must.push(12);
    }
  } else if (index >= limit && index !== lastIndex) {
    if (
      !hex[6] &&
      (index - n) % (2 * n + 1) !== 0 &&
      (index - 2 * n) % (2 * n + 1) !== 0
    ) {
      organizedHexes[index + 1][12] = false;
    }
    if (hex[6]) {
      organizedHexes[index + 1].must.push(12);
    }
  }
};

export const hexCreator = (name, bools, hexArray) => {
  const hexes = [];
  let booleans = bools;

  let m = ["omniHex", "empty"].includes(name)
    ? 1
    : ["doubleStraight", "quadCross"].includes(name)
    ? 3
    : name === "tripleThird"
    ? 2
    : 6;
  for (let i = 0; i < m; i++) {
    hexes.push(new Hex(name, booleans, (i + 1) * 60));
    booleans = boolRotator(booleans);
  }
  hexArray.push(...hexes);
};

export const compatibilityChecker = (hexes, organizedHexes, index, n, m) => {
  let possible = [];
  hexes.forEach((hex) => {
    let mismatch = 0;
    organizedHexes[index].must.forEach((must) => {
      if (hex[must] === false) mismatch++;
    });
    for (let i = 0; i < 6; i++) {
      if (hex[i * 2 + 2] === true && organizedHexes[index][i * 2 + 2] === false)
        mismatch++;
    }
    if (mismatch === 0) possible.push(hex);
  });

  let hexToSet = randomElement(possible);
  adjustConnecting(hexToSet, organizedHexes, index, n, m);
  return hexToSet;
};

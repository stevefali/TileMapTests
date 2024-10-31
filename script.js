const canvas = document.getElementById("canvas");

const ctx = canvas.getContext("2d");
ctx.fillStyle = "#ff7eb6";

canvas.width = 1000;
canvas.height = 400;

const tileSize = 10;
let tileArray = [];

const columnQuantity = Math.floor(canvas.width / tileSize);
const rowQuantity = Math.floor(canvas.height / tileSize);

// Make 2D array filled with zeros
tileArray = Array.from({ length: columnQuantity }, () =>
  Array(rowQuantity).fill("0")
);

console.log(tileArray);

// values produced from C# code
const floorString =
  "0110011111100011110111100010000111000011111000100001111000110010000111010001010010000010000100100111100110100010010111100001000011010011110101100011100111001100010110001110011110101101111111100110000100100001011110101101001010111000110011001011101001110111111001011011101101101100100000000111000011111111010111100001010101101110010011101001110000101000001110001100000100010110010001101100010101100011011000111010010000100100110011101000100000100001111011001111000000110111100001100110101000011111001011011000000110011111110011100011011001001011000100001000000100111010010000111100110010101000011101010110000001011011110001011011110000110111011101011001110111000010100100011001111011001001100111001101010110101110000000001010110010100110010011001010110101001010010000100110101101100100001011001001010010111110001010000001000101111100101110010100101000101000101010001010110001111010111100100111111001001010111110010100110100001010100010011011011101111100010001100100100101011100111011100111010011111010";
const rand = floorString.split("");

// Randomized floor
function generateFloor(tileArray, minSection) {
  // Starting height
  let lastHeight = Math.floor(Math.random() * (rowQuantity / 2));

  let nextMove = "0";

  let sectionSize = 0;

  // Horizontal
  for (let x = 0; x < tileArray.length; x++) {
    nextMove = rand[x];

    // If wide enough and not too low or high, use the last height determine whether up or down. (Or do nothing)
    if (nextMove === "0" && lastHeight > 0 && sectionSize > minSection) {
      const heightChange = Math.floor(Math.random() * 3) + 1;
      lastHeight -= heightChange;
      sectionSize = 0;
    } else if (
      nextMove === "1" &&
      lastHeight < rowQuantity / 2 &&
      sectionSize > minSection
    ) {
      const heightChange = Math.floor(Math.random() * 3) + 1;
      lastHeight += heightChange;
      sectionSize = 0;
    }

    // Increment section size!
    sectionSize++;

    // Fill down to zero
    for (let y = lastHeight; y >= 0; y--) {
      tileArray[x][y] = "1";
    }
  }
  console.log(tileArray);
  drawFloor(tileArray);
  //   return tileArray;
}

function drawFloor(finishedArray) {
  for (let xx = 0; xx < finishedArray.length; xx++) {
    for (let yy = 0; yy < finishedArray[xx].length; yy++) {
      const yesNo = finishedArray[xx][yy] === "0" ? true : false;
      drawTile(xx, yy, yesNo);
    }
  }
}

function drawTile(x, y, isTile) {
  if (isTile) {
    ctx.fillRect(x * tileSize, y * tileSize, tileSize, tileSize, tileSize);
  }
}

// Do it
const finishedArr = generateFloor(tileArray, 5);

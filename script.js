function startGame() {
  const fridgeTableElement = document.getElementById("fridge-table");
  const isReset = !!fridgeTableElement;

  const button = document.getElementsByClassName("button-start");
  button[0].innerHTML = "RESET";

  if (isReset) {
    restartPuzzle(fridgeTableElement);
  } else {
    createPuzzle();
  }
}

function restartPuzzle(fridgeTableElement) {
  document.body.removeChild(fridgeTableElement);
  createPuzzle();
}

function createPuzzle() {
  const isTableExists = document.getElementById("fridge-table");

  if (isTableExists) {
    return;
  }

  const fridgeTable = document.createElement("table");
  fridgeTable.id = "fridge-table";
  fridgeTable.classList.add("fridge");
  document.body.appendChild(fridgeTable);

  const rows = 4;
  const columns = 4;

  const fridgeTableElement = document.getElementById("fridge-table");

  let valveId = -1;

  for (let i = 0; i < rows; i++) {
    const tableRow = document.createElement("tr");
    fridgeTableElement.appendChild(tableRow);

    for (let j = 0; j < columns; j++) {
      valveId += 1;
      const tableData = document.createElement("td");
      const valveImageElement = createValve(valveId);

      tableData.appendChild(valveImageElement);
      tableRow.appendChild(tableData);
    }
  }
}

function createValve(valveId) {
  const valveImageElement = document.createElement("img");
  valveImageElement.id = valveId;
  valveImageElement.src = "valve.PNG";
  valveImageElement.onclick = () => rotateValve90Degrees(valveImageElement.id);
  valveImageElement.style = "cursor: pointer;";

  const valveIndex = valveIndexMap[valveId];
  const valvePosition = defaultValvePositions[valveIndex[0]][valveIndex[1]];
  const valveAngle = valvePosition ? 90 : 0;

  valveImageElement.style.transform = `rotate(${valveAngle}deg)`;

  return valveImageElement;
}

function rotateValve90Degrees(valveElementId) {
  const valveElement = document.getElementById(valveElementId);

  const valveIndex = valveIndexMap[valveElementId];
  const defaultValvePosition =
    defaultValvePositions[valveIndex[0]][valveIndex[1]];
  const defaultValveAngle = defaultValvePosition ? 90 : 0;

  const currentAngle = valveElement.style.transform
    ? Number(valveElement.style.transform.split("(")[1].split("deg)")[0])
    : defaultValveAngle;

  const newAngle = currentAngle === 90 ? 0 : 90;
  const newValvePosition = defaultValvePosition ? 0 : 1;
  currentValvePositions[valveIndex[0]][valveIndex[1]] = newValvePosition;

  valveElement.style.transform = `rotate(${newAngle}deg)`;

  updateValvesPositions(valveElementId);
}

function rotateOneValve90Degrees(valveElementId) {
  const valveElement = document.getElementById(valveElementId);

  const valveIndex = valveIndexMap[valveElementId];
  const currentValvePosition =
    currentValvePositions[valveIndex[0]][valveIndex[1]];
  
  const currentAngle = currentValvePosition ? 90 : 0;

  const newAngle = valveElement.style.transform
    ? Number(valveElement.style.transform.split("(")[1].split("deg)")[0])
    : currentAngle;

  const newNewAngle = newAngle === 90 ? 0 : 90;
  const newValvePosition = currentValvePosition ? 0 : 1;
  currentValvePositions[valveIndex[0]][valveIndex[1]] = newValvePosition;
  
  valveElement.style.transform = `rotate(${newNewAngle}deg)`;
}

function updateValvesPositions(valveElementId) {
  const valveDependentIds = valveIdsDependencyMap[valveElementId];

  for (const valveId of valveDependentIds) {
    rotateOneValve90Degrees(valveId);
  }

  checkVictoryConditions();
}

function checkVictoryConditions() {
  const flatArray = currentValvePositions.flat();

  if (!flatArray.includes(0)) {
    console.log('A WINNER IS YOU!');    
  }
};

const valveIdsDependencyMap = {
  0: [1, 2, 3, 4, 8, 12],
  1: [0, 2, 3, 5, 9, 13],
  2: [0, 1, 3, 6, 10, 14],
  3: [0, 1, 2, 7, 11, 15],
  4: [5, 6, 7, 0, 8, 12],
  5: [4, 6, 7, 1, 9, 13],
  6: [4, 5, 7, 2, 10, 14],
  7: [4, 5, 6, 3, 11, 15],
  8: [9, 10, 11, 0, 4, 12],
  9: [8, 10, 11, 1, 5, 13],
  10: [8, 9, 11, 2, 6, 14],
  11: [8, 9, 10, 3, 7, 15],
  12: [13, 14, 15, 0, 4, 8],
  13: [12, 14, 15, 1, 5, 9],
  14: [12, 13, 15, 2, 6, 10],
  15: [12, 13, 14, 3, 7, 11],
};

/*

    0   1   2   3
    4   5   6   7
    8   9   10  11
    12  13  14  15

*/

const defaultValvePositions = [
  [0, 0, 0, 0],
  [0, 1, 0, 1],
  [1, 0, 0, 0],
  [1, 0, 0, 0],
];

const currentValvePositions = structuredClone(defaultValvePositions);

const valveIndexMap = {
    0: [0, 0],
    1: [0, 1],
    2: [0, 2],
    3: [0, 3],
    4: [1, 0],
    5: [1, 1],
    6: [1, 2],
    7: [1, 3],
    8: [2, 0],
    9: [2, 1],
    10: [2, 2],
    11: [2, 3],
    12: [3, 0],
    13: [3, 1],
    14: [3, 2],
    15: [3, 3],
}
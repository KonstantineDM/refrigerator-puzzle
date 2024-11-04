function createPuzzle() {
  // TODO: кнопка старт или рестарт в зависимости от наличия холодоса
  const isTableExists = document.getElementById("fridge-table");

  if (isTableExists) {
    return;
  }

  const fridgeTable = document.createElement("table");
  fridgeTable.id = "fridge-table";
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
    valveImageElement.onclick = () =>
      rotateValve90Degrees(valveImageElement.id);
    valveImageElement.style = "cursor: pointer;";

    return valveImageElement;
}


function rotateValve90Degrees(valveElementId) {
  let defaultValveAngle = 0;

  const valveElement = document.getElementById(valveElementId);

  const currentAngle = valveElement.style.transform
    ? Number(valveElement.style.transform.split("(")[1].split("deg)")[0])
    : `rotate(${defaultValveAngle}deg)`;

  const newAngle = currentAngle === 90 ? 0 : 90;

  document.getElementById(
    valveElementId
  ).style.transform = `rotate(${newAngle}deg)`;

  updateRowValves(valveElementId);
  updateColumnValves();
}

function rotateOneValve90Degrees(valveElementId) {
    let defaultValveAngle = 0;

    const valveElement = document.getElementById(valveElementId);

    const currentAngle = valveElement.style.transform
    ? Number(valveElement.style.transform.split("(")[1].split("deg)")[0])
    : `rotate(${defaultValveAngle}deg)`;

  const newAngle = currentAngle === 90 ? 0 : 90;

  document.getElementById(
    valveElementId
  ).style.transform = `rotate(${newAngle}deg)`;
}

function updateRowValves(valveElementId) {
    const valveDependentIds = valveIdsDependencyMap[valveElementId];

    console.log('valveDependentIds: ', valveDependentIds);
    
    
    for (const valveId of valveDependentIds) {
        console.log('Updating valve ', valveId);
        
        rotateOneValve90Degrees(valveId);
    }
}

function updateColumnValves() {}


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
}

/*

    0   1   2   3
    4   5   6   7
    8   9   10  11
    12  13  14  15

*/

const defaultValvePositions = [
    [
        0,0,0,0
    ],
    [
        0,0,0,0
    ],
    [
        0,0,0,0
    ],
    [
        0,0,0,0
    ],
]

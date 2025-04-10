var waterTankInputEl = document.getElementById("water-tank-input");
waterTankInputEl.addEventListener("change", onInputChange);

var inputWaterTankEl = document.getElementById("input-water-tank");
var outputWaterTankEl = document.getElementById("output-water-tank");

function generateWaterTank(
  inputArr = [],
  waterTankEl,
  maxWall = 0,
  withWall = true
) {
  waterTankEl.innerHTML = "";

  inputArr.forEach((element) => {
    var waterTankColEl = document.createElement("div");
    waterTankColEl.className = "water-tank-column";

    for (let index = 0; index < maxWall; index++) {
      var waterBlocksEl = document.createElement("div");

      var wallCount = withWall ? element.wall : 0;
      if (index < wallCount) {
        waterBlocksEl.className = "block wall-block";
      } else if (index >= element.water + wallCount) {
        waterBlocksEl.className = "block";
      } else {
        waterBlocksEl.className = "block water-block";
      }
      waterTankColEl.appendChild(waterBlocksEl);
    }

    waterTankEl.classList.add("water-tank");
    waterTankEl.appendChild(waterTankColEl);
  });

}

function calcWaterLevel(inputArr = []) {
  var waterLvl = 0,
    maxWall = 0;

  var waterTank = inputArr.map((el, i) => {
    var leftMax = 0,
      rightMax = 0;

    for (let index = i; index >= 0; index--) {
      leftMax = Math.max(leftMax, inputArr[index]);
    }
    for (let index = i; index < inputArr.length; index++) {
      rightMax = Math.max(rightMax, inputArr[index]);
    }

    maxWall = Math.max(maxWall, leftMax, rightMax);
    var water = Math.min(leftMax, rightMax) - Number(el);
    waterLvl += water;
    return { wall: Number(el), water };
  });

  return { waterTank, waterLvl, maxWall };
}

function onInputChange(params) {
  if (!params) {
    return;
  }
  var waterTankInput = [];

  console.log(params.target.value.trim().split(","));
  waterTankInput = params.target.value.trim().split(",");

  var { waterTank, waterLvl, maxWall } = calcWaterLevel(waterTankInput);
  var outputWaterTankLvlEl = document.getElementById(
    "output-water-tank-lvl-text"
  );
  outputWaterTankLvlEl.innerText = waterLvl + ' Units';

  generateWaterTank(waterTank, inputWaterTankEl, maxWall);
  generateWaterTank(waterTank, outputWaterTankEl, maxWall, false);
}

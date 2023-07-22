const divBoxSize = function (numberOfSquareDivsPerSide) {
  const borderThickness = 1;
  const canvasSize = 500;
  return Math.floor(((canvasSize / numberOfSquareDivsPerSide) - (borderThickness * 2)) * 10) / 10;
}

const totalNumberOfSquareDivs = function (numberOfSquareDivsPerSide, callback) {
  callback(Math.pow(numberOfSquareDivsPerSide, 2), divBoxSize(numberOfSquareDivsPerSide));
};

const changeDivBackground = function (event) {
  switch (event.type) {
    case "mouseover":
      if (event.buttons > 0) {
        // console.log("mouseover + click")
        event.target.style.backgroundColor = "#ffffff";
      };
      break;
    case "mousedown":
      // console.log("mousedown");
      // console.log(event);
      event.target.style.backgroundColor = "#ffffff";
  };
}

const createNewGridOFSquareDivs = function (totalNumberOfSquareDivs, divBoxSize) {
  const mainContainer = document.querySelector(".canvas-container");
  for (let i = 0; i < totalNumberOfSquareDivs; i++) {
    const divBox = document.createElement("div");
    divBox.classList.add("divBox");
    divBox.setAttribute("draggable", "false");
    divBox.style.width = `${divBoxSize}px`;
    divBox.style.height = `${divBoxSize}px`;
    mainContainer.appendChild(divBox);
    divBox.addEventListener("mouseover", changeDivBackground);
    divBox.addEventListener("mousedown", changeDivBackground);
  };
};

// const colorVariationHalfHalf = function (totalNumberOfSquareDivs) {
//   const divBoxes = document.querySelectorAll(".divBox");
//   for (let i = 0; i < (totalNumberOfSquareDivs / 2); i++) {
//     divBoxes[i].style.backgroundColor = "#" + Math.floor(Math.random() * 16777215).toString(16);
//   }
// }

const removeGridContainerFromCanvas = function () {
  const gridDivs = document.querySelectorAll(".divBox");
  gridDivs.forEach((gridDiv) => {
    gridDiv.remove();
  });
};

const getUserInput = function (callback) {
  let newGridSize = window.prompt("Please enter a number(between 1 and 100) of squares per side for the new grid.");
  if (isNaN(newGridSize)) {
    alert("This is not a valid Number!")
    getUserInput(totalNumberOfSquareDivs);
  }
  else if (newGridSize === null) {
    // callback(4, createNewGridOFSquareDivs);
    return;
  }
  else {
    if ((newGridSize > 0) && (newGridSize < 100)) {
      callback(newGridSize, createNewGridOFSquareDivs);
    }
    else {
      alert("Your given value is not between 1 and 100!");
      getUserInput(totalNumberOfSquareDivs);
    }
  }
};

//initial grid layout
function initGrid() {
  totalNumberOfSquareDivs(4, createNewGridOFSquareDivs);
  const redrawCanvasButton = document.querySelector(".redrawCanvasButton");
  redrawCanvasButton.addEventListener("click", () => {
    removeGridContainerFromCanvas();
    getUserInput(totalNumberOfSquareDivs);
  });
};

initGrid();


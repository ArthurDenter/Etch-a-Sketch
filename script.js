const divBoxSize = function (numberOfSquareDivsPerSide, canvasSize, borderThickness) {
  return Math.floor(((canvasSize / numberOfSquareDivsPerSide) - (borderThickness * 2)) * 10) / 10;
}

const createNewGridOFSquareDivs = function (numberOfSquareDivsPerSide) {
  const mainContainer = document.querySelector(".main-container");
  for (let i = 0; i < Math.pow(numberOfSquareDivsPerSide, 2); i++) {
    const divBox = document.createElement("div");
    divBox.classList.add("divBox");
    divBox.setAttribute("draggable", "false");
    divBox.style.width = `${divBoxSize(numberOfSquareDivsPerSide, 500, 1)}px`;
    divBox.style.height = `${divBoxSize(numberOfSquareDivsPerSide, 500, 1)}px`;
    mainContainer.appendChild(divBox);
    divBox.addEventListener("mouseover", (eventMouseover) => {
      console.log(eventMouseover);
      if (eventMouseover.buttons > 0) {
        divBox.style.backgroundColor = "#" + Math.floor(Math.random() * 16777215).toString(16);
      };
    });
    divBox.addEventListener("mousedown", () => {
      divBox.style.backgroundColor = "#" + Math.floor(Math.random() * 16777215).toString(16);
    });
  };
};

const removeGridContainerFromCanvas = function () {
  const gridDivs = document.querySelectorAll(".divBox");
  gridDivs.forEach((gridDiv) => {
    gridDiv.remove();
  });
};

const getUserInput = function (callback) {
  let newGridSize = window.prompt("Please enter a number(between 0 and 100) of squares per side for the new grid.");
  if (isNaN(newGridSize)) {
    alert("This is not a valid Number!")
    getUserInput(createNewGridOFSquareDivs);
  }
  else if (newGridSize === null) {
    return callback(16);
  }
  else {
    if ((newGridSize > 0) && (newGridSize < 100)) {
      callback(newGridSize);
    }
    else {
      alert("Your given value is not between 1 and 100!");
      getUserInput(createNewGridOFSquareDivs);
    }
  }
};



//initial grid layout
createNewGridOFSquareDivs(16);
const redrawCanvasButton = document.querySelector(".redrawCanvasButton");
redrawCanvasButton.addEventListener("click", () => {
  removeGridContainerFromCanvas();
  getUserInput(createNewGridOFSquareDivs);
});

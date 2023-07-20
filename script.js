const createNewGridOFSquareDivs = function (numberOfSquareDivsPerSide) {
  const mainContainer = document.querySelector(".main-container");
  for (let i = 0; i < numberOfSquareDivsPerSide; i++) {
    for (let j = 0; j < numberOfSquareDivsPerSide; j++) {
      const divBox = document.createElement("div");
      divBox.classList.add("divBox");
      mainContainer.appendChild(divBox);
      divBox.addEventListener("mouseover", () => {
        divBox.style.backgroundColor = "red";
      });
    };
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

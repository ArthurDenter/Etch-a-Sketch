class Etchasketch {
  constructor(canvasSize, borderThickness, defaultColorMode, numberOfSquareDivsPerSide) {
    this.canvasSize = canvasSize;
    this.borderThickness = borderThickness;
    this.colorMode = defaultColorMode;
    this.divBoxSize = 0;
    this.totalNumberOfSquareDivs = 0;
    this.numberOfSquareDivsPerSide = numberOfSquareDivsPerSide;
  };

  setActiveColorMode(mode) {
    const whiteButton = document.querySelector(".monochrom-white");
    const blackButton = document.querySelector(".monochrom-black");
    const colorButton = document.querySelector(".color");
    switch (mode) {
      case "monochrom-white":
        whiteButton.classList.add("buttonIsSelected");
        blackButton.classList.remove("buttonIsSelected");
        colorButton.classList.remove("buttonIsSelected");
        this.colorMode = "monochrom-white";
        break;
      case "monochrom-black":
        whiteButton.classList.remove("buttonIsSelected");
        blackButton.classList.add("buttonIsSelected");
        colorButton.classList.remove("buttonIsSelected");
        this.colorMode = "monochrom-black";
        break;
      case "color":
        whiteButton.classList.remove("buttonIsSelected");
        blackButton.classList.remove("buttonIsSelected");
        colorButton.classList.add("buttonIsSelected");
        this.colorMode = "color";
    };
  };

  getActiveColorMode() {
    return this.colorMode;
  };

  getNumberOfSquareDivsPerSide() {
    return this.numberOfSquareDivsPerSide;
  };

  getBorderThickness() {
    return this.borderThickness;
  };

  getCanvasSize() {
    return this.canvasSize;
  };

  setDivBoxSize(numberOfSquareDivsPerSide) {
    this.divBoxSize = Math.floor(((this.getCanvasSize() / numberOfSquareDivsPerSide) - (this.getBorderThickness() * 2)) * 10) / 10;
  };

  getDivBoxSize() {
    return this.divBoxSize;
  };

  setTotalNumberOfSquareDivs(numberOfSquareDivsPerSide) {
    this.totalNumberOfSquareDivs = Math.pow(numberOfSquareDivsPerSide, 2);
  };

  getTotalNumberOfSquareDivs() {
    return this.totalNumberOfSquareDivs;
  };

  getUserInput() {
    return new Promise(function (resolve, reject) {
      let newGridSize = window.prompt("Please enter a number(between 1 and 100) of squares per side for the new grid.");
      if (isNaN(newGridSize)) {
        reject("This is not a valid Number!");
      }
      else if (newGridSize === null) {
        return;
      }
      else {
        if ((newGridSize > 0) && (newGridSize < 100)) {
          resolve(newGridSize);
        }
        else {
          reject("Your given value is not between 1 and 100!");
        }
      }
    });
  };

  changeDivBackground(event) {
    switch (event.type) {
      case "mouseover":
        if (event.buttons > 0) {
          switch (this.getActiveColorMode()) {
            case "monochrom-white":
              event.target.style.backgroundColor = "#ffffff";
              break;
            case "monochrom-black":
              event.target.style.backgroundColor = "#000000";
              break;
            case "color":
              event.target.style.backgroundColor = "#" + Math.floor(Math.random() * 16777215).toString(16);
          };
        };
        break;
      case "mousedown":
        switch (this.getActiveColorMode()) {
          case "monochrom-white":
            event.target.style.backgroundColor = "#ffffff";
            break;
          case "monochrom-black":
            event.target.style.backgroundColor = "#000000";
            break;
          case "color":
            event.target.style.backgroundColor = "#" + Math.floor(Math.random() * 16777215).toString(16);
        };
    };
  }

  createNewGridOFSquareDivs(totalNumberOfSquareDivs, divBoxSize) {
    const mainContainer = document.querySelector(".canvas-container");
    for (let i = 0; i < totalNumberOfSquareDivs; i++) {
      const divBox = document.createElement("div");
      divBox.classList.add("divBox");
      divBox.setAttribute("draggable", "false");
      divBox.style.width = `${divBoxSize}px`;
      divBox.style.height = `${divBoxSize}px`;
      mainContainer.appendChild(divBox);
      divBox.addEventListener("mouseover", (event) => { this.changeDivBackground(event) });
      divBox.addEventListener("mousedown", (event) => { this.changeDivBackground(event) });
    };
  };

  removeGridContainerFromCanvas() {
    const gridDivs = document.querySelectorAll(".divBox");
    gridDivs.forEach((gridDiv) => {
      gridDiv.remove();
    });
  };

  init() {
    this.setTotalNumberOfSquareDivs(this.getNumberOfSquareDivsPerSide());
    this.setDivBoxSize(this.getNumberOfSquareDivsPerSide());
    this.createNewGridOFSquareDivs(this.getTotalNumberOfSquareDivs(), this.getDivBoxSize());
    const redrawCanvasButton = document.querySelector(".redrawCanvasButton");
    const changeColorToWhite = document.querySelector(".colorpicker-monochrom-white-btn");
    const changeColorToBlack = document.querySelector(".colorpicker-monochrom-black-btn");
    const changeĆolorToRandom = document.querySelector(".colorpicker-color-btn");

    this.setActiveColorMode(this.colorMode);
    changeColorToWhite.addEventListener("click", () => { this.setActiveColorMode("monochrom-white") });
    changeColorToBlack.addEventListener("click", () => { this.setActiveColorMode("monochrom-black") });
    changeĆolorToRandom.addEventListener("click", () => { this.setActiveColorMode("color") });

    redrawCanvasButton.addEventListener("click", () => {
      const getUserInputPromise = this.getUserInput();
      getUserInputPromise.then(
        (value) => {
          this.removeGridContainerFromCanvas();
          this.setDivBoxSize(value);
          this.setTotalNumberOfSquareDivs(value);
          this.createNewGridOFSquareDivs(this.getTotalNumberOfSquareDivs(), this.getDivBoxSize());
        },
        (error) => {
          alert(error);
        });
    });
  }
}




// const colorVariationHalfHalf = function (totalNumberOfSquareDivs) {
//   const divBoxes = document.querySelectorAll(".divBox");
//   for (let i = 0; i < (totalNumberOfSquareDivs / 2); i++) {
//     divBoxes[i].style.backgroundColor = "#" + Math.floor(Math.random() * 16777215).toString(16);
//   }
// }

const etchasketch = new Etchasketch(500, 1, "monochrom-white", 4);
etchasketch.init();


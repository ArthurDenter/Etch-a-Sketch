const createInitialGridOfSquareDivs = function () {
  const mainContainer = document.querySelector(".main-container");
  for (let i = 0; i < 16; i++) {
    for (let j = 0; j < 16; j++) {
      const divBox = document.createElement("div");
      divBox.classList.add("divBox");
      mainContainer.appendChild(divBox);
      divBox.addEventListener("mouseover", () => {
        divBox.style.backgroundColor = "red";
      });
      //   divBox.addEventListener("mouseout", ()=>{
      //     divBox.style.backgroundColor = "black";
      // });
    }
  }
};


createInitialGridOfSquareDivs();

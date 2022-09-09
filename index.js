const a = document.querySelectorAll(".btn-words");

const greekLetters = ["β", "δ", "ζ", "ξ", "ψ", "φ", "π", "μ", "κ", "θ"];

let oldTime = 0;
let index = 0;
let finishFunction = false;
let defaultText = "";
let currentLink = "";
let arryLetters = [];
let time = 100;
const translate = (nowTime) => {
  if (!finishFunction) {
    if (nowTime - oldTime > time) {
      //specify over what time period letters are changes
      if (currentLink) {
        let indexesLink = currentLink.textContent.length - 1; //how many letters has current link which is hover

        for (let i = 0; i <= indexesLink; i++) {
          //for all letter trigger loops and drawed greek letter assign to array
          index = Math.round(Math.random() * (greekLetters.length - 1));
          arryLetters[i] = greekLetters[index];
        }
        currentLink.textContent = ""; 
        for (let i = 0; i <= indexesLink; i++) {
          currentLink.textContent += arryLetters[i]; //to empty content of current hovered link are add draw letters from array
        }
      }

      oldTime = nowTime;
    }

    requestAnimationFrame(translate);
  }
};

a.forEach((link) => {
  link.addEventListener("mouseover", () => {
    finishFunction = false; //global scope
    currentLink = link;
    translate();
    link.classList.add("test"); //add to current hover link class "test" which in style.css text-orientation: upright;  letter-spacing: -15px;  margin: -8px;
    [...a].filter((link) => {
      //on whole array check which link doesn't have class "test" and add class "opacity"
      if (!link.classList.contains("test")) {
        link.classList.add("opacity");
      }
    });
  });
});

//text back to state of beginning
a.forEach((link) => {
  const defaultText = link.innerHTML;
  link.addEventListener("mouseout", () => {
    finishFunction = true;
    link.textContent = defaultText;
    [...a].filter((link) => {
      if (link.classList.contains("opacity")) {
        link.classList.remove("opacity"); //remove class "opacity" from all links
      }
    });
    link.classList.remove("test"); //text back to state of beginning
  });
});

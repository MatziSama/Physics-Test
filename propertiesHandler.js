const py = document.getElementById("squareY");
const px = document.getElementById("squareX");
const sw = document.getElementById("squareW");
const sh = document.getElementById("squareH");
const g = document.getElementById("gravity");
const gs = document.getElementById("gravitySpeed");
const button = document.getElementById("accelerate");

const inputs = document.querySelectorAll(".valor input:not(#gravitySpeed)");


startGame();

inputs.forEach(input => {
    let initialvalue;

    input.addEventListener("input", (e) => {

    })

    input.addEventListener("focusin", () => {
        initialvalue = input.value;
        myMap.pause();
    })

    input.addEventListener("focusout", () => {
        if (input.value === initialvalue) {
            myMap.play();
            return;
        }

        changeValue(input.id, input.value);
        myMap.play();
    })
})

button.addEventListener("mousedown", () => {
    button.classList.toggle("clicked");

    accelerate(-0.9);
})

button.addEventListener("mouseup", () => {
    button.classList.toggle("clicked");

    accelerate(0.3)
})

const canvas = document.querySelector("canvas");
canvas.addEventListener("mousedown", () => {
    accelerate(-0.6)
})

document.addEventListener("mouseup", () => {
    accelerate(0.3)
})

function changeValue(id, value) {
    switch (id) {
        case "gravity":
            player.gravity = parseFloat(value);
            break;
        case "speedY":
            player.speedY = parseFloat(value);
            break;
        case "squareY":
            player.y = parseFloat(value);
            break;
        case "squareX":
            player.x = parseFloat(value);
            break;
        case "squareH":
            player.height = parseFloat(value);
            break;
        case "squareW":
            player.width = parseFloat(value);
            break;
        default:
            break;
    }
}
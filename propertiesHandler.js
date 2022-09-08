const py = document.getElementById("squareY");
const px = document.getElementById("squareX");
const sw = document.getElementById("squareW");
const sh = document.getElementById("squareH");
const g = document.getElementById("gravity");
const gs = document.getElementById("gravitySpeed");
const button = document.getElementById("accelerate");

const pause = document.getElementById("pause");

const containers = document.querySelectorAll(".valor:not(#noselect)");

startGame();

containers.forEach(cont => {

    let input;
    let direction;

    cont.addEventListener("mousedown", (e) => {
        if (e.path.includes(button)) return;

        const valorCont = e.target.parentElement;
        input = valorCont.querySelector("input");
        direction = valorCont.classList[1];

        if (pause.checked) myMap.pause();

        document.addEventListener("mouseup", exited)
        document.addEventListener("mousemove", moving)
    })

    /**
     * 
     * @param {MouseEvent} e 
     */
    function moving(e) {
        let value;
        let shift = e.shiftKey;

        if (direction === 'horizontal') {
            value = shift ? e.movementX * 10 : e.movementX;
        } else {
            value = shift ? e.movementY * 10 : e.movementY;
        }

        changeValue(input.id, value);
    }

    function exited() {
        if (pause.checked) myMap.play();
        document.removeEventListener("mouseup", exited);
        document.removeEventListener("mousemove", moving)
    }
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

    document.addEventListener("mouseup", exited)

    function exited() {
        accelerate(0.3);
        document.removeEventListener("mouseup", exited);
    }
})

function changeValue(id, value) {
    let v;

    switch (id) {
        case "gravity":
            player.gravity += parseFloat(value / 10);

            staticUpdate();
            break;
        case "speedY":
            player.speedY = parseFloat(value);
            break;
        case "squareY":
            player.y += parseFloat(value);

            staticUpdate();
            break;
        case "squareX":
            v = player.x + parseFloat(value);
            if (v <= 0) {
                player.x = 0;
            }

            player.x = v;

            staticUpdate();
            break;
        case "squareH":
            v = player.height + parseFloat(value);
            if (v <= 0) {
                player.height = 1;
                break;
            }

            player.height = v;
            
            staticUpdate();
            break;
        case "squareW":
            v = player.width + parseFloat(value);
            if (v <= 0) {
                plaher.width = 1;
                break;
            }

            player.width = v;

            staticUpdate();
            break;
        default:
            break;
    }
}
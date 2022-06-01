let canvas = document.getElementById("Canvas");

let ctx = canvas.getContext("2d"); /*usamos getcontext para poder dibujar sobre el canvas*/

let x = canvas.width / 2;
let y = canvas.height - 30;



// Estas variables son para reposicionar la pelota en cada ejecucion de la funcion dibujar. 
let dx = 5;
let dy = -3;
let radioBola = 15;
let colorBola = getRandomColor();

// Paleta variables

let paletaAltura = 10;
let paletaAncho = 75;
let paletaX = (canvas.width - paletaAncho) / 2;

// CONTROL DE LA PALETA

let botonDerecho = false;
let botonIzquierdo = false;

// CONTADOR
let puntaje = 0;



// LADRILLOS VARIABLES
let ladrilloFila = 3;
let ladrilloColumna = 5;
let ladrilloAncho = 80;
let ladrilloAlto = 20;
let ladrilloPadding = 10;
let ladrilloMarginTop = 30;
let ladrilloMarginLeft = 20;

// Recorro el array para crear los ladrillos.

const ladrillos = [];
for (i = 0; i < ladrilloColumna; i++) {
    ladrillos[i] = [];
    for (l = 0; l < ladrilloFila; l++) {
        ladrillos[i][l] = {
            x: 0,
            y: 0,
            status: 1
        };
    }
}




// DETECTAR PULSACION TECLAS PARA LA PALETA

document.addEventListener("keydown", teclaApretada, false);
function teclaApretada(e) {
    if (e.keyCode == 39) {
        botonDerecho = true;
    }
    else if (e.keyCode == 37) {
        botonIzquierdo = true;
    }
}
document.addEventListener("keyup", teclaSuelta, false);
function teclaSuelta(e) {
    if (e.keyCode == 39) {
        botonDerecho = false;
    }
    else if (e.keyCode == 37) {
        botonIzquierdo = false;
    }
}



setInterval(dibujar, 10); /*el segundo parametro es en MILISEGUNDOS*/
// la funcion se va a ejecutar forever hasta que decida detenerla
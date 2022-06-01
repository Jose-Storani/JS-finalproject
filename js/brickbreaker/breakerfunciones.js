// COLOR DE LA BOLA
function getRandomColor() {
    var letters = '0123456789ABCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * letters.length)];
    }
    return color;
}


// PUNTAJE

function dibujarPuntaje() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "black";
    ctx.fillText("Puntaje: " + puntaje, 8, 20);
}




// ladrillos

function dibujarLadrillos() {
    for (i = 0; i < ladrilloColumna; i++) {
        for (l = 0; l < ladrilloFila; l++) {
            if (ladrillos[i][l].status == 1) {
                let ladrilloX = (i * (ladrilloAncho + ladrilloPadding)) + ladrilloMarginLeft;
                let ladrilloY = (l * (ladrilloAlto + ladrilloPadding)) + ladrilloMarginTop;
                ladrillos[i][l].x = ladrilloX;
                ladrillos[i][l].y = ladrilloY;
                ctx.beginPath();
                ctx.rect(ladrilloX, ladrilloY, ladrilloAncho, ladrilloAlto);
                ctx.fillStyle = "white";
                ctx.fill();
                ctx.closePath();
            }
        }
    }
}



//  BOLA

function dibujarBola() {
    ctx.beginPath();
    ctx.arc(x, y, radioBola, 0, Math.PI * 2);
    ctx.fillStyle = colorBola;

    ctx.closePath();
    ctx.fill();
}

// PALETA 
function dibujarPaleta() {
    ctx.beginPath();
    ctx.rect(paletaX, canvas.height - paletaAltura, paletaAncho, paletaAltura)
    ctx.fillStyle = "white"
    ctx.fill();
    ctx.closePath();
}


// JUEGO
function dibujar() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); /*Esto permite borrar el fotograma anterior que se dibujo, para no dejar rastro de la bola*/
    dibujarPuntaje();
    colision();
    dibujarPaleta();
    dibujarLadrillos();
    dibujarBola();

    x += dx;
    y += dy;

    if (x + dx > canvas.width - radioBola || x + dx < radioBola) {
        dx = -dx;
        colorBola = getRandomColor()
    }


    if (y + dy < radioBola) {
        dy = -dy;
        colorBola = getRandomColor()
    } else if (y + dy > canvas.height - radioBola) {
        if (x > paletaX && x < paletaX + paletaAncho) {
            dy = -dy;
            colorBola = getRandomColor()
        }
        else {
            // ("GAME OVER");
            document.location.reload();
        }
    }

    // movimiento de la paleta
    if (botonDerecho && paletaX < canvas.width - paletaAncho) {
        paletaX += 7;
    }
    else if (botonIzquierdo && paletaX > 0) {
        paletaX -= 7;
    }



}



// COLISION LADRILLOS BOLA
function colision() {
    for (i = 0; i < ladrilloColumna; i++) {
        for (l = 0; l < ladrilloFila; l++) {
            let b = ladrillos[i][l];
            if (b.status == 1) {
                if (x > b.x && x < b.x + ladrilloAncho && y > b.y && y < b.y + ladrilloAlto) {
                    dy = -dy;
                    b.status = 0;
                    colorBola = getRandomColor();
                    puntaje++;
                    if (puntaje == ladrilloColumna * ladrilloFila) {
                        
                        document.location.reload();
                    }
                }
            }
        }
    }
}
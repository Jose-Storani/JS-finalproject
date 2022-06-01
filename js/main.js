


const texto = document.getElementById("texto");
const botonesOpciones = document.getElementById("opciones-botones");

let estado = {};
function startGame() {
    estado = {};
    mostrarTexto(1);

}

function mostrarTexto(indiceTextoNodos) {
    const textoNodo = textoNodos.find(textoNodo => textoNodo.id === indiceTextoNodos);
    texto.innerText = textoNodo.texto;
    while (botonesOpciones.firstChild) {
        botonesOpciones.removeChild(botonesOpciones.firstChild)
    }

    textoNodo.opciones.forEach(opcion => {
        if (mostrarOpcion(opcion)) {
            const boton = document.createElement("button");
            boton.innerText = opcion.texto;
            boton.classList.add("boton");
            boton.addEventListener("click", () => elegirOpcion(opcion));
            botonesOpciones.appendChild(boton)

        }
    })
}

function mostrarOpcion(opcion) {
    return opcion.requiredEstado == null || opcion.requiredEstado(estado);

}

function elegirOpcion(opcion) {
    const siguienteTexto_id = opcion.siguienteTexto;
    if (siguienteTexto_id <= 0) {
        return startGame()
    }
    estado = Object.assign(estado, opcion.setEstado);
    mostrarTexto(siguienteTexto_id);


}

startGame();
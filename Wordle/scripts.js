let filaActual = 0;
let colActual = 0;

seleccionada();

let palabras = ["CIELO", "NOCHE", "FRUTA", "LLAMA", "FLOTA", "FUEGO", "LLAVE", "HOJAS", "GENTE", "FELIZ"];
let palabra = palabras[Math.floor(Math.random() * palabras.length)];

console.log(palabra);

let escrito = "";

document.querySelectorAll(".key").forEach(function(button) {
    button.addEventListener("click", function() {
        let valor = button.textContent.trim();

        if (valor != "DEL" && valor != "ENTER") {
            if (colActual < 5) {
                escrito += valor;
                console.log(escrito);
                recopilar(valor);
            }
        } else if (valor === "DEL") {
            del();
        } else if (valor === "ENTER" && colActual === 5) {
            validar(escrito);
            enter();
        }
    });
});

function recopilar(valor) {
    let filas = document.getElementsByClassName("row");
    let filaSel = filas[filaActual];
    let columnas = filaSel.getElementsByClassName("cell");

    if (colActual < 5) {
        let columnaSel = columnas[colActual];
        columnaSel.textContent = valor;
        colActual++;
    }
}

function del() {
    let filas = document.getElementsByClassName("row");
    let filaSel = filas[filaActual];
    let columnas = filaSel.getElementsByClassName("cell");

    if (colActual > 0) {
        colActual--;
        let columnaSel = columnas[colActual];
        columnaSel.textContent = "";
    }

    if (escrito.length > 0) {
        escrito = escrito.slice(0, -1);
        console.log(escrito);
    }
}

function enter() {
    filaActual++;
    colActual = 0;
    if (palabra !== escrito) {
        seleccionada();
        escrito = "";
    }
}

function seleccionada() {
    let filas = document.getElementsByClassName("row");

    // Asegúrate de que todas las filas anteriores pierdan la clase 'selec'
    for (let i = 0; i < filas.length; i++) {
        let columnas = filas[i].getElementsByClassName("cell");
        for (let j = 0; j < columnas.length; j++) {
            columnas[j].classList.remove("selec");
        }
    }

    // Añadir la clase 'selec' a la fila actual
    let filaSel = filas[filaActual];
    let columnas = filaSel.getElementsByClassName("cell");

    for (let i = 0; i < columnas.length; i++) {
        columnas[i].classList.add("selec");
    }
}

function validar(escrito) {
    let filas = document.getElementsByClassName("row");
    let filaSel = filas[filaActual];
    let columnas = filaSel.getElementsByClassName("cell");

    // Recorremos lo que tenemos escrito comparándolo con la palabra
    for (let i = 0; i < columnas.length; i++) {
        if (escrito[i] === palabra[i]) {
            columnas[i].classList.add("verde");
        } else if (palabra.includes(escrito[i])) {
            columnas[i].classList.add("naranja");
        }
    }

    if (escrito === palabra) {
        for (let i = 0; i < columnas.length; i++) {
            columnas[i].classList.add("verde");
        }

        let teclado = document.getElementById("keyboard");
        let original = teclado.innerHTML;
        teclado.innerHTML = "";
        teclado.textContent = "¡Perfecto!";

        let boton = document.createElement("button");
        let textoBoton = document.createTextNode("¿Otra palabra?");
        boton.appendChild(textoBoton);
        teclado.appendChild(boton);

        teclado.classList.remove("keyboard");
        teclado.classList.add("victoria");
        boton.classList.add("boton");

        boton.addEventListener("click", function() {
            palabra = palabras[Math.floor(Math.random() * palabras.length)];
            escrito = "";
            colActual = 0;
            filaActual = 0;
            teclado.innerHTML = original;
            teclado.classList.add("keyboard");
            teclado.classList.remove("victoria");
            reiniciar();
        });
    }
}

function reiniciar() {
    // Filas
    let filas = document.getElementsByClassName("row");

    // Limpiar todo el tablero, quitando colores y textos
    for (let i = 0; i < filas.length; i++) {
        let columnas = filas[i].getElementsByClassName("cell");
        for (let j = 0; j < columnas.length; j++) {
            columnas[j].classList.remove("verde", "naranja", "selec");
            columnas[j].textContent = "";  // Limpiar el contenido de texto
        }
    }
    tablero=document.getElementById("board");

    tablero.innerHTML = ""
    // Restablecer las variables globales
    filaActual = 0;
    colActual = 0;
    escrito = "";

    // Resaltar la primera fila para comenzar de nuevo
    seleccionada();
}

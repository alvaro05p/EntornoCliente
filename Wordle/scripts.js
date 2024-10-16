let filaActual = 0;
let colActual = 0;

seleccionada();

let palabras = [
    "CIELO", "NOCHE", "FRUTA", "LLAMA", "FLOTA", "FUEGO", "LLAVE", "HOJAS", "GENTE", "FELIZ",
    "ARBOL", "AVION", "BALON", "BARCO", "BOLSA", "BURRO", "CABRA", "CAMPO", "CARTA", "CASAS",
    "CIEGA", "COCHE", "CORAL", "CORTE", "DEDOS", "DIOSA", "DULCE", "ESFER", "FLOJO", "FLORA",
    "GRITO", "HABLA", "HORNO", "JUEGO", "JOVEN", "LAGOS", "LARGO", "LIBRO", "LUCHA", "LUNES",
    "MANOS", "MENTA", "MESA", "METAL", "MONTA", "NACER", "NIEVE", "NIÑOS", "ORCAS", "OVEJA",
    "OZONO", "PAJAR", "PAPEL", "PECES", "PERRO", "PIANO", "PIEZA", "PLUMA", "POLLO", "PUROS",
    "QUESO", "RAYOS", "RISAS", "ROBOT", "RUEDA", "SABIO", "SELVA", "SOLAR", "SUELO", "TANGO",
    "TELAS", "TIJER", "TIGRE", "TOMAR", "TORRE", "UÑAS", "VALLE", "VELAS", "VIAJE", "VIBRA",
    "VIDAS", "VIUDA", "YERBA", "ZORRO", "ZURDO", "SABOR", "CLIMA", "BRISA", "PLATO", "CABLE",
    "MOTOR", "HOJAS", "ALMAS", "PINTA", "TARTA", "ZONAS", "BANDA", "PISTA", "NARIZ", "LUCES",
    "BRAZO", "CRUZ", "FOCOS", "SILLA", "PARED", "RATON", "ACERO", "BAILE", "CIRCO", "RITMO",
    "HIELO", "LAPIZ", "CLAVE", "BAÑOS", "BOTAS", "GAFAS", "SUEÑO", "POLVO", "FINCA", "GOLFO",
    "MARZO", "SANTA", "RIEGO", "PANES", "COSTA", "ROJOS", "TALLO", "PARDO", "VIVIR", "LAZOS",
    "BRAVO", "FANGO", "CALOR", "PATIO", "TRIGO", "REMOS", "CALMA", "BUQUE", "LIMON", "RASGO",
    "TENIS", "BAÑO", "CREMA", "DIETA", "LATIR", "PALMA", "SUDOR", "POLLO", "MONTA", "DELTA",
    "GRIFO", "CHINA", "RUEDA", "TEMOR", "CASCO", "MANIA", "COCOA", "OPERA", "PETAS", "VIOLE"
];



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

document.addEventListener("keydown", function(event) {
    let key = event.key.toUpperCase();  // Capturamos la tecla en mayúsculas
    console.log(key);
    let valor = key;

    if (/^[A-Z]$/.test(key)) {
        if (colActual < 5) {
            escrito += valor;
            console.log(escrito);
            recopilar(valor);
        }
    } else if (valor === "BACKSPACE") {
        del();
    } else if (valor === "ENTER" && colActual === 5) {
        validar(escrito);
        enter();
    }
});

// Función para llenar las celdas con la letra seleccionada
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

// Función para eliminar la última letra ingresada
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

// Avanza a la siguiente fila al presionar "ENTER"
function enter() {
    filaActual++;
    colActual = 0;
    if (palabra !== escrito) {
        seleccionada();
        escrito = "";
    }
}

// Resalta la fila actual en el tablero
function seleccionada() {
    let filas = document.getElementsByClassName("row");

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

// Función para validar si la palabra escrita es correcta
function validar(escrito) {
    let filas = document.getElementsByClassName("row");
    let filaSel = filas[filaActual];
    let columnas = filaSel.getElementsByClassName("cell");

    // Recorremos lo que tenemos escrito comparándolo con la palabra
    for (let i = 0; i < columnas.length; i++) {
        let letraEscrita = escrito[i];
        let letraPalabra = palabra[i];

        if (letraEscrita === letraPalabra) {
            columnas[i].classList.add("verde");
            marcarTeclado(letraEscrita, "green-key");
        } else if (palabra.includes(letraEscrita)) {
            columnas[i].classList.add("naranja");
            marcarTeclado(letraEscrita, "orange-key");
        } else {
            columnas[i].classList.add("gris");
            marcarTeclado(letraEscrita, "grey-key");
        }
    }

    // Mostrar mensaje si la palabra es correcta o si se han agotado los intentos
    let teclado = document.getElementById("keyboard");

    if (escrito === palabra) {
        for (let i = 0; i < columnas.length; i++) {
            columnas[i].classList.add("verde");
        }

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
            reiniciar();
        });
    } else if (filaActual == 5) {
        teclado.innerHTML = "";
        teclado.textContent = "Vaya, la palabra era " + palabra;

        let boton = document.createElement("button");
        let textoBoton = document.createTextNode("¿Otra palabra?");
        boton.appendChild(textoBoton);
        teclado.appendChild(boton);

        teclado.classList.remove("keyboard");
        teclado.classList.add("derrota");
        boton.classList.add("boton");

        boton.addEventListener("click", function() {
            reiniciar();
        });
    }
}

function marcarTeclado(letra, clase) {
    document.querySelectorAll(".key").forEach(function(button) {
        if (button.textContent === letra) {

            // Si la clase es verde o naranja la 
            if (clase === "green-key") {
                button.classList.remove("grey-key", "orange-key");
                button.classList.add(clase);
            } else if (clase === "orange-key") {

                //Si ya contiene la clase verde no hacemos nada
                if (!button.classList.contains("green-key")) {
                    button.classList.remove("grey-key");
                    button.classList.add(clase);
                }
            } else if (clase === "grey-key") {
                // Solo se añade el gris si la tecla no es verde o naranja
                if (!button.classList.contains("green-key") && !button.classList.contains("orange-key")) {
                    button.classList.add(clase);
                }
            }
        }
    });
}


// Reiniciar la página
function reiniciar() {
    location.reload();
}

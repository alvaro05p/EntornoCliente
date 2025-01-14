let filaActual = 0;
let colActual = 0;
let palabra = "";
let escrito = "";

const csvFilePath = 'palabras.csv';

(async function iniciarJuego() {
    palabra = await obtenerPalabraCSV();
    console.log("Palabra inicial seleccionada:", palabra);
    seleccionada();
})();

// Función para obtener palabra válida desde el CSV
async function obtenerPalabraCSV() {
    try {
        const response = await fetch(csvFilePath);
        const csvText = await response.text();
        const rows = csvText.split("\n").map(row => row.split(","));
        let palabraObtenida;

        do {
            const randomIndex = Math.floor(Math.random() * (rows.length - 1)) + 1;
            palabraObtenida = rows[randomIndex]?.[0]?.trim() || "";
        } while (palabraObtenida.length !== 5);

        return palabraObtenida.toUpperCase();
    } catch (error) {
        console.error("Error al leer el archivo CSV:", error);
        return null;
    }
}

// Lógica de eventos para teclas y clics
document.addEventListener("keydown", manejarEntrada);
document.querySelectorAll(".key").forEach(button =>
    button.addEventListener("click", () => manejarEntrada({ key: button.textContent.trim() }))
);

function manejarEntrada(event) {
    const key = event.key?.toUpperCase() || event.key || event.keyCode?.toString();
    if (/^[A-Z]$/.test(key) && colActual < 5) {
        escrito += key;
        recopilar(key);
    } else if (key === "BACKSPACE") {
        del();
    } else if (key === "ENTER" && colActual === 5) {
        validar(escrito);
        enter();
    }
}

// Función para llenar las celdas con la letra seleccionada
function recopilar(valor) {
    const filaSel = document.getElementsByClassName("row")[filaActual];
    const columnaSel = filaSel.getElementsByClassName("cell")[colActual];
    columnaSel.textContent = valor;
    colActual++;
}

// Eliminar la última letra
function del() {
    if (colActual > 0) {
        colActual--;
        const filaSel = document.getElementsByClassName("row")[filaActual];
        filaSel.getElementsByClassName("cell")[colActual].textContent = "";
        escrito = escrito.slice(0, -1);
    }
}

// Validar la palabra ingresada
async function validar(escrito) {
    console.log("Validando palabra:", escrito);
    const filaSel = document.getElementsByClassName("row")[filaActual];
    const columnas = filaSel.getElementsByClassName("cell");

    for (let i = 0; i < 5; i++) {
        const letra = escrito[i];
        if (letra === palabra[i]) {
            columnas[i].classList.add("verde");
        } else if (palabra.includes(letra)) {
            columnas[i].classList.add("naranja");
        } else {
            columnas[i].classList.add("gris");
        }
    }

    if (escrito === palabra) {
        mostrarVictoria();
    } else if (filaActual === 5) {
        mostrarDerrota();
    }
}

// Avanzar a la siguiente fila
function enter() {
    filaActual++;
    colActual = 0;
    escrito = "";
    seleccionada();
}

// Resaltar la fila actual
function seleccionada() {
    document.querySelectorAll(".row").forEach(row =>
        row.querySelectorAll(".cell").forEach(cell => cell.classList.remove("selec"))
    );
    document.querySelectorAll(".row")[filaActual].querySelectorAll(".cell").forEach(cell =>
        cell.classList.add("selec")
    );
}

// Mostrar victoria
function mostrarVictoria() {
    const container = document.getElementById("container");

    // Crear el div de victoria
    const victoriaDiv = document.createElement("div");
    victoriaDiv.classList.add("victoria");
    victoriaDiv.textContent = "¡Perfecto!";

    // Crear el botón para reiniciar
    const boton = document.createElement("button");
    boton.textContent = "¿Otra palabra?";
    boton.classList.add("boton");
    boton.addEventListener("click", reiniciar);

    // Añadir el botón al div
    victoriaDiv.appendChild(boton);

    // Reemplazar el teclado con el div de victoria
    const teclado = document.getElementById("keyboard");
    teclado.innerHTML = "";
    teclado.appendChild(victoriaDiv);
}

// Mostrar derrota
function mostrarDerrota() {
    const container = document.getElementById("container");

    // Crear el div de derrota
    const derrotaDiv = document.createElement("div");
    derrotaDiv.classList.add("derrota");
    derrotaDiv.textContent = "Vaya, la palabra era " + palabra;

    // Crear el botón para reiniciar
    const boton = document.createElement("button");
    boton.textContent = "¿Otra palabra?";
    boton.classList.add("boton");
    boton.addEventListener("click", reiniciar);

    // Añadir el botón al div
    derrotaDiv.appendChild(boton);

    // Reemplazar el teclado con el div de derrota
    const teclado = document.getElementById("keyboard");
    teclado.innerHTML = "";
    teclado.appendChild(derrotaDiv);
}

// Reiniciar juego
function reiniciar() {
    location.reload();
}

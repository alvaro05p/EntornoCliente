let filaActual = 0;
let colActual = 0;

seleccionada();

let palabras = [
    "CIELO", "NOCHE", "FRUTA", "LLAMA", "FLOTA", "FUEGO", "LLAVE", "HOJAS", "GENTE", "FELIZ",
    "ARBOL", "AVION", "BALON", "BARCO", "BOLSA", "BURRO", "CABRA", "CAMPO", "CARTA", "CASAS",
    "CIEGA", "COCHE", "CORAL", "CORTE", "DEDOS", "DIOSA", "DULCE", "ESCAR", "ESFER", "FLOJO",
    "FLORA", "GRITO", "HABLA", "HORNO", "JUEGO", "JOVEN", "LAGOS", "LARGO", "LIBRO", "LUCHA",
    "LUNES", "MANOS", "MENTA", "MESA", "METAL", "MONTA", "NACER", "NIEVE", "NIÑOS", "ORCAS",
    "OVEJA", "OZONO", "PAJAR", "PAPEL", "PECES", "PERRO", "PIANO", "PIEZA", "PLUMA", "POLLO",
    "PUROS", "QUESO", "RAYOS", "RISAS", "ROBOT", "RUEDA", "SABIO", "SELVA", "SOLAR", "SUELO",
    "TANGO", "TELAS", "TIEMO", "TIJER", "TIGRE", "TOMAR", "TORRE", "UÑAS", "VALLE", "VELAS",
    "VIAJE", "VIBRA", "VIDAS", "VIUDA", "YERBA", "ZORRO", "ZURDO", "SABOR", "CLIMA", "BRISA",
    "PLATO", "CABLE", "MOTOR", "ESPEJ", "HOJAS", "ALMAS", "PINTA", "TARTA", "ZONAS", "BANDA"
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
    console.log(filaSel);
    // Recorremos lo que tenemos escrito comparándolo con la palabra
    for (let i = 0; i < columnas.length; i++) {

        if (escrito[i] === palabra[i]) {
            columnas[i].classList.add("verde");
        } else if (palabra.includes(escrito[i])) {
            columnas[i].classList.add("naranja");
        }
    }

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
    }else if(filaActual == 5){
        
        teclado.innerHTML = "";
        teclado.textContent = "Vaya, la palabra era " + palabra;
/^[A-Z]$/.test(key)
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

function reiniciar() {
    location.reload();
}



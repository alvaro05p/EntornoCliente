//Mensajes de los resultados de las jugadas
var mensajes = {
    tipa: "Tijeras cortan papel",
    papi: "Papel tapa piedra",
    pila:"Piedra aplasta lagarto",
    lasp: "Lagarto envenena a Spock",
    spti: "Spock rompe tijeras",
    tila: "Tijeras decapitan lagarto",
    lapa: "Lagarto devora papel",
    pasp: "Papel desautoriza a Spock",
    sppi: "Spock vaporiza piedra",
    piti: "Piedra aplasta tijeras"
}

//Variables que contendrán los elementos HTML que vayamos a necesitar

window.onload = function(){
    cargarTablero();
    asignarElementosHTML();
    cargarEventos();
}

let piedra;
let papel;
let tijeras;
let lagarto;
let spock;

let usuario;
let bot = jugadaBot();

let ultimoArrastrado;
let ultimoArrastradoId;

let puntosBot = 0;
let puntosUser = 0;

function asignarElementosHTML() {
    //Función que utilizaremos para asignar los elementos HTML que vayamos a utilizar, a las varibales que hemos creado.
    piedra = document.getElementById("piedra");
    papel = document.getElementById("papel");
    tijeras = document.getElementById("tijeras");
    lagarto = document.getElementById("lagarto");
    spock = document.getElementById("spock");
    dropzone = document.getElementById("seleccionado");

    console.log("Elementos creados");
}

function cargarEventos() {

    //Función donde cargaremos los eventos que necesite cada elemento de la partida
    let items = document.querySelectorAll('.item');

    items.forEach(item => {
        item.addEventListener('dragstart', (event) => {
            event.dataTransfer.setData('text/plain', event.target.id);
            console.log("dragstart")
        });
    });

    dropzone.addEventListener('dragover', (event) => {
        event.preventDefault();
        console.log("dragover")

    });

    dropzone.addEventListener('drop', (event) => {
        console.log("drop")
        event.preventDefault();
        const id = event.dataTransfer.getData('text/plain');
        const draggedElement = document.getElementById(id);
        ultimoArrastrado = draggedElement;
        ultimaZona = dropzone;
        ultimoArrastradoId = id;
        dropzone.appendChild(draggedElement);
        usuario = id;
        deliverar();
    });

    let btnContinuar = document.getElementById("continuar");
    btnContinuar.addEventListener("click", function(){
        continuar();
    });


}

function continuar() {
    //Función que lanzamos cuando pulsamos al botón continuar
    //Volvemos a ocultar el mensaje;
    document.getElementById("mensaje").className = "invisible";
    document.getElementById("proteccion").className = "invisible";
    document.getElementById("deliveracion").className = "invisible";

    //Si es una jugada reiniciamos todo menos los contadores de puntos.

    //Si es el final de la partida, también incluimos los contadores de puntos.
    cargarTablero();

    bot = jugadaBot();
}

function jugadaBot(){
    let elementos = ["piedra",  "papel",  "tijeras",  "lagarto",  "spock"];
    let bot = elementos[Math.floor(Math.random() * 5)];
    return bot;
}

function deliverar() {
    document.getElementById("proteccion").className="";
    document.getElementById("deliveracion").className="";
    setTimeout(mostrarMensaje,500);
}

function mostrarMensaje() {
    //Mostramos el mensaje en función del resultado de la jugada o de la partida
    let veredicto = document.getElementById("veredicto");
    let arrayVeredicto = [];
    arrayVeredicto.push(usuario);
    arrayVeredicto.push(bot);
    if(arrayVeredicto.includes("tijeras") && arrayVeredicto.includes("papel")){
        veredicto.textContent = mensajes["tipa"];
        if(usuario == "tijeras"){
            puntuar("usuario");
        }else if(bot == "tijeras"){
            puntuar("bot");
        }
    }else if(arrayVeredicto.includes("papel") && arrayVeredicto.includes("piedra")){
        veredicto.textContent = mensajes["papi"];
        console.log(usuario + " " + bot);
        if(usuario == "papel"){
            puntuar("usuario");
        }else if(bot == "papel"){
            puntuar("bot");
        }
    }else if(arrayVeredicto.includes("piedra") && arrayVeredicto.includes("lagarto")){
        veredicto.textContent = mensajes["pila"];
        if(usuario == "piedra"){
            puntuar("usuario");
        }else if(bot == "piedra"){
            puntuar("bot");
        }
    }else if(arrayVeredicto.includes("lagarto") && arrayVeredicto.includes("spock")){
        veredicto.textContent = mensajes["lasp"];
        if(usuario == "lagarto"){
            puntuar("usuario");
        }else if(bot == "lagarto"){
            puntuar("bot");
        }
    }else if(arrayVeredicto.includes("spock") && arrayVeredicto.includes("tijeras")){
        veredicto.textContent = mensajes["spti"];
        if(usuario == "spock"){
            puntuar("usuario");
        }else if(bot == "spock"){
            puntuar("bot");
        }
    }else if(arrayVeredicto.includes("tijeras") && arrayVeredicto.includes("lagarto")){
        veredicto.textContent = mensajes["tila"];
        if(usuario == "tijeras"){
            puntuar("usuario");
        }else if(bot == "tijeras"){
            puntuar("bot");
        }
    }else if(arrayVeredicto.includes("lagarto") && arrayVeredicto.includes("papel")){
        veredicto.textContent = mensajes["lapa"];
        if(usuario == "lagarto"){
            puntuar("usuario");
        }else if(bot == "lagarto"){
            puntuar("bot");
        }
    }else if(arrayVeredicto.includes("papel") && arrayVeredicto.includes("spock")){
        veredicto.textContent = mensajes["pasp"];
        if(usuario == "papel"){
            puntuar("usuario");
        }else if(bot == "papel"){
            puntuar("bot");
        }
    }else if(arrayVeredicto.includes("spock") && arrayVeredicto.includes("piedra")){
        veredicto.textContent = mensajes["sppi"];
        if(usuario == "spock"){
            puntuar("usuario");
        }else if(bot == "spock"){
            puntuar("bot");
        }
    }else if(arrayVeredicto.includes("piedra") && arrayVeredicto.includes("tijeras")){
        veredicto.textContent = mensajes["piti"];
        if(usuario == "piedra"){
            puntuar("usuario");
        }else if(bot == "piedra"){
            puntuar("bot");
        }
    }else if(arrayVeredicto[0] === arrayVeredicto[1]){
        veredicto.textContent = "Empate!"
    }

    document.getElementById("mensaje").className="visible";
}

function mostrarGanador(ganadorPartida) {
    //Mostramos el mensaje en función del resultado de la jugada o de la partida
    let veredicto = document.getElementById("veredicto");
    if(ganadorPartida == "usuario"){
        veredicto.textContent="Gana el usuario";
    }else if(ganadorPartida == "bot"){
        veredicto.textContent="Gana la maquina";
    }
    
    document.getElementById("mensaje").className="visible";
    document.getElementById("continuar").className="invisible";
}

function cargarTablero() {
    if (!ultimoArrastradoId) {
        console.log("Tiene que haber algun elemento arrastrado");
        return;
    }

    let asignarCont = "cont" + ultimoArrastradoId;
    let contPadre = document.getElementById(asignarCont);

    if (contPadre) {
        contPadre.appendChild(ultimoArrastrado);
        dropzone.innerHTML = "";
        console.log("Tablero reiniciado");
    } 

}

function puntuar(ganador){
    let marcadorUser = document.getElementById("jugador");
    let marcadorBot = document.getElementById("maquina");
    let punto = document.createElement("div");
    punto.classList.add("punto");
    
    if(ganador == "usuario"){
        punto.classList.add("mio");
        marcadorUser.appendChild(punto);
        puntosUser++;
    }else if(ganador == "bot"){
        punto.classList.add("suyo");
        marcadorBot.appendChild(punto);
        puntosBot++;
    }

    if(puntosUser == 10){
        mostrarGanador("usuario");
    }else if(puntosBot == 10){
        mostrarGanador("bot");
    }
    
}
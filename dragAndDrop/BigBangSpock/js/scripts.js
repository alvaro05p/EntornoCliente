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

function asignarElementosHTML() {
    //Función que utilizaremos para asignar los elementos HTML que vayamos a utilizar, a las varibales que hemos creado.
    let piedra = document.getElementById("piedra");
    let papel = document.getElementById("papel");
    let tijera = document.getElementById("tijera");
    let lagarto = document.getElementById("lagarto");
    let spock = document.getElementById("spock");
    let dropzone = document.getElementById('seleccionado');
}

function cargarEventos() {
    //Función donde cargaremos los eventos que necesite cada elemento de la partida
    
    piedra.addEventListener('dragstart', dragStart);
    papel.addEventListener('dragstart', dragStart);
    tijera.addEventListener('dragstart', dragStart);
    lagarto.addEventListener('dragstart', dragStart);
    spock.addEventListener('dragstart', dragStart);
    
    dropzone.addEventListener('dragover', dragOver);
    dropzone.addEventListener('drop', drop);

    function dragStart(event) {
        event.dataTransfer.setData('text/plain', event.target.id);
    }

    function dragOver(event) {
        event.preventDefault();
    }

    function drop(event) {
        event.preventDefault();
        const id = event.dataTransfer.getData('text/plain');
        const draggedElement = document.getElementById(id);
        dropzone.appendChild(draggedElement);
    }
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
}

function deliverar() {
    document.getElementById("proteccion").className="visible";
    document.getElementById("deliveracion").className="visible";
    setTimeout(mostrarMensaje,2000);
}

function mostrarMensaje() {
    //Mostramos el mensaje en función del resultado de la jugada o de la partida

}

function cargarTablero() {
    //Función donde crearemos los elementos que vayamos a necesitar, junto a sus atributos y eventos
    //La utilizaremos para reiniciar cada jugada
}

/***************************DRAG AND DROP ****************************/

//Funciones para el drag&drop

 
 /***************************FIN DRAG AND DROP **************************/
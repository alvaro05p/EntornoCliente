function apretar(elemento){
    elemento.classList.toggle("sombra");
}

let pantalla = document.getElementById("pantallaInput")

let teclasCalculadora = [
    // Números
    '0', '1', '2', '3', '4', '5', '6', '7', '8', '9',

    // Operadores
    '+', '-', '*', '/', '%', '.',

    // Teclas especiales
    'Enter',    // Equivalente a igual (=)
    'Backspace' // Para borrar el último dígito
]

document.addEventListener('keydown', function(event) {
    console.log(event.key);
    if(teclasCalculadora.includes(event.key)){
        introducir(event.key);
    }

    
})

let mostrar = "";

let operandos = [];

function introducir(elemento){

    valorElemento = elemento.innerHTML.trim();

    let caracteres = ["+","-","x","/",".","%"];

    if(caracteres.includes(mostrar[mostrar.length-1]) && caracteres.includes(valorElemento)){
        return;
    }

    mostrar += valorElemento;
    pantalla.value=mostrar;
}

function cero(){
    pantalla.value = 0;
    mostrar="";
}

function borrar(){
    
    mostrar = mostrar.substring(0, mostrar.length - 1);
    pantalla.value=mostrar;
}

function igual(){
    mostrar = mostrar.replace("x", "*");
    mostrar = eval(mostrar);
    pantalla.value = mostrar;
}
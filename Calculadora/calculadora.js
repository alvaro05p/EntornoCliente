

function apretar(elemento){
    elemento.classList.toggle("sombra");
}

let pantalla = document.getElementById("pantallaInput")

let mostrar = ""

function introducir(elemento){

    console.log(elemento.innerHTML)
    valorElemento = elemento.innerHTML.trim();
    mostrar += valorElemento;
    console.log(mostrar);
    pantalla.value=mostrar;
    
}
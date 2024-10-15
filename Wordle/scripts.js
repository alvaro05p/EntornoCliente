let filaActual = 0;
let colActual = 0;

seleccionada();

let palabras = ["CIELO", "NOCHE", "FRUTA", "LLAMA", "FLOTA", "FUEGO", "LLAVE", "HOJAS", "GENTE", "FELIZ"];

let palabra = palabras[Math.floor(Math.random() * 10) + 1]

console.log(palabra);

let escrito="";

document.querySelectorAll(".key").forEach(function(button){
    button.addEventListener("click",function(){
        let valor = button.textContent.trim();
    
        if(valor != "DEL" && valor != "ENTER"){
            escrito+=valor;
            console.log(escrito);
            recopilar(valor);
        }else if(valor === "DEL"){
            del();
        }else if(valor === "ENTER" && colActual===5){
            validar(escrito);
            enter();
        }
    });
})

function recopilar(valor){

    //Filas
    let filas = document.getElementsByClassName("row");

    let filaSel=filas[filaActual];

    for (let i = 0; i < filaSel.length; i++) {
        filaSel[i].classList.toggle("selec");
        if(i!=0){
            filaSel[i-1].classList.toggle("selec");
        }
    }

    //Todas las columnas de fila
    let columnas = filaSel.getElementsByClassName("cell");

    let columnaSel=columnas[colActual];

    if(colActual<5){
        columnaSel.textContent = valor;
        colActual++;
    }


}


function del(){
    
    //Filas
    let filas = document.getElementsByClassName("row");

    let filaSel=filas[filaActual];

    //Todas las columnas de fila
    let columnas = filaSel.getElementsByClassName("cell");

    if(colActual>0){
        colActual--;
        let columnaSel=columnas[colActual];
        columnaSel.textContent = "";
    }

    if(escrito.length > 0){
        escrito = escrito.slice(0,-1);
        console.log(escrito);
    }
    
    
}

function enter(){
    filaActual++;
    colActual=0;
    seleccionada();
    escrito = "";

}

function seleccionada(){

    //Filas
    let filas = document.getElementsByClassName("row");

    let filaSel=filas[filaActual];

    //Todas las columnas de fila
    let columnas = filaSel.getElementsByClassName("cell");

    //Le añadimos a cada columna de la fila actual una clase con un borde azúl 
    for (let i = 0; i < columnas.length; i++) {
        columnas[i].classList.toggle("selec");  
    }

}

function validar(escrito){
    
    //Filas
    let filas = document.getElementsByClassName("row");

    let filaSel=filas[filaActual];

    //Todas las columnas de fila
    let columnas = filaSel.getElementsByClassName("cell");

    //Recorremos lo que tememos escrito comparandolo con la palabra 
    for (let i = 0; i < columnas.length; i++) {
        console.log(escrito[i]);
        
        if(columnas[i].textContent === palabra[i]){
            columnas[i].classList.add("verde");
        }else if(palabra.includes(escrito[i])){
            columnas[i].classList.add("naranja");
        }
    }
    
}






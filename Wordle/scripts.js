let filaActual = 0;
let colActual = 0;

seleccionada();

document.querySelectorAll(".key").forEach(function(button){
    button.addEventListener("click",function(){
        let valor = button.textContent.trim();

        if(valor != "DEL" && valor != "ENTER"){
            recopilar(valor);
        }else if(valor === "DEL"){
            del();
        }else if(valor === "ENTER" && colActual===5){
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
    
}

function enter(){
    filaActual++;
    colActual=0;
    seleccionada();

}

function seleccionada(){

    //Filas
    let filas = document.getElementsByClassName("row");

    let filaSel=filas[filaActual];

    //Todas las columnas de fila
    let columnas = filaSel.getElementsByClassName("cell");

    for (let i = 0; i < columnas.length; i++) {
        columnas[i].classList.toggle("selec");  
    }

    if (colActual > 0) {
        let prevCol = filaSel.getElementsByClassName("cell")[colActual - 1];
        prevCol.classList.toggle("selec");
    }

}






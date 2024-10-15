let filaActual = 0;
let colActual = 0;


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
}




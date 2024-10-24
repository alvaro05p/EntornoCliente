let jugar = document.getElementById("jugar");
let selectPelotas = document.getElementById("numPelotas");
let valorSelect;
let correctas = document.getElementById("correctas");
let incorrectas = document.getElementById("incorrectas");
let contador = 0;
let contador2 = 0;

//Elegir el modo de juego
let modo;

let todasButton = document.getElementById("todas");
let colorButton = document.getElementById("color");

todasButton.addEventListener("click", function(){
    modo = "todas";
})

colorButton.addEventListener("click", function(){
    modo = "color";
})


//Cuantas pelotas habrán en el área
selectPelotas.addEventListener("change", function(){

    valorSelect = parseInt(selectPelotas.value);

})

//Se crean posiciones, tamaños y colores aleatorios
function randoms(){
    let size = (Math.random() * 50) + 10;
    let altura = Math.random() * 435;
    let horizontal = Math.random() * 1100;
    let colorNum = Math.floor((Math.random() * 4) + 1);

    return { size, altura, horizontal, colorNum };
}

//Colores aleatorios para las pelotas
function randomColor(colorNum){
    switch(colorNum){
        case 1:
            color = "blue";
            //index = "1";
            break;
        case 2:
            color = "red";
            break;
        case 3:
            color = "green";
            break;
        case 4:
            color = "yellow";
            break;
    }

    return color;
}


jugar.addEventListener("click", function(){

    let areaJuego = document.getElementById("area_juego");

    areaJuego.innerHTML="";

    for(let i=0;i<valorSelect;i++){

        let {size, altura, horizontal, colorNum } = randoms();
        let color = randomColor(colorNum);

        let circulo = document.createElement("div");

        console.log(color);

        //Se asignan
        circulo.style.backgroundColor = color;
        circulo.style.padding = size + "px";
        circulo.style.width = "0px";
        circulo.style.height = "0px";
        circulo.style.borderRadius = "5000px";
        circulo.style.position = "absolute";
        circulo.style.left = horizontal + "px";
        circulo.style.top = altura + "px";
        //circulo.style.zIndex = index;
        areaJuego.appendChild(circulo);

        //Sumamos al contador indicado
        circulo.addEventListener("click", function(){
            

            if(circulo.style.backgroundColor == "blue"){
                contador++;
                correctas.textContent = contador;
            }else{
                contador2++;
                incorrectas.textContent = contador2;
            }

            circulo.remove();
            
        })
    }
    
})
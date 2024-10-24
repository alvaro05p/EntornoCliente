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
    todasButton.classList.add("pulsado");
    colorButton.classList.remove("pulsado");
})

colorButton.addEventListener("click", function(){
    modo = "color";
    colorButton.classList.add("pulsado");
    todasButton.classList.remove("pulsado");
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

function getColorPrincipal(){
    let colorPrincipal = Math.floor((Math.random() * 4) + 1);
    switch(colorPrincipal){
        case 1:
            color = "lightblue";  // Azul 
            break;
        case 2:
            color = "lightgoldenrodyellow";  // Rojo 
            break;
        case 3:
            color = "lightgreen";  // Verde 
            break;
        case 4:
            color = "lightpink";  // Amarillo 
            break;
    }
    
    return color;
}

//Colores aleatorios para las pelotas
function randomColor(colorNum){
    switch(colorNum){
        case 1:
            color = "lightblue";  // Azul 
            break;
        case 2:
            color = "lightgoldenrodyellow";  // Rojo 
            break;
        case 3:
            color = "lightgreen";  // Verde 
            break;
        case 4:
            color = "lightpink";  // Amarillo 
            break;
        }

    return color;
}


jugar.addEventListener("click", function(){

    if(modo == "todas"){
        let contadorPuntos = document.getElementById("contador");
        contadorPuntos.innerHTML = "";
        
    }

    if(modo == "color"){
        let contadorPuntos = document.getElementById("contador");
        infObjetivo = document.createElement("p");
        infObjetivo.textContent = toString(color);
        infObjetivo.color = color;
        contadorPuntos.appendChild(infObjetivo);
        
    }

    let objetivo = getColorPrincipal();

    let areaJuego = document.getElementById("area_juego");

    areaJuego.innerHTML="";

    for(let i=0;i<valorSelect;i++){

        let {size, altura, horizontal, colorNum } = randoms();
        
        let color = randomColor(colorNum);

        let circulo = document.createElement("div");

        //Se asignan
        circulo.style.backgroundColor = color;
        circulo.style.padding = size + "px";
        circulo.style.width = "0px";
        circulo.style.height = "0px";
        circulo.style.borderRadius = "5000px";
        circulo.style.position = "absolute";
        circulo.style.left = horizontal + "px";
        circulo.style.top = altura + "px";
        circulo.style.border = "1px solid black";
        
        areaJuego.appendChild(circulo);

        if(modo == "todas"){
        
            //Sumamos al contador indicado
            circulo.addEventListener("click", function(){
            
                contador++;
                correctas.textContent = getColorPrincipal();
            
                circulo.remove();
                
            })
        }else if(modo == "color"){

            if(circulo.color == objetivo){
                circulo.style.zIndex = 1;
            }

            circulo.addEventListener("click", function(){

                if(circulo.style.backgroundColor == objetivo){
                    contador++;
                    correctas.textContent = contador;
                }else{
                    contador2++;
                    incorrectas.textContent = contador2;
                }

                circulo.remove();

            })


        }

        
    }

    
    
})
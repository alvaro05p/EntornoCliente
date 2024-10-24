let jugar = document.getElementById("jugar");
let selectPelotas = document.getElementById("numPelotas");
let valorSelect;
let correctas = document.getElementById("correctas");
let incorrectas = document.getElementById("incorrectas");
let contador = 0;
let contador2 = 0;

let minsElem = document.getElementById("mins");
let secsElem = document.getElementById("secs");
let millisecsElem = document.getElementById("millisecs");
let interval; // Intervalo del cronómetro
let startTime; // Para calcular el tiempo transcurrido

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

function finPartida(areaJuego){
    areaJuego.innerHTML = "";
    let containerReload = document.createElement("div");
    let victoria = document.createElement("h1");
    victoria.classList.add("victoria");
    victoria.textContent = "Well done!";
    areaJuego.appendChild(victoria);
    clearInterval(interval);

    let reiniciar = document.createElement("button");
    reiniciar.classList.add("reiniciar");
    reiniciar.textContent = "Reiniciar";
    reiniciar.addEventListener("click", function(){
        location.reload();
    })

    containerReload.appendChild(reiniciar);
    containerReload.appendChild(victoria);
    containerReload.classList.add("reiniciar");
    areaJuego.appendChild(containerReload);

}

function startCronometro() {
    //Guardamos el tiempo de inicio del cronometro
    startTime = Date.now();
    interval = setInterval(function() {
        let elapsedTime = Date.now() - startTime;

        let minutes = Math.floor(elapsedTime / (1000 * 60));
        let seconds = Math.floor((elapsedTime % (1000 * 60)) / 1000);
        let milliseconds = Math.floor(elapsedTime % 1000);

        //El método padStart sirver para meter ceros delante del número si es necesario, para que siempre mantenga el formato
        minsElem.textContent = String(minutes).padStart(2, '0');
        secsElem.textContent = String(seconds).padStart(2, '0');
        millisecsElem.textContent = String(milliseconds).padStart(3, '0');

        //Se actuliza cada 10 ms

    }, 10); 
}

jugar.addEventListener("click", function(){

    if(modo == "todas"){
        let contadorPuntos = document.getElementById("contador");
        contadorPuntos.innerHTML = "";
    }

    let objetivo = getColorPrincipal();

    if(modo == "color"){
        let contadorPuntos = document.getElementById("contador");
        let infObjetivo = document.createElement("p");
        let color=objetivo;
        infObjetivo.textContent = color;
        infObjetivo.style.color = color;
        infObjetivo.style.marginLeft = "10px";
        contadorPuntos.appendChild(infObjetivo);
    }

    startCronometro();

    let areaJuego = document.getElementById("area_juego");

    areaJuego.innerHTML="";

    let totalPelotas = valorSelect * 8;

    if (modo === "todas") {
        totalPelotas = valorSelect; // En este modo, no necesitas multiplicar por 8
    }

    for(let i=0;i<totalPelotas;i++){

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
        if (color === objetivo) {
            circulo.style.zIndex = "10"; 
        } else {
            circulo.style.zIndex = "1"; 
        }

        areaJuego.appendChild(circulo);

        if(modo == "todas"){
        
            //Sumamos al contador indicado
            circulo.addEventListener("click", function(){
            
                contador++;
                circulo.remove();

                console.log(correctas);
                if(contador == valorSelect){
                    finPartida(areaJuego);
                }
                
            })

            

        }else if(modo == "color"){

            circulo.addEventListener("click", function(){

                if(circulo.style.backgroundColor == objetivo){
                    contador++;
                    correctas.textContent = contador;
                }else{
                    contador2++;
                    incorrectas.textContent = contador2;
                }

                circulo.remove();

                console.log(correctas);
                if(contador == valorSelect){
                    finPartida(areaJuego);
                }

            })

        }

        
    }

    


})
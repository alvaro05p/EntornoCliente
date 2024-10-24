let jugar = document.getElementById("jugar");
let selectPelotas = document.getElementById("numPelotas");
let valorSelect;
let correctas = document.getElementById("correctas");
let incorrectas = document.getElementById("incorrectas");
let contador = 0;
let contador2 = 0;

selectPelotas.addEventListener("change", function(){

    valorSelect = parseInt(selectPelotas.value);

})

jugar.addEventListener("click", function(){

    let areaJuego = document.getElementById("area_juego");

    areaJuego.innerHTML="";

    for(let i=0;i<valorSelect;i++){
        
        let size = (Math.random() * 50) + 10;
        let altura = Math.random() * 435;
        let horizontal = Math.random() * 1100;
        let colorNum = Math.floor((Math.random() * 2) + 1);
        let color="";
        let index="";
        console.log(colorNum);

        switch(colorNum){
            case 1:
                color = "blue";
                index = "1";
                break;
            case 2:
                color = "red";
                break;
        }

        let circulo = document.createElement("div");

        console.log(color);

        circulo.style.backgroundColor = color;
        circulo.style.padding = size + "px";
        circulo.style.width = "0px";
        circulo.style.height = "0px";
        circulo.style.borderRadius = "5000px";
        circulo.style.position = "absolute";
        circulo.style.left = horizontal + "px";
        circulo.style.top = altura + "px";
        circulo.style.zIndex = index;
        areaJuego.appendChild(circulo);

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
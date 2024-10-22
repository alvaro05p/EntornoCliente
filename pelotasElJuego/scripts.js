let jugar = document.getElementById("jugar");
let selectPelotas = document.getElementById("numPelotas");
let valorSelect;

selectPelotas.addEventListener("change", function(){

    valorSelect = parseInt(selectPelotas.value);

})

jugar.addEventListener("click", function(){

    let areaJuego = document.getElementById("area_juego");

    areaJuego.innerHTML="";

    for(let i=0;i<valorSelect;i++){
        
        let size = (Math.random() * 50) + 10;
        let altura = Math.random() * 500;
        let horizontal = Math.random() * 1100;
        let colorNum = Math.floor((Math.random() * 2) + 1);
        let color;
        console.log(colorNum);

        switch(colorNum){
            case 1:
                color = "blue";
            case 2:
                color = "red";
        }

        let circulo = document.createElement("div");

        circulo.style.backgroundColor = color;
        circulo.style.padding = size + "px";
        circulo.style.width = "0px";
        circulo.style.height = "0px";
        circulo.style.borderRadius = "5000px";
        circulo.style.position = "absolute";
        circulo.style.left = horizontal + "px";
        circulo.style.top = altura + "px";
        areaJuego.appendChild(circulo);
    }
    
    

})
let nInicial = document.getElementById("nInicial")
let columnaIzquierda = document.getElementById("columnaIzquierda")
let columnaDerecha = document.getElementById("columnaDerecha")
let cantidad = document.getElementById("cantidad")
let primero
let nClickado = document.getElementById("clicks")

nInicial.addEventListener("blur", function() {
    
    numero = nInicial.value

    primero = parseInt(numero)

});

cantidad.addEventListener("blur", function() {
    
    columnaIzquierda.innerHTML = ""
    columnaDerecha.innerHTML = ""
    primero = numero


    let cantNum = parseInt(cantidad.value)
    let contador = 0
    let anterior = 1

    while(contador < cantNum){

        if(esFeliz(primero.toString())){

            let nuevo = document.createElement("h2");

            let guardar = primero

            let resta = primero - anterior

            let nuevo2 = document.createElement("h2");

            nuevo2.addEventListener("click", function() {
                clicks.textContent=resta
                nuevo2.className = "numeroAmarillo"
            })

            nuevo2.addEventListener("blur", function() {
                
                nuevo2.className.remove = "numeroAmarillo"
            })

        
            nuevo2.textContent = resta

            columnaDerecha.appendChild(nuevo2)

            nuevo.addEventListener("click", function() {

                clicks.textContent=guardar
                nuevo.className = "numeroAmarillo"

            })

            nuevo.addEventListener("blur", function() {

                nuevo.className.remove = "numeroAmarillo"

            })

            nuevo.textContent = primero;

            anterior = primero

            columnaIzquierda.appendChild(nuevo)

           

            contador++
            
        }

        primero++
        
        
    }

});

function esFeliz(numero){

    let resultado
    let potencias = []  
    let arrayNumeros = numero.split("")
    let contador=0
    let detector
    
    while(contador < 8){
    
        resultado = 0
        potencias = []

        //Pasamos el array de strings a un array de numeros
        for(let i=0;i<arrayNumeros.length;i++){
            arrayNumeros[i]=parseInt(arrayNumeros[i])
        }

        //Elevamos a 2 cada uno de los numeros de array y lo sumamos
        for(let i=0;i<arrayNumeros.length;i++){
            potencias[i] = Math.pow(arrayNumeros[i], 2)
            resultado += potencias[i]
        }

        numero = resultado.toString()
        if(numero === "1"){
            return true

        }
        arrayNumeros = numero.split("")

        contador++

    }


    return false
    
}


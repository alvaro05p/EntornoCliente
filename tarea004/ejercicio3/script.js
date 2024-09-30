const boton = document.getElementById("boton")

const nombre = document.getElementById("nombre")
const email = document.getElementById("email")
const dni = document.getElementById("dni")
const respuesta = document.getElementById("respuesta")
const lista1 = document.getElementById("lista1")
const lista2 = document.getElementById("lista2")
const select = document.getElementById("select")

boton.addEventListener('click', function(event){

    //Prevent default para que no se recargue la pagina
    event.preventDefault()

    let nombreValor = nombre.value

    let emailValor = email.value

    let dniValor = dni.value

    let selectValor = select.value

    var parrafo = document.createElement("p")

    var texto = document.createTextNode(nombreValor + " con DNI " + dniValor + " e EMAIL " + emailValor)

    parrafo.appendChild(texto)

    if(selectValor == "lista1"){

        lista1.appendChild(parrafo)

    }else{

        lista2.appendChild(parrafo)

    }

})


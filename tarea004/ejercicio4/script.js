const boton = document.getElementById("boton")
const nombre = document.getElementById("nombre")
const email = document.getElementById("email")
const dni = document.getElementById("dni")
const respuesta = document.getElementById("respuesta")
const lista1 = document.getElementById("lista1")
const lista2 = document.getElementById("lista2")
const lista3 = document.getElementById("lista3")
const lista4 = document.getElementById("lista4")
const select = document.getElementById("select")
let guardarTexto

boton.addEventListener("click", meterEnLista)

function meterEnLista(event){

    //Prevent default para que no se recargue la pagina
    event.preventDefault()

    let nombreValor = nombre.value

    let emailValor = email.value

    let dniValor = dni.value

    let selectValor = select.value

    var parrafo = document.createElement("p")

    parrafo.addEventListener("dblclick", () => mover(parrafo))

    var texto = document.createTextNode(nombreValor + " con DNI " + dniValor + " e EMAIL " + emailValor)

    parrafo.appendChild(texto)

    switch(selectValor){

        case "lista1":
            lista1.appendChild(parrafo)
            break
        case "lista2":
            lista2.appendChild(parrafo)
            break
        case "lista3":
            lista3.appendChild(parrafo)
            break
        case "lista4":
            lista4.appendChild(parrafo)
            break

    }

}

function mover(parrafo){

    let selectValor = select.value

    switch(selectValor){

        case "lista1":
            lista1.appendChild(parrafo)
            break
        case "lista2":
            lista2.appendChild(parrafo)
            break
        case "lista3":
            lista3.appendChild(parrafo)
            break
        case "lista4":
            lista4.appendChild(parrafo)
            break

    }
}

   













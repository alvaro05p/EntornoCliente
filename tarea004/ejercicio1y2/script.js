const boton = document.getElementById("boton")

const nombre = document.getElementById("nombre")
const email = document.getElementById("email")
const dni = document.getElementById("dni")
const respuesta = document.getElementById("respuesta")


boton.addEventListener('click', function(event){

    //Prevent default para que no se recargue la pagina
    event.preventDefault()

    let nombreValor = nombre.value

    let emailValor = email.value

    let dniValor = dni.value

    var parrafo = document.createElement("p")

    var texto = document.createTextNode(nombreValor + " con DNI " + dniValor + " e EMAIL " + emailValor)

    parrafo.appendChild(texto)

    respuesta.appendChild(parrafo)



})

boton.addEventListener('dblclick', function(event){

    let nombreValor = nombre.value

    let emailValor = email.value

    let dniValor = dni.value

    //Por cada elemento del div cambiamos su valor al ultimo

    respuesta.childNodes.forEach(element => {

        element.textContent = nombreValor + " con DNI " + dniValor + " e EMAIL " + emailValor

    });

})


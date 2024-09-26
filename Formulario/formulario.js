function comprobarDni(dni){

    let numeroStr = dni.slice(0,8)
    let letra = dni[8]
    let numero = parseFloat(numeroStr)

    let division = parseFloat(numero)%23
    let divisionStr = division.toString()
    let divididoStr = divisionStr.split(",")
    let dividido = parseFloat(divididoStr[0])

    let letras = ["T","R","W","A","G","M","Y","F","P","D","X","B","N","J","Z","S","Q","V","H","L","C","K","E"];

    if(letras[dividido] === letra){
        return true
    }else{
        return false
    }

}

function comprobarCorreo(correo){

    let mailCorrecto = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;

    if(mailCorrecto.test(correo)){
        return true
    }else{
        return false
    }
}

function comprobarTlf(tlf) {

    let tlfCorrecto = /^\+34 6\d{8}$/;
    
    if(tlfCorrecto.test(tlf)){
        return true
    }else{
        return false
    }
    
}

function comprobarIP(ip){
    let ipCorrecta =  /^(25[0-5]|2[0-4]\d|1\d\d|\d\d?)\.(25[0-5]|2[0-4]\d|1\d\d|\d\d?)\.(25[0-5]|2[0-4]\d|1\d\d|\d\d?)\.(25[0-5]|2[0-4]\d|1\d\d|\d\d?)$/
    if(ipCorrecta.test(ip)){
        return true
    }else{
        return false
    }
}

function comprobarUrl(url){

    let urlCorrecta = /^(https?:\/\/)?([\w-]+\.)+[a-zA-Z]{2,}(\/[\w- ;,./?%&=]*)?$/

    if(urlCorrecta.test(url)){
        return true
    }else{
        return false
    }
}

function comprobarPassword(pass1, pass2){
    if(pass1 === pass2){
        let passCorrecta = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])([A-Za-z\d$@$!%*?&]|[^ ]){8,15}$/

        if(passCorrecta.test(pass1)){
            return true
        }else{
            return false
        }

    }else{
        return false
    }
}

let emailInput = document.getElementById("email")
let dniInput = document.getElementById("dni")
let ipInput = document.getElementById("ip")
let passInput = document.getElementById("password")
let repassInput = document.getElementById("repassword")

emailInput.addEventListener("blur", function() {
    
    let correo = emailInput.value
    if(!comprobarCorreo(correo)){
        alerta(correo, emailInput)
    }else{
        resetear(emailInput)
    }

});

dniInput.addEventListener("blur", function() {
    
    let dni = dniInput.value
    if(!comprobarDni(dni)){
        alerta(dni, dniInput)
    }else{
        resetear(dniInput)
    }

});

ipInput.addEventListener("blur", function() {
    
    let ip = ipInput.value
    if(!comprobarIP(ip)){
        alerta(ip, ipInput)
    }else{
        resetear(ipInput)
    }

});

repassInput.addEventListener("blur", function() {
    
    let password = passInput.value
    let repassword = repassInput.value

    if(!comprobarPassword(password,repassword)){
        alerta(password,passInput)
    }else{
        resetear(passInput)
    }

});

function resetear(input){

    const alertaExistente = document.getElementById("alerta");

    alertaExistente.remove();

    input.style.borderColor = ""
    
}

function alerta(elemento,input) {

    const alertaExistente = document.getElementById("alerta");

    if(elemento === ""){
        input.style.borderColor = ""
        alertaExistente.remove()
        return
    }

    if (alertaExistente) {
        alertaExistente.remove();
    }

    let alertas = document.getElementById("alertas")
    // Crear un nuevo elemento <h2> para la alerta
    const alerta = document.createElement("h2");

    // Añadir texto al nuevo elemento <h2>
    alerta.textContent = elemento + " no válido";

    // Añadir un id para poder identificarlo luego
    alerta.id = "alerta";

    alertas.appendChild(alerta)

    input.style.borderColor = "red"

}
/*
    Pon aquí las funciones que cambian la forma de los cuadrados a círculos.
*/

function circulo(elemento) {
    elemento.classList.toggle("circulo");
}
function sombra(elemento) {
    elemento.classList.toggle("sombra");
}
function sombraInt(elemento){
    elemento.classList.toggle("sombraInt");

}
function eliminar(elemento) {
    elemento.parentNode.remove();
    elemento.parentNode.remove();
    elemento.parentNode.remove();
}
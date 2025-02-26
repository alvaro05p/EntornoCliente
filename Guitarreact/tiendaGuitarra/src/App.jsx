import { useState, useEffect } from "react"
import Guitarra from "./components/Guitarra"
import  Header from "./components/Header"
import {db} from "./data/db"


function App() {
  
    const [data, setData] = useState(db);
    const [carrito, setCarrito] = useState([]);

    function anyadirAlCarrito(articulo){
        const articuloExiste = carrito.findIndex(element => articulo.id === element.id);
        if (articuloExiste >= 0){
            const copiaCarrito = [...carrito]
            copiaCarrito[articuloExiste].cantidad++;
            setCarrito(copiaCarrito)
        }else{
            articulo.cantidad = 1;
            setCarrito(carrito => [...carrito, articulo])
        }
    }

  return (
    <>
        <Header
            carrito = {carrito}/>
     

    <main className="container-xl mt-5">
        <h2 className="text-center">Nuestra Colección</h2>

        <div className="row mt-5">
            {data.map(element => (
                <Guitarra
                    key = {element.id}
                    guitarraObj = {element}
                    anyadirAlCarrito = {anyadirAlCarrito}
                />
                )
            )}
        </div>
    </main>


    <footer className="bg-dark mt-5 py-5">
        <div className="container-xl">
            <p className="text-white text-center fs-4 mt-4 m-md-0">GuitarLA - Todos los derechos Reservados</p>
        </div>
    </footer>
    </>
  )
}

export default App

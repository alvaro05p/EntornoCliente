import { useMemo } from 'react';

export default function Header({ carrito }) {

    const carritoVacio = useMemo(() => carrito.length === 0, [carrito]);
    const carritoTotal = useMemo(() => carrito.reduce((total, element) => total + (element.cantidad * element.price), 0), [carrito]);

    return (
        <>
            <header className="py-5 header">
                <div className="container-xl">
                    <div className="row justify-content-center justify-content-md-between">
                        <div className="col-8 col-md-3">
                            <a href="index.html">
                                <img className="img-fluid" src="/img/logo.svg" alt="imagen logo" />
                            </a>
                        </div>
                        <nav className="col-md-6 a mt-5 d-flex align-items-start justify-content-end">
                            <div className="carrito">
                                <img className="img-fluid" src="/img/carrito.png" alt="imagen carrito" />

                                <div id="carrito" className="bg-white p-3">
                                    {carritoVacio ? (
                                        <p className="text-center">El carrito está vacío</p>
                                    ) : (
                                        <>
                                            <table className="w-100 table">
                                                <thead>
                                                    <tr>
                                                        <th>Imagen</th>
                                                        <th>Nombre</th>
                                                        <th>Precio</th>
                                                        <th>Cantidad</th>
                                                        <th></th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {carrito.map(({ id, name, image, price, cantidad }) => (
                                                        <tr key={id}>
                                                            <td>
                                                                <img className="img-fluid" src={`/img/${image}.jpg`} alt={`Imagen de ${name}`} />
                                                            </td>
                                                            <td>{name}</td>
                                                            <td className="fw-bold">
                                                                {price}€
                                                            </td>
                                                            <td className="flex align-items-start gap-4">
                                                                <button type="button" className="btn btn-dark">-</button>
                                                                {cantidad}
                                                                <button type="button" className="btn btn-dark">+</button>
                                                            </td>
                                                            <td>
                                                                <button className="btn btn-danger" type="button">X</button>
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </>
                                    )}

                                    <p className="text-end">
                                        Total a pagar: <span className="fw-bold">{carritoTotal}€</span>
                                    </p>
                                    <button className="btn btn-dark w-100 mt-3 p-2">Vaciar Carrito</button>
                                </div>
                            </div>
                        </nav>
                    </div>
                </div>
            </header>
        </>
    );
}

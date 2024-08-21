export const NavBar = () => {
    const element = document.createElement('nav')
    element.innerHTML = `
        <nav class="navbar navbar-expand-lg bg-body-tertiary">
            <div class="container-fluid">
                <img src="/assets/img/logo.svg" alt="logo escuela cocina" class="img-fluid logo">
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                        <li class="nav-item">
                            <a class="nav-link active" aria-current="page" href="#"><i class="bi bi-house-fill"></i> Home</a>
                        </li>
                        <li class="nav-item dropdown">
                            <a class="nav-link dropdown-toggle active" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                <i class="bi bi-cart-check-fill"></i> Productos
                            </a>
                            <div class="dropdown-menu" id="carrito">
                                <table class="table table-striped table-hover w-100" id="lista-carrito">
                                    <thead>
                                        <th>Imagen</th>
                                        <th>Clase</th>
                                        <th>Precio</th>
                                        <th>Acciones</th>
                                    </thead>
                                    <tbody>
                                        
                                    </tbody>
                                    <tfoot>

                                    </tfoot>
                                </table>
                                <a href="#" id="vaciar-carrito" class="btn btn-sm btn-danger mx-2">Vaciar Carrito</a>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    `
    document.body.appendChild(element)
}
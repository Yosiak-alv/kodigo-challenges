export const Main = () => {
    const element = document.createElement('main')
    element.innerHTML = `
        <main class="container" id="lista-cursos">
        <h2 class="text-center mt-5 fw-bold fst-italic">Próximos Cursos</h2>
        <div class="text-center pt-3">
            <img src="/assets/img/separador.png" alt="separador" class="img-fluid">
        </div>

        <section class="row mt-5">
            <article class="col-md-4">
                <div class="card">
                    <img src="/assets/img/clase1.jpg" class="card-img-top" alt="clase 1">
                    <div class="card-body">
                        <h5 class="card-title">Comida Italiana para principiantes</h5>
                        <p class="card-text">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Consequuntur atque impedit quaerat provident non quae porro, exercitationem eius ducimus consectetur?</p>
                        <p class="precio fw-bold">$300</p>
                        <button class="btn btn-primary w-100 button-carrito" data-id="1"><i class="bi bi-bag-plus-fill"></i> Agregar al carrito</button>
                    </div>
                </div>
            </article>

            <article class="col-md-4">
                <div class="card">
                    <img src="/assets/img/clase2.jpg" class="card-img-top" alt="clase 2">
                    <div class="card-body">
                        <h5 class="card-title">Planeación de Menús para bodas</h5>
                        <p class="card-text">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Consequuntur atque impedit quaerat provident non quae porro, exercitationem eius ducimus consectetur?</p>
                        <p class="precio fw-bold">$450</p>
                        <button class="btn btn-primary w-100 button-carrito" data-id="2"><i class="bi bi-bag-plus-fill"></i> Agregar al carrito</button>
                    </div>
                </div>
            </article>

            <article class="col-md-4">
                <div class="card">
                    <img src="/assets/img/clase3.jpg" class="card-img-top" alt="clase 1">
                    <div class="card-body">
                        <h5 class="card-title">Preparación de Pasteles</h5>
                        <p class="card-text">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Consequuntur atque impedit quaerat provident non quae porro, exercitationem eius ducimus consectetur?</p>
                        <p class="precio fw-bold">$200</p>
                        <button class="btn btn-primary w-100 button-carrito" data-id="3"><i class="bi bi-bag-plus-fill"></i> Agregar al carrito</button>
                    </div>
                </div>
            </article>
        </section>

        <section class="row mt-5">
            <article class="col-md-4">
                <div class="card">
                    <img src="/assets/img/clase4.jpg" class="card-img-top" alt="clase 4">
                    <div class="card-body">
                        <h5 class="card-title">Comida Mexicana</h5>
                        <p class="card-text">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Consequuntur atque impedit quaerat provident non quae porro, exercitationem eius ducimus consectetur?</p>
                        <p class="precio fw-bold">$280</p>
                        <button class="btn btn-primary w-100 button-carrito" data-id="4"><i class="bi bi-bag-plus-fill"></i> Agregar al carrito</button>
                    </div>
                </div>
            </article>

            <article class="col-md-4">
                <div class="card">
                    <img src="/assets/img/clase5.jpg" class="card-img-top" alt="clase 5">
                    <div class="card-body">
                        <h5 class="card-title">Comida de Marruecos</h5>
                        <p class="card-text">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Consequuntur atque impedit quaerat provident non quae porro, exercitationem eius ducimus consectetur?</p>
                        <p class="precio fw-bold">$320</p>
                        <button class="btn btn-primary w-100 button-carrito" data-id="5"><i class="bi bi-bag-plus-fill"></i> Agregar al carrito</button>
                    </div>
                </div>
            </article>

            <article class="col-md-4">
                <div class="card">
                    <img src="/assets/img/clase6.jpg" class="card-img-top" alt="clase 6">
                    <div class="card-body">
                        <h5 class="card-title">Prepara 10 tipos de ensaladas</h5>
                        <p class="card-text">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Consequuntur atque impedit quaerat provident non quae porro, exercitationem eius ducimus consectetur?</p>
                        <p class="precio fw-bold">$100</p>
                        <button class="btn btn-primary w-100 button-carrito" data-id="6"><i class="bi bi-bag-plus-fill"></i> Agregar al carrito</button>
                    </div>
                </div>
            </article>
        </section>
    </main>
    `
    document.body.appendChild(element)
}
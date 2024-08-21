export const Footer = () => {
    const element = document.createElement('footer')
    element.innerHTML = `
        <footer class="mt-5 container d-flex justify-content-between">
            <section>
                <!---->
            </section>
            <section>
                <h2 class="fw-light">Todo los derechos reservados</h2>
            </section>
        </footer>
    `;
    document.body.appendChild(element)
}
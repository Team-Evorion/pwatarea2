// Elementos del DOM
const imagen = document.getElementById('imagen-interactiva');
const titulo = document.getElementById('titulo-imagen');
const descripcion = document.getElementById('descripcion-imagen');
const badgeEstado = document.getElementById('badge-estado');
const contadorElemento = document.getElementById('contador-hover');
const btnReiniciar = document.getElementById('btn-reiniciar');

// Datos de las dos imágenes para gestionar el estado
const datosImagenes = {
    original: {
        src: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&auto=format&fit=crop&q=80",
        alt: "Hardware de computadora",
        titulo: "Arquitectura de Hardware",
        descripcion: "Pasa el cursor sobre la fotografía para visualizar el entorno de desarrollo en acción.",
        estado: "Estado: Imagen Original"
    },
    secundaria: {
        src: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&auto=format&fit=crop&q=80",
        alt: "Código de programación en pantalla",
        titulo: "Desarrollo de Software",
        descripcion: "¡Imagen actualizada! El evento de JavaScript y la transición CSS están activos.",
        estado: "Estado: Vista Interactiva Activa"
    }
};

let contadorInteracciones = 0;

// Función para cambiar a la segunda imagen cuando entra el ratón
function activarCambioImagen() {
    imagen.style.opacity = '0.6';

    setTimeout(() => {
        imagen.src = datosImagenes.secundaria.src;
        imagen.alt = datosImagenes.secundaria.alt;
        imagen.classList.add('efecto-hover');
        imagen.style.opacity = '1';

        titulo.textContent = datosImagenes.secundaria.titulo;
        descripcion.textContent = datosImagenes.secundaria.descripcion;
        badgeEstado.textContent = datosImagenes.secundaria.estado;
        badgeEstado.classList.add('activo');

        contadorInteracciones++;
        contadorElemento.textContent = contadorInteracciones;
    }, 120);
}

// Función para restaurar la imagen original cuando sale el ratón
function restaurarImagenOriginal() {
    imagen.style.opacity = '0.6';

    setTimeout(() => {
        imagen.src = datosImagenes.original.src;
        imagen.alt = datosImagenes.original.alt;
        imagen.classList.remove('efecto-hover');
        imagen.style.opacity = '1';

        titulo.textContent = datosImagenes.original.titulo;
        descripcion.textContent = datosImagenes.original.descripcion;
        badgeEstado.textContent = datosImagenes.original.estado;
        badgeEstado.classList.remove('activo');
    }, 300);
}

// Función para reiniciar el contador
function reiniciarContador() {
    contadorInteracciones = 0;
    contadorElemento.textContent = contadorInteracciones;
    restaurarImagenOriginal();
}

// Asignación de eventos
imagen.addEventListener('mouseenter', activarCambioImagen);
imagen.addEventListener('mouseleave', restaurarImagenOriginal);
btnReiniciar.addEventListener('click', reiniciarContador);
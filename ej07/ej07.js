
const btnProductos = document.getElementById("btn-productos");
const submenuProductos = document.getElementById("submenu-productos");
const btnServicios = document.getElementById("btn-servicios");
const submenuServicios = document.getElementById("submenu-servicios");

const btnNosotros = document.getElementById("btn-nosotros");
const submenuNosotros = document.getElementById("submenu-nosotros");
function cerrarSubmenu(submenu, boton) {
    submenu.classList.remove("activo");
    boton.setAttribute("aria-expanded", "false");
}

function alternarSubmenu(submenu, boton) {
    submenu.classList.toggle("activo");
    boton.setAttribute("aria-expanded", submenu.classList.contains("activo"));
}

btnProductos.addEventListener("click", function() {
    console.log("Se hizo clic en Productos");

    cerrarSubmenu(submenuServicios, btnServicios);
    cerrarSubmenu(submenuNosotros, btnNosotros);
    alternarSubmenu(submenuProductos, btnProductos);
});


btnServicios.addEventListener("click", function(){
    console.log("Se hizo click en Servicios");

    cerrarSubmenu(submenuNosotros, btnNosotros);
    cerrarSubmenu(submenuProductos, btnProductos);
    alternarSubmenu(submenuServicios, btnServicios);
})


btnNosotros.addEventListener("click", function(){
    console.log("Se hizo clic en Nosotros");

    cerrarSubmenu(submenuProductos, btnProductos);
    cerrarSubmenu(submenuServicios, btnServicios);
    alternarSubmenu(submenuNosotros, btnNosotros);
})

document.addEventListener("click", function(evento) {
    const menu = document.querySelector("nav");

    if (!menu.contains(evento.target)) {
        cerrarSubmenu(submenuProductos, btnProductos);
        cerrarSubmenu(submenuServicios, btnServicios);
        cerrarSubmenu(submenuNosotros, btnNosotros);
    }
});

document.addEventListener("keydown", function(evento) {
    if (evento.key === "Escape") {

        if (submenuProductos.classList.contains("activo")) {
            btnProductos.focus();
        }

        if (submenuServicios.classList.contains("activo")) {
            btnServicios.focus();
        }

        if (submenuNosotros.classList.contains("activo")) {
            btnNosotros.focus();
        }

        cerrarSubmenu(submenuProductos, btnProductos);
        cerrarSubmenu(submenuServicios, btnServicios);
        cerrarSubmenu(submenuNosotros, btnNosotros);
    }
});

const tituloContenido = document.getElementById("titulo-contenido");
const descripcionContenido = document.getElementById("descripcion-contenido");

const informacion = {
    "Computadoras": "Explora nuestras computadoras para estudiar, trabajar y desarrollar proyectos.",
    "Teléfonos": "Conoce diferentes teléfonos inteligentes y sus características.",
    "Accesorios": "Encuentra teclados, mouse, audífonos y otros accesorios tecnológicos.",
    "Reparaciones": "Ofrecemos soluciones para problemas de hardware y software.",
    "Mantenimiento": "Realizamos mantenimiento preventivo para mejorar el rendimiento de tus equipos.",
    "Soporte Técnico": "Brindamos asistencia para resolver problemas tecnológicos.",
    "Quiénes somos": "Somos un equipo interesado en ofrecer productos y servicios tecnológicos.",
    "Misión": "Nuestra misión es brindar soluciones tecnológicas accesibles y confiables.",
    "Contacto": "Puedes comunicarte con nosotros para recibir más información."
};

const enlacesSubmenu = document.querySelectorAll(".submenu a");

enlacesSubmenu.forEach(function(enlace) {
    enlace.addEventListener("click", function(evento) {
        evento.preventDefault();

        const opcion = enlace.textContent.trim();

        tituloContenido.textContent = opcion;
        descripcionContenido.textContent = informacion[opcion];

        cerrarSubmenu(submenuProductos, btnProductos);
        cerrarSubmenu(submenuServicios, btnServicios);
        cerrarSubmenu(submenuNosotros, btnNosotros);

        document.getElementById("contenido").focus();
    });
});

const btnInicio = document.getElementById("btn-inicio");

btnInicio.addEventListener("click", function() {
    tituloContenido.textContent = "Bienvenido";

    descripcionContenido.textContent =
        "Selecciona una opción del menú para conocer más información.";
});
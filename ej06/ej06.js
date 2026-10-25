const formulario = document.getElementById("form-tarea");
const entradaTarea = document.getElementById("entrada-tarea");
const listaTareas = document.getElementById("lista-tareas");
const mensajeVacio = document.getElementById("mensaje-vacio");
const contador = document.getElementById("contador");

formulario.addEventListener("submit", function (evento) {
    evento.preventDefault();

    const texto = entradaTarea.value.trim();

    if (texto === "") {
        entradaTarea.focus();
        return;
    }

    crearTarea(texto);
    entradaTarea.value = "";
    entradaTarea.focus();
    actualizarInterfaz();
});

function crearTarea(texto) {
    const elemento = document.createElement("li");
    elemento.className = "task-item";

    const nombre = document.createElement("span");
    nombre.className = "task-item__text";
    nombre.textContent = texto;

    const botonEliminar = document.createElement("button");
    botonEliminar.className = "task-delete";
    botonEliminar.type = "button";
    botonEliminar.textContent = "Eliminar";
    botonEliminar.setAttribute("aria-label", `Eliminar tarea: ${texto}`);

    botonEliminar.addEventListener("click", function () {
        elemento.classList.add("is-removing");
        const finalizar = () => {
            elemento.remove();
            actualizarInterfaz();
        };
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
            finalizar();
        } else {
            setTimeout(finalizar, 220);
        }
    });

    elemento.append(nombre, botonEliminar);
    listaTareas.appendChild(elemento);
}

function actualizarInterfaz() {
    const cantidad = listaTareas.children.length;
    mensajeVacio.hidden = cantidad !== 0;
    contador.textContent = cantidad === 1 ? "1 tarea" : `${cantidad} tareas`;
}

actualizarInterfaz();

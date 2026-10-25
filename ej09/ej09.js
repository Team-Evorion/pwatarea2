const entradaDuracion = document.getElementById("duracion");
const reloj = document.getElementById("reloj");
const estado = document.getElementById("estado");
const botonIniciar = document.getElementById("boton-iniciar");
const botonPausa = document.getElementById("boton-pausa");
const botonReiniciar = document.getElementById("boton-reiniciar");

let tiempoRestante = 60;
let intervalo = null;
let instanteFinal = 0;
let modo = "listo"; // listo, activo, pausado, terminado

function formatearTiempo(total) {
    const minutos = Math.floor(total / 60);
    const segundos = total % 60;
    return `${String(minutos).padStart(2, "0")}:${String(segundos).padStart(2, "0")}`;
}

function mostrarTiempo() {
    reloj.textContent = formatearTiempo(tiempoRestante);
}

function leerDuracion() {
    const valor = Number(entradaDuracion.value);
    if (!Number.isInteger(valor) || valor < 1 || valor > 86400) {
        estado.textContent = "Ingresa un número entero entre 1 y 86400.";
        entradaDuracion.focus();
        return false;
    }
    tiempoRestante = valor;
    mostrarTiempo();
    return true;
}

function actualizarBotones() {
    botonIniciar.disabled =
        modo === "activo" || modo === "pausado";

    botonPausa.disabled =
        modo !== "activo" && modo !== "pausado";

    botonPausa.textContent =
        modo === "pausado" ? "Continuar" : "Pausar";

    entradaDuracion.disabled = modo === "activo";

    reloj.classList.toggle(
        "clock--running", modo === "activo"
    );

    reloj.classList.toggle(
        "clock--finished", modo === "terminado"
    );
}

function detenerIntervalo() {
    if (intervalo !== null) {
        clearInterval(intervalo);
        intervalo = null;
    }
}

function actualizarCuenta() {
    if (modo !== "activo") return;
    tiempoRestante = Math.max(0, Math.ceil((instanteFinal - Date.now()) / 1000));
    mostrarTiempo();
    if (tiempoRestante === 0) {
        detenerIntervalo();
        modo = "terminado";
        estado.textContent = "¡Tiempo terminado!";
        actualizarBotones();
        alert("¡Tiempo terminado!");
    }
}

function comenzarCuenta() {
    instanteFinal = Date.now() + tiempoRestante * 1000;
    modo = "activo";
    estado.textContent = "Temporizador en marcha";
    detenerIntervalo();
    intervalo = setInterval(actualizarCuenta, 200);
    actualizarBotones();
}

function iniciarTemporizador() {
    if (modo === "activo" || modo === "pausado") return;
    if (!leerDuracion()) return;
    comenzarCuenta();
}

function pausarOContinuar() {
    if (modo === "activo") {
        // Guardar el tiempo restante antes de detener el intervalo.
        tiempoRestante = Math.max(0, Math.ceil((instanteFinal - Date.now()) / 1000));
        mostrarTiempo();
        detenerIntervalo();
        if (tiempoRestante === 0) {
            modo = "terminado";
            estado.textContent = "¡Tiempo terminado!";
        } else {
            modo = "pausado";
            estado.textContent = "En pausa. Puedes cambiar los segundos y continuar.";
        }
        actualizarBotones();
        } else if (modo === "pausado") {
            comenzarCuenta();
        }

}

function reiniciarTemporizador() {
    detenerIntervalo();
    modo = "listo";
    if (!leerDuracion()) {
        entradaDuracion.value = "60";
        tiempoRestante = 60;
        mostrarTiempo();
    }
    estado.textContent = "Listo para comenzar";
    actualizarBotones();
}

entradaDuracion.addEventListener("input", function () {
    if (modo === "activo") return;
    if (leerDuracion()) {
        estado.textContent = modo === "pausado"
            ? "Duración actualizada. Presiona Continuar."
            : "Listo para comenzar";
        if (modo === "terminado") modo = "listo";
    }
    actualizarBotones();
});

botonIniciar.addEventListener("click", iniciarTemporizador);
botonPausa.addEventListener("click", pausarOContinuar);
botonReiniciar.addEventListener("click", reiniciarTemporizador);
mostrarTiempo();
actualizarBotones();

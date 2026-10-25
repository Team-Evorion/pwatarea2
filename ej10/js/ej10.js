const preguntas = [
    {
        pregunta: "¿Qué lenguaje define la estructura y el contenido de una página web?",
        opciones: ["CSS", "HTML", "JavaScript", "Python"],
        correcta: 1
    },
    {
        pregunta: "¿Cuál de las siguientes opciones corresponde a un selector de clase en CSS?",
        opciones: ["#miId", ".miClase", "etiqueta", "@media"],
        correcta: 1
    },
    {
        pregunta: "¿Cómo se escribe una función en JavaScript?",
        opciones: ["funcion miFuncion()", "def miFuncion()", "function miFuncion()", "create miFuncion()"],
        correcta: 2
    }
];

let preguntaActual = 0;
let puntuacion = 0;

function cargarPregunta() {
    if (preguntaActual < preguntas.length) {
        const q = preguntas[preguntaActual];
        
        // Actualizar indicador y texto de la pregunta
        document.getElementById('indicadorPregunta').innerText = `Pregunta ${preguntaActual + 1} de ${preguntas.length}`;
        const progreso = (preguntaActual / preguntas.length) * 100;
        document.getElementById('barraProgreso').style.width = `${progreso}%`;
        document.getElementById('preguntaTexto').innerText = q.pregunta;
        
        const opcionesContainer = document.getElementById('opcionesContainer');
        opcionesContainer.innerHTML = "";

        // Generar los botones para cada opción
        q.opciones.forEach((opcion, index) => {
            const btn = document.createElement('button');
            btn.className = 'btn-opcion';
            btn.innerText = opcion;
            btn.onclick = () => seleccionarRespuesta(index);
            opcionesContainer.appendChild(btn);
        });
    } else {
        mostrarResultados();
    }
}

function seleccionarRespuesta(indiceSeleccionado) {
    const q = preguntas[preguntaActual];

    const botones = document.querySelectorAll('.btn-opcion');

    botones.forEach((boton, index) => {
        boton.disabled = true;

        if (index === q.correcta) {
            boton.classList.add('respuesta-correcta');
        } else if (index === indiceSeleccionado) {
            boton.classList.add('respuesta-incorrecta');
        }
    });

    if (indiceSeleccionado === q.correcta) {
        puntuacion++;
    }

    if (preguntaActual === preguntas.length - 1) {
        document.getElementById('barraProgreso').style.width = '100%';
    }

    setTimeout(() => {
        preguntaActual++;
        cargarPregunta();
    }, 1200);
}

function mostrarResultados() {
    const cajaQuiz = document.getElementById('cajaQuiz');
    cajaQuiz.innerHTML = `
        <h3>¡Juego Finalizado!</h3>
        <p>Tu puntuación final es:</p>
        <p style="font-size: 1.5rem; font-weight: bold; color: #38bdf8; margin: 15px 0;">${puntuacion} / ${preguntas.length}</p>
        <button class="btn-reiniciar" onclick="reiniciarJuego()">Volver a Jugar</button>
    `;
}

function reiniciarJuego() {
    preguntaActual = 0;
    puntuacion = 0;

    // Restaurar la estructura interna del cuestionario
    const cajaQuiz = document.getElementById('cajaQuiz');

    cajaQuiz.innerHTML = `
        <div id="indicadorPregunta" class="indicador">
            Pregunta 1 de ${preguntas.length}
        </div>

        <div class="progreso">
            <div id="barraProgreso" class="progreso-barra"></div>
        </div>

        <h3 id="preguntaTexto" class="pregunta">Cargando pregunta...</h3>
        <div id="opcionesContainer" class="opciones-grid"></div>
    `;

    cargarPregunta();
}

// Iniciar el juego al cargar la página
cargarPregunta();
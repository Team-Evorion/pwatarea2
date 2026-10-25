// Selección de elementos del DOM
const formulario = document.getElementById('formulario-registro');
const inputNombre = document.getElementById('nombre');
const inputCorreo = document.getElementById('correo');
const inputPassword = document.getElementById('password');

const errorNombre = document.getElementById('error-nombre');
const errorCorreo = document.getElementById('error-correo');
const errorPassword = document.getElementById('error-password');
const alertaGeneral = document.getElementById('alerta-general');
const btnLimpiar = document.getElementById('btn-limpiar');

// Función auxiliar para marcar error en un campo específico
function mostrarErrorCampo(input, elementoError, mensaje) {
    input.classList.add('campo-invalido');
    input.classList.remove('campo-valido');
    elementoError.textContent = mensaje;
}

// Función auxiliar para marcar un campo como válido
function marcarCampoValido(input, elementoError) {
    input.classList.remove('campo-invalido');
    input.classList.add('campo-valido');
    elementoError.textContent = '';
}

// Validación individual de cada campo
function validarCampos() {
    let formularioValido = true;
    const valorNombre = inputNombre.value.trim();
    const valorCorreo = inputCorreo.value.trim();
    const valorPassword = inputPassword.value.trim();

    // 1. Validar que el nombre no esté vacío
    if (valorNombre === '') {
        mostrarErrorCampo(inputNombre, errorNombre, 'El campo de nombre es obligatorio.');
        formularioValido = false;
    } else {
        marcarCampoValido(inputNombre, errorNombre);
    }

    // 2. Validar que el correo no esté vacío y tenga formato básico
    const regexCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (valorCorreo === '') {
        mostrarErrorCampo(inputCorreo, errorCorreo, 'El correo electrónico es obligatorio.');
        formularioValido = false;
    } else if (!regexCorreo.test(valorCorreo)) {
        mostrarErrorCampo(inputCorreo, errorCorreo, 'Ingresa un formato de correo válido.');
        formularioValido = false;
    } else {
        marcarCampoValido(inputCorreo, errorCorreo);
    }

    // 3. Validar que la contraseña no esté vacía
    if (valorPassword === '') {
        mostrarErrorCampo(inputPassword, errorPassword, 'Debes ingresar una contraseña.');
        formularioValido = false;
    } else if (valorPassword.length < 6) {
        mostrarErrorCampo(inputPassword, errorPassword, 'La contraseña debe tener al menos 6 caracteres.');
        formularioValido = false;
    } else {
        marcarCampoValido(inputPassword, errorPassword);
    }

    return formularioValido;
}

// Evento principal al enviar el formulario
formulario.addEventListener('submit', function(evento) {
    evento.preventDefault();

    const esValido = validarCampos();

    alertaGeneral.classList.remove('oculto', 'error', 'exito');

    if (!esValido) {
        alertaGeneral.textContent = 'Por favor, completa correctamente todos los campos antes de enviar.';
        alertaGeneral.classList.add('error');
        return;
    }

    alertaGeneral.textContent = `¡Registro exitoso! Bienvenido/a, ${inputNombre.value.trim()}.`;
    alertaGeneral.classList.add('exito');
    formulario.reset();

    // Quitamos los bordes verdes después de enviar
    [inputNombre, inputCorreo, inputPassword].forEach(input => {
        input.classList.remove('campo-valido');
    });
});

// Evento para el botón de limpiar formulario
btnLimpiar.addEventListener('click', function() {
    formulario.reset();
    alertaGeneral.classList.add('oculto');
    
    [inputNombre, inputCorreo, inputPassword].forEach(input => {
        input.classList.remove('campo-invalido', 'campo-valido');
    });
    
    errorNombre.textContent = '';
    errorCorreo.textContent = '';
    errorPassword.textContent = '';
});
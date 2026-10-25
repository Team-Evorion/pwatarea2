const texto = document.getElementById("texto-prueba");
const historial = [];
console.log(texto)

const botonColor = document.getElementById("btn-color");
let clicsColor = 0;
const colores = [
    "#ffb0a5",
    "#ff8574",
    "#fa624d",
    "#f0442e",
    "#a92718"
]
botonColor.addEventListener("click", function() {
    if (clicsColor < 5) {
    historial.push({
        color: texto.style.color,
        tamano: texto.style.fontSize,
        clicsColor: clicsColor,
        clicsTamano: clicsTamano
    });

        texto.style.color = colores[clicsColor];
        clicsColor++;
    }
});

const botonTamano = document.getElementById("btn-tamano");
let clicsTamano = 0;
const tamanos = [
    "18px",
    "21px",
    "24px",
    "27px",
    "30px"
]
botonTamano.addEventListener("click", function() {
    if (clicsTamano < 5) {
        historial.push({
            color: texto.style.color,
            tamano: texto.style.fontSize,
            clicsColor: clicsColor,
            clicsTamano: clicsTamano
        });

        texto.style.fontSize = tamanos[clicsTamano];
        clicsTamano++;
    }
});

const botonRestablecer = document.getElementById("btn-restablecer");

botonRestablecer.addEventListener("click", function(){
    historial.push({
        color: texto.style.color,
        tamano: texto.style.fontSize,
        clicsColor: clicsColor,
        clicsTamano: clicsTamano
    });
    texto.style.color = "";
    texto.style.fontSize = "";
    clicsColor = 0;
    clicsTamano = 0;
});

const botonDeshacer = document.getElementById("btn-deshacer");
botonDeshacer.addEventListener("click", function () {
    if (historial.length > 0) {
        const anterior = historial.pop();

        texto.style.color = anterior.color;
        texto.style.fontSize = anterior.tamano;

        clicsColor = anterior.clicsColor;
        clicsTamano = anterior.clicsTamano;
    }
    
})
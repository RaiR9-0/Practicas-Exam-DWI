const valorInput = document.getElementById('valor');
const origenSelect = document.getElementById('unidadOrigen');
const destinoSelect = document.getElementById('unidadDestino');
const formTemp = document.getElementById('formTemp');
const botonConvertir = document.getElementById('botonConvertir');
const resultado = document.getElementById('resultado');

const NOMBRES = { C: 'Celsius', F: 'Fahrenheit', K: 'Kelvin' };

function campoCompleto(valor) {
  return valor !== null && valor !== '';
}

function validarFormulario() {
  const completo = campoCompleto(valorInput.value) && campoCompleto(origenSelect.value) && campoCompleto(destinoSelect.value);
  botonConvertir.disabled = !completo;
}

function aCelsius(valor, unidad) {
  if (unidad === 'C') return valor;
  if (unidad === 'F') return (valor - 32) * 5 / 9;
  return valor - 273.15;
}

function desdeCelsius(valor, unidad) {
  if (unidad === 'C') return valor;
  if (unidad === 'F') return valor * 9 / 5 + 32;
  return valor + 273.15;
}

[valorInput, origenSelect, destinoSelect].forEach((campo) => {
  campo.addEventListener('input', validarFormulario);
});

formTemp.addEventListener('submit', (evento) => {
  evento.preventDefault();
  const valor = Number(valorInput.value);
  const celsius = aCelsius(valor, origenSelect.value);
  const convertido = desdeCelsius(celsius, destinoSelect.value);

  resultado.textContent = `${valor} ${NOMBRES[origenSelect.value]} es ${convertido.toFixed(2)} ${NOMBRES[destinoSelect.value]}`;
});

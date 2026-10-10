const diaSelect = document.getElementById('dia');
const mesSelect = document.getElementById('mes');
const anioSelect = document.getElementById('anio');
const formEdad = document.getElementById('formEdad');
const mensajeError = document.getElementById('mensajeError');
const resultado = document.getElementById('resultado');

const MESES = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

function llenarSelect(select, cantidad, inicio = 1) {
  for (let i = inicio; i < inicio + cantidad; i++) {
    const option = document.createElement('option');
    option.value = i;
    option.textContent = i;
    select.appendChild(option);
  }
}

for (let d = 1; d <= 31; d++) {
  const option = document.createElement('option');
  option.value = d;
  option.textContent = d;
  diaSelect.appendChild(option);
}

MESES.forEach((mes, i) => {
  const option = document.createElement('option');
  option.value = i + 1;
  option.textContent = mes;
  mesSelect.appendChild(option);
});

const anioActual = new Date().getFullYear();
for (let a = anioActual; a >= anioActual - 120; a--) {
  const option = document.createElement('option');
  option.value = a;
  option.textContent = a;
  anioSelect.appendChild(option);
}

formEdad.addEventListener('submit', (evento) => {
  evento.preventDefault();
  mensajeError.textContent = '';
  resultado.textContent = '';

  const dia = Number(diaSelect.value);
  const mes = Number(mesSelect.value);
  const anio = Number(anioSelect.value);

  const fechaNacimiento = new Date(anio, mes - 1, dia);
  const fechaValida = fechaNacimiento.getFullYear() === anio && fechaNacimiento.getMonth() === mes - 1 && fechaNacimiento.getDate() === dia;

  if (!fechaValida || fechaNacimiento > new Date()) {
    mensajeError.textContent = 'La fecha ingresada no es valida.';
    return;
  }

  const hoy = new Date();
  let anios = hoy.getFullYear() - fechaNacimiento.getFullYear();
  let meses = hoy.getMonth() - fechaNacimiento.getMonth();

  if (hoy.getDate() < fechaNacimiento.getDate()) {
    meses--;
  }
  if (meses < 0) {
    anios--;
    meses += 12;
  }

  resultado.textContent = `Tienes ${anios} años y ${meses} meses`;
});

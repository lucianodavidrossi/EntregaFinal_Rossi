document.addEventListener('DOMContentLoaded', function () {
    const usuario = {};
  
    const formulario = document.getElementById('formulario');
    const motivoPrestamoForm = document.getElementById('motivoPrestamoForm');
    const cantidadDineroForm = document.getElementById('cantidadDineroForm');
    const cantidadCuotasForm = document.getElementById('cantidadCuotasForm');
    const resultado = document.getElementById('resultado');
  
    const botonSiguiente = document.getElementById('botonSiguiente');
    const botonSiguiente2 = document.getElementById('botonSiguiente2');
    const botonSiguiente3 = document.getElementById('botonSiguiente3');
    const botonSiguiente4 = document.getElementById('botonSiguiente4');
  
    const motivosPrestamo = ["auto", "moto", "casa"];
  
    
    function transitionForms(hideForm, showForm) {
        hideForm.classList.add('animate__fadeOut');
        setTimeout(() => {
            hideForm.style.display = 'none';
            showForm.style.display = 'block';
            showForm.classList.remove('animate__fadeOut');
            showForm.classList.add('animate__fadeIn');
        }, 500);
    }
  
    botonSiguiente.addEventListener('click', function () {
        usuario.nombre_completo = document.getElementById('nombreCompleto').value || '';
        usuario.dni = parseInt(document.getElementById('dni').value) || '';
        usuario.edad = parseInt(document.getElementById('edad').value) || '';
  
        transitionForms(formulario, motivoPrestamoForm);
    });
  
    botonSiguiente2.addEventListener('click', function () {
        usuario.motivo_prestamo = document.getElementById('motivoPrestamo').value;
  
        transitionForms(motivoPrestamoForm, cantidadDineroForm);
    });
  
    botonSiguiente3.addEventListener('click', function () {
        usuario.cantidad_dinero = parseInt(document.getElementById('cantidadDinero').value);
  
        transitionForms(cantidadDineroForm, cantidadCuotasForm);
    });
  
    botonSiguiente4.addEventListener('click', function () {
        usuario.cantidad_cuotas = parseInt(document.getElementById('cantidadCuotas').value);
  
        transitionForms(cantidadCuotasForm, resultado);
        mostrarResultado();
    });
  
    function mostrarResultado() {
        calcularPrestamo()
          .then(cotizacion => {
              resultado.style.display = 'block';
              resultado.innerHTML = `${usuario.nombre_completo}, por tu préstamo para comprar tu ${usuario.motivo_prestamo}, vas a abonar ${usuario.cantidad_cuotas} cuotas de $${cotizacion.toFixed(2)}`;
          })
          .catch(error => {
              console.error('Error al calcular el préstamo:', error);
              resultado.innerHTML = 'Hubo un error al calcular el préstamo. Por favor, inténtalo nuevamente.';
          });
    }
  
    async function calcularPrestamo() {
        const recargoMotivo = await obtenerRecargoMotivo();
        const iva = 1.21;
        return (usuario.cantidad_dinero * recargoMotivo[usuario.motivo_prestamo]) / (usuario.cantidad_cuotas * iva);
    }
  
    function obtenerRecargoMotivo() {
        return fetch('JSON/recargo_motivo.json')
            .then(response => response.json())
            .catch(error => {
                console.error('Error al obtener los datos:', error);
                return { "auto": 0.5, "moto": 0.4, "casa": 0.9 };
            });
    }
  
   
    function agregarMotivo(motivo) {
        if (!motivosPrestamo.includes(motivo)) {
            motivosPrestamo.push(motivo);
            console.log(`Motivo ${motivo} agregado.`);
        } else {
            console.log(`El motivo ${motivo} ya existe.`);
        }
    }
  
    function mostrarMotivos() {
        console.log("Motivos de Préstamo Disponibles:");
        motivosPrestamo.forEach(motivo => {
            console.log(motivo);
        });
    }
  
    
    agregarMotivo("viaje");
    mostrarMotivos();
  });
  
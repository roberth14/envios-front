$(document).ready(function () {
    $('#tabla').DataTable();
});

// Escucha los eventos de clic en los botones de siguiente y anterior
const siguienteButtons = document.querySelectorAll(".siguiente");
const anteriorButtons = document.querySelectorAll(".anterior");

siguienteButtons.forEach((button) => {
    button.addEventListener("click", () => {
        let esValidoRemitente = validarRemitente();
       
        const pasoActual = button.parentElement;
        console.log(button.dataset.paso)
        if (esValidoRemitente && button.dataset.paso==2) {
            const siguientePaso = document.getElementById("paso-" + button.dataset.paso);

            pasoActual.style.display = "none";
            siguientePaso.style.display = "block";
        }else
        if ( button.dataset.paso==3) { 
            let esValidoDestinatario = validarDestinatario();

            if(esValidoDestinatario){
                const siguientePaso = document.getElementById("paso-" + button.dataset.paso);

                pasoActual.style.display = "none";
                siguientePaso.style.display = "block";
            }
        }
        
       

    });
});



anteriorButtons.forEach((button) => {
    button.addEventListener("click", () => {
        const pasoActual = button.parentElement;
        const anteriorPaso = document.getElementById("paso-" + button.dataset.paso);

        pasoActual.style.display = "none";
        anteriorPaso.style.display = "block";
    });
});

// Maneja el evento de envío del formulario
const enviarButton = document.querySelector(".enviar");
enviarButton.addEventListener("click", () => {
    if(validarInformacionAdicional() ){
        alert("REPORTE VALIDOO")
    }else{
        alert("Falta")
    }
    // Aquí puedes agregar la lógica para enviar el formulario o realizar las validaciones necesarias
    // Por ejemplo, puedes obtener los valores de los campos usando document.getElementById("campo-id").value
    // Y luego enviar los datos mediante una solicitud HTTP o realizar otras acciones necesarias
    // Puedes usar JavaScript o cualquier biblioteca/framework de tu elección para manejar esto.
});


// Función para validar si es un correo electrónico válido
function validarEmail(email) {
    // Expresión regular para validar el formato de correo electrónico
    var regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}
function validarRemitente() {
    let cedulaRemitente = document.getElementById('cedulaRemitente').value;
    let nombreRemitente = document.getElementById('nombreRemitente').value;
    let telefonoRemitente = document.getElementById('telefonoRemitente').value;
    let emailRemitente = document.getElementById('emailRemitente').value;
    let cumple = true
    // Validar cedulaRemitente
    if (!cedulaRemitente) {
        document.getElementById('cedulaRemitenteError').textContent = 'Campo inválido';
        cumple = false;
    } else {
        document.getElementById('cedulaRemitenteError').textContent = '';
    }

    // Validar nombreRemitente
    if (nombreRemitente == "") {
        document.getElementById('nombreRemitenteError').textContent = 'Campo inválido';
        cumple = false;
    } else {
        document.getElementById('nombreRemitenteError').textContent = '';
    }

    // Validar telefonoRemitente
    if (!telefonoRemitente) {
        document.getElementById('telefonoRemitenteError').textContent = 'Campo inválido';
        cumple = false;
    } else {
        document.getElementById('telefonoRemitenteError').textContent = '';
    }

    // Validar emailRemitente
    var esValidoEmail = validarEmail(emailRemitente);
    if (!emailRemitente || !esValidoEmail) {
        document.getElementById('emailRemitenteError').textContent = 'Campo inválido';
        cumple = false;
    } else {
        document.getElementById('emailRemitenteError').textContent = '';
    }



    // Si se cumplen todas las validaciones, retorna true
    return cumple;
}

function validarDestinatario() {
    let cedulaDestinatario = document.getElementById('cedulaDestinatario').value;
    let nombreDestinatario = document.getElementById('nombreDestinatario').value;
    let telefonoDestinatario = document.getElementById('telefonoDestinatario').value;
    let emailDestinatario = document.getElementById('emailDestinatario').value;
   let cumple=true;
    // Validar cedulaDestinatario
    if (!cedulaDestinatario) {
      document.getElementById('cedulaDestinatarioError').textContent = 'Campo inválido';
      cumple= false;
    } else {
      document.getElementById('cedulaDestinatarioError').textContent = '';
    }
  
    // Validar nombreDestinatario
    if (!nombreDestinatario) {
      document.getElementById('nombreDestinatarioError').textContent = 'Campo inválido';
      cumple= false;
    } else {
      document.getElementById('nombreDestinatarioError').textContent = '';
    }
  
    // Validar telefonoDestinatario
    if (!telefonoDestinatario) {
      document.getElementById('telefonoDestinatarioError').textContent = 'Campo inválido';
      cumple= false;
    } else {
      document.getElementById('telefonoDestinatarioError').textContent = '';
    }
  
    // Validar emailDestinatario
    var esValidoEmail = validarEmail(emailDestinatario);
    if (!emailDestinatario || !esValidoEmail) {
      document.getElementById('emailDestinatarioError').textContent = 'Campo inválido';
      cumple= false;
    } else {
      document.getElementById('emailDestinatarioError').textContent = '';
    }
  
   
  
    // Si se cumplen todas las validaciones, retorna true
    return cumple;
  }

  function validarInformacionAdicional() {
    // Obtener referencias a los campos y mensajes de error
    var longitudInput = document.getElementById("longitud");
    var longitudError = document.getElementById("longitudError");
    var anchoInput = document.getElementById("ancho");
    var anchoError = document.getElementById("anchoError");
    var alturaInput = document.getElementById("altura");
    var alturaError = document.getElementById("alturaError");
    var pesoInput = document.getElementById("peso");
    var pesoError = document.getElementById("pesoError");
    var direccionInput = document.getElementById("direccion");
    var direccionError = document.getElementById("direccionError");
    var descripcionInput = document.getElementById("descripcion");
    var descripcionError = document.getElementById("descripcionError");
    var tarifaInput = document.getElementById("tarifa");
    var tarifaError = document.getElementById("tarifaError");

    // Restablecer los mensajes de error
    longitudError.textContent = "";
    anchoError.textContent = "";
    alturaError.textContent = "";
    pesoError.textContent = "";
    direccionError.textContent = "";
    descripcionError.textContent = "";
    tarifaError.textContent = "";

    // Validar cada campo
    var valido = true;

    if (longitudInput.value.trim() === "") {
        longitudError.textContent = "Campo inválido";
        valido = false;
    }

    if (anchoInput.value.trim() === "") {
        anchoError.textContent = "Campo inválido";
        valido = false;
    }

    if (alturaInput.value.trim() === "") {
        alturaError.textContent = "Campo inválido";
        valido = false;
    }

    if (pesoInput.value.trim() === "") {
        pesoError.textContent = "Campo inválido";
        valido = false;
    }

    if (direccionInput.value.trim() === "") {
        direccionError.textContent = "Campo inválido";
        valido = false;
    }

    if (descripcionInput.value.trim() === "") {
        descripcionError.textContent = "Campo inválido";
        valido = false;
    }

   

    return valido;
}

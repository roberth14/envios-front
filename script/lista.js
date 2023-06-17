/**
 * Inicializa el plugin DataTable en el elemento con el id "tabla".
 */
$(document).ready(function () {
    $('#tabla').DataTable({
        responsive: true, // Agregar esta opción para hacer la tabla responsive
        language: {
            "sProcessing": "Procesando...",
            "sLengthMenu": "Mostrar _MENU_ registros",
            "sZeroRecords": "No se encontraron resultados",
            "sEmptyTable": "Ningún dato disponible en esta tabla",
            "sInfo": "Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros",
            "sInfoEmpty": "Mostrando registros del 0 al 0 de un total de 0 registros",
            "sInfoFiltered": "(filtrado de un total de _MAX_ registros)",
            "sInfoPostFix": "",
            "sSearch": "Buscar:",
            "sUrl": "",
            "sInfoThousands": ",",
            "sLoadingRecords": "Cargando...",
            "oPaginate": {
                "sFirst": '<i class="bi bi-chevron-double-left"></i>',
                "sLast": '<i class="bi bi-chevron-double-right"></i>',
                "sNext": '<i class="bi bi-chevron-right"></i>',
                "sPrevious": '<i class="bi bi-chevron-left"></i>'
            },
            "oAria": {
                "sSortAscending": ": Activar para ordenar la columna de manera ascendente",
                "sSortDescending": ": Activar para ordenar la columna de manera descendente"
            },
            "buttons": {
                "copy": '<i class="bi bi-files"></i> Copiar',
                "colvis": '<i class="bi bi-eye"></i> Visibilidad'
            }
        }
    });
});

/*
    REGISTRAR MENSAJERO
*/
try {
    const registrarMensajero = document.getElementById("registrarMensajero")
    registrarMensajero.addEventListener("click", () => {
        if (validarMensajero()) {
            let cedulaRemitente = document.getElementById('cedulaMensajero').value;
            let nombreRemitente = document.getElementById('nombreMensajero').value;
            let apellidoRemitente = document.getElementById('apellidoMensajero').value;
            let telefonoRemitente = document.getElementById('telefonoMensajero').value;
            let emailRemitente = document.getElementById('emailMensajero').value;
            const mensajero = {
                nombre: nombreRemitente,
                apellido: apellidoRemitente,
                telefono: telefonoRemitente,
                cedula: cedulaRemitente,
                email: emailRemitente,
                roles: []
            }
            console.log(mensajero)
            saveEmpleado(mensajero)
                .then(res => res.json())
                .then(data => {
                    verEmpleados()
                    var modal = document.getElementById('staticBackdrop');
                    var bootstrapModal = bootstrap.Modal.getInstance(modal);
                    bootstrapModal.hide();
                    Swal.fire(
                        'Completado',
                        'Mensajero  Registrado',
                        'success'
                    )
                })
                .catch(err => {
                    console.log(err)
                })
                .finally(final => {

                })

        }
    })
} catch (error) {

}

/**
 * Escucha los eventos de clic en los botones de siguiente y anterior.
 */
const siguienteButtons = document.querySelectorAll(".siguiente");
const anteriorButtons = document.querySelectorAll(".anterior");

/**
 * Agrega un event listener a cada botón de siguiente.
 */
siguienteButtons.forEach((button) => {
    button.addEventListener("click", () => {
        // Validación del remitente
        let esValidoRemitente = validarRemitente();

        const pasoActual = button.parentElement;
        console.log(button.dataset.paso);

        // Verifica la validez del remitente, el paso actual y el origen
        if (esValidoRemitente && button.dataset.paso == 2 && validarOrigen()) {
            // Obtiene el siguiente paso y lo muestra
            const siguientePaso = document.getElementById("paso-" + button.dataset.paso);

            pasoActual.style.display = "none";
            siguientePaso.style.display = "block";
        } else if (button.dataset.paso == 3 && validarDestino()) {
            // Validación del destinatario
            let esValidoDestinatario = validarDestinatario();

            // Verifica la validez del destinatario
            if (esValidoDestinatario) {
                // Obtiene el siguiente paso y lo muestra
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

try {
    // Maneja el evento de envío del formulario
    const enviarButton = document.querySelector(".enviar");
    enviarButton.addEventListener("click", () => {
        if (validarInformacionAdicional()) {
            document.getElementById("btnEnvios").innerHTML=`<p id="" style="color: green; ">Guardando envio ...</p>
            `
            let cedulaRemitente = document.getElementById('cedulaRemitente').value;
            let nombreRemitente = document.getElementById('nombreRemitente').value;
            let telefonoRemitente = document.getElementById('telefonoRemitente').value;
            let emailRemitente = document.getElementById('emailRemitente').value;
            let ciudadOrigenInput = document.getElementById("ciudadOrigen");
            const remitente = {
                nombre: nombreRemitente,
                cedula: cedulaRemitente,
                telefono: telefonoRemitente,
                email: emailRemitente,
            }
            let cedulaDestinatario = document.getElementById('cedulaDestinatario').value;
            let nombreDestinatario = document.getElementById('nombreDestinatario').value;
            let telefonoDestinatario = document.getElementById('telefonoDestinatario').value;
            let emailDestinatario = document.getElementById('emailDestinatario').value;
            let ciudadDestinoInput = document.getElementById("ciudadDestino");
            const destinatario = {
                nombre: nombreDestinatario,
                cedula: cedulaDestinatario,
                telefono: telefonoDestinatario,
                email: emailDestinatario,
            }
            // Obtener referencias a los campos y mensajes de error
            let longitudInput = document.getElementById("longitud").value;
            let anchoInput = document.getElementById("ancho").value;
            let alturaInput = document.getElementById("altura").value;
            let pesoInput = document.getElementById("peso").value;
            let direccionInput = document.getElementById("direccion").value;
            let descripcionInput = document.getElementById("descripcion").value;
            let tarifaInput = document.getElementById("tarifa").value;
            let adminId=JSON.parse(localStorage.getItem("data")).id
            const envio = {
                descripcion: descripcionInput,
                direccion: direccionInput,
                alto: alturaInput,
                ancho: anchoInput,
                peso: pesoInput,
                largo: longitudInput,
                peso: pesoInput,
                ciudadOrigenId: ciudadOrigenInput.value,
                ciudadDestinoId: ciudadDestinoInput.value,
                tarifa: tarifaInput,
                adminId
            }
            const envioDto={
                envio,
                destinatario,
                remitente
            }
            saveEnvio(envioDto)
            .then(res=>res.json())
            .then(data=>{
                console.log(data)
                var modal = document.getElementById('staticBackdrop');
                    var bootstrapModal = bootstrap.Modal.getInstance(modal);
                    bootstrapModal.hide();
                   
                    //Mostrar
                    inicioEnvios()
                    const emailEnvio={
                        id:data.id,
                        guia:data.guia,
                        
                        destinatarioId:data.destinatarioId,
                        remitenteId:data.remitenteId
                    }
                    getEnvioGuia(emailEnvio)
                    .then(response=>response)
                    .then(data=>{
                        console.log(data)
                    })
                    .catch(err=>{
                        console.log(err)
                    })
                    Swal.fire(
                        'Completado',
                        'Envio  Registrado',
                        'success'
                    )
            })
            .catch(err=>{
                console.log(err)
            })
            .finally(final=>{
                
            })
        } else {
            alert("Falta Informacion")
        }
        // Aquí puedes agregar la lógica para enviar el formulario o realizar las validaciones necesarias
        // Por ejemplo, puedes obtener los valores de los campos usando document.getElementById("campo-id").value
        // Y luego enviar los datos mediante una solicitud HTTP o realizar otras acciones necesarias
        // Puedes usar JavaScript o cualquier biblioteca/framework de tu elección para manejar esto.
    });
} catch (error) {

}


// Función para validar si es un correo electrónico válido
function validarEmail(email) {
    // Expresión regular para validar el formato de correo electrónico
    var regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}
function validarOrigen() {
    let departamentoOrigenInput = document.getElementById("departamentoOrigen");
    let departamentoOrigenError = document.getElementById("departamentoOrigenError");
    let ciudadOrigenInput = document.getElementById("ciudadOrigen");
    let ciudadOrigenError = document.getElementById("ciudadOrigenError");

    departamentoOrigenError.textContent = "";
    ciudadOrigenError.textContent = "";
    let valido = true;

    if (departamentoOrigenInput.value === "Seleccione un Departamento") {
        departamentoOrigenError.textContent = "Seleccione un Departamento";
        valido = false;
    }

    if (ciudadOrigenInput.value === "Seleccione la Ciudad") {
        ciudadOrigenError.textContent = "Seleccione una Ciudad";
        valido = false;
    }


    return valido;
}

function validarDestino() {
    var departamentoDestinoInput = document.getElementById("departamentoDestino");
    var ciudadDestinoInput = document.getElementById("ciudadDestino");
    var departamentoDestinoError = document.getElementById("departamentoDestinoError");
    var ciudadDestinoError = document.getElementById("ciudadDestinoError");

    departamentoDestinoError.textContent = "";
    ciudadDestinoError.textContent = "";

    var valido = true;

    if (departamentoDestinoInput.value === "Seleccione un Departamento") {
        departamentoDestinoError.textContent = "Seleccione un Departamento";
        valido = false;
    }

    if (ciudadDestinoInput.value === "Seleccione la Ciudad") {
        ciudadDestinoError.textContent = "Seleccione una Ciudad";
        valido = false;
    }

    return valido;
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
    let cumple = true;
    // Validar cedulaDestinatario
    if (!cedulaDestinatario) {
        document.getElementById('cedulaDestinatarioError').textContent = 'Campo inválido';
        cumple = false;
    } else {
        document.getElementById('cedulaDestinatarioError').textContent = '';
    }

    // Validar nombreDestinatario
    if (!nombreDestinatario) {
        document.getElementById('nombreDestinatarioError').textContent = 'Campo inválido';
        cumple = false;
    } else {
        document.getElementById('nombreDestinatarioError').textContent = '';
    }

    // Validar telefonoDestinatario
    if (!telefonoDestinatario) {
        document.getElementById('telefonoDestinatarioError').textContent = 'Campo inválido';
        cumple = false;
    } else {
        document.getElementById('telefonoDestinatarioError').textContent = '';
    }

    // Validar emailDestinatario
    var esValidoEmail = validarEmail(emailDestinatario);
    if (!emailDestinatario || !esValidoEmail) {
        document.getElementById('emailDestinatarioError').textContent = 'Campo inválido';
        cumple = false;
    } else {
        document.getElementById('emailDestinatarioError').textContent = '';
    }



    // Si se cumplen todas las validaciones, retorna true
    return cumple;
}
try {
    detectarEscritura()
} catch (error) {

}
function detectarEscritura() {
    // Obtener los elementos de entrada del formulario
    let longitudInput = document.getElementById("longitud");
    let anchoInput = document.getElementById("ancho");
    let alturaInput = document.getElementById("altura");
    let pesoInput = document.getElementById("peso");

    // Agregar un evento de escucha al evento input para cada input
    longitudInput.addEventListener("input", function (event) {
        calcularTarifa()
    });

    anchoInput.addEventListener("input", function (event) {
        calcularTarifa()
    });

    alturaInput.addEventListener("input", function (event) {
        calcularTarifa()
    });

    pesoInput.addEventListener("input", function (event) {
        calcularTarifa()
    });
}
function calcularTarifa() {
    try {
        // Obtener referencias a los campos y mensajes de error
        let longitudInput = document.getElementById("longitud").value;
        let anchoInput = document.getElementById("ancho").value;
        let alturaInput = document.getElementById("altura").value;
        let pesoInput = document.getElementById("peso").value;
        let tarifaInput = document.getElementById("tarifa")


        let tarifa = 0;

        // Fórmula de ejemplo: Tarifa = (Longitud + Ancho + Altura) * Peso / 100
        tarifa = ((parseFloat(longitudInput) + parseFloat(anchoInput) + parseFloat(alturaInput)) * parseFloat(pesoInput) / 100) * 5200;

        // Redondear la tarifa a 2 decimales
        tarifa = tarifa.toFixed(2);
        tarifaInput.value = tarifa
        // Imprimir la tarifa
        console.log("La tarifa de envío es: $" + tarifa);


    } catch (error) {

    }
}
function validarInformacionAdicional() {
    // Obtener referencias a los campos y mensajes de error
    let longitudInput = document.getElementById("longitud");
    let longitudError = document.getElementById("longitudError");
    let anchoInput = document.getElementById("ancho");
    let anchoError = document.getElementById("anchoError");
    let alturaInput = document.getElementById("altura");
    let alturaError = document.getElementById("alturaError");
    let pesoInput = document.getElementById("peso");
    let pesoError = document.getElementById("pesoError");
    let direccionInput = document.getElementById("direccion");
    let direccionError = document.getElementById("direccionError");
    let descripcionInput = document.getElementById("descripcion");
    let descripcionError = document.getElementById("descripcionError");
    let tarifaInput = document.getElementById("tarifa");
    let tarifaError = document.getElementById("tarifaError");

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


function validarMensajero() {
    let cedulaRemitente = document.getElementById('cedulaMensajero').value;
    let nombreRemitente = document.getElementById('nombreMensajero').value;
    let apellidoRemitente = document.getElementById('apellidoMensajero').value;
    let telefonoRemitente = document.getElementById('telefonoMensajero').value;
    let emailRemitente = document.getElementById('emailMensajero').value;
    let cumple = true
    // Validar cedulaRemitente
    if (!cedulaRemitente) {
        document.getElementById('cedulaMensajeroError').textContent = 'Campo inválido';
        cumple = false;
    } else {
        document.getElementById('cedulaMensajeroError').textContent = '';
    }

    // Validar nombreRemitente
    if (nombreRemitente == "") {
        document.getElementById('nombreMensajeroError').textContent = 'Campo inválido';
        cumple = false;
    } else {
        document.getElementById('nombreMensajeroError').textContent = '';
    }
    // Validar nombreRemitente
    if (apellidoRemitente == "") {
        document.getElementById('apellidoMensajeroError').textContent = 'Campo inválido';
        cumple = false;
    } else {
        document.getElementById('apellidoMensajeroError').textContent = '';
    }

    // Validar telefonoRemitente
    if (!telefonoRemitente) {
        document.getElementById('telefonoMensajeroError').textContent = 'Campo inválido';
        cumple = false;
    } else {
        document.getElementById('telefonoMensajeroError').textContent = '';
    }

    // Validar emailRemitente
    var esValidoEmail = validarEmail(emailRemitente);
    if (!emailRemitente || !esValidoEmail) {
        document.getElementById('emailMensajeroError').textContent = 'Campo inválido';
        cumple = false;
    } else {
        document.getElementById('emailMensajeroError').textContent = '';
    }



    // Si se cumplen todas las validaciones, retorna true
    return cumple;
}
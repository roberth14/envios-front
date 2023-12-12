const urlBassic = "https://seguimientoenviosbackend-production.up.railway.app"
//"https://seguimientoenviosbackend-production.up.railway.app"

localStorage.setItem("modulo", "empleado")

async function getEnvioGuia(envio) {
    let token = localStorage.getItem("token")
  const result = await fetch(urlBassic + "/mail/guia", {
      method: 'POST',
      body:JSON.stringify(envio),
      headers: {
          "Content-type": "application/json",
          'Access-Control-Allow-Headers': 'Authorization',
          'Cache-Control': 'no-store',
          "Authorization": "Bearer " + token
      },
      cache: 'no-store',

  })
  return result
}
async function getEnvioGuiaId(id) {
  const result = await fetch(urlBassic + "/envio/guia/"+id, {
      method: 'GET',
      headers: {
          "Content-type": "application/json",
          'Access-Control-Allow-Headers': 'Authorization',
          'Cache-Control': 'no-store'
      },
      cache: 'no-store',

  })
  return result
}
async function getClienteByCedula(cedula) {
    let token = localStorage.getItem("token")
    const result = await fetch(urlBassic + "/cliente/"+cedula, {
        method: 'GET',
        headers: {
            "Content-type": "application/json",
            'Access-Control-Allow-Headers': 'Authorization',
            'Cache-Control': 'no-store',
            "Authorization": "Bearer " + token
        },
        cache: 'no-store',

    })
    return result
}
function buscarRemitenteCedula(){
    let cedulaRemitenteYes=document.getElementById("cedulaRemitenteYes")
    let cedulaRemitenteError =document.getElementById("cedulaRemitenteError")
    let cedulaRemitente=document.getElementById("cedulaRemitente").value
    getClienteByCedula(cedulaRemitente)
    .then(response=>response.json())
    .then(data=>{
        cedulaRemitenteYes.textContent="Usuario registrado"
        cedulaRemitenteError.textContent=""
        console.log(data)
        document.getElementById("nombreRemitente").value=data.nombre
        document.getElementById("telefonoRemitente").value=data.telefono
        document.getElementById("emailRemitente").value=data.email
    })
    .catch(err=>{
        cedulaRemitenteYes.textContent=""
        cedulaRemitenteError.textContent="Cedula no esta registrada"
        console.log(err)
    })
    .finally(final=>{

    })
}
function buscarDestinatarioCedula(){
    let cedulaDestinatarioYes=document.getElementById("cedulaDestinatarioYes")
    let cedulaDestinatarioError =document.getElementById("cedulaDestinatarioError")
    let cedulaDestinatario=document.getElementById("cedulaDestinatario").value
    getClienteByCedula(cedulaDestinatario)
    .then(response=>response.json())
    .then(data=>{
        cedulaDestinatarioYes.textContent="Usuario registrado"
        cedulaDestinatarioError.textContent=""
        console.log(data)
        document.getElementById("nombreDestinatario").value=data.nombre
        document.getElementById("telefonoDestinatario").value=data.telefono
        document.getElementById("emailDestinatario").value=data.email
    })
    .catch(err=>{
        cedulaDestinatarioYes.textContent=""
        cedulaDestinatarioError.textContent="Cedula no esta registrada"
        console.log(err)
    })
    .finally(final=>{

    })
}
async function getEnvioId(id) {
    let token = localStorage.getItem("token")
    const result = await fetch(urlBassic + "/envio/"+id, {
        method: 'GET',
        headers: {
            "Content-type": "application/json",
            'Access-Control-Allow-Headers': 'Authorization',
            'Cache-Control': 'no-store',
            "Authorization": "Bearer " + token
        },
        cache: 'no-store',

    })
    return result
}
async function listaEnvios() {
    let token = localStorage.getItem("token")
    const result = await fetch(urlBassic + "/envio", {
        method: 'GET',
        headers: {
            "Content-type": "application/json",
            'Access-Control-Allow-Headers': 'Authorization',
            'Cache-Control': 'no-store',
            "Authorization": "Bearer " + token
        },
        cache: 'no-store',

    })
    return result
}

async function listaEmpleados() {
    let token = localStorage.getItem("token")
    const result = await fetch(urlBassic + "/usuario/empleados", {
        method: 'GET',
        headers: {
            "Content-type": "application/json",
            'Access-Control-Allow-Headers': 'Authorization',
            'Cache-Control': 'no-store',
            "Authorization": "Bearer " + token
        },
        cache: 'no-store',

    })
    return result
}
async function saveEnvio(envio) {
    let token = localStorage.getItem("token")
    const result = await fetch(urlBassic + "/envio/save", {
        method: 'POST',
        body: JSON.stringify(envio),
        headers: {
            "Content-type": "application/json",
            'Access-Control-Allow-Headers': 'Authorization',
            'Cache-Control': 'no-store',
            "Authorization": "Bearer " + token
        },
        cache: 'no-store',

    })
    return result
}
async function saveEmpleado(empleado) {
    let token = localStorage.getItem("token")
    const result = await fetch(urlBassic + "/usuario/save/empleado", {
        method: 'POST',
        body: JSON.stringify(empleado),
        headers: {
            "Content-type": "application/json",
            'Access-Control-Allow-Headers': 'Authorization',
            'Cache-Control': 'no-store',
            "Authorization": "Bearer " + token
        },
        cache: 'no-store',

    })
    return result
}

async function iniciarModulo(usuario) {
    let modulo = localStorage.getItem("modulo")
    const result = await fetch(urlBassic + "/usuario/" + modulo + "/modulo", {
        method: 'POST',
        body: JSON.stringify(usuario),
        headers: {
            "Content-type": "application/json",
            'Access-Control-Allow-Headers': 'Authorization',
            'Cache-Control': 'no-store'
        },
        cache: 'no-store',

    })
    return result
}
async function iniciarSesion(usuario) {

    const result = await fetch(urlBassic + "/user/login", {
        method: 'POST',
        body: JSON.stringify(usuario),
        headers: {
            "Content-type": "application/json",
            'Access-Control-Allow-Headers': 'Authorization',
            'Cache-Control': 'no-store'
        },
        cache: 'no-store',

    })
    return result
}

async function listaDepartamento() {
    const result = await fetch(urlBassic + "/departamento", {
        method: 'GET',
        headers: {
            "Content-type": "application/json",
            'Access-Control-Allow-Headers': 'Authorization',
            'Cache-Control': 'no-store'
        },
        cache: 'no-store',

    })
    return result
}
//Agrego los departamentos al formulario
function departamentoOrigen() {
    let departamentoOrigen = document.getElementById("departamentoOrigen")
    let departamentoDestino = document.getElementById("departamentoDestino")
    listaDepartamento()
        .then(response => response.json())
        .then(data => {
            localStorage.setItem("departamentos", JSON.stringify(data))
            let body = `<option selected>Seleccione un Departamento</option>`
            for (let i = 0; i < data.length; i++) {
                body += `<option value="${data[i].id_departamento}">${data[i].departamento}</option>`

            }
            departamentoDestino.innerHTML = body;
            departamentoOrigen.innerHTML = body;
        })

}

//Agrego la ciudad al select si el usuario seleciona un Departamento
try {
    let departamentoOrigen = document.getElementById("departamentoOrigen")
    let departamentoDestino = document.getElementById("departamentoDestino")
    departamentoOrigen.addEventListener("change", function () {

        // Obtén el array almacenado en el localStorage
        let departamentos = JSON.parse(localStorage.getItem("departamentos"));

        // ID del departamento deseado
        let opcionSeleccionada = departamentoOrigen.value;


        // Buscar el departamento en el array
        let departamentoEncontrado = departamentos.find(function (departamento) {
            return departamento.id_departamento == opcionSeleccionada;
        });

        // Verificar si se encontró el departamento
        if (departamentoEncontrado) {
            // Obtener los municipios del departamento encontrado
            let municipios = departamentoEncontrado.municipios;
            let body = `<option selected>Seleccione la Ciudad</option>`
            for (let i = 0; i < municipios.length; i++) {
                body += `<option value="${municipios[i].id_municipio}">${municipios[i].municipio}</option>`

            }

            document.getElementById("ciudadOrigen").innerHTML = body
        }
    });
    departamentoDestino.addEventListener("change", function () {

        // Obtén el array almacenado en el localStorage
        let departamentos = JSON.parse(localStorage.getItem("departamentos"));

        // ID del departamento deseado
        let opcionSeleccionada = departamentoDestino.value;


        // Buscar el departamento en el array
        let departamentoEncontrado = departamentos.find(function (departamento) {
            return departamento.id_departamento == opcionSeleccionada;
        });

        // Verificar si se encontró el departamento
        if (departamentoEncontrado) {
            // Obtener los municipios del departamento encontrado
            let municipios = departamentoEncontrado.municipios;
            let body = `<option selected>Seleccione la Ciudad</option>`
            for (let i = 0; i < municipios.length; i++) {
                body += `<option value="${municipios[i].id_municipio}">${municipios[i].municipio}</option>`

            }

            document.getElementById("ciudadDestino").innerHTML = body
        }
    });
} catch (error) {

}
//Funcion se ejecuta cuando se carga la vista de envios 
function inicioEnvios() {
    verEnviosR()
    departamentoOrigen()

}
async function listaMunicipios() {
    let token = localStorage.getItem("token")
    const result = await fetch(urlBassic + "/municipio", {
        method: 'GET',
        headers: {
            "Content-type": "application/json",
            'Access-Control-Allow-Headers': 'Authorization',
            'Cache-Control': 'no-store',
            "Authorization": "Bearer " + token
        },
        cache: 'no-store',

    })
    return result
}
function buscarMunicipioPorID(idMunicipio) {
    let arrayDepartamentos = JSON.parse(localStorage.getItem("departamentos"));

    for (let i = 0; i < arrayDepartamentos.length; i++) {
        const departamento = arrayDepartamentos[i];
        const municipios = departamento.municipios;

        for (let j = 0; j < municipios.length; j++) {
            const municipio = municipios[j];

            if (municipio.id_municipio === idMunicipio) {
                return {
                    municipio: municipio,
                    departamento: departamento
                };
            }
        }
    }
    
    return null;
}

//Muestro la lista de envios registrados
function verEnviosR() {
    listaEnvios()
        .then(response => response.json())
        .then(datos => {
            console.log(datos)
            var counter = 1;

            let tabla = $('#tabla').DataTable();
            tabla.clear().draw();

            for (let i = 0; i < datos.length; i++) {
                const ciudadOrigen = buscarMunicipioPorID(datos[i].ciudadOrigenId);
                const ciudadDestino = buscarMunicipioPorID(datos[i].ciudadDestinoId);

                tabla.row.add([datos[i].guia,
                ciudadOrigen.municipio.municipio+" , "+ciudadOrigen.departamento.departamento,
                ciudadDestino.municipio.municipio+" , "+ciudadDestino.departamento.departamento,
                datos[i].tarifa,
                datos[i].direccion
                ]).draw(false);

                counter++;
            }
        })
        .catch(err => {
            console.log(err)
        })
}
//Muestro la lista de empleados en la vista
function verEmpleados() {
    
    listaEmpleados()
        .then(response => response.json())
        .then(datos => {
            var counter = 1;

            let tabla = $('#tabla').DataTable();
            tabla.clear().draw();

            for (let i = 0; i < datos.length; i++) {
                tabla.row.add([datos[i].id,
                datos[i].nombre,
                datos[i].cedula,
                datos[i].telefono,
                datos[i].email
                ]).draw(false);

                counter++;
            }
        })
        .catch(err => {
            console.log(err)
        })
}

function login() {

    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;

    const usuario = {
        email,
        password
    }
    iniciarModulo(usuario)
        .then(response => response.json())
        .then(data => {
            if (data == true) {
                entrar(usuario)
            } else {
                Swal.fire(
                    'Uppsss',
                    'Usuario no Autorizado',
                    'error'
                )

            }
        })
        .catch(err => {
            console.log(err)
        })
        .finally(final => {

        })



}

function entrar(usuario) {
    iniciarSesion(usuario)
        .then(res => res)
        .then(JWT => {
            console.log(JWT)
            if (JWT.status === 200 && JWT.headers.has('Authorization')) {

                const bearerToken = JWT.headers.get('Authorization');
                const token = bearerToken.replace('Bearer ', '');
                Swal.fire(
                    'Bienvenido',
                    'Usuario  Autorizado',
                    'success'
                )



                localStorage.setItem('token', token);
                localStorage.setItem("data", JSON.stringify(parseJwt(token)))

                cargarModuloRol()
                //Tiempo real del token
                let exp = JSON.parse(localStorage.getItem("data")).exp
                //Tiempo prueba 4 horas 14400
                borrarLocalStorageYRedirigirDespuesDeTiempo(14400); // 3600 Tiempo de expiración de una hora (3600 segundos)

            } else {

                alert("Contraseña Incorrecta")
            }
        })
        .catch(err => {
            console.log(err)
        })
        .finally(final => {

        })
}

//validar email
function validateEmail() {
    //obtengo el valor del email
    let emailInput = document.getElementById("exampleInputEmail");

    let email = emailInput.value.trim();

    if (email === "") {
        emailError.textContent = "Ingrese su correo electrónico.";
        return false;
    }

    let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        emailError.textContent = "Ingrese un correo electrónico válido.";
        return false;
    }

    emailError.textContent = ""; // Borrar el mensaje de error si el correo es válido
    return true;
}
function empleado() {
    localStorage.setItem("modulo", "empleado")
}

function admin() {
    localStorage.setItem("modulo", "admin")
}

try {
    let nombre = JSON.parse(localStorage.getItem("data")).nombre
    let apellido = JSON.parse(localStorage.getItem("data")).apellido
    document.getElementById("nombre").textContent = nombre + " " + apellido

    const salir = document.getElementById("salir")

    salir.addEventListener("click", () => {
        localStorage.clear();
        sessionStorage.clear()
    });
} catch (error) {

}
function cargarModuloRol() {
    try {

        let modulo = localStorage.getItem("modulo")
        const roles = JSON.parse(localStorage.getItem("data")).roles

        if (modulo == "admin") {
            for (let i = 0; i < roles.length; i++) {
                if (roles[i].nombre == "ROLE_ADMIN") {
                    window.location.href = "../empresa/index.html";


                }
            }
        } else {
            for (let i = 0; i < roles.length; i++) {
                if (roles[i].nombre == "ROLE_MENSAJERO") {
                    window.location.href = "../mensajero/index.html";
                }
            }

        }




    } catch (error) {

    }




}



function parseJwt(token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
}
function borrarLocalStorageYRedirigirDespuesDeTiempo(tiempoExpiracionMilisegundos) {
    // Establecer el tiempo de expiración en milisegundos

    // Obtener el tiempo actual en milisegundos
    var tiempoActual = new Date().getTime();

    // Obtener el tiempo de expiración sumando el tiempo actual y el tiempo de expiración en milisegundos
    var tiempoExpiracionTotal = tiempoActual + tiempoExpiracionMilisegundos;

    // Guardar el tiempo de expiración en el localStorage
    localStorage.setItem("tiempoExpiracion", tiempoExpiracionTotal);

    // Verificar el tiempo de expiración en intervalos regulares
    var verificarExpiracion = setInterval(function () {
        // Obtener el tiempo actual en milisegundos
        var tiempoActual = new Date().getTime();

        // Obtener el tiempo de expiración del localStorage
        var tiempoExpiracionGuardado = localStorage.getItem("tiempoExpiracion");

        // Verificar si el tiempo de expiración ha pasado
        if (tiempoActual >= tiempoExpiracionGuardado) {
            // Borrar todos los elementos del localStorage
            localStorage.clear();

            // Redirigir al usuario al archivo index.html
            window.location.href = "index.html";

            // Limpiar el intervalo de verificación
            clearInterval(verificarExpiracion);
        }
    }, 1000); // Intervalo de verificación cada segundo (puedes ajustar el valor según tus necesidades)
}


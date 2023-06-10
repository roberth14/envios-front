function cargar() {
  listaDepartamento()
    .then(response => response.json())
    .then(data => {
      localStorage.setItem("departamentos", JSON.stringify(data))

    })
    .catch(err => {
      console.log(err)
    })
}
try {

  const numeroGuia = document.getElementById("numeroGuia")

  document.addEventListener('DOMContentLoaded', function () {
    const input = document.getElementById('numeroGuia');

    input.addEventListener('keypress', function (event) {
      if (event.keyCode === 13) {
        event.preventDefault();
        buscarEnvio()
      }
    });
  });

} catch (error) {

}

function buscarEnvio() {
  document.getElementById("datosEnvio").innerHTML = ""
  let numeroGuia = document.getElementById("numeroGuia").value
  const mensajeError = document.getElementById("mensajeError");

  if (numeroGuia.length >= 5) {
    getEnvioGuiaId(numeroGuia)
      .then(res => res.json())
      .then(data => {
        console.log(data)
        const ciudadOrigen = buscarMunicipioPorID(data.envio.ciudadOrigenId);
        const ciudadDestino = buscarMunicipioPorID(data.envio.ciudadDestinoId);

        let origenColor = ""
        let caminoColor = ""
        let destinoColor = ""
        let repartoColor = ""
        let entregadoColor = ""

        for (let i = 0; i < data.estados.length; i++) {
          if (data.estados[i].estadoId == 1) {

            origenColor = "-success"
          } else if (data.estados[i].estadoId == 2) {

            caminoColor = "-success"
          } else if (data.estados[i].estadoId == 3) {

            destinoColor = "-success"
          } else if (data.estados[i].estadoId == 4) {

            repartoColor = "-success"
          } else if (data.estados[i].estadoId == 5) {

            entregadoColor = "-success"
          }

        }
        document.getElementById("datosEnvio").innerHTML = `
      <section id="horizontal-pricing" class="horizontal-pricing pt-0">
      
         <div class="container" data-aos="fade-up">
      
      
      
      
           <div class="row gy-4 pricing-item  mt-4" data-aos="fade-up" data-aos-delay="100">
                    <h3 class="text-center">Numero Guia: ${numeroGuia}</h3>
      
                    <div class="col-xl-6  p-5 align-items-center justify-content-center">
                      <h3 class="text-center">Ciudad Origen: </h3>
                      <h3 class="text-center"><span> ${ciudadOrigen.municipio.municipio + " , " + ciudadOrigen.departamento.departamento}</span></h3>
                    
                    </div>
                    <div class="col-xl-6  p-5 align-items-center justify-content-center">
                      <h3 class="text-center">Ciudad Destino:</h3>
                      <h3 class="text-center">${ciudadDestino.municipio.municipio + " , " + ciudadOrigen.departamento.departamento}</h3>
                  
                    </div>
                  
                  
                    <div class="row justify-content-center">
                      <div class="col-xl-6 text-center">
                          <h3>Estados:</h3>
                      </div>
                    </div>
                    <hr>
                <div class="row text-center  " id="bodyEstados">
                <div class="col-xl-2  fw-bold  text-dark  fs-4"><i class="fa-solid fa-cart-flatbed text${origenColor}  me-2"></i><h3 class="text-center"> Origen</h3></div>
                <div class=" col-xl-3 fw-bold  text-dark  fs-4"><i class="fa-solid fa-truck text${caminoColor}  me-2"></i><h3 class="text-center">Camino </h3></div>
                <div class=" col-xl-2  fw-bold text-dark  fs-4"><i class="fa-solid fa-truck-ramp-box text${destinoColor}   me-2"></i><h3 class="text-center"> Destino</h3></div>
                <div class=" col-xl-3  fw-bold  text-dark  fs-4"><i class="fa-solid fa-truck text${repartoColor}  me-2"></i><h3 class="text-center">Reparto</h3></div>
                <div class="col-xl-2   text-dark  fs-4"><i class="fa fa-home" aria-hidden="true text${entregadoColor} me-2"></i><h3 class="text-center">Entregado</h3></div>
        
                  
      
                </div>
      
          </div><!-- End Pricing Item -->
      
      
      
        </div>
      </section><!-- End Horizontal Pricing Section -->`




        // Desplazamiento suave hacia la sección
        const section = document.getElementById("horizontal-pricing");
        section.scrollIntoView({ behavior: "smooth", block: "center" });
        mensajeError.style.display = "none"; // Ocultar el mensaje de error
      })
      .catch(err => {
        mensajeError.style.display = "block"; // Mostrar el mensaje de error
        mensajeError.textContent = "Numero de guia no esta registrado"
      })
      .finally(final => {

      })


  } else {
    mensajeError.style.display = "block"; // Mostrar el mensaje de error
  }


}


try {
  // Obtener el valor del parámetro de consulta "dato"
  const urlParams = new URLSearchParams(window.location.search);
  const token = urlParams.get('token');
  if (token != null) {
    console.log(token)
    localStorage.setItem("token", token)
    window.location.href = "./register/index.html"
  }

} catch (error) {

}
async function updatePassword(usuario) {
  let token = localStorage.getItem("token")
  const result = await fetch(urlBassic + "/usuario/create", {
    method: 'PUT',
    body: JSON.stringify(usuario),
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
function passNuevas() {
  let email = document.getElementById("email").value;
  let password1 = document.getElementById("password1").value;
  let password2 = document.getElementById("password2").value;
  if (password1 == password2 && password1.length > 4) {
    const usuario = {
      email,
      password: password1
    }
    updatePassword(usuario)
      .then(res => res.json())
      .then(data => {
        console.log(data)
        if (data == true) {
          console.log("cambio passs")
          localStorage.clear()
          entrar(usuario)
        }else{
          Swal.fire(
            'Uppsss',
            'Ya cambio su contraseña',
            'error'
          )

        }
      })
      .catch(err => {
        console.log(err)
        Swal.fire(
          'Uppsss',
          'Ya cambio su contraseña',
          'error'
        )

      })

    console.log(usuario)
  } else {
    Swal.fire(
      'Uppsss',
      'Contraseña no coinciden',
      'error'
    )

  }

}
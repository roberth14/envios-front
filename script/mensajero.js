async function listaEnviosMensajero() {
    let token = localStorage.getItem("token")
    let id = JSON.parse(localStorage.getItem("data")).id
    const result = await fetch(urlBassic + "/envio/" + id + "/mensajero", {
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

async function updateEstado() {
    let token = localStorage.getItem("token")
    let id = sessionStorage.getItem("estado")
    let usuarioId = JSON.parse(localStorage.getItem("data")).id
    let envio = JSON.parse(sessionStorage.getItem("envio")).envio
    const result = await fetch(urlBassic + "/envio/" + id + "/estado/" + usuarioId, {
        method: 'PUT',
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
function actualizarEstado() {
    updateEstado()
        .then(res => res.json())
        .then(data => {
            console.log(data)
            Swal.fire(
                'COMPLETADO',
                'El estado se actualizo',
                'success'
            )
            verEnvio(data.envioId)

        })
        .catch(err => {

            console.log(err)
        })
        .finally(final => {


        })

}
function cargarEnviosMensajero() {
    listaEnviosMensajero()
        .then(res => res.json())
        .then(data => {

            cargarDatosEnvios(data)

        })
        .catch(err => {

            console.log(err)
        })
        .finally(final => {

        })
}
function cargarDatosEnvios(datos) {
    var counter = 1;

    let tabla = $('#tabla').DataTable();
    tabla.clear().draw();

    for (let i = 0; i < datos.length; i++) {
        const ciudadOrigen = buscarMunicipioPorID(datos[i].ciudadOrigenId);
        const ciudadDestino = buscarMunicipioPorID(datos[i].ciudadDestinoId);
        console.log(ciudadDestino)
        let btn = `<a href="#" type="button" class="btn btn-info" data-bs-toggle="modal"
    data-bs-target="#staticBackdrop"  onclick="verEnvio(${datos[i].id})">Actualizar</a>`
        tabla.row.add([datos[i].guia,
        ciudadOrigen.municipio.municipio + " , " + ciudadOrigen.departamento.departamento,
        ciudadDestino.municipio.municipio + " , " + ciudadDestino.departamento.departamento,
        datos[i].tarifa,
            btn
        ]).draw(false);

        counter++;
    }
}
function verEnvio(id) {
    getEnvioId(id)
        .then(res => res.json())
        .then(data => {
            sessionStorage.setItem("envio", JSON.stringify(data))
            console.log(data)
            const ciudadOrigen = buscarMunicipioPorID(data.envio.ciudadOrigenId);
            const ciudadDestino = buscarMunicipioPorID(data.envio.ciudadDestinoId);
            document.getElementById("origen").textContent = ciudadOrigen.municipio.municipio + " , " + ciudadOrigen.departamento.departamento;
            document.getElementById("destino").textContent = ciudadDestino.municipio.municipio + " , " + ciudadDestino.departamento.departamento;
            let origenColor = ""
            let caminoColor = ""
            let destinoColor = ""
            let repartoColor = ""
            let entregadoColor = ""
            const actualizar = document.getElementById("actualizar")
            for (let i = 0; i < data.estados.length; i++) {
                let estadoId = data.estados[i].estadoId
                if (estadoId == 1) {
                    sessionStorage.setItem("estado", estadoId)
                    origenColor = "-success"
                } else if (estadoId == 2) {
                    sessionStorage.setItem("estado", estadoId)
                    caminoColor = "-success"
                } else if (estadoId == 3) {
                    sessionStorage.setItem("estado", estadoId)
                    destinoColor = "-success"
                } else if (estadoId == 4) {
                    sessionStorage.setItem("estado", estadoId)
                    repartoColor = "-success"
                } else if (estadoId == 5) {
                    sessionStorage.setItem("estado", estadoId)
                    actualizar.remove()
                    entregadoColor = "-success"
                }

            }
            document.getElementById("estadosEnvio").innerHTML = `  <div class="row text-center  " id="bodyEstados">
        <div class="col-xl-2  fw-bold  text-dark  fs-4"><i class="fa-solid fa-cart-flatbed text${origenColor}  "></i><h3 class="text-center"> Origen</h3></div>
        <div class=" col-xl-3 fw-bold  text-dark  fs-4"><i class="fa-solid fa-truck text${caminoColor}  "></i><h3 class="text-center">Camino </h3></div>
        <div class=" col-xl-2  fw-bold text-dark  fs-4"><i class="fa-solid fa-truck-ramp-box text${destinoColor}   "></i><h3 class="text-center"> Destino</h3></div>
        <div class=" col-xl-3  fw-bold  text-dark  fs-4"><i class="fa-solid fa-truck text${repartoColor}  "></i><h3 class="text-center">Reparto</h3></div>
        <div class="col-xl-2   text-dark  fs-4"><i class="fa fa-home" aria-hidden="true text${entregadoColor} "></i><h3 class="text-center">Entregado</h3></div>

          

        </div>`
        })
        .catch(err => {
            console.log(err)
        })
        .finally(final => {

        })
}
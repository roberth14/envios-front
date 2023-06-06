function buscarEnvio(){

let numeroGuia=document.getElementById("numeroGuia").value
const mensajeError = document.getElementById("mensajeError");

if (numeroGuia.length >= 5) {
    document.getElementById("datosEnvio").innerHTML=`<section id="horizontal-pricing" class="horizontal-pricing pt-0">
<div class="container" data-aos="fade-up">




  <div class="row gy-4 pricing-item featured mt-4" data-aos="fade-up" data-aos-delay="200">
  <h3 class="text-center">Numero Guia ${numeroGuia}</h3>

    <div class="col-lg-3 d-flex align-items-center justify-content-center">
    <h3 class="text-center">Ciudad</h3>
    </div>
    <div class="col-lg-3 d-flex align-items-center justify-content-center">
      <h4><sup>$</sup>29<span> / month</span></h4>
    </div>
    <div class="col-lg-3 d-flex align-items-center justify-content-center">
      <ul>
        <li><i class="bi bi-check"></i> Quam adipiscing vitae proin</li>
        <li><i class="bi bi-check"></i> <strong>Nec feugiat nisl pretium</strong></li>
        <li><i class="bi bi-check"></i> Nulla at volutpat diam uteera</li>
      </ul>
    </div>
    <div class="col-lg-3 d-flex align-items-center justify-content-center">
      <div class="text-center"><a href="#" class="buy-btn">Buy Now</a></div>
    </div>
  </div><!-- End Pricing Item -->



</div>
</section><!-- End Horizontal Pricing Section -->`

  // Desplazamiento suave hacia la sección
  const section = document.getElementById("horizontal-pricing");
  section.scrollIntoView({ behavior: "smooth", block: "center" });
  mensajeError.style.display = "none"; // Ocultar el mensaje de error
 
} else {
  mensajeError.style.display = "block"; // Mostrar el mensaje de error
}


}
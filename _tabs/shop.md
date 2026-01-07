---
layout: page
icon: fas fa-cubes
order: 3
title: Recursos
---

<div class="row row-cols-1 row-cols-md-2 g-4">
  {% for product in site.data.shop %}
  <div class="col">
    <div class="card h-100 border-0 shadow-sm">
      {% if product.image %}
      <div style="height: 200px; overflow: hidden; display: flex; align-items: center; justify-content: center; background: #f8f9fa;">
        <img src="{{ product.image }}" class="card-img-top" alt="{{ product.title }}" style="width: 100%; height: 100%; object-fit: cover;">
      </div>
      {% endif %}
      <div class="card-body d-flex flex-column">
        <h5 class="card-title fw-bold">{{ product.title }}</h5>
        <div class="mb-2">
          <span class="badge bg-light text-dark border">{{ product.price }}</span>
        </div>
        <p class="card-text text-muted small flex-grow-1">{{ product.description }}</p>

        {% if product.features %}
        <ul class="list-unstyled small mb-3 text-secondary">
          {% for feature in product.features %}
            <li><i class="fas fa-check text-success me-2"></i>{{ feature }}</li>
          {% endfor %}
        </ul>
        {% endif %}

        <a href="{{ product.url }}" target="_blank" class="btn w-100 fw-bold" style="background-color: #FFDD00; color: #000; border: none; border-radius: 50px;">
          {{ product.button_text | default: "Comprar Ahora" }} <i class="fas fa-arrow-right ms-1"></i>
        </a>
      </div>
    </div>
  </div>
  {% endfor %}
</div>

<div class="mt-5 p-5 rounded-4 text-center position-relative overflow-hidden"
     style="background: linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.01) 100%); border: 1px dashed rgba(128,128,128,0.3);">
  
  <h4 class="fw-bold mb-3" style="color: var(--heading-color);">¿Necesitas una visualización a medida?</h4>
  <p class="opacity-75 mb-4" style="max-width: 700px; margin: 0 auto; color: var(--text-color);">
    También desarrollo soluciones personalizadas para empresas en Power BI y Microsoft Fabric. Convirtamos tus datos en una ventaja competitiva.
  </p>
  
  <button type="button" class="btn btn-lg px-5 py-3 hover-scale fw-bold"
          data-bs-toggle="modal" data-bs-target="#contactModalShop"
          style="border: 2px solid var(--heading-color); color: var(--heading-color); border-radius: 50px; background: transparent;">
    <i class="fas fa-paper-plane me-2"></i>Contáctame
  </button>
</div>

<!-- Modal Form (Shop Version with Unique ID) -->
<div class="modal fade" id="contactModalShop" tabindex="-1" aria-labelledby="contactModalShopLabel" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered">
    <div class="modal-content border-0 shadow-lg glass-panel"
         style="background: #1e293b; color: white; border-radius: 20px;">

      <div class="modal-header border-bottom-0 p-4">
        <h5 class="modal-title fw-bold" id="contactModalShopLabel">
          <i class="fas fa-envelope-open-text text-gradient-cyan me-2"></i>Hablemos de tu Proyecto
        </h5>
        <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      
      <div class="modal-body p-4 pt-0">
        <p class="opacity-75 mb-4 small">Completa el formulario y te responderé en menos de 24 horas.</p>
        
        <form action="https://formspree.io/f/mykzrzpn" method="POST">
          
          <div class="mb-3">
            <label for="nameShop" class="form-label small fw-bold text-uppercase opacity-75">Tu Nombre</label>
            <div class="input-group">
              <span class="input-group-text bg-dark border-secondary text-secondary"><i class="fas fa-user"></i></span>
              <input type="text" name="name" class="form-control bg-dark text-white border-secondary" id="nameShop" placeholder="Ej. Juan Pérez" required>
            </div>
          </div>
          
          <div class="mb-3">
            <label for="emailShop" class="form-label small fw-bold text-uppercase opacity-75">Tu Email Corporativo</label>
            <div class="input-group">
              <span class="input-group-text bg-dark border-secondary text-secondary"><i class="fas fa-at"></i></span>
              <input type="email" name="email" class="form-control bg-dark text-white border-secondary" id="emailShop" placeholder="juan@empresa.com" required>
            </div>
          </div>
          
          <div class="mb-4">
            <label for="messageShop" class="form-label small fw-bold text-uppercase opacity-75">Detalles del Reto</label>
            <textarea name="message" class="form-control bg-dark text-white border-secondary" id="messageShop" rows="4" placeholder="Cuéntame sobre tus datos y qué visualización necesitas..." required></textarea>
          </div>
          
          <div class="d-grid">
            <button type="submit" class="btn btn-neon fw-bold py-3" style="background: #00f2ff; color: #000; border-radius: 12px;">
              Enviar Solicitud <i class="fas fa-long-arrow-alt-right ms-2"></i>
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</div>

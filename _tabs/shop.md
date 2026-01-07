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

<div class="mt-5 text-center bg-light p-4 rounded">
  <h3>¿Necesitas una visualización a medida?</h3>
  <p class="text-muted">También desarrollo soluciones personalizadas para empresas en Power BI y Microsoft Fabric.</p>
  <a href="mailto:csalcedo90@gmail.com" class="btn btn-outline-dark rounded-pill">Contáctame</a>
</div>

---
layout: page
title: Acerca de Mí
icon: fas fa-info-circle
order: 4
---

<div class="row align-items-center mb-5 animate__animated animate__fadeIn">
  <!-- Columna Izquierda: Perfil -->
  <div class="col-lg-4 text-center mb-4 mb-lg-0">
    <div class="position-relative d-inline-block p-4">
      <!-- Glow sutil detrás de la imagen -->
      <div style="position: absolute; inset: 0; background: radial-gradient(circle, rgba(0, 242, 255, 0.15) 0%, transparent 70%); border-radius: 50%; filter: blur(20px);"></div>

      <img src="https://github.com/CSalcedoDataBI.png" alt="Cristobal Salcedo" 
           class="img-fluid rounded-circle position-relative mb-3 hover-scale" 
           style="width: 220px; border: 3px solid rgba(255,255,255,0.1); box-shadow: 0 10px 40px rgba(0,0,0,0.2);">
      
      <h2 class="fw-bolder mb-1 mt-3 text-gradient-cyan" style="letter-spacing: -0.5px;">Cristóbal Salcedo</h2>
      <p class="text-muted fw-bold small text-uppercase ls-2">Ingeniero de Datos & Arquitecto Visual</p>
      
      <!-- Redes Sociales Minimalistas -->
      <div class="d-flex justify-content-center gap-3 mt-3">
        <a href="https://www.linkedin.com/in/cristobal-salcedo/" target="_blank" class="social-btn" title="LinkedIn"><i class="fab fa-linkedin-in"></i></a>
        <a href="https://github.com/CSalcedoDataBI" target="_blank" class="social-btn" title="GitHub"><i class="fab fa-github"></i></a>
      </div>
    </div>
  </div>

  <!-- Columna Derecha: Bio & Stack -->
  <div class="col-lg-8">
    <div class="card border-0 shadow-sm h-100" style="background: var(--card-bg); border-radius: 20px; overflow: hidden;">
      <div class="card-body p-4 p-md-5">
        <h3 class="fw-bold mb-4" style="color: var(--heading-color);">
          <i class="fas fa-terminal text-gradient-cyan me-2"></i>La Ciencia detrás del Arte
        </h3>

        <p class="lead mb-4" style="line-height: 1.8; font-size: 1.1rem; opacity: 0.9;">
          Transformo datos crudos en historias visuales. Mi enfoque combina la robustez de la <strong>Ingeniería de Datos</strong> con la precisión del <strong>Diseño Declarativo</strong>.
        </p>
        
        <p class="mb-5 opacity-80">
          Mi especialidad es superar las barreras nativas de Power BI. Utilizo <strong class="text-info">Deneb</strong> para inyectar la potencia de <strong class="text-info">Vega</strong> y <strong class="text-info">Vega-Lite</strong>, creando visualizaciones que no solo existen, sino que <em>funcionan</em>.
        </p>
        
        <!-- Tech Stack Grid -->
        <h6 class="text-uppercase fw-bold opacity-50 mb-3 small ls-1">Tech Stack & Herramientas</h6>
        <div class="row g-3">
          <!-- Item 1 -->
          <div class="col-md-6">
            <div class="d-flex align-items-center p-3 rounded-3 stack-card">
              <div class="icon-box me-3"><i class="fas fa-project-diagram text-info"></i></div>
              <div>
                <strong class="d-block text-body">Ingeniería de Datos</strong>
                <span class="small text-muted">PySpark, Python, Fabric</span>
              </div>
            </div>
          </div>
          <!-- Item 2 -->
          <div class="col-md-6">
            <div class="d-flex align-items-center p-3 rounded-3 stack-card">
              <div class="icon-box me-3"><i class="fas fa-chart-bar text-info"></i></div>
              <div>
                <strong class="d-block text-body">Visualización Avanzada</strong>
                <span class="small text-muted">Vega, Vega-Lite, Deneb</span>
              </div>
            </div>
          </div>
          <!-- Item 3 -->
           <div class="col-md-6">
            <div class="d-flex align-items-center p-3 rounded-3 stack-card h-100">
              <div class="icon-box me-3"><i class="fas fa-layer-group text-info"></i></div>
              <div>
                <strong class="d-block text-body">Arquitectura</strong>
                <span class="small text-muted">Lakehouse, ETL Automatizado</span>
              </div>
            </div>
          </div>
          <!-- Item 4 (New) -->
          <div class="col-md-6">
            <div class="d-flex align-items-center p-3 rounded-3 stack-card h-100">
              <div class="icon-box me-3"><i class="fas fa-bolt text-info"></i></div>
              <div>
                <strong class="d-block text-body">Transformación</strong>
                <span class="small text-muted">Power Query, Lenguaje M</span>
              </div>
            </div>
          </div>
        </div>
        
      </div>
    </div>
  </div>
</div>

<!-- Estilos Inline para esta página específica -->
<style>
  .ls-2 { letter-spacing: 2px; }
  .ls-1 { letter-spacing: 1px; }
  
  /* Adaptación Automática Light/Dark */
  :root {
    --card-bg: #ffffff;
    --heading-color: #1e293b;
    --stack-hover: #f8fafc;
  }
  
  [data-mode="dark"] {
    --card-bg: rgba(30, 41, 59, 0.5); /* Glass dark */
    --heading-color: #ffffff;
    --stack-hover: rgba(255,255,255,0.05);
  }
  
  .stack-card {
    border: 1px solid rgba(128,128,128,0.1);
    transition: all 0.2s ease;
  }
  
  .stack-card:hover {
    background: var(--stack-hover);
    border-color: #00f2ff;
    transform: translateY(-2px);
  }
  
  .icon-box {
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(0, 242, 255, 0.1);
    border-radius: 10px;
  }
  
  .social-btn {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(128,128,128,0.1);
    color: inherit;
    transition: all 0.3s ease;
  }
  
  .social-btn:hover {
    background: #00f2ff;
    color: #000;
  }
  
  .hover-scale { transition: transform 0.3s ease; }
  .hover-scale:hover { transform: scale(1.02); }
</style>

<div class="mt-5 p-5 rounded-4 text-center position-relative overflow-hidden"
     style="background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);">
  <div style="position: absolute; top: 0; left: 0; width: 100%; height: 3px; background: linear-gradient(90deg, transparent, #00f2ff, transparent);"></div>
  
  <h4 class="text-white fw-bold mb-3">¿Te aporta valor mi contenido?</h4>
  <p class="text-white opacity-75 mb-4" style="max-width: 600px; margin: 0 auto;">
    Comparte un café conmigo. Tu apoyo me permite seguir creando recursos gratuitos de alta calidad para la comunidad.
  </p>
  
  <a href="https://buymeacoffee.com/csalcedodatabi" target="_blank" class="btn fw-bold px-5 py-3 hover-scale"
     style="background-color: #00f2ff; color: #0b1120; border-radius: 50px; box-shadow: 0 0 20px rgba(0, 242, 255, 0.4); border: none;">
    <i class="fas fa-mug-hot me-2"></i>Invítame a un Café
  </a>
</div>

<!-- Contact Modal Trigger Section -->
<div class="mt-4 p-5 rounded-4 text-center position-relative overflow-hidden"
     style="background: linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.01) 100%); border: 1px dashed rgba(128,128,128,0.3);">
  
  <h4 class="fw-bold mb-3" style="color: var(--heading-color);">¿Necesitas una visualización a medida?</h4>
  <p class="opacity-75 mb-4" style="max-width: 700px; margin: 0 auto; color: var(--text-color);">
    También desarrollo soluciones personalizadas para empresas en Power BI y Microsoft Fabric. Convirtamos tus datos en una ventaja competitiva.
  </p>
  
  <button type="button" class="btn btn-lg px-5 py-3 hover-scale fw-bold"
          data-bs-toggle="modal" data-bs-target="#contactModal"
          style="border: 2px solid var(--heading-color); color: var(--heading-color); border-radius: 50px; background: transparent;">
    <i class="fas fa-paper-plane me-2"></i>Contáctame
  </button>
</div>

<!-- Modal Form -->
<div class="modal fade" id="contactModal" tabindex="-1" aria-labelledby="contactModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered">
    <div class="modal-content border-0 shadow-lg glass-panel"
         style="background: #1e293b; color: white; border-radius: 20px;">

      <div class="modal-header border-bottom-0 p-4">
        <h5 class="modal-title fw-bold" id="contactModalLabel">
          <i class="fas fa-envelope-open-text text-gradient-cyan me-2"></i>Hablemos de tu Proyecto
        </h5>
        <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      
      <div class="modal-body p-4 pt-0">
        <p class="opacity-75 mb-4 small">Completa el formulario y te responderé en menos de 24 horas.</p>
        
        <!-- FORMSPREE ACTION: Connected to User's Formspree Endpoint -->
        <form action="https://formspree.io/f/mykzrzpn" method="POST">
          
          <div class="mb-3">
            <label for="name" class="form-label small fw-bold text-uppercase opacity-75">Tu Nombre</label>
            <div class="input-group">
              <span class="input-group-text bg-dark border-secondary text-secondary"><i class="fas fa-user"></i></span>
              <input type="text" name="name" class="form-control bg-dark text-white border-secondary" id="name" placeholder="Ej. Juan Pérez" required>
            </div>
          </div>
          
          <div class="mb-3">
            <label for="email" class="form-label small fw-bold text-uppercase opacity-75">Tu Email Corporativo</label>
            <div class="input-group">
              <span class="input-group-text bg-dark border-secondary text-secondary"><i class="fas fa-at"></i></span>
              <input type="email" name="email" class="form-control bg-dark text-white border-secondary" id="email" placeholder="juan@empresa.com" required>
            </div>
          </div>
          
          <div class="mb-4">
            <label for="message" class="form-label small fw-bold text-uppercase opacity-75">Detalles del Reto</label>
            <textarea name="message" class="form-control bg-dark text-white border-secondary" id="message" rows="4" placeholder="Cuéntame sobre tus datos y qué visualización necesitas..." required></textarea>
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
</content>

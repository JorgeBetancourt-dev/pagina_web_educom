const header = document.getElementById('header');
  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 30);
  });

  // scroll reveal
  const revealEls = document.querySelectorAll('.reveal');
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('show'); });
  }, { threshold: 0.15 });
  revealEls.forEach(el => io.observe(el));

  // hero loop draw animation
  const loopCircle = document.getElementById('loopCircle');
  setTimeout(() => { loopCircle.style.transition = 'stroke-dashoffset 1.8s cubic-bezier(.65,0,.35,1)'; loopCircle.style.strokeDashoffset = '0'; }, 300);

  // demo tabs
  const tabs = document.querySelectorAll('.demo-tab');
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      document.querySelectorAll('.demo-panel').forEach(p => p.classList.remove('active'));
      document.getElementById('panel-' + tab.dataset.tab).classList.add('active');
    });
  });

  // Cargar demo.html externamente dentro de index.html
document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('demo-container');

  if (container) {
    fetch('demo.html')
      .then(response => {
        if (!response.ok) throw new Error('Error al cargar la demo');
        return response.text();
      })
      .then(html => {
        container.innerHTML = html;
        
        // Inicializar las pestañas (tabs) después de cargar el HTML
        initDemoTabs();
      })
      .catch(error => {
        console.error('Error:', error);
        container.innerHTML = '<p>No se pudo cargar la demo.</p>';
      });
  }
});

// Función para activar el cambio entre pestañas
function initDemoTabs() {
  const tabs = document.querySelectorAll('.demo-tab');
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      document.querySelectorAll('.demo-panel').forEach(p => p.classList.remove('active'));
      
      const targetPanel = document.getElementById('panel-' + tab.dataset.tab);
      if (targetPanel) {
        targetPanel.classList.add('active');
      }
    });
  });
}
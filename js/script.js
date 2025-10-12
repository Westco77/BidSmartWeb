// Navegación móvil
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Cerrar menú al hacer clic en un enlace
document.querySelectorAll('.nav-menu a').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

// Scroll suave para enlaces de anclaje
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Efecto de aparición al hacer scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Aplicar a las secciones
document.querySelectorAll('.service-card, .step, .pricing-main-card, .info-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Configuración del Formulario de Contacto con Formspree
const contactForm = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');

if (contactForm) {
    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        // Mostrar estado de carga
        const submitButton = this.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        submitButton.textContent = 'Enviando...';
        submitButton.disabled = true;
        this.classList.add('form-loading');
        
        try {
            const formData = new FormData(this);
            
            // Enviar datos a Formspree
            const response = await fetch(this.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });
            
            if (response.ok) {
                // Éxito
                formMessage.textContent = '¡Gracias! Tu solicitud ha sido enviada. Te contactaremos pronto.';
                formMessage.className = 'form-message success';
                this.reset();
            } else {
                throw new Error('Error en el envío');
            }
            
        } catch (error) {
            // Error
            formMessage.textContent = 'Hubo un error al enviar tu solicitud. Por favor, intenta nuevamente o contáctanos directamente.';
            formMessage.className = 'form-message error';
            console.error('Error:', error);
        } finally {
            // Restaurar estado normal
            submitButton.textContent = originalText;
            submitButton.disabled = false;
            this.classList.remove('form-loading');
            
            // Ocultar mensaje después de 5 segundos
            setTimeout(() => {
                formMessage.style.display = 'none';
            }, 5000);
        }
    });
}

// Validación en tiempo real
const formInputs = document.querySelectorAll('#contactForm input, #contactForm select, #contactForm textarea');
formInputs.forEach(input => {
    input.addEventListener('input', function() {
        if (this.checkValidity()) {
            this.style.borderColor = '#10b981';
        } else {
            this.style.borderColor = '#ef4444';
        }
    });
});

// Cambiar estilo de navbar al hacer scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'var(--color-blanco)'; // Blanco sólido
        navbar.style.boxShadow = '0 2px 20px rgba(0,0,0,0.15)'; // Sombra más pronunciada
    } else {
        navbar.style.background = 'var(--color-blanco)';
        navbar.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
    }
});

// Asegurar que el hero section tenga espacio correcto al cargar
document.addEventListener('DOMContentLoaded', function() {
    const hero = document.querySelector('.hero');
    const navbar = document.querySelector('.navbar');
    
    // Ajuste inicial
    if (hero && navbar) {
        const navbarHeight = navbar.offsetHeight;
        hero.style.marginTop = `-${navbarHeight}px`;
        document.querySelector('.hero-content h1').style.marginTop = `${navbarHeight}px`;
    }
});
/**
 * Premium Properties Guatemala - JavaScript
 * Sitio web interactivo y escalable
 */

(function() {
    'use strict';

    /* ==============================================
       1. Configuración Global
    ============================================== */
    const CONFIG = {
        scrollOffset: 80,
        animationDelay: 100,
        mobileBreakpoint: 768,
        tabletBreakpoint: 992,
        debounceTime: 250
    };

    /* ==============================================
       2. Utilidades
    ============================================== */
    const Utils = {
        debounce(func, wait) {
            let timeout;
            return function executedFunction(...args) {
                const later = () => {
                    clearTimeout(timeout);
                    func(...args);
                };
                clearTimeout(timeout);
                timeout = setTimeout(later, wait);
            };
        },

        throttle(func, limit) {
            let inThrottle;
            return function executedFunction(...args) {
                if (!inThrottle) {
                    func(...args);
                    inThrottle = true;
                    setTimeout(() => inThrottle = false, limit);
                }
            };
        },

        isElementInViewport(el) {
            const rect = el.getBoundingClientRect();
            return (
                rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
                rect.bottom >= 0
            );
        },

        smoothScrollTo(target, offset = CONFIG.scrollOffset) {
            const element = document.querySelector(target);
            if (element) {
                const top = element.getBoundingClientRect().top + window.pageYOffset - offset;
                window.scrollTo({
                    top: top,
                    behavior: 'smooth'
                });
            }
        }
    };

    /* ==============================================
       3. Navegación
    ============================================== */
    const Navigation = {
        navbar: null,
        navToggle: null,
        navMenu: null,
        lastScroll: 0,

        init() {
            this.navbar = document.getElementById('navbar');
            this.navToggle = document.getElementById('navToggle');
            this.navMenu = document.getElementById('navMenu');

            if (this.navbar && this.navToggle && this.navMenu) {
                this.bindEvents();
                this.handleScroll();
            }
        },

        bindEvents() {
            // Toggle menu móvil
            this.navToggle.addEventListener('click', () => this.toggleMenu());

            // Cerrar menú al hacer clic en un enlace
            const navLinks = this.navMenu.querySelectorAll('.nav-link');
            navLinks.forEach(link => {
                link.addEventListener('click', () => this.closeMenu());
            });

            // Scroll effect
            window.addEventListener('scroll', Utils.throttle(() => this.handleScroll(), 10));

            // Cerrar menú al redimensionar
            window.addEventListener('resize', Utils.debounce(() => {
                if (window.innerWidth > CONFIG.mobileBreakpoint) {
                    this.closeMenu();
                }
            }, CONFIG.debounceTime));
        },

        toggleMenu() {
            this.navToggle.classList.toggle('active');
            this.navMenu.classList.toggle('active');
            document.body.style.overflow = this.navMenu.classList.contains('active') ? 'hidden' : '';
        },

        closeMenu() {
            this.navToggle.classList.remove('active');
            this.navMenu.classList.remove('active');
            document.body.style.overflow = '';
        },

        handleScroll() {
            const currentScroll = window.pageYOffset;

            if (currentScroll > 100) {
                this.navbar.classList.add('scrolled');
            } else {
                this.navbar.classList.remove('scrolled');
            }

            this.lastScroll = currentScroll;
        }
    };

    /* ==============================================
       4. Scroll Suave para enlaces internos
    ============================================== */
    const SmoothScroll = {
        init() {
            const links = document.querySelectorAll('a[href^="#"]');

            links.forEach(link => {
                link.addEventListener('click', (e) => {
                    const href = link.getAttribute('href');
                    if (href !== '#') {
                        e.preventDefault();
                        Utils.smoothScrollTo(href);
                    }
                });
            });
        }
    };

    /* ==============================================
       5. Gallery - Filtros e Imágenes
    ============================================== */
    const Gallery = {
        container: null,
        filterButtons: null,
        galleryItems: null,

        init() {
            this.container = document.querySelector('.gallery-grid');
            this.filterButtons = document.querySelectorAll('.filter-btn');
            this.galleryItems = document.querySelectorAll('.gallery-item');

            if (this.filterButtons.length && this.galleryItems.length) {
                this.bindEvents();
            }
        },

        bindEvents() {
            this.filterButtons.forEach(btn => {
                btn.addEventListener('click', () => {
                    const filter = btn.dataset.filter;
                    this.filterItems(filter);

                    // Actualizar clase activa
                    this.filterButtons.forEach(b => b.classList.remove('active'));
                    btn.classList.add('active');
                });
            });

            // Lightbox para imágenes (opcional)
            this.galleryItems.forEach(item => {
                item.addEventListener('click', () => {
                    this.openLightbox(item);
                });
            });
        },

        filterItems(filter) {
            this.galleryItems.forEach(item => {
                const category = item.dataset.category;

                if (filter === 'all' || category === filter) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, 50);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        },

        openLightbox(item) {
            const img = item.querySelector('img');
            if (img) {
                // Aquí puedes agregar funcionalidad de lightbox
                console.log('Lightbox:', img.src);
            }
        }
    };

    /* ==============================================
       6. Testimonios - Slider
    ============================================== */
    const Testimonials = {
        slider: null,
        cards: null,
        prevBtn: null,
        nextBtn: null,
        dotsContainer: null,
        currentSlide: 0,
        autoPlayInterval: null,

        init() {
            this.slider = document.querySelector('.testimonials-slider');
            this.cards = document.querySelectorAll('.testimonial-card');
            this.prevBtn = document.querySelector('.testimonial-btn.prev');
            this.nextBtn = document.querySelector('.testimonial-btn.next');
            this.dotsContainer = document.querySelector('.testimonial-dots');

            if (this.cards.length) {
                this.createDots();
                this.bindEvents();
                this.startAutoPlay();
            }
        },

        createDots() {
            if (this.dotsContainer) {
                for (let i = 0; i < this.cards.length; i++) {
                    const dot = document.createElement('span');
                    dot.classList.add('testimonial-dot');
                    dot.addEventListener('click', () => this.goToSlide(i));
                    this.dotsContainer.appendChild(dot);
                }
                this.updateDots();
            }
        },

        bindEvents() {
            if (this.prevBtn) {
                this.prevBtn.addEventListener('click', () => this.prev());
            }

            if (this.nextBtn) {
                this.nextBtn.addEventListener('click', () => this.next());
            }

            // Pausar autoplay al hover
            if (this.slider) {
                this.slider.addEventListener('mouseenter', () => this.stopAutoPlay());
                this.slider.addEventListener('mouseleave', () => this.startAutoPlay());
            }
        },

        goToSlide(index) {
            this.currentSlide = index;
            if (this.slider && this.cards[index]) {
                this.slider.scrollTo({
                    left: this.cards[index].offsetLeft,
                    behavior: 'smooth'
                });
            }
            this.updateDots();
        },

        prev() {
            this.currentSlide = this.currentSlide > 0 ? this.currentSlide - 1 : this.cards.length - 1;
            this.goToSlide(this.currentSlide);
        },

        next() {
            this.currentSlide = this.currentSlide < this.cards.length - 1 ? this.currentSlide + 1 : 0;
            this.goToSlide(this.currentSlide);
        },

        updateDots() {
            const dots = this.dotsContainer?.querySelectorAll('.testimonial-dot');
            if (dots) {
                dots.forEach((dot, index) => {
                    dot.classList.toggle('active', index === this.currentSlide);
                });
            }
        },

        startAutoPlay() {
            this.autoPlayInterval = setInterval(() => this.next(), 5000);
        },

        stopAutoPlay() {
            if (this.autoPlayInterval) {
                clearInterval(this.autoPlayInterval);
            }
        }
    };

    /* ==============================================
       7. Formulario de Contacto
    ============================================== */
    const ContactForm = {
        form: null,

        init() {
            this.form = document.getElementById('contactForm');

            if (this.form) {
                this.bindEvents();
            }
        },

        bindEvents() {
            this.form.addEventListener('submit', (e) => this.handleSubmit(e));
        },

        handleSubmit(e) {
            e.preventDefault();

            const formData = new FormData(this.form);
            const data = Object.fromEntries(formData);

            // Validación básica
            if (!this.validateForm(data)) {
                return;
            }

            // Aquí puedes agregar el código para enviar el formulario
            // Por ejemplo, a un servidor o servicio de email
            this.sendForm(data);
        },

        validateForm(data) {
            let isValid = true;
            const required = ['nombre', 'email', 'interes', 'mensaje'];

            required.forEach(field => {
                if (!data[field]) {
                    isValid = false;
                }
            });

            if (data.email && !this.isValidEmail(data.email)) {
                isValid = false;
            }

            return isValid;
        },

        isValidEmail(email) {
            const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return re.test(email);
        },

        sendForm(data) {
            const phoneNumber = '50258741866';
            
            const mensajeWhatsApp = `*Nuevo mensaje desde la web*\n\n` +
                `*Nombre:* ${data.nombre}\n` +
                `*Email:* ${data.email}\n` +
                `*Teléfono:* ${data.telefono || 'No proporcionado'}\n` +
                `*País:* ${data.pais || 'No proporcionado'}\n` +
                `*Servicio de interés:* ${data.interes}\n` +
                `*Mensaje:* ${data.mensaje}`;
            
            const encodedMessage = encodeURIComponent(mensajeWhatsApp);
            const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
            
            window.open(whatsappUrl, '_blank');
            
            this.showMessage('¡Gracias! Serás redirigido a WhatsApp para enviar tu mensaje.', 'success');
            this.form.reset();
        },

        showMessage(message, type) {
            const messageDiv = document.createElement('div');
            messageDiv.className = `form-message form-message-${type}`;
            messageDiv.textContent = message;

            // Insertar después del formulario
            this.form.parentElement.insertBefore(messageDiv, this.form.nextSibling);

            // Eliminar después de 5 segundos
            setTimeout(() => {
                messageDiv.remove();
            }, 5000);
        }
    };

    /* ==============================================
       8. Animaciones al Scroll
    ============================================== */
    const ScrollAnimations = {
        elements: null,

        init() {
            this.elements = document.querySelectorAll('.scroll-animate');

            if (this.elements.length) {
                this.bindEvents();
                this.checkElements();
            }
        },

        bindEvents() {
            window.addEventListener('scroll', Utils.throttle(() => this.checkElements(), 10));
        },

        checkElements() {
            this.elements.forEach(el => {
                if (Utils.isElementInViewport(el)) {
                    el.classList.add('visible');
                }
            });
        }
    };

    /* ==============================================
       9. Parallax Effect (Hero)
    ============================================== */
    const Parallax = {
        hero: null,

        init() {
            this.hero = document.querySelector('.hero');

            if (this.hero) {
                window.addEventListener('scroll', Utils.throttle(() => this.handleScroll(), 10));
            }
        },

        handleScroll() {
            const scrolled = window.pageYOffset;
            if (this.hero && scrolled < window.innerHeight) {
                this.hero.style.backgroundPositionY = (scrolled * 0.5) + 'px';
            }
        }
    };

    /* ==============================================
       10. Lazy Loading para Imágenes
    ============================================== */
    const LazyLoad = {
        init() {
            const images = document.querySelectorAll('img[data-src]');

            if ('IntersectionObserver' in window) {
                const observer = new IntersectionObserver((entries) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            const img = entry.target;
                            img.src = img.dataset.src;
                            img.removeAttribute('data-src');
                            observer.unobserve(img);
                        }
                    });
                });

                images.forEach(img => observer.observe(img));
            }
        }
    };

    /* ==============================================
       11. Menú Móvil - Overlay
    ============================================== */
    const MobileOverlay = {
        overlay: null,

        init() {
            this.create();
            this.bindEvents();
        },

        create() {
            this.overlay = document.createElement('div');
            this.overlay.className = 'nav-overlay';
            this.overlay.id = 'navOverlay';
            document.body.appendChild(this.overlay);
        },

        bindEvents() {
            this.overlay.addEventListener('click', () => {
                Navigation.closeMenu();
            });

            Navigation.navMenu?.addEventListener('click', (e) => {
                if (e.target === Navigation.navMenu) {
                    Navigation.closeMenu();
                }
            });
        }
    };

    /* ==============================================
       12. Inicialización
    ============================================== */
    document.addEventListener('DOMContentLoaded', () => {
        Navigation.init();
        SmoothScroll.init();
        Gallery.init();
        Testimonials.init();
        ContactForm.init();
        ScrollAnimations.init();
        Parallax.init();
        LazyLoad.init();
        MobileOverlay.init();

        console.log('%c Premium Properties Guatemala ', 'background: #1a4d2e; color: #c9a962; padding: 10px; font-size: 16px; font-weight: bold;');
        console.log('%c Sitio web cargado correctamente ', 'color: #666;');
    });

})();
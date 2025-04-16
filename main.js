document.addEventListener('DOMContentLoaded', function() {
    // Elementos del DOM
    const header = document.querySelector('.header');
    const navLinks = document.querySelectorAll('.nav-link');
    const navIndicator = document.querySelector('.nav-indicator');
    const menuToggle = document.querySelector('.menu-toggle');
    const navbar = document.querySelector('.navbar');
    const contactForm = document.getElementById('contactForm');
    
    // Configuración inicial
    let currentTestimonialSlide = 0;
    let slideInterval;
    const SCROLL_OFFSET = 100;
    const MOBILE_BREAKPOINT = 992;

    // Funciones de utilidad
    const debounce = (func, wait = 100) => {
        let timeout;
        return (...args) => {
            clearTimeout(timeout);
            timeout = setTimeout(() => func.apply(this, args), wait);
        };
    };

    const isElementInViewport = (el) => {
        const rect = el.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.bottom >= 0
        );
    };

    // Efecto de scroll en el header
    const handleScroll = () => {
        header.classList.toggle('scrolled', window.scrollY > 100);
        updateActiveLink();
    };

    // Menú hamburguesa para móvil
    const toggleMenu = () => {
        const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
        menuToggle.setAttribute('aria-expanded', !isExpanded);
        menuToggle.classList.toggle('active');
        navbar.classList.toggle('active');
        
        document.body.style.overflow = navbar.classList.contains('active') ? 'hidden' : '';
        header.classList.toggle('mobile-menu-open', navbar.classList.contains('active'));
    };

    // Actualizar enlace activo
    const updateActiveLink = () => {
        let currentSection = '';
        const fromTop = window.scrollY + SCROLL_OFFSET;
        
        document.querySelectorAll('section').forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            
            if (fromTop >= sectionTop && fromTop < sectionTop + sectionHeight) {
                currentSection = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            const linkHref = link.getAttribute('href').replace('#', '');
            link.classList.toggle('active', linkHref === currentSection || (fromTop < 100 && linkHref === 'inicio'));
            
            if (linkHref === currentSection && navIndicator && window.innerWidth > MOBILE_BREAKPOINT) {
                updateNavIndicator(link);
            }
        });
    };

    // Actualizar indicador de navegación
    const updateNavIndicator = (activeLink) => {
        const linkWidth = activeLink.offsetWidth;
        const linkLeft = activeLink.getBoundingClientRect().left;
        const navLeft = navbar.getBoundingClientRect().left;
        
        navIndicator.style.width = `${linkWidth}px`;
        navIndicator.style.left = `${linkLeft - navLeft}px`;
        navIndicator.style.opacity = '1';
    };

    // Smooth scrolling
    const smoothScroll = (targetId) => {
        const targetElement = document.querySelector(targetId);
        if (!targetElement) return;
        
        const headerHeight = header.offsetHeight;
        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
        
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
        
        // Actualizar URL sin recargar
        if (history.pushState) {
            history.pushState(null, null, targetId);
        } else {
            location.hash = targetId;
        }
    };

    // Manejo del formulario de contacto
    const handleFormSubmit = (e) => {
        e.preventDefault();
        
        const formData = new FormData(contactForm);
        const formObject = Object.fromEntries(formData.entries());
        
        // Aquí iría la lógica para enviar el formulario
        console.log('Datos del formulario:', formObject);
        
        // Mostrar mensaje de éxito (simulado)
        alert('Gracias por tu mensaje. Nos pondremos en contacto contigo pronto.');
        contactForm.reset();
    };

    // Testimonial Slider
   

    // Lazy loading para imágenes
    const initLazyLoading = () => {
        if ('IntersectionObserver' in window) {
            const lazyImages = document.querySelectorAll('img[loading="lazy"]');
            
            const imageObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src || img.src;
                        img.removeAttribute('loading');
                        imageObserver.unobserve(img);
                    }
                });
            }, {
                rootMargin: '200px 0px'
            });
            
            lazyImages.forEach(img => {
                imageObserver.observe(img);
            });
        }
    };

    // Event listeners
    const setupEventListeners = () => {
        menuToggle.addEventListener('click', toggleMenu);
        
        navLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                if (targetId === '#') return;
                
                smoothScroll(targetId);
                updateActiveLink();
                
                if (window.innerWidth <= MOBILE_BREAKPOINT) {
                    toggleMenu();
                }
            });
        });
        
        if (contactForm) {
            contactForm.addEventListener('submit', handleFormSubmit);
        }
        
        window.addEventListener('scroll', debounce(handleScroll));
        window.addEventListener('resize', debounce(() => {
            if (window.innerWidth > MOBILE_BREAKPOINT && navbar.classList.contains('active')) {
                toggleMenu();
            }
            updateActiveLink();
        }));
    };

    // Inicialización
    const init = () => {
        setupEventListeners();
        handleScroll();
        initTestimonialSlider();
        initLazyLoading();
        
        if (navIndicator) {
            const homeLink = document.querySelector('.nav-link[href="#inicio"]');
            if (homeLink) {
                updateNavIndicator(homeLink);
            }
        }
    };

    init();
});
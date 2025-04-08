document.addEventListener('DOMContentLoaded', function() {
    // Header scroll effect
    const header = document.querySelector('.header');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Contact form handling
   
    document.addEventListener('DOMContentLoaded', function() {
        // Elementos de la navegación
        const header = document.querySelector('.header');
        const navLinks = document.querySelectorAll('.nav-link');
        const navIndicator = document.querySelector('.nav-indicator');
        const menuToggle = document.querySelector('.menu-toggle');
        const navbar = document.querySelector('.navbar');
        
        // Efecto de scroll en el header
        window.addEventListener('scroll', function() {
            if (window.scrollY > 100) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
            
            // Actualizar enlace activo al hacer scroll
            updateActiveLink();
        });
        
        // Menú hamburguesa para móvil
        menuToggle.addEventListener('click', function() {
            this.classList.toggle('active');
            navbar.classList.toggle('active');
            
            // Bloquear el scroll del body cuando el menú está abierto
            if (navbar.classList.contains('active')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        });
        
        // Cerrar menú al hacer clic en un enlace (en móvil)
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                if (window.innerWidth <= 992) {
                    menuToggle.classList.remove('active');
                    navbar.classList.remove('active');
                    document.body.style.overflow = '';
                }
            });
        });
        
        // Smooth scrolling para todos los enlaces
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                if (targetId === '#') return;
                
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    // Calcular posición considerando el header fijo
                    const headerHeight = header.offsetHeight;
                    const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                    
                    // Actualizar enlace activo
                    updateActiveLink();
                }
            });
        });
        
        // Función para actualizar el enlace activo y el indicador
        function updateActiveLink() {
            let fromTop = window.scrollY + 100;
            
            // Encontrar la sección actual
            let currentSection = '';
            document.querySelectorAll('section').forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.offsetHeight;
                
                if (fromTop >= sectionTop && fromTop < sectionTop + sectionHeight) {
                    currentSection = section.getAttribute('id');
                }
            });
            
            // Actualizar clases de los enlaces
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${currentSection}`) {
                    link.classList.add('active');
                    
                    // Mover el indicador visual
                    if (navIndicator) {
                        const linkWidth = link.offsetWidth;
                        const linkLeft = link.getBoundingClientRect().left;
                        const navLeft = navbar.getBoundingClientRect().left;
                        
                        navIndicator.style.width = `${linkWidth}px`;
                        navIndicator.style.left = `${linkLeft - navLeft}px`;
                    }
                }
            });
            
            // Si estamos en la parte superior, marcar "Inicio" como activo
            if (fromTop < 100) {
                document.querySelector('.nav-link[href="#inicio"]').classList.add('active');
                if (navIndicator) {
                    const homeLink = document.querySelector('.nav-link[href="#inicio"]');
                    const linkWidth = homeLink.offsetWidth;
                    const linkLeft = homeLink.getBoundingClientRect().left;
                    const navLeft = navbar.getBoundingClientRect().left;
                    
                    navIndicator.style.width = `${linkWidth}px`;
                    navIndicator.style.left = `${linkLeft - navLeft}px`;
                }
            }
        }
        
        // Inicializar el indicador en "Inicio"
        if (navIndicator) {
            const homeLink = document.querySelector('.nav-link[href="#inicio"]');
            const linkWidth = homeLink.offsetWidth;
            navIndicator.style.width = `${linkWidth}px`;
        }
        
        // Cerrar menú al redimensionar la ventana si pasa a desktop
        window.addEventListener('resize', function() {
            if (window.innerWidth > 992 && navbar.classList.contains('active')) {
                menuToggle.classList.remove('active');
                navbar.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    });
    
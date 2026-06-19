document.addEventListener("DOMContentLoaded", function () {

    /* ==========================================================================
       1. ANIMATION DES TITRES AU SCROLL (Intersection Observer)
       ========================================================================== */
    const titlesToAnimate = document.querySelectorAll(
        ".story h2, #studio h2, #oscars h3, #place h3, .main-character h3"
    );

    const titleObserverOptions = {
        root: null,
        rootMargin: "0px",
        threshold: 1, // Entièrement visible pour déclencher
    };

    const titleObserver = new IntersectionObserver(function (entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("text-visible");
                observer.unobserve(entry.target);
            }
        });
    }, titleObserverOptions);

    titlesToAnimate.forEach(title => {
        title.classList.add("text-hidden");
        titleObserver.observe(title);
    });


    /* ==========================================================================
       2. HERO HEADER : MONTEE DU LOGO & EFFET PARALLAXE
       ========================================================================== */
    const container = document.querySelector('.container');
    const banner = document.querySelector('.banner');

    // On exécute cette partie uniquement si les éléments du Header existent sur la page
    if (container && banner) {
        let ticking = false;

        // Détection de la visibilité de la bannière
        function checkVisibility() {
            const rect = banner.getBoundingClientRect();
            const isVisible = rect.top < window.innerHeight && rect.bottom >= 0;
            
            if (isVisible) {
                container.classList.add('visible');
            } else {
                container.classList.remove('visible');
            }
        }

        // Calcul du déplacement parallaxe à 50% de la vitesse de scroll
        function parallaxEffect() {
            const scrollY = window.scrollY;
            const parallaxSpeed = 0.5; 
            const translateY = scrollY * parallaxSpeed;
            
            container.style.transform = `translateY(${translateY}px)`;
            ticking = false;
        }

        function onScroll() {
            if (!ticking) {
                requestAnimationFrame(() => {
                    checkVisibility();
                    parallaxEffect();
                });
                ticking = true;
            }
        }

        // Vérification et initialisation au chargement de la page
        checkVisibility();

        // Écouteur d'événement passif sur le défilement global
        window.addEventListener('scroll', onScroll, { passive: true });
    }


    /* ==========================================================================
       3. CARROUSEL DES PERSONNAGES (SwiperJS - Effet Coverflow)
       ========================================================================== */
    // Utilisation de la classe moderne .swiper 
    const swiperElement = document.querySelector(".swiper");

    if (swiperElement) {
        const swiper = new Swiper(swiperElement, {
            effect: "coverflow",
            slidesPerView: 'auto', // S'adapte à la largeur définie dans ton SCSS
            spaceBetween: 0,
            centeredSlides: true,  // Indispensable pour l'effet Coverflow 3D
            loop: true,            // Carrousel infini
            
            // Flèches de navigation optionnelles
            navigation: {
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev",
            },
            
            // Défilement automatique fluide
            autoplay: {
                delay: 1500,
                disableOnInteraction: false,
            },
            
            // Paramètres géométriques de l'effet Coverflow
            coverflowEffect: {
                rotate: 50,          // Angle des cartes sur les côtés
                stretch: 0,          // Espacement
                depth: 100,          // Perspective 3D
                modifier: 1,
                slideShadows: false, // Pas d'ombres agressives sur les illustrations
            },
        });
    } else {
        // Simple avertissement silencieux si on est sur une page sans carrousel
        console.log("Swiper non initialisé : aucun élément .swiper trouvé.");
    }

});
document.addEventListener("DOMContentLoaded", function () {
    // Sélection de TOUS les titres concernés par l'animation textuelle
    const titlesToAnimate = document.querySelectorAll(
        ".story h2, #studio h2, #oscars h3, #place h3, .main-character h3"
    );

    const observerOptions = {
        root: null,
        rootMargin: "0px",
        threshold: 1, // Le titre doit être entièrement visible pour déclencher l'animation
    };

    const titleObserver = new IntersectionObserver(function (entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Déclenche l'apparition du texte uniquement
                entry.target.classList.add("text-visible");
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    titlesToAnimate.forEach(title => {
        title.classList.add("text-hidden");
        titleObserver.observe(title);
    });
});

        // Animation de bas en haut du titre du site lorsqu'il devient visible
document.addEventListener('DOMContentLoaded', function() {
    const container = document.querySelector('.container');
    const banner = document.querySelector('.banner');

    // Sécurité : on vérifie que les éléments existent sur la page pour éviter les erreurs JS
    if (!container || !banner) return;

    // Configuration de l'observateur de visibilité
    const observerOptions = {
        root: null, // Calé sur la fenêtre du navigateur (Viewport)
        threshold: 0.1 // Déclenche dès que 10% de la bannière est visible
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // L'astuce du setTimeout : on laisse 50ms au navigateur pour installer 
                // le logo dans sa position basse avant de lui ordonner de monter.
                setTimeout(() => {
                    container.classList.add('visible');
                }, 50);
            } else {
                // Enlève la classe si l'utilisateur scrolle loin, pour pouvoir rejouer l'effet
                container.classList.remove('visible');
            }
        });
    }, observerOptions);

    // On lance l'écoute sur la bannière
    observer.observe(banner);
});

// gestion du parallax sur le logo du site
document.addEventListener('DOMContentLoaded', function() {
    const container = document.querySelector('.container');
    const banner = document.querySelector('.banner');
    
    if (!container || !banner) return;

    let ticking = false;

    // 1. Gestion de la classe 'visible' pour déclencher la montée initiale CSS
    function checkVisibility() {
        const rect = banner.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight && rect.bottom >= 0;
        
        if (isVisible) {
            container.classList.add('visible');
        } else {
            container.classList.remove('visible');
        }
    }

                            // 2. Gestion de l'effet de parallaxe à la moitié de la vitesse
    function parallaxEffect() {
        const scrollY = window.scrollY;
        const parallaxSpeed = 0.5; // Vitesse demandée (moitié de la vitesse de la page)
        const translateY = scrollY * parallaxSpeed;
        
        // On déplace le conteneur. Comme il est en position: absolute, 
        // cela va créer un décalage fluide par rapport à la vidéo en arrière-plan.
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

    // Forcer l'état initial basse du logo avant de lancer la détection
    checkVisibility();

    // Écouteur d'événement sur le défilement
    window.addEventListener('scroll', onScroll, { passive: true });
});
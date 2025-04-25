document.addEventListener('DOMContentLoaded', () => {
    try {
        // Inicializar AOS
        AOS.init({
            duration: 800,
            once: true,
        });

        // Inicializar slider principal (#inicio)
        const mainSlider = new Swiper('#inicio .elegant-slider', {
            effect: 'fade',
            fadeEffect: {
                crossFade: true,
            },
            loop: true,
            autoplay: {
                delay: 5000,
                disableOnInteraction: false,
            },
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
                type: 'bullets',
                renderBullet: function (index, className) {
                    return '<span class="' + className + '"></span>';
                },
            },
            on: {
                init: function () {
                    // Ocultar loader cuando el slider se inicializa
                    const loader = document.getElementById('slider-loader');
                    if (loader) {
                        loader.classList.add('hidden');
                    }
                    console.log('Slider principal inicializado');
                },
                slideChangeTransitionStart: function () {
                    // Resetear animaciones
                    gsap.set('.elegant-title, .elegant-subtitle, .elegant-cta', { opacity: 0, y: 20 });
                },
                slideChangeTransitionEnd: function () {
                    // Animar textos
                    gsap.to('.elegant-title', { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' });
                    gsap.to('.elegant-subtitle', { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out', delay: 0.2 });
                    gsap.to('.elegant-cta', { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out', delay: 0.4 });
                },
            },
        });

        // Controlar paginación del slider personalizado (#shop)
        const sliderWrapper = document.querySelector('.custom-slider-wrapper');
        const paginationBullets = document.querySelectorAll('.custom-pagination-bullet');
        let currentSlide = 0;

        function updatePagination() {
            paginationBullets.forEach((bullet, index) => {
                bullet.classList.toggle('active', index === currentSlide);
            });
        }

        function goToSlide(index) {
            currentSlide = index;
            sliderWrapper.style.transform = `translateX(-${index * 33.33}%)`;
            updatePagination();
        }

        paginationBullets.forEach((bullet, index) => {
            bullet.addEventListener('click', () => {
                goToSlide(index);
                // Pausar y reiniciar la animación CSS
                sliderWrapper.style.animation = 'none';
                setTimeout(() => {
                    sliderWrapper.style.animation = 'slide 6s infinite';
                }, 100);
            });
        });

        // Sincronizar paginación con la animación CSS
        setInterval(() => {
            currentSlide = (currentSlide + 1) % 3;
            updatePagination();
        }, 2000);

        // Temporizador
        const countdownDate = new Date('2025-05-29T00:00:00').getTime();
        const countdownTimer = setInterval(() => {
            const now = new Date().getTime();
            const distance = countdownDate - now;

            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            document.getElementById('days').textContent = days.toString().padStart(2, '0');
            document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
            document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
            document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');

            if (distance < 0) {
                clearInterval(countdownTimer);
                document.getElementById('countdown-timer').innerHTML = '<p>¡El sueño de Talara ya está aquí!</p>';
            }
        }, 1000);

    } catch (error) {
        console.error('Error inicializando los sliders:', error);
    }
});
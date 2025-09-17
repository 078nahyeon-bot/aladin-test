document.addEventListener('DOMContentLoaded', function() {

    const track = document.querySelector('.best_seller_carousel_track');

    if (!track) {
        console.error('Carousel track element not found!');
        return;
    }

    const items = Array.from(track.children);
    const nextButton = document.querySelector('.best_seller_next');
    const prevButton = document.querySelector('.best_seller_prev');
    const dotsNav = document.querySelector('.best_seller_carousel_dots');

    if (items.length === 0) {
        return;
    }

    const itemsToShow = 3;
    let itemWidth = 0;
    let currentIndex = 0;

    function setCarouselDimensions() {
        const carouselBoxWidth = track.parentElement.getBoundingClientRect().width;
        itemWidth = carouselBoxWidth / itemsToShow;

        items.forEach(item => {
            item.style.flexBasis = `${itemWidth}px`;
        });

        createDots();
        moveToSlide(currentIndex);
    }

    function createDots() {
        dotsNav.innerHTML = '';
        const totalSlides = items.length - itemsToShow + 1;

        if (totalSlides > 1) {
            for (let i = 0; i < totalSlides; i++) {
                const dot = document.createElement('span');
                dot.classList.add('best_seller_dot');

                dot.addEventListener('click', () => {
                    moveToSlide(i);
                });

                dotsNav.appendChild(dot);
            }
        }
    }

    function moveToSlide(targetIndex) {
        track.style.transform = `translateX(-${itemWidth * targetIndex}px)`;
        currentIndex = targetIndex;

        const dots = Array.from(dotsNav.children);
        if (dots.length > 0) {
            dots.forEach((dot, index) => {
                dot.classList.toggle('active', index === targetIndex);
            });
        }

        items.forEach((item, index) => {
            const isActive = index >= targetIndex && index < targetIndex + itemsToShow;
            item.classList.toggle('active', isActive);
        });
    }

    nextButton.addEventListener('click', () => {
        const totalSlides = items.length - itemsToShow;
        if (currentIndex < totalSlides) {
            moveToSlide(currentIndex + 1);
        }
    });

    prevButton.addEventListener('click', () => {
        if (currentIndex > 0) {
            moveToSlide(currentIndex - 1);
        }
    });

    window.addEventListener('resize', setCarouselDimensions);

    setCarouselDimensions();

    const mainLogo = document.querySelector('#main_logo');
    if (mainLogo) {
        mainLogo.classList.add('active');
    }
});


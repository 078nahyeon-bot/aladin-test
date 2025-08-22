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

    // 🌟 여기부터 새로운 코드가 추가된 부분입니다. 🌟
    // 로고를 찾아서 'active' 클래스를 추가하여 나타나게 합니다.
    const mainLogo = document.querySelector('#main_logo');
    if (mainLogo) {
        mainLogo.classList.add('active');
    }
});

// 만권당 섹션의 캐릭터 애니메이션을 위한 IntersectionObserver
const manCha = document.querySelector('#man_cha');
const mankwondangSection = document.querySelector('#sec3');

const animationCallback = (entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      manCha.classList.add('active');
    } else {
      manCha.classList.remove('active');
    }
  });
};

const observerOptions = {
  threshold: 0.1
};

const observer = new IntersectionObserver(animationCallback, observerOptions);
observer.observe(mankwondangSection);
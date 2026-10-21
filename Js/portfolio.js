document.addEventListener("DOMContentLoaded", function () {

    /* ========================================
       1. PHOTO GALLERY LIGHTBOX
    ======================================== */

    const galleryItems = document.querySelectorAll(".four-gallery-item");
    const lightbox = document.getElementById("fourLightbox");
    const lightboxImage = document.getElementById("fourLightboxImage");
    const closeButton = document.getElementById("fourLightboxClose");


    /* Open photo */

    if (galleryItems.length > 0 && lightbox && lightboxImage) {

        galleryItems.forEach(function (item) {

            item.addEventListener("click", function () {

                const image = item.querySelector("img");

                if (!image) {
                    return;
                }

                lightboxImage.src = image.src;
                lightboxImage.alt = image.alt;

                lightbox.classList.add("active");

                document.body.style.overflow = "hidden";

            });

        });


        /* Close lightbox */

        function closeLightbox() {

            lightbox.classList.remove("active");

            lightboxImage.src = "";

            document.body.style.overflow = "";

        }


        /* Close button */

        if (closeButton) {

            closeButton.addEventListener("click", function () {

                closeLightbox();

            });

        }


        /* Click outside the image */

        lightbox.addEventListener("click", function (event) {

            if (event.target === lightbox) {

                closeLightbox();

            }

        });


        /* Close with Escape key */

        document.addEventListener("keydown", function (event) {

            if (event.key === "Escape") {

                closeLightbox();

            }

        });

    }


    /* ========================================
       2. NEWBORN SLIDER
    ======================================== */

    const slider = document.querySelector(".newborn-slider");

    if (!slider) {
        return;
    }

    const slides = slider.querySelectorAll(".slide");
    const dotsContainer = document.getElementById("sliderDots");

    const prevButton = document.getElementById("prevSlide");
    const nextButton = document.getElementById("nextSlide");

    let currentSlide = 0;
    let slideInterval = null;


    /* Stop if there are no slides */

    if (slides.length === 0) {
        return;
    }


    /* ========================================
       3. CREATE NAVIGATION DOTS
    ======================================== */

    let dots = [];

    if (dotsContainer) {

        dotsContainer.innerHTML = "";

        slides.forEach(function (slide, index) {

            const dot = document.createElement("button");

            dot.type = "button";
            dot.classList.add("slider-dot");

            dot.setAttribute(
                "aria-label",
                "Afficher la photo " + (index + 1)
            );

            if (index === 0) {
                dot.classList.add("active");
            }

            dot.addEventListener("click", function () {

                goToSlide(index);

                restartSlider();

            });

            dotsContainer.appendChild(dot);

            dots.push(dot);

        });

    }


    /* ========================================
       4. CHANGE SLIDE
    ======================================== */

    function goToSlide(index) {

        slides[currentSlide].classList.remove("active");

        if (dots[currentSlide]) {
            dots[currentSlide].classList.remove("active");
        }

        currentSlide = index;

        slides[currentSlide].classList.add("active");

        if (dots[currentSlide]) {
            dots[currentSlide].classList.add("active");
        }

    }


    /* ========================================
       5. NEXT SLIDE
    ======================================== */

    function nextSlide() {

        let next = currentSlide + 1;

        if (next >= slides.length) {
            next = 0;
        }

        goToSlide(next);

    }


    /* ========================================
       6. PREVIOUS SLIDE
    ======================================== */

    function previousSlide() {

        let previous = currentSlide - 1;

        if (previous < 0) {
            previous = slides.length - 1;
        }

        goToSlide(previous);

    }


    /* ========================================
       7. SLIDER BUTTONS
    ======================================== */

    if (nextButton) {

        nextButton.addEventListener("click", function () {

            nextSlide();

            restartSlider();

        });

    }


    if (prevButton) {

        prevButton.addEventListener("click", function () {

            previousSlide();

            restartSlider();

        });

    }


    /* ========================================
       8. AUTOMATIC SLIDER
    ======================================== */

    function startSlider() {

        if (slides.length <= 1) {
            return;
        }

        slideInterval = setInterval(function () {

            nextSlide();

        }, 3000);

    }


    /* Restart timer after user interaction */

    function restartSlider() {

        clearInterval(slideInterval);

        startSlider();

    }


    /* Start the slider */

    startSlider();

});



/* ========================================
   LIGHT / DARK THEME
======================================== */

const themeToggle = document.getElementById("themeToggle");

if (themeToggle) {

    // Load the saved theme.
    const savedTheme = localStorage.getItem("monalisa-theme");

    if (savedTheme === "dark") {
        document.body.classList.add("dark-theme");
    }

    updateThemeButton();

    // Change theme when the button is clicked.
    themeToggle.addEventListener("click", function () {

        document.body.classList.toggle("dark-theme");

        const isDark = document.body.classList.contains("dark-theme");

        localStorage.setItem(
            "monalisa-theme",
            isDark ? "dark" : "light"
        );

        updateThemeButton();
    });

    function updateThemeButton() {

        const isDark = document.body.classList.contains("dark-theme");

        themeToggle.textContent = isDark ? "☀" : "☾";

        themeToggle.setAttribute(
            "aria-label",
            isDark
                ? "Activer le thème clair"
                : "Activer le thème sombre"
        );
    }
}


document.addEventListener("DOMContentLoaded", function () {

    /* =========================
       1. MENU MOBILE
       ========================= */

    const menuButton = document.getElementById("menuButton");
    const nav = document.getElementById("nav");

    if (menuButton && nav) {

        menuButton.setAttribute("aria-expanded", "false");

        menuButton.addEventListener("click", function () {

            nav.classList.toggle("active");

            const menuIsOpen = nav.classList.contains("active");

            menuButton.setAttribute("aria-expanded", menuIsOpen);

            menuButton.setAttribute(
                "aria-label",
                menuIsOpen ? "Fermer le menu" : "Ouvrir le menu"
            );

        });

        nav.querySelectorAll("a").forEach(function (link) {

            link.addEventListener("click", function () {

                nav.classList.remove("active");

                menuButton.setAttribute("aria-expanded", "false");
                menuButton.setAttribute("aria-label", "Ouvrir le menu");

            });

        });

    }


    /* =========================
       2. PHOTO GALLERY LIGHTBOX
       ========================= */

    const galleryItems = document.querySelectorAll(".four-gallery-item");
    const lightbox = document.getElementById("fourLightbox");
    const lightboxImage = document.getElementById("fourLightboxImage");
    const closeButton = document.getElementById("fourLightboxClose");


    /* Click on photo */

    if (galleryItems.length > 0 && lightbox && lightboxImage) {

        galleryItems.forEach(function (item) {

            item.addEventListener("click", function () {

                const image = item.querySelector("img");

                if (!image) return;

                lightboxImage.src = image.src;
                lightboxImage.alt = image.alt;

                lightbox.classList.add("active");

                document.body.style.overflow = "hidden";

            });

        });


        /* Close function */

        function closeLightbox() {

            lightbox.classList.remove("active");

            lightboxImage.src = "";

            document.body.style.overflow = "";

        }


        /* Click X */

        if (closeButton) {

            closeButton.addEventListener("click", function () {

                closeLightbox();

            });

        }


        /* Click outside image */

        lightbox.addEventListener("click", function (event) {

            if (event.target === lightbox) {

                closeLightbox();

            }

        });


        /* ESC key */

        document.addEventListener("keydown", function (event) {

            if (event.key === "Escape") {

                closeLightbox();

            }

        });

    }

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

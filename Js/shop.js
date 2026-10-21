document.addEventListener("DOMContentLoaded", function () {

    /* =================================================
       MENU MOBILE
    ================================================= */

    const menuButton = document.getElementById("menuButton");
    const nav = document.getElementById("nav");

    if (menuButton && nav) {

        menuButton.setAttribute("aria-expanded", "false");

        menuButton.addEventListener("click", function () {

            const isOpen = nav.classList.toggle("active");

            menuButton.setAttribute("aria-expanded", String(isOpen));

        });

        nav.querySelectorAll("a").forEach(function (link) {

            link.addEventListener("click", function () {

                nav.classList.remove("active");

                menuButton.setAttribute("aria-expanded", "false");

            });

        });

    }

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



    /* =================================================
       ELEMENTS
    ================================================= */

    const filterButtons = document.querySelectorAll(".filter-btn");
    const portfolioItems = document.querySelectorAll(".portfolio-item");

    const lightbox = document.getElementById("photoLightbox");
    const lightboxClose = document.getElementById("photoLightboxClose");

    const lightboxImage = document.getElementById("photoLightboxImage");
    const lightboxCategory = document.getElementById("photoLightboxCategory");
    const lightboxTitle = document.getElementById("photoLightboxTitle");
    const lightboxDescription = document.getElementById("photoLightboxDescription");
    const lightboxPrice = document.getElementById("photoLightboxPrice");

    const minusQuantity = document.getElementById("minusQuantity");
    const plusQuantity = document.getElementById("plusQuantity");
    const quantityElement = document.getElementById("quantity");

    const addToCart = document.getElementById("addToCart");
    const cartMessage = document.getElementById("cartMessage");
    const cartCount = document.getElementById("cartCount");
    const cartText = document.getElementById("cartText");

    const btnCheckout = document.getElementById("btnCheckout");


    /* =================================================
       CART
    ================================================= */

    let cart = [];

    try {

        const savedCart = localStorage.getItem("cart");

        cart = savedCart ? JSON.parse(savedCart) : [];

        if (!Array.isArray(cart)) {
            cart = [];
        }

    } catch (error) {

        cart = [];

    }


    /* =================================================
       CURRENT PHOTO
    ================================================= */

    let currentPhoto = null;
    let currentQuantity = 1;


    /* =================================================
       UPDATE CART COUNT
    ================================================= */

    function updateCartCount() {

        let total = 0;

        cart.forEach(function (item) {

            total += Number(item.qty) || 0;

        });

        if (cartCount) {
            cartCount.textContent = total;
        }

        if (cartText) {

            cartText.textContent = total === 0
                ? "Votre panier est vide"
                : total + " photo(s) dans le panier";

        }

    }


    /* =================================================
       FILTER PHOTOS
    ================================================= */

    filterButtons.forEach(function (button) {

        button.addEventListener("click", function (event) {

            event.preventDefault();

            const selectedFilter = this.getAttribute("data-filter");

            // Update active filter

            filterButtons.forEach(function (btn) {

                btn.classList.remove("active");

            });

            this.classList.add("active");


            // Filter portfolio items

            portfolioItems.forEach(function (item) {

                const category = item.getAttribute("data-category");

                if (
                    selectedFilter === "all" ||
                    category === selectedFilter
                ) {

                    item.style.display = "";

                } else {

                    item.style.display = "none";

                }

            });

        });

    });


    /* =================================================
       OPEN LIGHTBOX
    ================================================= */

    const categoryNames = {

        portrait: "Portrait",
        blackwhite: "Black & White",
        bebe: "Bébé",
        maternite: "Maternité",
        famille: "Famille",
        iran: "Iran",
        FUTUREMAMAN: "Futur maman"

    };


    portfolioItems.forEach(function (item) {

        const image = item.querySelector("img");

        if (!image) {
            return;
        }

        item.addEventListener("click", function (event) {

            event.preventDefault();
            event.stopPropagation();

            const src = image.getAttribute("src");

            const title =
                item.getAttribute("data-title") ||
                image.getAttribute("alt") ||
                "Photographie";

            const description =
                item.getAttribute("data-description") || "";

            const price =
                parseFloat(item.getAttribute("data-price")) || 0;

            const category =
                item.getAttribute("data-category") || "";


            // Store selected photo

            currentPhoto = {

                src: src,
                name: title,
                description: description,
                price: price,
                category: category

            };

            currentQuantity = 1;

            if (quantityElement) {
                quantityElement.textContent = "1";
            }


            // Display image

            if (lightboxImage) {

                lightboxImage.src = src;
                lightboxImage.alt = title;

            }


            // Display category

            if (lightboxCategory) {

                lightboxCategory.textContent =
                    categoryNames[category] || category;

            }


            // Display title

            if (lightboxTitle) {
                lightboxTitle.textContent = title;
            }


            // Display description

            if (lightboxDescription) {
                lightboxDescription.textContent = description;
            }


            // Display price

            if (lightboxPrice) {
                lightboxPrice.textContent = price.toFixed(2);
            }


            // Reset message

            if (cartMessage) {
                cartMessage.textContent = "";
            }


            // Open lightbox

            if (lightbox) {
                lightbox.classList.add("active");
            }

            document.body.classList.add("lightbox-open");

        });

    });


    /* =================================================
       CLOSE LIGHTBOX
    ================================================= */

    function closeLightbox() {

        if (lightbox) {
            lightbox.classList.remove("active");
        }

        document.body.classList.remove("lightbox-open");

        currentPhoto = null;
        currentQuantity = 1;

        if (quantityElement) {
            quantityElement.textContent = "1";
        }

        if (cartMessage) {
            cartMessage.textContent = "";
        }

    }


    // Close button

    if (lightboxClose) {

        lightboxClose.addEventListener("click", function (event) {

            event.preventDefault();

            closeLightbox();

        });

    }


    // Close by clicking the background

    if (lightbox) {

        lightbox.addEventListener("click", function (event) {

            if (event.target === lightbox) {
                closeLightbox();
            }

        });

    }


    // Close with Escape key

    document.addEventListener("keydown", function (event) {

        if (
            event.key === "Escape" &&
            lightbox &&
            lightbox.classList.contains("active")
        ) {

            closeLightbox();

        }

    });


    /* =================================================
       DECREASE QUANTITY
    ================================================= */

    if (minusQuantity) {

        minusQuantity.addEventListener("click", function (event) {

            event.preventDefault();

            if (currentQuantity > 1) {

                currentQuantity--;

                if (quantityElement) {
                    quantityElement.textContent = currentQuantity;
                }

            }

        });

    }


    /* =================================================
       INCREASE QUANTITY
    ================================================= */

    if (plusQuantity) {

        plusQuantity.addEventListener("click", function (event) {

            event.preventDefault();

            currentQuantity++;

            if (quantityElement) {
                quantityElement.textContent = currentQuantity;
            }

        });

    }


    /* =================================================
       ADD TO CART
    ================================================= */

    if (addToCart) {

        addToCart.addEventListener("click", function (event) {

            event.preventDefault();

            if (!currentPhoto) {
                return;
            }


            // Check whether the photo is already in the cart

            const existingPhoto = cart.find(function (item) {

                return item.src === currentPhoto.src;

            });


            // Update quantity if the photo already exists

            if (existingPhoto) {

                existingPhoto.qty =
                    (Number(existingPhoto.qty) || 0) + currentQuantity;

            } else {

                // Add a new photo

                cart.push({

                    src: currentPhoto.src,
                    name: currentPhoto.name,
                    description: currentPhoto.description,
                    price: currentPhoto.price,
                    category: currentPhoto.category,
                    qty: currentQuantity

                });

            }


            // Save cart

            try {

                localStorage.setItem("cart", JSON.stringify(cart));

                updateCartCount();

                if (cartMessage) {
                    cartMessage.textContent = "Photo ajoutée au panier.";
                }

            } catch (error) {

                if (cartMessage) {

                    cartMessage.textContent =
                        "Impossible de sauvegarder le panier.";

                }

            }


            // Reset quantity

            currentQuantity = 1;

            if (quantityElement) {
                quantityElement.textContent = "1";
            }

        });

    }


    /* =================================================
       CHECKOUT
    ================================================= */

    if (btnCheckout) {

        btnCheckout.addEventListener("click", function (event) {

            event.preventDefault();

            window.location.href = "checkout.html";

        });

    }


    /* =================================================
       INITIALIZE CART
    ================================================= */

    updateCartCount();

});
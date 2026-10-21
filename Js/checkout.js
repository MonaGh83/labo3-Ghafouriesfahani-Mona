

        /* =================================================
           MOBILE MENU
        ================================================= */

        const menuButton =
            document.getElementById("menuButton");

        const nav =
            document.getElementById("nav");


        if (menuButton && nav) {

            menuButton.addEventListener(
                "click",
                function () {

                    nav.classList.toggle("active");

                }
            );

        }



        /* =================================================
           CART
        ================================================= */

        let cart =
            JSON.parse(
                localStorage.getItem("cart")
            ) || [];



        /* =================================================
           ELEMENTS
        ================================================= */

        const photosSelected =
            document.getElementById("photosSelected");

        const totalPrice =
            document.getElementById("totalPrice");

        const cartCount =
            document.getElementById("cartCount");

        const checkoutForm =
            document.getElementById("checkoutForm");

        const checkoutFormSection =
            document.getElementById("checkoutFormSection");

        const finalReceipt =
            document.getElementById("finalReceipt");



        /* =================================================
           CART COUNT
        ================================================= */

        function updateCartCount() {

            if (!cartCount) {
                return;
            }


            let count = 0;


            cart.forEach(function (item) {

                count +=
                    Number(item.qty) || 1;

            });


            cartCount.textContent = count;

        }



        /* =================================================
           TOTAL
        ================================================= */

        function calculateTotal() {

            let total = 0;


            cart.forEach(function (item) {

                const price =
                    Number(item.price) || 0;

                const quantity =
                    Number(item.qty) || 1;


                total +=
                    price * quantity;

            });


            return total;

        }



        /* =================================================
           RENDER CART
        ================================================= */

        function renderCart() {


            photosSelected.innerHTML = "";


            if (cart.length === 0) {


                photosSelected.innerHTML = `

                    <div class="empty-cart">

                        <p>
                            Votre panier est vide.
                        </p>

                        <a
                            href="shop.html"
                            class="back-portfolio">

                            Retour au shop

                        </a>

                    </div>

                `;


                checkoutFormSection.style.display =
                    "none";


                totalPrice.textContent =
                    "0.00";


                return;

            }



            checkoutFormSection.style.display =
                "block";



            cart.forEach(function (item, index) {


                const price =
                    Number(item.price) || 0;

                const quantity =
                    Number(item.qty) || 1;


                const itemTotal =
                    price * quantity;



                const photoElement =
                    document.createElement("div");


                photoElement.className =
                    "checkout-photo";



                photoElement.innerHTML = `

                    <div class="checkout-photo-left">


                        <div class="checkout-photo-image">

                            <img
                                src="${item.src}"
                                alt="${item.name || "Photographie"}">

                        </div>


                        <div class="checkout-photo-info">


                            <h3>
                                ${item.name || "Photographie"}
                            </h3>


                            <p>
                                ${item.description || ""}
                            </p>


                            <div class="checkout-photo-price">

                                ${price.toFixed(2)} $

                            </div>


                            <div class="checkout-photo-quantity">

                                Quantité :
                                ${quantity}

                                <br>

                                Sous-total :
                                ${itemTotal.toFixed(2)} $

                            </div>


                            <button
                                type="button"
                                class="delete-photo"
                                data-index="${index}">

                                Supprimer

                            </button>


                        </div>

                    </div>

                `;


                photosSelected.appendChild(
                    photoElement
                );

            });



            totalPrice.textContent =
                calculateTotal().toFixed(2);

        }



        /* =================================================
           DELETE PHOTO
        ================================================= */

        photosSelected.addEventListener(
            "click",
            function (event) {


                const button =
                    event.target.closest(
                        ".delete-photo"
                    );


                if (!button) {
                    return;
                }


                const index =
                    Number(
                        button.dataset.index
                    );


                if (
                    Number.isNaN(index) ||
                    !cart[index]
                ) {
                    return;
                }


                cart.splice(index, 1);


                localStorage.setItem(
                    "cart",
                    JSON.stringify(cart)
                );


                renderCart();

                updateCartCount();

            }
        );



        /* =================================================
           FORM SUBMIT
        ================================================= */

        checkoutForm.addEventListener(
            "submit",
            function (event) {


                event.preventDefault();



                /* -----------------------------------------
                   CHECK CART
                ----------------------------------------- */

                if (cart.length === 0) {

                    return;

                }



                /* -----------------------------------------
                   GET CUSTOMER INFORMATION
                ----------------------------------------- */

                const prenom =
                    document
                        .getElementById("prenom")
                        .value
                        .trim();


                const nom =
                    document
                        .getElementById("nom")
                        .value
                        .trim();


                const email =
                    document
                        .getElementById("email")
                        .value
                        .trim();



                /* -----------------------------------------
                   TOTAL
                ----------------------------------------- */

                const total =
                    calculateTotal();



                /* -----------------------------------------
                   DATE
                ----------------------------------------- */

                const date =
                    new Date();


                const formattedDate =
                    date.toLocaleDateString(
                        "fr-CA"
                    );



                /* -----------------------------------------
                   RECEIPT PHOTOS
                ----------------------------------------- */

                let receiptPhotos = "";



                cart.forEach(function (item) {


                    const price =
                        Number(item.price) || 0;


                    const quantity =
                        Number(item.qty) || 1;


                    const itemTotal =
                        price * quantity;



                    receiptPhotos += `

                        <div class="receipt-photo-line">

                            <span>

                                ${item.name || "Photographie"}

                                × ${quantity}

                            </span>


                            <strong>

                                ${itemTotal.toFixed(2)} $

                            </strong>

                        </div>

                    `;

                });



                /* -----------------------------------------
                   BUILD RECEIPT
                ----------------------------------------- */

                finalReceipt.innerHTML = `

                    <h2>
                        Merci ${prenom} !
                    </h2>


                    <p>
                        Votre sélection a bien été enregistrée.
                    </p>


                    <p>

                        Client :

                        <strong>
                            ${prenom} ${nom}
                        </strong>

                    </p>


                    <p>

                        E-mail :

                        <strong>
                            ${email}
                        </strong>

                    </p>


                    <div class="receipt-photos">

                        ${receiptPhotos}

                    </div>


                    <div class="receipt-total">

                        Total :

                        <strong>
                            ${total.toFixed(2)} $
                        </strong>

                    </div>


                    <p class="receipt-date">

                        Date :
                        ${formattedDate}

                    </p>


                    <p style="margin-top:30px;">

                        Nous vous contacterons prochainement.

                    </p>

                `;



                /* -----------------------------------------
                   HIDE CHECKOUT
                ----------------------------------------- */

                checkoutFormSection.style.display =
                    "none";


                document
                    .querySelector(".selected-photos")
                    .style.display = "none";



                /* -----------------------------------------
                   SHOW RECEIPT
                ----------------------------------------- */

                finalReceipt.style.setProperty(
                    "display",
                    "block",
                    "important"
                );


                finalReceipt.style.setProperty(
                    "visibility",
                    "visible",
                    "important"
                );


                finalReceipt.style.setProperty(
                    "opacity",
                    "1",
                    "important"
                );



                /* -----------------------------------------
                   CLEAR CART
                ----------------------------------------- */

                cart = [];


                localStorage.removeItem(
                    "cart"
                );


                updateCartCount();



                /* -----------------------------------------
                   SCROLL TO RECEIPT
                ----------------------------------------- */

                setTimeout(
                    function () {

                        finalReceipt.scrollIntoView({

                            behavior: "smooth",

                            block: "center"

                        });

                    },
                    100
                );

            }
        );



        /* =================================================
           INITIALIZE
        ================================================= */

        renderCart();

        updateCartCount();


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

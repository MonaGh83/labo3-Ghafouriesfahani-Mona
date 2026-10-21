
document.addEventListener("DOMContentLoaded", function () {

    const menuButton = document.getElementById("menuButton");
    const nav = document.getElementById("nav");

    // Ouvrir / fermer le menu mobile
    menuButton.addEventListener("click", function () {

        nav.classList.toggle("active");

    });


    // Fermer le menu après avoir cliqué sur un lien
    const navLinks = nav.querySelectorAll("a");

    navLinks.forEach(function (link) {

        link.addEventListener("click", function () {

            nav.classList.remove("active");

        });

    });

});


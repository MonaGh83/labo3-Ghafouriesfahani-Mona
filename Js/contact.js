
document.addEventListener("DOMContentLoaded", function () {


    const menuButton = document.getElementById("menuButton");
    const nav = document.getElementById("nav");

    if (menuButton && nav) {

        menuButton.addEventListener("click", function () {

            const menuOuvert = nav.classList.toggle("active");

            menuButton.setAttribute(
                "aria-expanded",
                String(menuOuvert)
            );

            menuButton.setAttribute(
                "aria-label",
                menuOuvert ? "Fermer le menu" : "Ouvrir le menu"
            );

        });

    }



    const contactForm = document.getElementById("contactForm");
    const formMessage = document.getElementById("formMessage");

    if (!contactForm) {
        console.error("Le formulaire contactForm est introuvable.");
        return;
    }

    contactForm.addEventListener("submit", function (event) {

        event.preventDefault();

        // Vérification HTML5

        if (!contactForm.checkValidity()) {
            contactForm.reportValidity();
            return;
        }

        // Récupération des informations

        const demande = {
            prenom: document.getElementById("prenom").value.trim(),
            nom: document.getElementById("nom").value.trim(),
            email: document.getElementById("email").value.trim(),
            type: document.getElementById("type").value,
            message: document.getElementById("message").value.trim(),
            date: new Date().toISOString()
        };

        // Vérification des champs

        if (
            !demande.prenom ||
            !demande.nom ||
            !demande.email ||
            !demande.type ||
            !demande.message
        ) {
            formMessage.textContent =
                "Veuillez remplir tous les champs.";
            return;
        }

        // Enregistrement dans localStorage

        try {

            let demandes = JSON.parse(
                localStorage.getItem("demandesContact") || "[]"
            );

            if (!Array.isArray(demandes)) {
                demandes = [];
            }

            demandes.push(demande);

            localStorage.setItem(
                "demandesContact",
                JSON.stringify(demandes)
            );

            // Vérifier que les données ont été enregistrées

            const verification = JSON.parse(
                localStorage.getItem("demandesContact") || "[]"
            );

            if (!Array.isArray(verification) || verification.length === 0) {
                throw new Error("Les données n'ont pas été enregistrées.");
            }

            console.log("Demande enregistrée :", demande);

            formMessage.textContent =
                "Votre demande a été enregistrée avec succès.";

            // Redirection après un court délai

            setTimeout(function () {
                window.location.href = "merci.html";
            }, 800);

        } catch (erreur) {

            console.error("Erreur d'enregistrement :", erreur);

            formMessage.textContent =
                "Impossible d'enregistrer votre demande. Veuillez réessayer.";

        }

    });

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

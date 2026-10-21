

        const slides =
            document.querySelectorAll(".hero-slide");

        const nextButton =
            document.getElementById("next");

        const prevButton =
            document.getElementById("prev");

        let currentSlide = 0;

        let slideTimer;


        function showSlide(index) {

            slides.forEach(slide => {
                slide.classList.remove("active");
            });

            slides[index].classList.add("active");

            currentSlide = index;
        }


        function nextSlide() {

            let next =
                (currentSlide + 1) % slides.length;

            showSlide(next);

        }


        function previousSlide() {

            let previous =
                (currentSlide - 1 + slides.length)
                % slides.length;

            showSlide(previous);

        }


        function startSlider() {

            slideTimer =
                setInterval(nextSlide, 3000);

        }


        function resetSlider() {

            clearInterval(slideTimer);

            startSlider();

        }


        nextButton.addEventListener("click", () => {

            nextSlide();

            resetSlider();

        });


        prevButton.addEventListener("click", () => {

            previousSlide();

            resetSlider();

        });


        startSlider();


        /* Navbar shadow when scrolling */

        window.addEventListener("scroll", () => {

            const navbar =
                document.querySelector(".navbar");

            if (window.scrollY > 30) {

                navbar.classList.add("scrolled");

            } else {

                navbar.classList.remove("scrolled");

            }

        });


        /* Close mobile menu after clicking */

        document.querySelectorAll(".nav-link")
            .forEach(link => {

                link.addEventListener("click", () => {

                    const menu =
                        document.querySelector("#mainMenu");

                    if (menu.classList.contains("show")) {

                        bootstrap.Collapse
                            .getOrCreateInstance(menu)
                            .hide();

                    }

                });

            });

 